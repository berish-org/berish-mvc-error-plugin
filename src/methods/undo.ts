import { Controller } from '@berish/mvc-core';
import { SYMBOL_ERROR_STORE } from '../const';

export function undo(controller: Controller<any>) {
  if (controller && controller[SYMBOL_ERROR_STORE]) {
    controller[SYMBOL_ERROR_STORE].error = null;
    controller[SYMBOL_ERROR_STORE].errorController = null;
  }
}
