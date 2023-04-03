const path = require("path");
const { config } = require("../../config");
const { findFiles } = require("./libfile");
const { toList } = require("./lib");

const detectInputDir = (recipeInput) => {
  const absKey = recipeInput._;
  if (!absKey) {
    throw new Error("Invalid recipe");
  }
  if (absKey.includes("/")) {
    throw new Error("Invalid recipe absKey");
  }
  return absKey.split(".").join("/");
};

const useTransforms = async (transformList, rawFiles, invalidFiles = []) => {
  if (!transformList || transformList.length === 0) {
    return rawFiles;
  }
  const expandedFiles = [];
  for (const rawFile of rawFiles) {
    const expandedForRaw = [];
    for (const transform of transformList) {
      try {
        const argFiles =
          expandedForRaw.length === 0 ? [rawFile] : expandedForRaw;
        // TODO: 同じものを返された場合は追加しないほうがいい？
        expandedForRaw.push(...(await transform(argFiles)));
      } catch (err) {
        console.log(err.message);
        invalidFiles.push({
          filePath: rawFile.path,
          details: [err.message],
          transformName: transform.name || "(unknown)",
        });
      }
    }
    expandedFiles.push(...expandedForRaw);
  }
  return expandedFiles;
};

/**
 * recipeを満たす展開されたInputファイルとOutput情報を返す
 * @param {*} recipe
 * @param {boolean} applyTransform transformを適用するかどうか
 * @returns {{ targetFiles: unknown[], invalidFiles: unknown[] }}
 */
async function parseRecipe(recipe, applyTransform = false) {
  const basePath = config.InputBasePath;
  const [Input, Output] = recipe;

  const foundRawFilePaths = new Set();
  const targetFiles = [];
  const invalidFiles = [];
  const targetDir = path.join(basePath, detectInputDir(Input));
  // 複数パターンが定義されているので順に探していく
  for (const [settingIdx, setting] of Input.settings.entries()) {
    const { pattern, timezone } = setting;
    console.log(`## pattern_${settingIdx}:`, pattern, timezone);
    // 引き継ぐ値
    const { app, transform } = setting;
    // targetDir以下で、patternにマッチするファイルを探す
    // そのファイルの情報をtargetFilesに追加する
    const rawFiles = [];
    const allRawFiles = await findFiles(
      targetDir,
      pattern,
      timezone,
      [],
      invalidFiles
    );

    // これまでにマッチしたファイルは対象外とする
    for (const rawFile of allRawFiles) {
      if (foundRawFilePaths.has(rawFile.path)) {
        continue;
      }
      foundRawFilePaths.add(rawFile.path);
      rawFiles.push(rawFile);
    }

    // transformsを適用する
    const expandedFiles = applyTransform
      ? await useTransforms(transform, rawFiles, invalidFiles)
      : rawFiles;

    const files = [...expandedFiles];
    // 引き継ぐ情報を追加する
    files.map((file) => {
      file._meta = { app };
      file._ = {
        id: settingIdx,
        outputs: toList(Output),
      };
    });
    targetFiles.push(...files);
  }

  return { targetFiles, invalidFiles };
}

module.exports = {
  parseRecipe,
};
