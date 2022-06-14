import { catchError, EMPTY, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { retryBackoff } from './backoff-zoneless';

describe('RxJS Timer (via rxjs-zone-less)', () => {
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
