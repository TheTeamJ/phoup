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

/**
 * recipeを満たす展開されたInputファイルとOutput情報を返す
 * @param {*} recipe
 * @param {boolean} applyTransform transformを適用するかどうか
 * @returns {unknown[]}
 */
async function parseRecipe(recipe, applyTransform = false) {
  const basePath = config.InputBasePath;
  const [Input, Output] = recipe;

  const targetFiles = [];
  const targetDir = path.join(basePath, detectInputDir(Input));
  // 複数パターンが定義されているので順に探していく
  for (const [settingIdx, setting] of Input.settings.entries()) {
    const { pattern, timezone } = setting;
    // 引き継ぐ値
    const { app, transform } = setting;
    // targetDir以下で、patternにマッチするファイルを探す
    // そのファイルの情報をtargetFilesに追加する
    const rawFiles = await findFiles(targetDir, pattern, timezone);
    // TODO: transformを適用する
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
  return targetFiles;
}

module.exports = {
  parseRecipe,
};
