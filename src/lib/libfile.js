const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
async function findFiles(targetDir, pattern) {
  const targetFiles = [];
  const files = await readdir(targetDir);
  for (const file of files) {
    const filePath = path.join(targetDir, file);
    const fileStat = await stat(filePath);
    if (fileStat.isFile() && pattern.test(file)) {
      targetFiles.push({
        name: file,
        path: filePath,
        size: fileStat.size,
        modifiedAt: fileStat.mtime,
      });
    }
  }
  return targetFiles;
}

module.exports = {
  findFiles,
};
