const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

// https://gyazo.com/api/docs/image
const API_URL = "https://upload.gyazo.com/api/upload";

// 失敗した場合はnullを返す
async function uploadToGyazo(file, outputInfo) {
  const { path, dateInfo, hash, _meta } = file;
  console.log("uploadToGyazo:", path, `(${hash})`);

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

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      // console.error(res.status, res.statusText);
      throw new Error("Failed to upload to Gyazo.");
    }
    const gyazoData = await res.json();
    return gyazoData;
  } catch (err) {
    console.error(err.message, path);
    return null;
  }
}

module.exports = {
  uploadToGyazo,
};
