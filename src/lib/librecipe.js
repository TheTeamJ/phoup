const path = require("path");
const { config } = require("./config");

const createRecipeList = (recipe) => {
  const recipeList = [];
  if (Array.isArray(recipe)) {
    recipeList.push(...recipe);
  } else {
    recipeList.push(recipe);
  }
  return recipeList;
};

/**
 * recipeを満たすファイルパスとOutput情報を返す
 * @param {*} recipe
 * @param {boolean} applyTransform transformを適用するかどうか
 */
function parseRecipe(recipe, applyTransform = false) {
  const recipeList = createRecipeList(recipe);
  const basePath = config.InputBasePath;

  const targetPaths = [];

  const res = {
    targetPaths,
    output: recipe[1],
  };
  return res;
}

module.exports = {
  parseRecipe,
};
