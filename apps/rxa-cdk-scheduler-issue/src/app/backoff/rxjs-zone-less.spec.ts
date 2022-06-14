import { catchError, EMPTY, throwError } from 'rxjs';
import { RxTestScheduler } from 'rxjs-zone-less';
import { retryBackoff } from './backoff-zoneless';

describe('RxJS Timer (via rxjs-zone-less)', () => {
  let testScheduler: RxTestScheduler;

  beforeEach(() => {
    testScheduler = new RxTestScheduler((actual, expected) => {
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
