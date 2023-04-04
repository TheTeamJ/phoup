require("dotenv").config();
const { wrapConfig } = require("./src/lib/libconfig");
const { overwriteDateByMetadata } = require("./src/transform/GooglePhotos");

const PATTERN_PXL =
  /^PXL_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).+\.jpe?g$/i;
const PATTERN_IMG =
  /^IMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.jpe?g$/i;
const PATTERN_MVIMG =
  /^MVIMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.jpe?g$/i;
const PATTERN_PANO =
  /^PANO_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.jpe?g$/i;
const SCREENSHOT_PATTERN =
  /^Screenshot_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})\-(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.png$/i;

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
      Twitter: {
        settings: [
          {
            app: "Twitter",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Twitter",
            pattern:
              /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})\.jpg$/,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Screenshots: {
        settings: [
          {
            app: "Screenshots",
            pattern: SCREENSHOT_PATTERN,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_PXL,
            timezone: "UTC",
          },
        ],
      },
      Photos2023: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_PXL,
            timezone: "UTC",
          },
        ],
      },
      Photos2022: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_PXL,
            timezone: "UTC",
          },
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2021: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_PXL,
            timezone: "UTC",
          },
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2020: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_PXL,
            timezone: "UTC",
          },
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: PATTERN_MVIMG,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: PATTERN_PANO,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2019: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: PATTERN_MVIMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2018: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2017: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2016: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2015: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2014: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2013: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
        ],
      },
      Photos2012: {
        settings: [
          {
            app: "Photos",
            pattern: PATTERN_IMG,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^IMAG\d{4}.+\.jpg$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByMetadata],
          },
        ],
      },
      Photos2011: {
        settings: [
          {
            app: "Photos",
            pattern: /^.+\.jpg$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByMetadata],
          },
        ],
      },
      Photos2010: {
        settings: [
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png)$/,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByMetadata],
          },
        ],
      },
      Photos2005: {
        settings: [
          {
            app: "Photos",
            pattern: /^.+\.jpg$/,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByMetadata],
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
