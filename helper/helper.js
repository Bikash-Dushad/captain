const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3FileUpload = async (file) => {
  let fileName = Date.now() + "_" + file.originalname;
  fileName = fileName.replace(/\s+/g, "_");
  console.log(fileName);
  const s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
    },
    region: process.env.REGION,
  });

  const params = {
    Bucket: process.env.BUCKETNAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype, // Set the appropriate MIME type for PDF
  };

  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);

    return fileName; // Return the uploaded file name
  } catch (err) {
    console.error("Error uploading to S3:", err);

    throw err;
  }
};

module.exports = {
  s3FileUpload,
};
