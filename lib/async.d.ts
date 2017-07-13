export declare function wait(ms: number): Promise<{}>;
export declare function nextTick(): Promise<void>;
export declare function map<T = any, V = any>(arr: T[], cb: (element: T) => Promise<V>): Promise<V[]>;
export declare function immediate(): Promise<{}>;
export declare function forEach<T = any>(iterable: ArrayLike<T>, cb: (element: T) => Promise<void>): Promise<void>;
export declare class AsyncArray<T> extends Array<T> {
    private consumers;
    consume(): Promise<T>;
    produce(v: T): number;
}
