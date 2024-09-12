import crypto from "crypto";

export const mkHash = (
  method: "sha256" | "sha512",
  value: string,
  salt: string = "소금은 좋아하세요?"
) => {
  return crypto.createHash(method).update(`${value}${salt}`).digest("hex");
};
