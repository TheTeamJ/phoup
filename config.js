require("dotenv").config();

const config = {
  InputBasePath: "./raw",
  Input: {
    files: {
      Instagram: [
        {
          pattern:
            /^IMG_(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})_(?<h>\d{2})(?<m>\d{2})(?<s>\d{2})_\d+\.jpe?g/,
          transform: [],
        },
      ],
    },
  },
  Output: {
    gyazo: {
      token: process.env.GYAZO_ACCESS_TOKEN,
    },
  },
};

module.exports = {
  config,
};
