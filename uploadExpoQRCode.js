const fs = require("fs");
const AWS = require("aws-sdk");

const args = process.argv.slice(2);

const [imagePath, bucket, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY] = args;
console.log("before AWS config update");
config = new AWS.Config();
config.update({
  region: "eu-west-1",
  aws_access_key_id: AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY
});
console.log("after AWS config update");

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
