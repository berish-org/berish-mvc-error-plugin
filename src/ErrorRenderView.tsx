import React, { PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import { Controller, RenderComponent } from '@berish/mvc-core';

import { undo } from './methods';
import { SYMBOL_ERROR_STORE } from './const';

function ErrorRenderView({ children }: PropsWithChildren<{}>) {
  const controller = Controller.useController();
  if (!controller) return <>{children}</>;

  const { error, errorController } = controller[SYMBOL_ERROR_STORE];

  if (error && errorController) {
    return (
      <RenderComponent controllerClass={errorController} error={error} undo={() => undo(controller)}>
        {children}
      </RenderComponent>
    );
  }

  return <>{children}</>;
}

export const ErrorRenderViewConnected = observer(ErrorRenderView);
