import { ControllerClass, LifecyclePlugin } from '@berish/mvc-core';

import { getErrorControllers, upgradeComponent } from './methods';
import { SYMBOL_ERROR_STORE } from './const';
import { PluginParams, getDefaultParams } from './params';
import { ErrorRenderViewConnected } from './ErrorRenderView';
import React from 'react';
import { makeAutoObservable } from 'mobx';

export interface ErrorPlugin {
  (params: PluginParams): LifecyclePlugin;
}

export interface ErrorStore {
  errorController: ControllerClass<ErrorControllerProps>;
  error: any;
}

export interface ErrorControllerProps {
  error: any;
  undo: () => void;
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

          controllerInstance[SYMBOL_ERROR_STORE].errorController = errorController;
          controllerInstance[SYMBOL_ERROR_STORE].error = error;
        };
      },
    },
    upgradeRenderConfig: (renderConfig) => {
      const prevOnBeforeInitialize = renderConfig.onBeforeInitialize;
      const prevRenderComponent = renderConfig.renderComponent;

      renderConfig.onBeforeInitialize = (component) => {
        if (prevOnBeforeInitialize) prevOnBeforeInitialize(component);

        component.controller[SYMBOL_ERROR_STORE] = makeAutoObservable({
          error: null,
          errorController: null,
        });
        upgradeComponent(component);
      };

      renderConfig.renderComponent = (component, props) => {
        return <ErrorRenderViewConnected>{prevRenderComponent(component, props)}</ErrorRenderViewConnected>;
      };
    },
  };
};
