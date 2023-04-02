const { config } = require("./config");
const { Input, Output } = config;

// 要素は [Input, Output[]], [Input, Output] の形式で記述する
const recipes = [
  // [Input.files.Instagram, Output.gyazo],
  // [Input.files.miil, Output.gyazo],
  // [Input.files.images, Output.gyazo],
  // [Input.files.GoogleMusic, Output.gyazo],
  [Input.files.Slack, Output.gyazo],
];

module.exports = {
  recipes,
};
