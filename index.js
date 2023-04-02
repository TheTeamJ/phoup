const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");
const { uploadFile } = require("./src/uploader/");

async function main() {
  const targetFiles = await parseRecipe(recipes[0]);

  // アップロードする
  for (const file of targetFiles) {
    await uploadFile(file);
  }
}

main();
