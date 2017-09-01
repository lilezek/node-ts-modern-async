export async function wait(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export const sleep = wait;

export async function nextTick() {
  await wait(0);
}

export async function map<T = any, V = any>(arr: T[], cb: (element: T) => Promise<V>) {
  const result: V[] = [];
  for (const el of arr) {
    result.push(await cb(el));
  }
  return result;
}

export async function immediate() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

export async function forEach<T = any>(iterable: ArrayLike<T>, cb: (element: T) => Promise<void>) {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < iterable.length; i++) {
    await cb(iterable[i]);
  }
}

// tslint:disable-next-line:interface-name
export interface ArrayMapeable<T> extends ArrayLike<T> {
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}

export async function forEachParallel<T = any>(iterable: (ArrayMapeable<T>), cb: (element: T) => Promise<void>) {
  await Promise.all(iterable.map(cb));
}

export class AsyncArray<T> extends Array<T> {

  private consumers: Array<(v: T) => {}> = [];

  public async consume() {
    return new Promise<T>((resolve) => {
      const element = this.shift();
      if (element) {
        resolve(element);
      } else {
        this.consumers.push(resolve as any);
      }
    });
  }

  public produce(v: T) {
    const consumer = this.consumers.shift();
    if (consumer) {
      consumer(v);
      return 0;
    }
    return this.push(v);
  }
}
