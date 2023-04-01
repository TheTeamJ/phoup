const path = require("path");
const { config } = require("../../config");

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
function parseRecipe(recipe, applyTransform = false) {
  const basePath = config.InputBasePath;
  const [Input, Outputs] = recipe;

  const targetFiles = [];
  const targetPath = path.join(basePath, detectInputDir(Input));
  console.log(recipe, targetPath);

  const res = {
    targetFiles,
    output: Outputs,
  };
  return res;
}

module.exports = {
  parseRecipe,
};
