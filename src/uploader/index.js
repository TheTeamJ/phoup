const { uploadToGyazo } = require("./gyazo");
const { appendLogLines } = require("../lib/liblog");

const createRes = (destServiceName, result) => {
  return { output: destServiceName, result };
};

/**
 * Upload file to destination service
 */
async function uploadFile(file, millis) {
  const outputs = file._.outputs;
  const resList = [];

  for (const output of outputs) {
    const destService = output._;
    let res;
    switch (destService) {
      case "gyazo": {
        res = await uploadToGyazo(file, Object.freeze(output));
        resList.push(createRes(destService, res));
        await appendLogLines("gyazo", millis, [res.image_id]);
        await appendLogLines("hash", millis, [file.hash]);
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
