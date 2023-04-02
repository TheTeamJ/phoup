const fs = require("fs");
const { createLogDateStr } = require("./libdate");
const { config } = require("../../config");
const fsPromises = fs.promises;

const logDirPath = config.LogBasePath;
if (!fs.existsSync(logDirPath)) {
  throw new Error("Log directory not found: " + logDirPath);
}

function fmtLines(lines) {
  return lines.map((x) => x.trim()).filter((x) => x);
}

/**
 * @param {string[]} newLines
 * @param {string[]} arr
 * @param {boolean} uniq
 */
function appendToList(newLines, arr, uniq = false) {
  for (const line of newLines) {
    if (uniq) {
      if (arr.includes(line)) {
        continue;
      }
    }
    arr.push(line);
  }
}

function getLogDirPath(logName) {
  if (!logName) {
    throw new Error("logName is required");
  }
  return `${logDirPath}/${logName}`;
}

function getLogPath(logName, dirDateStr, fileDateStr) {
  if (!dirDateStr || !fileDateStr) {
    throw new Error("dirDateStr and fileDateStr are required");
  }
  return `${getLogDirPath(logName)}/${dirDateStr}/log_${fileDateStr}.txt`;
}

/**
 * @param {string} logName
 * @param {boolean} uniq
 * @param {string} argDirDateStr
 * @param {string} argFileDateStr
 * @returns {string[]}
 */
async function loadLogLines(logName, uniq, argDirDateStr, argFileDateStr) {
  // 指定された日時のログファイルを読み込む
  if (argDirDateStr && argFileDateStr) {
    const logFilePath = getLogPath(logName, argDirDateStr, argFileDateStr);
    if (!fs.existsSync(logFilePath)) {
      return [];
    }
    const f = await fsPromises.readFile(logFilePath, "utf-8");
    const lines = fmtLines(f.split("\n"));
    return lines;
  }

  // すべてのログファイルを再帰的に読み込む
  const allLines = [];
  const dirPath = getLogDirPath(logName);
  const dDateStrs = await fsPromises.readdir(dirPath);
  for (const dDateStr of dDateStrs) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dDateStr)) {
      continue;
    }
    if (argDirDateStr && argDirDateStr !== dDateStr) {
      // 引数でフォルダが指定されている場合は、そのフォルダのみ読み込む
      continue;
    }
    const currentPath = `${dirPath}/${dDateStr}`;
    const logFileNames = await fsPromises.readdir(currentPath);
    for (const logFileName of logFileNames) {
      if (!/^log_\d{4}-\d{2}-\d{2}_\d{6}\.txt$/.test(logFileName)) {
        continue;
      }
      const fDateStr = logFileName.replace(/^log_/, "").replace(/\.txt$/, "");
      const lines = await loadLogLines(logName, false, dDateStr, fDateStr);
      appendToList(lines, allLines, !!uniq);
    }
  }

  return allLines;
}

async function appendLogLines(logName, millis, newLines = []) {
  const dirDateStr = createLogDateStr(millis);
  const logFilePath = getLogPath(
    logName,
    dirDateStr,
    createLogDateStr(millis, true)
  );
  if (!fs.existsSync(logFilePath)) {
    // ファイルを新規作成する
    await fsPromises.mkdir(`${getLogDirPath(logName)}/${dirDateStr}`, {
      recursive: true,
    });
    await fsPromises.writeFile(logFilePath, "");
  }
  // ファイルに追記する
  await fsPromises.appendFile(logFilePath, newLines.join("\n") + "\n");
}

module.exports = {
  loadLogLines,
  appendLogLines,
};
