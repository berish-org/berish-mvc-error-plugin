import { createStateful } from '@berish/stateful';
import { connect } from '@berish/stateful-react-connect';
import { ControllerClass, LifecyclePlugin } from '@berish/mvc-core';

import { getErrorControllers, getErrorRenderView, upgradeComponent } from './methods';
import { SYMBOL_ERROR_STATEFUL } from './const';
import { PluginParams, getDefaultParams } from './params';

export interface ErrorPlugin {
  (params: PluginParams): LifecyclePlugin;
}

export interface ErrorStore {
  errorController: ControllerClass<ErrorControllerProps>;
  error: any;
}

export interface ErrorControllerProps {
  error: any;
}

export const plugin: ErrorPlugin = (params) => {
  const { getUnhandledErrorController, getErrorName, selectErrorController } = getDefaultParams(params);

  const unhandledErrorController = getUnhandledErrorController();

  return {
    controller: {
      upgradeInstance: (controllerInstance) => {
        controllerInstance.catchError = (error: any) => {
          const errorName = getErrorName(error);
          const errorControllers = getErrorControllers(errorName);

          const errorController =
            errorControllers.length > 0 ? selectErrorController(errorControllers) : unhandledErrorController;

          controllerInstance[SYMBOL_ERROR_STATEFUL].errorController = errorController;
          controllerInstance[SYMBOL_ERROR_STATEFUL].error = error;
        };
      },
    },
    upgradeRenderConfig: (renderConfig) => {
      const prevOnBeforeInitialize = renderConfig.onBeforeInitialize;
      const prevConnectRenderView = renderConfig.connectRenderView;

      renderConfig.onBeforeInitialize = (component) => {
        if (prevOnBeforeInitialize) prevOnBeforeInitialize(component);

        component.controller[SYMBOL_ERROR_STATEFUL] = createStateful({
          error: null,
          errorController: null,
        });

        upgradeComponent(component);
      };

      renderConfig.connectRenderView = (component, models, renderView) => {
        return connect(
          [component.controller[SYMBOL_ERROR_STATEFUL]],
          getErrorRenderView(component.controller, prevConnectRenderView(component, models, renderView)),
        );
      };
    },
  };
};
