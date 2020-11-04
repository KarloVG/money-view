import {Observable, of, pipe, range, throwError, timer, UnaryFunction, zip} from 'rxjs';
import {map, mergeMap, retryWhen} from 'rxjs/operators';

export function backoff<T>(maxTries: number, delay: number): UnaryFunction<Observable<T>, Observable<T>> {
  return pipe(
    retryWhen(attempts => zip(range(1, maxTries + 1), attempts)
      .pipe(
        mergeMap(([i, err]) => (i > maxTries) ? throwError(err) : of(i)),
        map(i => i * i),
        mergeMap(v => timer(v * delay)),
      ),
    ),
  );
}
