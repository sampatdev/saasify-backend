export type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
