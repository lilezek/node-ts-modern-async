export declare function wait(ms: number): Promise<{}>;
export declare function nextTick(): Promise<void>;
export declare function map<T = any, V = any>(arr: T[], cb: (element: T) => Promise<V>): Promise<V[]>;
export declare function immediate(): Promise<{}>;
