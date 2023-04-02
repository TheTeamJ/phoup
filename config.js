require("dotenv").config();
const { wrapConfig } = require("./src/lib/libconfig");

const config = {
  LogBasePath: "./log",
  InputBasePath: "./raw",
  Input: {
    files: {
      miil: {
        settings: [
          {
            app: "miil",
            pattern:
              /^IMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})\.jpe?g$/,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Instagram: {
        settings: [
          {
            app: "Instagram",
            pattern:
              /^IMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})_\d+\.jpe?g$/,
            timezone: "Asia/Tokyo",
            transform: [],
          },
        ],
      },
      Demo: {},
    },
  },
  Output: {
    gyazo: {
      token: process.env.GYAZO_ACCESS_TOKEN,
    },
  },
};

module.exports = {
  config: Object.freeze(wrapConfig(config)),
};
