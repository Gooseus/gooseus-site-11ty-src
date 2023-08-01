import {
  invoke,
  reduce,
  state,
  transition,
  immediate,
  guard,
} from "../js/robot3/machine.js";

export const reduceWithKeys = (ck, ek) =>
  reduce((ctx: any, evt: any) => {
    return {
      ...ctx,
      ...(evt.data ? evt.data : { [ck]: evt[ek] }),
      ...(evt.error ? { error: evt.error } : { error: null }),
    };
  });

export const reduceSetKeyValue = (key, value) =>
  reduce((ctx: any) => ({ ...ctx, [key]: value }));

// Standard Transitions
const onRejectStoreErrorThenGo = dst =>
  transition("error", dst, reduceWithKeys("error", "error"));
const onResolveMergeDataThenGo = dst =>
  transition("done", dst, reduceWithKeys("data", "data"));

export const doThenElse = (fn, dst, err) =>
  invoke(fn, onResolveMergeDataThenGo(dst), onRejectStoreErrorThenGo(err));

// Guards
const guardNext = next => guard((ctx: any) => ctx.next === next);
export const guardKeyZero = key => guard((ctx: any) => ctx[key] === 0);

// Switch states have an array of immediate transitions with guards on the `next` context property
export const createSwitchState = (cases: any[]) => {
  const final = cases.pop();
  const transitions = cases.map(([dst, next]) => {
    next = next ?? dst;
    return immediate(dst, guardNext(next));
  });
  const switchState = state(...[...transitions, immediate(final)]);
  return switchState;
};
