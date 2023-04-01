const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const createDateStr = (groups, timezone = "UTC") => {
  const createRes = (dt) => {
    return [dt.toISO(), dt.toUnixInteger(), dt.toMillis()];
  };

  const { year, month, day, h, m, s, unixtime } = groups;
  if (unixtime) {
    if (unixtime.length === 10) {
      const dt = DateTime.fromSeconds(unixtime, { zone: timezone });
      return createRes(dt);
    } else if (unixtime.length === 13) {
      const dt = DateTime.fromMillis(unixtime, { zone: timezone });
      return createRes(dt);
    }
    throw new Error("Invalid unixtime");
  }

  // TODO: Validatation
  const _year = (() => {
    if (year.length !== 4) {
      throw new Error("Invalid year");
    }
    return year;
  })();
  // 0で埋めて2桁にする
  const _month = month.padStart(2, "0");
  const _day = day.padStart(2, "0");
  const _h = h.padStart(2, "0");
  const _m = m.padStart(2, "0");
  const _s = s.padStart(2, "0");

  const dateStr = `${_year}-${_month}-${_day}T${_h}:${_m}:${_s}`;
  const dt = DateTime.fromISO(dateStr, { zone: timezone });
  return createRes(dt);
};

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
      console.log(createDateStr(groups, timezone));

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
