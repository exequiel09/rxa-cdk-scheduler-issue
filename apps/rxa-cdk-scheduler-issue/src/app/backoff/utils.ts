// FROM: https://github.com/alex-okrushko/backoff-rxjs/blob/5702674645b041aa9260d0e7957406c36a0aced5/src/utils.ts

/** Calculates the actual delay which can be limited by maxInterval */
export function getDelay(backoffDelay: number, maxInterval: number) {
  return Math.min(backoffDelay, maxInterval);
}

/** Exponential backoff delay */
export function exponentialBackoffDelay(
  iteration: number,
  initialInterval: number
) {
  return Math.pow(2, iteration) * initialInterval;
}
