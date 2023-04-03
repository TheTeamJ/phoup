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
    for (const transform of transformList) {
      try {
        expandedFiles.push(...(await transform(rawFile)));
      } catch (err) {
        const transformName = transform.name || "(unknown)";
        console.log(err.message);
        invalidFiles.push({
          filePath: rawFile.path,
          details: [err.message],
          transformName,
        });
      }
    }
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
    const rawFiles = await findFiles(
      targetDir,
      pattern,
      timezone,
      [],
      invalidFiles
    );
    // TODO: transformを適用する
    const expandedFiles = applyTransform
      ? await useTransforms(transform, rawFiles, invalidFiles)
      : rawFiles;
    console.log("expandedFiles:", expandedFiles);
    const files = [...rawFiles];
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
  // console.log(recipe, targetDir);
  // console.log("...", targetFiles);
  throw new Error("Not implemented");
  return { targetFiles, invalidFiles };
}

module.exports = {
  parseRecipe,
};
