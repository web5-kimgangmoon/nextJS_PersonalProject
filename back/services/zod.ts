import z from "zod";

export const intCheck = z.coerce.number().int();
export const stringCheck = z.coerce.string();
export const booleanCheck = z.enum(["true", "false"]);

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
