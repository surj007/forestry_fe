let crypto = require("crypto-js");

let key = "16BytesLengthKey"
let iv = "A-16-Byte-String"

export function decrypt(data) {
  if(!data) return;
  let k = crypto.enc.Latin1.parse(key);
  let i = crypto.enc.Latin1.parse(iv);

  let bytes = crypto.AES.decrypt(data.toString(), k, {
    iv: i,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  });
  let decryptResult = bytes && bytes.toString(crypto.enc.Utf8);
  return decryptResult && decryptResult.toString();
}

export function encrypt(data) {
  if(!data) return;
  let k = crypto.enc.Latin1.parse(key);
  let i = crypto.enc.Latin1.parse(iv);
  let srcs = crypto.enc.Utf8.parse(data);

  let encrypted = crypto.AES.encrypt(srcs, k,
    {
      iv: i,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    });
  return encrypted && encrypted.toString();
}