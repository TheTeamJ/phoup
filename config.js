require("dotenv").config();
const { wrapConfig } = require("./src/lib/libconfig");
const {
  overwriteDateByGooglePhotosMetadata,
} = require("./src/transform/GooglePhotos");
const {
  overwriteDateByFileMetadata,
  overwriteDescriptionsByFileMetadata,
} = require("./src/transform/File");

const PATTERN_PXL =
  /^PXL_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).+\.jpe?g$/i;
const PATTERN_IMG =
  /^IMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.jpe?g$/i;
const PATTERN_MVIMG =
  /^MVIMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.jpe?g$/i;
const PATTERN_PANO =
  /^PANO_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).*\.jpe?g$/i;
const PATTERN_BURST =
  /^\d+(IMG|lrPORTRAIT|lPORTRAIT|PORTRAIT)_\d+_BURST(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<h>\d{2})(?<m>\d{2})(?<s>\d{2}).+\.jpe?g$/i;
const PATTERN_SCREENSHOT =
  /^Screenshot_(?<year>\d{4})\-?(?<month>\d{2})\-?(?<day>\d{2})\-(?<h>\d{2})\-?(?<m>\d{2})\-?(?<s>\d{2}).*\.png$/i;

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
      Download: {
        settings: [
          {
            app: "Downloads",
            pattern: /^.+\.(jpe?g|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [
              overwriteDescriptionsByFileMetadata,
              overwriteDateByFileMetadata,
            ],
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
          {
            app: "Twitter",
            pattern: /^.+\.(jpg|png)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByFileMetadata],
          },
        ],
      },
      Screenshots: {
        settings: [
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
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
      Photos2023_3_4: {
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
            pattern: /^(?<unixtime>\d{13})\.jpe?g$/,
          },
          {
            app: "Photos",
            pattern:
              /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})\.jpe?g$/,
            timezone: "Asia/Tokyo",
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: PATTERN_BURST,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: PATTERN_BURST,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: PATTERN_BURST,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: PATTERN_BURST,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: PATTERN_BURST,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Screenshots",
            pattern: /^スクリーンショット\s.+\.png$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
          {
            app: "Screenshots",
            pattern: PATTERN_SCREENSHOT,
            timezone: "Asia/Tokyo",
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png|gif|webp)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
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
            transform: [overwriteDateByGooglePhotosMetadata],
          },
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png)$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
        ],
      },
      Photos2011: {
        settings: [
          {
            app: "Photos",
            pattern: /^.+\.jpg$/i,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
        ],
      },
      Photos2010: {
        settings: [
          {
            app: "Photos",
            pattern: /^.+\.(jpg|png)$/,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
        ],
      },
      Photos2005: {
        settings: [
          {
            app: "Photos",
            pattern: /^.+\.jpg$/,
            timezone: "Asia/Tokyo",
            transform: [overwriteDateByGooglePhotosMetadata],
          },
        ],
      },
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
