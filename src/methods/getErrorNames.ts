import { SYMBOL_ERROR_NAMES } from "../const";
import { getErrorControllers as getAllErrorControllers } from "../registrator";

export function getErrorControllers(errorName: string) {
  const controllers = getAllErrorControllers();

  return controllers.filter(
    (m) => m[SYMBOL_ERROR_NAMES].indexOf(errorName) !== -1
  );
}
