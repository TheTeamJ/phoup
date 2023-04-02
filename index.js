const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");
const { uploadFile } = require("./src/uploader/");
const { loadLogLines } = require("./src/lib/liblog");

async function main() {
  // await loadLogLines("hash");

  for (const recipe of recipes) {
    console.log("config name:", recipe[0]._); // 0番目がInputの情報
    const targetFiles = await parseRecipe(recipe);

    // アップロードする
    for (const file of targetFiles) {
      const resList = await uploadFile(file);
      // console.log(resList);
    }
  }
}

main();
