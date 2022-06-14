import { catchError, EMPTY, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { retryBackoff } from './backoff-rxa';

describe('RxJS Timer (via @rx-angular/cdk)', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should throw at 1400ms', () => {
    testScheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const source$ = throwError(() => new Error('message')).pipe(
        retryBackoff({
          initialInterval: 200,
          maxRetries: 3,
          resetOnSuccess: true,
        }),

        catchError(() => EMPTY)
      );

      expectObservable(source$).toBe('1400ms |');
    });
  });
});
