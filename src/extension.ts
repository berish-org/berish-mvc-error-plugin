import '@berish/mvc-core/build/component/controller';
import '@berish/mvc-core/build/provider/mvcController';

import { SYMBOL_ERROR_NAMES, SYMBOL_ERROR_STORE } from './const';
import { ErrorStore } from './plugin';

declare module '@berish/mvc-core/build/component/controller' {
  export interface Controller {
    catchError(reason: any): void;
    [SYMBOL_ERROR_STORE]: ErrorStore;
  }

  export interface ControllerClass {
    [SYMBOL_ERROR_NAMES]?: string[];
  }
}
