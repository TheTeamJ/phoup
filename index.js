const { recipes } = require("./recipe");
const { parseRecipe } = require("./src/lib/librecipe");
const { uploadFile } = require("./src/uploader/");
const { loadLogLines, saveInvalidFiles } = require("./src/lib/liblog");
const { printCount } = require("./src/lib/lib");

async function main() {
  const now = new Date().getTime();
  const uploadedHashes = await loadLogLines("hash", true);

  for (const recipe of recipes) {
    const configName = recipe[0]._; // 0番目がInputの情報
    console.log("config name:", configName);
    const { targetFiles, invalidFiles } = await parseRecipe(recipe);
    if (invalidFiles.length > 0) {
      await saveInvalidFiles(configName, invalidFiles, now);
    }
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
