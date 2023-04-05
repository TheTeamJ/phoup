const path = require("path");
const fs = require("fs");
const { DateTime } = require("luxon");
const { createDateInfo } = require("../lib/libdate");
const fsPromises = fs.promises;

const replaceMetadataFileName = (fileName) => {
  // https://scrapbox.io/teamj/シンプルなファイル名の置換_(ChatGPT)
  // - IMG_0003(1).PNG.json -> IMG_0003.PNG(1).json
  // - scan-002(1).jpg.json -> scan-002.jpg(1).json
  function shiftBracketInFilename(fName) {
    const regex = /^([^\(\)]+)\((\d+)\)\.(png|jpe?g)\.(json)$/i;
    const matches = fName.match(regex);

    if (matches && matches.length === 5) {
      return `${matches[1]}.${matches[3]}(${matches[2]}).${matches[4]}`;
    }
    return fName;
  }

  const newFileName = shiftBracketInFilename(fileName);
  console.log("    replaceMetadataFileName:", fileName, "->", newFileName);
  return newFileName;
};

const apply = async (file) => {
  console.log("- updateDateByMetadata", file.path);

  const fileDir = path.dirname(file.path);
  const pureFileName = file.name.replace(/\-編集済み/, "");

  const metadataFileName = `${pureFileName}.json`;
  let metadataFilePath = path.join(fileDir, metadataFileName);
  let found = true;
  if (!fs.existsSync(metadataFilePath)) {
    found = false;
  }

  // ファイルパスの置換が必要なパターンかもしれないので試してみる
  if (!found) {
    const replacedMetadataFileName = replaceMetadataFileName(metadataFileName);
    metadataFilePath = path.join(fileDir, replacedMetadataFileName);
  }

  // 置換したパスでもファイルが見つからない場合はエラーを返す
  if (!fs.existsSync(metadataFilePath)) {
    throw new Error("Not found metadata file: " + metadataFilePath);
  }

  const metadata = JSON.parse(await fsPromises.readFile(metadataFilePath));
  const photoTakenTime = metadata.photoTakenTime;
  if (!photoTakenTime) {
    throw new Error("Not found photoTakenTime: " + metadataFilePath);
  }

  const dt = DateTime.fromSeconds(+photoTakenTime.timestamp + 1);
  const dateInfo = createDateInfo(dt, dt.toISO());
  if (dateInfo.length === 1) {
    throw new Error("Invalid dateInfo: " + metadataFilePath);
  }

  file.dateInfo = dateInfo;

  return [];
};

async function overwriteDateByGooglePhotosMetadata(files = []) {
  const res = [];
  for (const file of files) {
    const t = await apply(file);
    res.push(...t);
  }
  return res;
}

module.exports = {
  overwriteDateByGooglePhotosMetadata,
};
