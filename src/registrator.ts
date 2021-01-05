import { ControllerClass } from '@berish/mvc-core';

import { ErrorControllerProps } from './plugin';

const controllers: ControllerClass<ErrorControllerProps>[] = [];

export function registerErrorController(controller: ControllerClass<ErrorControllerProps>) {
  if (controllers.indexOf(controller) === -1) controllers.push(controller);
}

export function getErrorControllers() {
  return controllers;
}
