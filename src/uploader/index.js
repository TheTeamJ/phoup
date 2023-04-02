async function uploadFile(file) {
  const { name, path, dateInfo, _meta, _ } = file;
  const outputs = _.outputs;
  console.log("uploadFile:", path);
  for (const output of outputs) {
    console.log("  ->", output);
  }
}

module.exports = {
  uploadFile,
};
