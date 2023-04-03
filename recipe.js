const { config } = require("./config");
const { Input, Output } = config;

// 要素は [Input, Output[]], [Input, Output] の形式で記述する
const recipes = [
  // [Input.files.Instagram, Output.gyazo],
  // [Input.files.miil, Output.gyazo],
  // [Input.files.images, Output.gyazo],
  // [Input.files.GoogleMusic, Output.gyazo],
  // [Input.files.Slack, Output.gyazo],
  // [Input.files.SCamera, Output.gyazo],
  // [Input.files.LINEAlbum, Output.gyazo],
  // [Input.files.LINE, Output.gyazo],
  // [Input.files.Photos, Output.gyazo],
  // [Input.files.Photos2023, Output.gyazo],
  // [Input.files.Photos2022, Output.gyazo],
  // [Input.files.Photos2021, Output.gyazo],
  // [Input.files.Photos2020, Output.gyazo],
  [Input.files.Photos2019, Output.gyazo],
  // [Input.files.Photos2018, Output.gyazo],
];

module.exports = {
  recipes,
};
