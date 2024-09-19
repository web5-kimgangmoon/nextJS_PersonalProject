import crypto from "crypto";

export const mkHash = (
  method: "sha256" | "sha512",
  value: string,
  salt: string = "소금은 좋아하세요?"
) => {
  return crypto.createHash(method).update(`${value}${salt}`).digest("hex");
};

export const ranHash = (
  method: "sha256" | "sha512",
  salt: string = "소금은 좋아하세요?"
) => {
  return crypto
    .createHash(method)
    .update(`${Math.floor(Math.random() * 100000)}${salt}`)
    .digest("hex");
};

export const cmtRemake = (
  text: string,
  reState?: string,
  reContent?: string,
  reImg?: string
) => {
  let img;
  let content;
  let state;
  const firstText_S = text.split(
    `<span style="color: #042552;font-size: 0.75rem;">`
  );
  if (!(firstText_S.length === 2)) return undefined;
  const secondText_S = firstText_S[1].split(`</span>`);
  console.log(secondText_S);
  if (secondText_S.length < 2) return undefined;
  state = secondText_S[0];

  const firstText_T = text.split(`<span class="cmtTextContent">`);
  if (!(firstText_T.length === 2)) return undefined;
  const secondText_T = firstText_T[1].split(`</span>`);
  if (secondText_T.length < 2) return undefined;
  content = secondText_T[0];

  const firstText_I = text.split(`<img src="`);
  if (firstText_I.length === 2) {
    const secondText_I = firstText_I[1].split(`"`);
    if (secondText_I.length < 2) return undefined;
    img = secondText_I[0];
  } else img = undefined;
  return {
    cmt:
      !img && !reImg
        ? `<div style="white-space: pre-wrap;"><div><span style="color: #042552;font-size: 0.75rem;">${
            reState ? reState : state
          }</span><span class="cmtTextContent">${
            reContent ? reContent : content
          }</span></div></div>`
        : `<div style="white-space: pre-wrap;"><div style="width: 10rem; height: 10rem;"><img src="${
            reImg ? reImg : img
          }" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;">${
            reState ? reState : state
          }</span><span class="cmtTextContent">${
            reContent ? reContent : content
          }</span></div></div>`,
    state: state,
    content: content,
    img: img,
  };
};

export const cmtMake = (content: string, state?: string, img?: string) => {
  return {
    cmt: !img
      ? `<div style="white-space: pre-wrap;"><div><span style="color: #042552;font-size: 0.75rem;">${
          state ? state : ""
        }</span><span class="cmtTextContent">${content}</span></div></div>`
      : `<div style="white-space: pre-wrap;"><div style="width: 10rem; height: 10rem;"><img src="${img}" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;">${
          state ? state : ""
        }</span><span class="cmtTextContent">${content}</span></div></div>`,
    content: content,
    img: img,
  };
};
