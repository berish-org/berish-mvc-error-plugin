import React from 'react';
import LINQ from '@berish/linq';
import { ControllerClass, withController } from '@berish/mvc-core';

import { ErrorControllerProps } from './plugin';

export interface PluginParams {
  getUnhandledErrorController?: () => ControllerClass<ErrorControllerProps>;
  getErrorName?: (error: any) => string;
  selectErrorController?: (
    controllers: ControllerClass<ErrorControllerProps>[],
  ) => ControllerClass<ErrorControllerProps>;
}

const defaultParams: PluginParams = {
  getUnhandledErrorController: () => withController((props) => <>{JSON.stringify(props.error)}</>),
  getErrorName: (error) => {
    if (error && 'name' in error) return error.name;
    return error;
  },
  selectErrorController: (controllers) => controllers[0],
};

export function getDefaultParams(params?: PluginParams) {
  params = params || defaultParams;
  if (params !== defaultParams) {
    LINQ.from(Object.keys(defaultParams))
      .except(Object.keys(params))
      .forEach((key: string) => {
        (params as any)[key] = (defaultParams as any)[key];
      });
  }
  return params;
}
