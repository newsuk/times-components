const fs = require("fs");
const AWS = require("aws-sdk");
const { promisify } = require("util");
const mkdirp = promisify(require("mkdirp"));

const s3 = new AWS.S3();
AWS.config.update({ region: "eu-west-1" });

const fontDir = `${__dirname}/../dist/public/fonts`;
const bucket = "nu-tools-fonts";

s3.listObjects({ Bucket: bucket }, (error, bucketObjects) => {
  if (error) throw error;

  mkdirp(fontDir);

  const contents = bucketObjects.Contents;
  contents.forEach(font => {
    s3.getObject({ Bucket: bucket, Key: font.Key }, (err, data) => {
      if (err) throw err;

      fs.writeFile(`${fontDir}/${font.Key}`, data.Body, e => {
        if (e) throw e;
      });
    });
  });
  console.log("Got all fonts"); // eslint-disable-line no-console
});
