export function catchFunction(
  func: Function,
  onError?: (err: Error) => any
): (...args: any[]) => any {
  return function (...args: any[]) {
    try {
      const result = func(...args);
      if (result instanceof Promise) {
        return result.catch((err) => onError && onError(err));
      }
      return result;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  };
}
