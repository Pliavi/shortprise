import { ActionErrorCode } from "./action-error-codes";

export type SuccessActionResult<S = undefined> = S extends undefined
  ? {
      ok: true;
      data?: null;
    }
  : {
      ok: true;
      data: S;
    };

export type ErrorActionResult<E = undefined> = E extends undefined
  ? {
      ok: false;
      message: string;
      code: ActionErrorCode;
      errors?: E[];
    }
  : {
      ok: false;
      message: string;
      code: ActionErrorCode;
      errors?: null;
    };

export type ActionResult<S = undefined, E = undefined> =
  | SuccessActionResult<S>
  | ErrorActionResult<E>;
