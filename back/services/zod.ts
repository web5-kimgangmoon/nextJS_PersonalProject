import zod from "zod";

export const intCheck = zod.coerce.number().int();
export const stringCheck = zod.coerce.string();
export const booleanCheck = zod.enum(["true", "false"]);
