// input object内部を辿って、keyを生やしていく
// keyは、ルートからの階層を含めたキー情報
// 例 {files: {a: {b: [1]}, {bb: 2}}}
// -> { files: { a: { b: [1], key: "files.a.b" }, { bb: 2, key: "files.a.bb" }, key: "files.a"}, key: "files"}
function printAbsKeys(input, key = "") {
  if (typeof input === "object") {
    if (Array.isArray(input)) {
      return;
    }
    const objKeys = Object.keys(input);
    objKeys.forEach((k) => {
      const newKey = key ? `${key}.${k}` : k;
      input[k]._ = newKey;
      printAbsKeys(input[k], newKey);
    });
  }
}

function wrapConfig(config) {
  printAbsKeys(config.Input);
  printAbsKeys(config.Output);
  return config;
}

module.exports = {
  wrapConfig,
};
