const { uploadToGyazo } = require("./gyazo");

/**
 * Upload file to destination service
 */
async function uploadFile(file) {
  const outputs = file._.outputs;
  for (const output of outputs) {
    const destService = output._;
    switch (destService) {
      case "gyazo": {
        await uploadToGyazo(file, Object.freeze(output));
        break;
      }
      default: {
        console.error("Invalid destService:", destService);
        break;
      }
    }
  }
}

module.exports = {
  uploadFile,
};
