const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");
const { uploadFile } = require("./src/uploader/");

async function main() {
  for (const recipe of recipes) {
    console.log("recipe name:", recipe._);
    const targetFiles = await parseRecipe(recipe);

    // アップロードする
    for (const file of targetFiles) {
      const res = await uploadFile(file);
    }
  }
}

main();
