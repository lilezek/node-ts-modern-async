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
