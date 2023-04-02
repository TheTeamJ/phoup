async function uploadToGyazo(file) {
  const { name, path, dateInfo, _meta, _ } = file;
  console.log("uploadToGyazo:", path);
}

module.exports = {
  uploadToGyazo,
};
