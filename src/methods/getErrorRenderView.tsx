import React from 'react';
import { Controller, RenderComponent } from '@berish/mvc-core';

import { SYMBOL_ERROR_STATEFUL } from '../const';

export function getErrorRenderView(controllerInstance: Controller, RenderView: React.FunctionComponent<any>) {
  const ErrorRenderView: React.FunctionComponent<{ [key: string]: any }> = (props, context) => {
    const result = <RenderView {...props} />;
    const { error, errorController } = controllerInstance[SYMBOL_ERROR_STATEFUL];

    if (error && errorController) {
      return (
        <RenderComponent controllerClass={errorController} error={error}>
          {result}
        </RenderComponent>
      );
    }

    return result;
  };
  return ErrorRenderView;
}
