const fs = require("fs");
const path = require("path");
const hasha = require("hasha");
const { createDateStr } = require("./libdate");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function addFile(
  file,
  filePath,
  fileStat,
  targetFiles,
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
  const { year, month, day, h, m, s, unixtime } = groups;

  targetFiles.push({
    name: file,
    path: filePath,
    size: fileStat.size,
    hash: await hasha.fromFile(filePath, { algorithm: "md5" }),
    dateInfo: createDateStr(groups, timezone),
    // modifiedAt: fileStat.mtime,
  });
}

async function findFiles(targetDir, pattern, timezone, foundFiles = []) {
  const targetFiles = foundFiles || [];
  const files = await readdir(targetDir);
  for (const file of files) {
    const filePath = path.join(targetDir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isFile() && pattern.test(file)) {
      await addFile(file, filePath, fileStat, targetFiles, pattern, timezone);
    } else if (fileStat.isDirectory()) {
      // 再帰的に探す
      console.log("[R] findFiles:", filePath);
      await findFiles(filePath, pattern, timezone, targetFiles);
    }
  }
  return targetFiles;
}

module.exports = {
  findFiles,
};
