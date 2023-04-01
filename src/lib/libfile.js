const fs = require("fs");
const path = require("path");
const { createDateStr } = require("./libdate");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function findFiles(targetDir, pattern, timezone) {
  const targetFiles = [];
  const files = await readdir(targetDir);
  for (const file of files) {
    // TODO: 再帰的に探す
    const filePath = path.join(targetDir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isFile() && pattern.test(file)) {
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
        dateInfo: createDateStr(groups, timezone),
        // modifiedAt: fileStat.mtime,
      });
    }
  }
  return targetFiles;
}

module.exports = {
  findFiles,
};
