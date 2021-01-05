import { ControllerClass } from '@berish/mvc-core';

import { SYMBOL_ERROR_NAMES } from '../const';
import { ErrorControllerProps } from '../plugin';
import { registerErrorController } from '../registrator';

export function setErrorNames(names: string[]) {
  return function <TController extends ControllerClass<ErrorControllerProps>>(controllerClass: TController) {
    controllerClass[SYMBOL_ERROR_NAMES] = names;

    registerErrorController(controllerClass);
    return controllerClass;
  };
}
