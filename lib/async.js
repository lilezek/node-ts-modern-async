"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    });
}
exports.wait = wait;
function nextTick() {
    return __awaiter(this, void 0, void 0, function* () {
        yield wait(0);
    });
}
exports.nextTick = nextTick;
function map(arr, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        for (const el of arr) {
            result.push(yield cb(el));
        }
        return result;
    });
}
exports.map = map;
function immediate() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            resolve();
        });
    });
}
exports.immediate = immediate;
function forEach(iterable, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < iterable.length; i++) {
            yield cb(iterable[i]);
        }
    });
}
exports.forEach = forEach;
class AsyncArray extends Array {
    constructor() {
        super(...arguments);
        this.consumers = [];
    }
    consume() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const element = this.shift();
                if (element) {
                    resolve(element);
                }
                else {
                    this.consumers.push(resolve);
                }
            });
        });
    }
    produce(v) {
        const consumer = this.consumers.shift();
        if (consumer) {
            consumer(v);
            return 0;
        }
        return this.push(v);
    }
}
exports.AsyncArray = AsyncArray;
//# sourceMappingURL=async.js.map