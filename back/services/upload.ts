import multer from "multer";

export const upload = (img: string) =>
  multer({
    storage: multer.diskStorage({
      destination: (_, file, callback) => {
        callback(null, "./uploads");
      },
      filename: (_, file, callback) => {
        callback(null, `${Date.now}_${file.originalname}`);
      },
    }),
  }).single(img);
