const helper = require("../helper/helper");

const imageService = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    let fileName = await helper.s3FileUpload(file);
    return {
      imagePath1: `https://${process.env.BUCKETNAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`,
      imagePath: fileName,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  imageService,
};
