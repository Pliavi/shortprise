import { ZodError } from "zod";
import { StringMap } from "../types/string-types";

export const convertZodErrors = (error: ZodError): StringMap => {
  return error.issues.reduce((acc: { [key: string]: string }, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
};
