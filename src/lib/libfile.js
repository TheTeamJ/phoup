const fs = require("fs");
const path = require("path");
const hasha = require("hasha");
const { promisify } = require("util");
const { createDateStr } = require("./libdate");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function addFile(
  file,
  filePath,
  fileStat,
  targetFiles,
  invalidFiles,
  pattern,
  timezone
) {
  // ファイル名fileに対して名前付き正規表現patternをマッチさせて、日時情報を取得する
  // 取得に失敗したら例外を投げる
  const match = file.match(pattern);
  if (!match) {
    throw new Error("Invalid file name");
  }
  const { groups } = match;

  const hash = await hasha.fromFile(filePath, { algorithm: "md5" });
  const dateInfo = createDateStr(groups, timezone);
  if (dateInfo.length === 1) {
    // 日時情報が不正な場合は拒否リストに追加する
    invalidFiles.push({
      filePath,
      details: [dateInfo[0]],
    });
    return;
  }
  targetFiles.push({
    name: file,
    path: filePath,
    size: fileStat.size,
    hash,
    dateInfo,
    // modifiedAt: fileStat.mtime,
  });
}

async function findFiles(
  targetDir,
  pattern,
  timezone,
  foundFiles = [],
  invalidFiles = []
) {
  const targetFiles = foundFiles || [];
  const files = await readdir(targetDir);
  for (const file of files) {
    const filePath = path.join(targetDir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isFile() && pattern.test(file)) {
      await addFile(
        file,
        filePath,
        fileStat,
        targetFiles,
        invalidFiles,
        pattern,
        timezone
      );
    } else if (fileStat.isDirectory()) {
      // 再帰的に探す
      console.log("[R] findFiles:", filePath);
      await findFiles(filePath, pattern, timezone, targetFiles, invalidFiles);
    }
  }
  return targetFiles;
}

module.exports = {
  findFiles,
};
