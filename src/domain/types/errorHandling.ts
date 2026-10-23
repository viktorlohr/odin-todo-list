export type Result<T, E = AppError> =
  { isOk: true; value: T } | { isOk: false; error: E };

export type AppError =
  | { kind: "parseError"; message: string }
  | { kind: "readError"; message: string }
  | { kind: "writeError"; message: string };

export function ok<T>(value: T): Result<T, never> {
  return { isOk: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { isOk: false, error };
}
