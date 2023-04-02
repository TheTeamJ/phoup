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
      images: {
        settings: [
          {
            app: "Google AR",
            pattern: /^(?<unixtime>\d{13})\.jpe?g$/,
          },
        ],
      },
      SCamera: {
        settings: [
          {
            app: "Camera",
            pattern:
              /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})\d+\.jpe?g$/,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Slack: {
        settings: [
          {
            app: "Slack",
            pattern:
              /^IMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})\.jpe?g$/,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      GoogleMusic: {
        settings: [
          {
            app: "Google Music",
            pattern: /^(?<unixtime>\d{13})\.jpe?g$/,
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
      LINE: {
        settings: [
          {
            app: "LINE",
            pattern: /^(?<unixtime>\d{13})\.jpe?g$/,
          },
        ],
      },
      LINEAlbum: {
        settings: [
          {
            app: "LINE Album",
            pattern: /^(?<unixtime>\d{13})\.jpe?g$/,
          },
        ],
      },
      Photos: {
        settings: [
          {
            app: "Photos",
            pattern:
              /^PXL_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).+\.jpe?g$/i,
            timezone: "UTC",
          },
        ],
      },
      Photos2023: {
        settings: [
          {
            app: "Photos",
            pattern:
              /^PXL_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).+\.jpe?g$/i,
            timezone: "UTC",
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
