const path = require("path");
const fs = require("fs");
const { DateTime } = require("luxon");
const { createDateInfo } = require("../lib/libdate");
const fsPromises = fs.promises;

async function overwriteDateByMetadata(file) {
  console.log("[transform/updateDateByMetadata]", file.path);

  const fileDir = path.dirname(file.path);
  const pureFileName = file.name.replace(/\-編集済み/, "");

  const metadataFileName = `${pureFileName}.json`;
  const metadataFilePath = path.join(fileDir, metadataFileName);
  if (!fs.existsSync(metadataFilePath)) {
    throw new Error("Not found metadata file: " + metadataFilePath);
  }

  const metadata = JSON.parse(await fsPromises.readFile(metadataFilePath));
  const photoTakenTime = metadata.photoTakenTime;
  if (!photoTakenTime) {
    throw new Error("Not found photoTakenTime: " + metadataFilePath);
  }

  const dt = DateTime.fromSeconds(+photoTakenTime.timestamp);
  const dateInfo = createDateInfo(dt, dt.toISO());
  if (dateInfo.length === 1) {
    throw new Error("Invalid dateInfo: " + metadataFilePath);
  }

  file.dateInfo = dateInfo;
  return [file];
}

module.exports = {
  overwriteDateByMetadata,
};
