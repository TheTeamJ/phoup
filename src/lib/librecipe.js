const path = require("path");
const { config } = require("../../config");

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
 * recipeを満たすInputファイルとOutput情報を返す
 * @param {*} recipe
 * @param {boolean} applyTransform transformを適用するかどうか
 */
function parseRecipe(recipe, applyTransform = false) {
  const recipeList = createRecipeList(recipe);
  const basePath = config.InputBasePath;

  const targetFiles = [];
  console.log(recipe);

  const res = {
    targetFiles,
    output: recipe[1],
  };
  return res;
}

module.exports = {
  parseRecipe,
};
