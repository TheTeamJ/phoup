const { DateTime } = require("luxon");

const createLogDateStr = (millis, includesTime) => {
  const dt = DateTime.fromMillis(millis);
  if (includesTime) {
    return dt.toFormat("yyyy-MM-dd_HHmmss");
  }
  return dt.toFormat("yyyy-MM-dd");
};

const createDateStr = (groups, timezone = "UTC") => {
  const createRes = (dt, valueForLog) => {
    if (dt.invalid) {
      // エラーの場合は要素数1の配列を返す
      console.error("Invalid DateTime:", valueForLog);
      return [{ dateExpr: valueForLog, ...dt.invalid }];
    }
    return [dt.toISO(), dt.toUnixInteger(), dt.toMillis()];
  };

  if (!groups) {
    // timezoneを指定しつつ今日のstartOf("day")の日時を返す
    const now = DateTime.now();
    const dt = now.setZone(timezone).startOf("day");
    return createRes(dt, dt.toISO());
  }

  const { year, month, day, h, m, s, unixtime } = groups;
  if (unixtime) {
    const numUnixtime = +unixtime;
    if (unixtime.length === 10) {
      const dt = DateTime.fromSeconds(numUnixtime);
      return createRes(dt, numUnixtime);
    } else if (unixtime.length === 13) {
      const dt = DateTime.fromMillis(numUnixtime);
      return createRes(dt, numUnixtime);
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
  if (dt.invalid) {
    // エラーの場合は要素数1の配列を返す
    console.error("Invalid DateTime:", dateStr);
    return [{ dateStr, ...dt.invalid }];
  }
  return createRes(dt, dateStr);
};

module.exports = {
  createDateStr,
  createLogDateStr,
};
