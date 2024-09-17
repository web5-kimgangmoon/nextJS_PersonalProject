import { z } from "zod";
import crypto from "crypto";

export const getTimeString = (ta: Date, option?: "cmt" | "userInfo") => {
  ta = new Date(ta);
  const now = new Date();
  const dif = now.getTime() - ta.getTime();

  if (option === "userInfo")
    return `${ta.getFullYear()}년 ${String(ta.getMonth() + 1)}월 ${String(
      ta.getDate()
    )}일에 생성됐습니다.`;
  if (dif > 604800000) {
    switch (option) {
      case undefined:
        return `${ta.getMonth() + 1}월 ${ta.getDate()}일, ${ta.getFullYear()}`;
      case "cmt":
        return `${ta.getFullYear()}-${String(ta.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(ta.getDate()).padStart(2, "0")} ${String(
          ta.getHours()
        ).padStart(2, "0")}:${String(ta.getMinutes()).padStart(2, "0")}`;
    }
    // return `${ta.getMonth() + 1}월 ${ta.getDate()}일, ${ta.getFullYear()}`;
  } else if (dif > 86400000) {
    return `${Math.ceil(dif / 86400000)}일 전`;
  } else if (dif > 3600000) {
    return `${Math.ceil(dif / 3600000)}시간 전`;
  } else {
    return `${Math.ceil(dif / 60000)}분 전`;
  }
};

export const pageGetter = ({
  count,
  target,
  limit,
}: {
  count: number;
  target: number | string;
  limit: number;
}) => {
  let current = typeof target === "string" ? +target : target;
  const page = count === 0 ? 1 : Math.ceil(count / limit);
  if (page < current || current < 0) current = page;
  if (page < 5) {
    if (page === 1)
      return {
        pages: repeatNumber(page, 1, current),
        selected: 1,
      };
    if (current === page) {
      return {
        pages: repeatNumber(page, 1, current),
        selected: current,
      };
    } else if (current === 1) {
      return {
        pages: repeatNumber(page, 1, 1),
        selected: 1,
      };
    } else
      return {
        pages: repeatNumber(page, 1, current),
        selected: current,
      };
  }
  if (page > 5) {
    if (page === current)
      return {
        pages: repeatNumber(page, page - 4, 5),
        selected: 5,
      };
    if (current === 1)
      return {
        pages: repeatNumber(5, 1, 1, true),
        selected: 1,
      };
    if (current < page - 2 && current > 2)
      if (current + 2 < page)
        return {
          pages: repeatNumber(current + 2, current - 2, 3, true),
          selected: 3,
        };
      else
        return {
          pages: repeatNumber(current + 2, current - 2, 3),
          selected: 3,
        };
    if (current > page - 3)
      return {
        pages: repeatNumber(page, page - 4, 5 - (page - current)),
        selected: 5 - (page - current),
      };
    if (current < 3)
      return {
        pages: repeatNumber(5, 1, current, true),
        selected: current,
      };
  }
};

function repeatNumber(
  end: number,
  offset: number,
  current: number,
  dots?: boolean
) {
  const arr: {
    title: string;
    page: number;
    isRight: boolean;
    isLeft: boolean;
  }[] = [];
  if (current > 1)
    arr.push({
      title: "",
      page: offset + current - 2,
      isRight: false,
      isLeft: true,
    });
  for (let i = offset; i < end + 1; i++) {
    arr.push({ title: `${i}`, page: i, isRight: false, isLeft: false });
  }
  if (dots) {
    arr.push({
      title: "•••",
      page: offset + current + 2,
      isRight: false,
      isLeft: false,
    });
  }
  if (current < 5 && current !== end) {
    arr.push({
      title: "",
      page: offset + current,
      isRight: true,
      isLeft: false,
    });
  }
  return arr;
}

export const newCopyFormData = (
  target: FormData,
  keys: string[],
  ...options: string[]
) => {
  const formData = new FormData();
  keys.concat(options);
  for (let item of keys) {
    const temp = target.get(item);
    temp && formData.set(item, temp);
  }
  return formData;
};

export const pushedFormData = (
  target: FormData,
  set: { name: string; value: string }[],
  ...options: { name: string; value: string }[]
) => {
  const newData = new FormData();
  set.concat(options);
  for (let item of set) {
    newData.set(item.name, item.value);
  }
  const img = target.get("img");
  const isDeleted = target.get("isDeleteImg");
  img && newData.set("img", img);
  isDeleted && newData.set("isDeleteImg", "true");
  return newData;
};

export const useTypeCheck_zod = () => {
  // const intCheck = z.object({
  //   target: z.coerce
  //     .number({ invalid_type_error: "Please input number" })
  //     .int({ message: "Please input integer" })
  //     .gt(0, { message: "Please correct boardNumber" }),
  // });
  const intCheck = z.coerce
    .number({ invalid_type_error: "Please input number" })
    .int({ message: "Please input integer" })
    .gt(0, { message: "Please correct boardNumber" });
  const emailCheck = z
    .string()
    .email({ message: "Please input email" })
    .min(1, { message: "Please input value" })
    .max(50, { message: "Please shorten value's length" });
  const phoneCheck = z.coerce
    .number({ invalid_type_error: "Please input number" })
    .min(1, { message: "Please input value" })
    .max(15, { message: "Please shorten value's length" })
    .int({ message: "Please input integer" });
  const nickCheck = z
    .string()
    .min(1, { message: "Please input value" })
    .min(2, { message: "Please stretch valuse's length" })
    .max(20, { message: "Please shorten value's length" })
    .regex(/^[0-9a-zㄱ-ㅎA-z가-힣]+$/, {
      message: "Please input value in only letters",
    });

  const passwordCheck = z
    .string()
    .min(1, { message: "Please input value" })
    .min(8, { message: "Please stretch value's length" })
    .max(50, { message: "Please shorten value's length" })
    .regex(/^[0-9a-zA-z!@#$%^&*+=-]+$/, {
      message:
        "Please input value in only alphabet or number or some of letters('!@#$%^&*+=-')",
    })
    .regex(/[a-zA-z]/, {
      message: "Please input value in more than one alphabet",
    })
    .regex(/[0-9]/, {
      message: "Please input value in more than one number",
    })
    .regex(/[!@#$%^&*+=-]+/, {
      message:
        "Please input value in more than one special letters('!@#$%^&*+=-')",
    });

  const stringCheck = (max: number) =>
    z
      .string()
      .min(1, { message: "Please input value" })
      .max(max, { message: "Please shorten value's length" });
  return {
    intCheck,
    emailCheck,
    phoneCheck,
    nickCheck,
    stringCheck,
    passwordCheck,
  };
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
