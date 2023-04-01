const path = require("path");
const { config } = require("../../config");
const { findFiles } = require("./libfile");

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
 * recipeを満たすInputファイルとOutput情報を返す
 * @param {*} recipe
 * @param {boolean} applyTransform transformを適用するかどうか
 */
async function parseRecipe(recipe, applyTransform = false) {
  const basePath = config.InputBasePath;
  const [Input, Outputs] = recipe;

  const targetFiles = [];
  const targetDir = path.join(basePath, detectInputDir(Input));
  for (const setting of Input.settings) {
    const { pattern, timezone } = setting;
    // targetDir以下で、patternにマッチするファイルを探す
    // そのファイルの情報をtargetFilesに追加する
    const files = await findFiles(targetDir, pattern, timezone);
    console.log(">>>", files);
  }
  console.log(recipe, targetDir);

  const res = {
    targetFiles,
    output: Outputs,
  };
  return res;
}

module.exports = {
  parseRecipe,
};
