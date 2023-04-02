const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

// https://gyazo.com/api/docs/image
const API_URL = "https://upload.gyazo.com/api/upload";

async function uploadToGyazo(file, outputInfo) {
  const { path, dateInfo, _meta } = file;
  console.log("uploadToGyazo:", path);

  if (!path || !dateInfo) {
    throw new Error("Invalid file");
  }

  // フォームデータを構築する
  const formData = new FormData();
  formData.append("access_token", outputInfo.token);

  // メタデータをセットする
  const acceptables = ["title", "desc", "referer_url", "app"];
  for (const key of Object.keys(_meta)) {
    if (acceptables.includes(key)) {
      formData.append(key, _meta[key]);
    }
  }

  // TODO: コレクション情報をセットする

  // 作成日時をセットする
  const unixtime = dateInfo[1];
  formData.append("created_at", unixtime);

  // 画像バイナリをセットする
  formData.append("imagedata", fs.createReadStream(path));
  // console.log("uploadToGyazo:", formData);

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    console.error(res);
    throw new Error("Failed to upload to Gyazo: " + path);
  }
  const gyazoData = await res.json();
  return gyazoData;
}

module.exports = {
  uploadToGyazo,
};
