import { extname } from 'path';

export const imageRegex =
  /\.(jpg|jpeg|jfif|png|gif|svg|webp|zip|rar|pptx|ppt|xlsx|xlsm|doc|docx|txt|log|mp4|mov|m4v|mwv)$/;
export const pdfRegex = /\.(pdf)$/;

export const S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const editFileName = (req, file: Express.Multer.File, callback) => {
  //prettier-ignore
  const name = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${Date.now()}${fileExtName}`);
};

export const imageFileFilter = (req, file: Express.Multer.File, callback) => {
  if (!file.originalname.toLowerCase().match(imageRegex)) {
    return callback(new Error('Only image files are allowed!'));
  }

  callback(null, true);
};

export const toResponseFiles = (
  files: Array<Express.Multer.File>,
): Array<Express.Multer.File> => {
  const response = [];
  console.log(files);
  files.forEach((file) => {
    const fileResponse = {
      filename: file.filename,
      originalname: file.originalname,
    };
    response.push(fileResponse);
  });
  return response;
};
