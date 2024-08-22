import { PostgresErrorCode } from "../database/errors.types";

export class RepositoryError extends Error {
  violation: PostgresErrorCode;
  constructor(message: string, violation: PostgresErrorCode) {
    super(message);
    this.violation = violation;
  }
}
