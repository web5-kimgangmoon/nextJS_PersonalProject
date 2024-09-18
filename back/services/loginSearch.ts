import fs from "fs";
import path from "path";

export const loginSearch = (target: number) => {
  const files = fs.readdirSync(path.join(__dirname, "../", "/sessions"), {});
  const fileList = files.map((item) => {
    return {
      path: item,
      result: JSON.parse(
        fs
          .readFileSync(
            path.join(__dirname, "../", "/sessions", item.toString())
          )
          .toString()
      ),
    };
  });
  const result: { result: any; path: Array<string | Buffer> } = {
    result: [],
    path: [],
  };
  for (let item of fileList) {
    if (item.result.userId === target) {
      result.path.push(item.path);
      result.result.push(item.result);
    }
  }
  return result;
};
