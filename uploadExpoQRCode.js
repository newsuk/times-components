const fs = require("fs");
const AWS = require("aws-sdk");

const args = process.argv.slice(2);
const [imagePath, bucket, accessKeyId, secretAccessKey] = args;
AWS.config.update({
  region: "eu-west-1",
  accessKeyId,
  secretAccessKey
});
const s3 = new AWS.S3();

const file = fs.readFileSync(imagePath);

const uploadQRcode = qrcode => {
  const uploadParams = {
    Bucket: bucket,
    Key: imagePath,
    Body: qrcode,
    ContentType: "image/png",
    ACL: "public-read"
  };

  s3.upload(uploadParams, (err, data) => {
    if (err) {
      console.log("upload qrcode error:", err); // eslint-disable-line no-console
    }
    if (data) {
      console.log("upload qrcode success:", data.Key); // eslint-disable-line no-console
    }
  });
};

uploadQRcode(file);
