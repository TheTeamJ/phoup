const fetch = require("node-fetch");
const { loadLogLines } = require("../../src/lib/liblog");
require("dotenv").config();

// https://gyazo.com/api/docs/image
const API_BASE_URL = "https://api.gyazo.com/api/images";

async function deleteGyazoImages(imageIds = []) {
  const { GYAZO_ACCESS_TOKEN } = process.env;
  if (!GYAZO_ACCESS_TOKEN) {
    throw new Error("GYAZO_ACCESS_TOKEN is empty");
  }
  for (const imageId of imageIds) {
    const apiUrl = `${API_BASE_URL}/${imageId}?access_token=${GYAZO_ACCESS_TOKEN}`;
    const res = await fetch(apiUrl, {
      method: "DELETE",
    });
    console.log("deleteGyazoImages:", res.status, imageId);
  }
}

async function main() {
  // Example:
  const ids = await loadLogLines(
    "gyazo",
    true,
    "2023-04-02",
    "2023-04-02_220408"
  );
  console.log("targetId:", ids);
  await deleteGyazoImages(ids);
}

main();
