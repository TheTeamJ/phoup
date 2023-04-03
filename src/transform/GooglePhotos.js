const path = require("path");
const fs = require("fs");
const { createDateStr } = require("../lib/libdate");
const fsPromises = fs.promises;

async function overwriteDateByMetadata(file) {
  console.log("[updateDateByMetadata]", file);

  const fileDir = path.dirname(file.path);
  const pureFileName = file.name.replace(/\-編集済み/, "");

  const metadataFileName = `${pureFileName}.json`;
  const metadataFilePath = path.join(fileDir, metadataFileName);
  if (!fs.existsSync(metadataFilePath)) {
    const msg = "[updateDateByMetadata] Not found metadata file:";
    console.error(msg, metadataFilePath);
    return [file];
  }

  const metadata = JSON.parse(await fsPromises.readFile(metadataFilePath));
  console.log("##", metadataFilePath, metadata);

  return [file];
}

module.exports = {
  overwriteDateByMetadata,
};
