// we can't use tiny-invariant because it relies on process.env which is not available on v8

export default function invariant(
  value: boolean,
  message?: string
): asserts value;

export default function invariant<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T;

export default function invariant(value: any, message?: string) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
