'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');
const args = process.argv.slice(2);
const [imagePath,bucket, accessKeyId, secretAccessKey]  = args;
AWS.config.update({ region: 'eu-west-1', accessKeyId, secretAccessKey });
const s3 = new AWS.S3();
console.log(imagePath, bucket, accessKeyId, secretAccessKey)

const file = fs.readFileSync(imagePath)
const uploadQRcode = (file) => {
    const uploadParams = {
        Bucket: bucket,
        Key: 'test',
        Body: file,
        ContentType: 'image/png',
        ACL: 'public-read'
    };

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, (err, data) => {
        if (err) {
            console.log('upload qrcode error:', err);
        }
        if (data) {
            console.log('upload qrcode success:', data.Key); 
        }
    });

};

uploadQRcode(file);
