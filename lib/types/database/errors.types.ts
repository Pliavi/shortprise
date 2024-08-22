export const PostgresErrorCode = {
  UniqueViolation: "23505",
  NotNullViolation: "23502",
} as const;

export type PostgresErrorCode =
  (typeof PostgresErrorCode)[keyof typeof PostgresErrorCode];
