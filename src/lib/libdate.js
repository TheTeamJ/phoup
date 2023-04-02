const { DateTime } = require("luxon");

const createLogDateStr = (millis, includesTime) => {
  const dt = DateTime.fromMillis(millis);
  if (includesTime) {
    return dt.toFormat("yyyy-MM-dd_HHmmss");
  }
  return dt.toFormat("yyyy-MM-dd");
};

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
  if (dt.invalid) {
    console.error("Invalid date:", dateStr, dt.invalid);
    return null;
  }
  return createRes(dt);
};

module.exports = {
  createDateStr,
  createLogDateStr,
};
