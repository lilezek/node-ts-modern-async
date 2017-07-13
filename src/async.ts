export async function wait(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

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
