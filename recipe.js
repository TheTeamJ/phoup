const { config } = require("./config");
const { Input, Output } = config;

const recipes = [
  // [Input, Output[]], [Input, Output] の形式で記述する
  // [Input.files.Instagram, Output.gyazo],
  [Input.files.Instagram2, Output.gyazo],
];

module.exports = {
  recipes,
};
