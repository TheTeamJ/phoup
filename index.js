const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");
const { uploadFile } = require("./src/uploader/");
const { loadLogLines } = require("./src/lib/liblog");
const { printCount } = require("./src/lib/lib");

async function main() {
  const now = new Date().getTime();
  const uploadedHashes = await loadLogLines("hash", true);

  for (const recipe of recipes) {
    console.log("config name:", recipe[0]._); // 0番目がInputの情報
    const targetFiles = await parseRecipe(recipe);
    console.log("#files:", targetFiles.length);

    // アップロードする
    for (const [i, file] of targetFiles.entries()) {
      if (uploadedHashes.includes(file.hash)) {
        console.log("Already uploaded:", "hash=", file.hash);
        continue;
      }
      const resList = await uploadFile(file, now);
      printCount(i, targetFiles.length, 10, "==========");
    }
  }
}

main();
