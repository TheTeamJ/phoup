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
    const msg = "[updateDateByMetadata] Not found metadata file:";
    console.error(msg, metadataFilePath);
    return [file];
  }

  const metadata = JSON.parse(await fsPromises.readFile(metadataFilePath));
  const photoTakenTime = metadata.photoTakenTime;
  if (!photoTakenTime) {
    const msg = "[updateDateByMetadata] Not found photoTakenTime:";
    console.error(msg, metadataFilePath);
    return [file];
  }

  const dt = DateTime.fromSeconds(+photoTakenTime.timestamp);
  const dateInfo = createDateInfo(dt, dt.toISO());
  if (dateInfo.length === 3) {
    file.dateInfo = dateInfo;
  }

  return [file];
}

module.exports = {
  overwriteDateByMetadata,
};
