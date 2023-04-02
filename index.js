const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");

async function main() {
  const targetFiles = await parseRecipe(recipes[0]);
  console.log(targetFiles);
}

main();
