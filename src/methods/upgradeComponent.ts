import { LifecycleInitializeSteps, MvcComponent } from '@berish/mvc-core';

import { catchFunction } from './catchFunction';
import { getKeys } from './getKeys';

function upgradeInstance<TLifecycleInitializeSteps extends LifecycleInitializeSteps>(
  instance: TLifecycleInitializeSteps,
  ignoreMethods: (keyof TLifecycleInitializeSteps)[],
  catchError: (error: any) => void,
) {
  const instanceAny = instance as any;
  const keys = getKeys(instance)
    .ofType(Function, (m) => instanceAny[m])
    .except(ignoreMethods as string[]);
  for (const key of keys) {
    const oldFunction = instanceAny[key];
    instanceAny[key] = catchFunction(oldFunction, catchError);
  }
}

export function upgradeComponent(component: MvcComponent) {
  if (component.controller) upgradeInstance(component.controller, ['catchError'], component.controller.catchError);
  if (component.model) upgradeInstance(component.model, [], component.controller.catchError);
  if (component.view) upgradeInstance(component.view, ['render', 'forceUpdate'], component.controller.catchError);
}
