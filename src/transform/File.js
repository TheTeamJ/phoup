const fs = require("fs");
const { DateTime } = require("luxon");
const { createDateInfo } = require("../lib/libdate");
const fsPromises = fs.promises;

const applyOverwriteDateByFileMetadata = async (file) => {
  console.log("[transform/overwriteDateByFileMetadata]", file.path);

  // ファイルの作成日を取得
  const stat = await fsPromises.stat(file.path);
  if (!stat || !stat.mtime) {
    throw new Error("Not found mtime.");
  }

  const createdAt = stat.mtime;
  const dt = DateTime.fromJSDate(createdAt);
  const dateInfo = createDateInfo(dt, dt.toISO());
  if (dateInfo.length === 1) {
    throw new Error("Invalid dateInfo: " + metadataFilePath);
  }

  file.dateInfo = dateInfo;
  return file;
};

const applyOverwriteDescriptionsByFileMetadata = async (file) => {
  console.log("[transform/overwriteDescByFileMetadata]", file.path);
  if (!file.name) {
    throw new Error("Invalid file.name");
  }
  file.desc = file.name;
  return file;
};

async function overwriteDescriptionsByFileMetadata(files = []) {
  const res = [];
  for (const file of files) {
    res.push(await applyOverwriteDescriptionsByFileMetadata(file));
  }
  return res;
}

async function overwriteDateByFileMetadata(files = []) {
  const res = [];
  for (const file of files) {
    res.push(await applyOverwriteDateByFileMetadata(file));
  }
  return res;
}

module.exports = {
  overwriteDateByFileMetadata,
  overwriteDescriptionsByFileMetadata,
};
