const { Input, Output } = require("./config");

const recipes = [
  // [Input[], Output[]], [Input, Output] の形式で記述する
  [Input.files.Instagram, Output.gyazo],
];

module.exports = {
  recipes,
};
