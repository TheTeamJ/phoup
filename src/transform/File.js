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

  return [];
};

const applyOverwriteDescriptionsByFileMetadata = async (file) => {
  console.log(
    "[transform/applyOverwriteDescriptionsByFileMetadata]",
    file.path
  );
  if (!file.name) {
    throw new Error("Invalid file.name");
  }
  file.desc = file.name;

  return [];
};

async function overwriteDescriptionsByFileMetadata(files = []) {
  const res = [];
  for (const file of files) {
    const t = await applyOverwriteDescriptionsByFileMetadata(file);
    res.push(...t);
  }
  return res;
}

async function overwriteDateByFileMetadata(files = []) {
  const res = [];
  for (const file of files) {
    const t = await applyOverwriteDateByFileMetadata(file);
    res.push(...t);
  }
  return res;
}

module.exports = {
  overwriteDateByFileMetadata,
  overwriteDescriptionsByFileMetadata,
};
