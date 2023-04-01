const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");

async function main() {
  await parseRecipe(recipes[0]);
}

main();
