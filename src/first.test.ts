import { concatMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { createTestScheduler } from './utils';

describe('rxmarbles', () => {
  it("simple", () => {
    createTestScheduler().run(({ cold, expectObservable}) => {
        const input    = "-a-b-c|";
        const expected = "-a-b-c|";

        const result = cold(input);

        expectObservable(result).toBe(expected);
    });
  });

  it("time", () => {
    createTestScheduler().run(({ cold, expectObservable}) => {
        const input    = "-a-b-c|";
        const expected = "-- 9ms a 9ms b 9ms (c|)";

        const result = cold(input).pipe(
            concatMap(d => of(d).pipe(delay(10)))
        );

        expectObservable(result).toBe(expected);
    });
  });
});
