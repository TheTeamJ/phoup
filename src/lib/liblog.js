const fs = require("fs");
const { config } = require("../../config");

const logDirPath = config.LogBasePath;
if (!fs.existsSync(logDirPath)) {
  throw new Error("Log directory not found: " + logDirPath);
}

function getLogPath(logName) {
  return `${logDirPath}/${logName}.txt`;
}

async function loadLogLines(logName) {
  const logFilePath = getLogPath(logName);
  if (!fs.existsSync(logFilePath)) {
    return [];
  }
}

async function appendLogLines(logName) {}

module.exports = {
  loadLogLines,
  appendLogLines,
};
