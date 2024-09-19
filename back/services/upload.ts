import multer from "multer";
import path from "path";

export const upload = (img: string) =>
  multer({
    storage: multer.diskStorage({
      destination: (_, file, callback) => {
        callback(null, path.join(__dirname, "../", "./public/temp"));
      },
    }),
  }).single(img);
