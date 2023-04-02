const { uploadToGyazo } = require("./gyazo");

const createRes = (destServiceName, result) => {
  return { output: destServiceName, result };
};

/**
 * Upload file to destination service
 */
async function uploadFile(file) {
  const outputs = file._.outputs;
  const resList = [];

  for (const output of outputs) {
    const destService = output._;
    let res;
    switch (destService) {
      case "gyazo": {
        res = await uploadToGyazo(file, Object.freeze(output));
        resList.push(createRes(destService, res));
        break;
      }
      default: {
        console.error("Invalid destService:", destService);
        break;
      }
    }
  }

  return resList;
}

module.exports = {
  uploadFile,
};
