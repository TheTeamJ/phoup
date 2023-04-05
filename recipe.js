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
  // [Input.files.Twitter, Output.gyazo], // done
  // [Input.files.Screenshots, Output.gyazo], // done
  // [Input.files.Download, Output.gyazo], // done
  [Input.files.Kindle, Output.gyazo], // done
  // [Input.files.Photos2023, Output.gyazo], // done
  // [Input.files.Photos2022, Output.gyazo], // done
  // [Input.files.Photos2021, Output.gyazo], // done
  // [Input.files.Photos2020, Output.gyazo], // done
  // [Input.files.Photos2019, Output.gyazo], // done
  // [Input.files.Photos2018, Output.gyazo], // done
  // [Input.files.Photos2017, Output.gyazo], // done
  // [Input.files.Photos2016, Output.gyazo], // done
  // [Input.files.Photos2015, Output.gyazo], // done
  // [Input.files.Photos2014, Output.gyazo], // done
  // [Input.files.Photos2013, Output.gyazo], // done
  // [Input.files.Photos2012, Output.gyazo], // done
  // [Input.files.Photos2011, Output.gyazo], // done
  // [Input.files.Photos2010, Output.gyazo], // done
  // [Input.files.Photos2005, Output.gyazo], // done
];

module.exports = {
  recipes,
};
