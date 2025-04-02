
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "initialize", () => $c1246270ee8d2f99$export$2a47f398eeff8b01);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ // Avoid circular dependency on EventEmitter by implementing a subset of the interface.
class $da7a53421655f39f$export$f42bc933f51d0006 {
    constructor(){
        this.listeners = [];
        this.unexpectedErrorHandler = function(e) {
            setTimeout(()=>{
                if (e.stack) {
                    if ($da7a53421655f39f$export$b9fbaea4dda4d664.isErrorNoTelemetry(e)) throw new $da7a53421655f39f$export$b9fbaea4dda4d664(e.message + '\n\n' + e.stack);
                    throw new Error(e.message + '\n\n' + e.stack);
                }
                throw e;
            }, 0);
        };
    }
    emit(e) {
        this.listeners.forEach((listener)=>{
            listener(e);
        });
    }
    onUnexpectedError(e) {
        this.unexpectedErrorHandler(e);
        this.emit(e);
    }
    // For external errors, we don't want the listeners to be called
    onUnexpectedExternalError(e) {
        this.unexpectedErrorHandler(e);
    }
}
const $da7a53421655f39f$export$cc3fdd528b56c4a9 = new $da7a53421655f39f$export$f42bc933f51d0006();
function $da7a53421655f39f$export$fbc590487568d5a6(e) {
    // ignore errors from cancelled promises
    if (!$da7a53421655f39f$export$2b3d06107d1323d4(e)) $da7a53421655f39f$export$cc3fdd528b56c4a9.onUnexpectedError(e);
    return undefined;
}
function $da7a53421655f39f$export$8e71ecf4b9c2f215(e) {
    // ignore errors from cancelled promises
    if (!$da7a53421655f39f$export$2b3d06107d1323d4(e)) $da7a53421655f39f$export$cc3fdd528b56c4a9.onUnexpectedExternalError(e);
    return undefined;
}
function $da7a53421655f39f$export$429f1291766e5908(error) {
    if (error instanceof Error) {
        const { name: name, message: message } = error;
        const stack = error.stacktrace || error.stack;
        return {
            $isError: true,
            name: name,
            message: message,
            stack: stack,
            noTelemetry: $da7a53421655f39f$export$b9fbaea4dda4d664.isErrorNoTelemetry(error)
        };
    }
    // return as is
    return error;
}
const $da7a53421655f39f$var$canceledName = 'Canceled';
function $da7a53421655f39f$export$2b3d06107d1323d4(error) {
    if (error instanceof $da7a53421655f39f$export$63884d8ee23c8f42) return true;
    return error instanceof Error && error.name === $da7a53421655f39f$var$canceledName && error.message === $da7a53421655f39f$var$canceledName;
}
class $da7a53421655f39f$export$63884d8ee23c8f42 extends Error {
    constructor(){
        super($da7a53421655f39f$var$canceledName);
        this.name = this.message;
    }
}
function $da7a53421655f39f$export$41711ae02262df98() {
    const error = new Error($da7a53421655f39f$var$canceledName);
    error.name = error.message;
    return error;
}
function $da7a53421655f39f$export$1c16d847beb2783(name) {
    if (name) return new Error(`Illegal argument: ${name}`);
    else return new Error('Illegal argument');
}
function $da7a53421655f39f$export$ed2e873c8c27c6f6(name) {
    if (name) return new Error(`Illegal state: ${name}`);
    else return new Error('Illegal state');
}
class $da7a53421655f39f$export$8aaa78fc27e196e7 extends Error {
    constructor(message){
        super('NotSupported');
        if (message) this.message = message;
    }
}
class $da7a53421655f39f$export$b9fbaea4dda4d664 extends Error {
    constructor(msg){
        super(msg);
        this.name = 'CodeExpectedError';
    }
    static fromError(err) {
        if (err instanceof $da7a53421655f39f$export$b9fbaea4dda4d664) return err;
        const result = new $da7a53421655f39f$export$b9fbaea4dda4d664();
        result.message = err.message;
        result.stack = err.stack;
        return result;
    }
    static isErrorNoTelemetry(err) {
        return err.name === 'CodeExpectedError';
    }
}
class $da7a53421655f39f$export$87f3d76cf9e8c81b extends Error {
    constructor(message){
        super(message || 'An unexpected bug occurred.');
        Object.setPrototypeOf(this, $da7a53421655f39f$export$87f3d76cf9e8c81b.prototype);
    // Because we know for sure only buggy code throws this,
    // we definitely want to break here and fix the bug.
    // eslint-disable-next-line no-debugger
    // debugger;
    }
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Given a function, returns a function that is only calling that function once.
 */ function $b56110d2573a94c5$export$186dce416cd8f0f(fn, fnDidRunCallback) {
    const _this = this;
    let didCall = false;
    let result;
    return function() {
        if (didCall) return result;
        didCall = true;
        if (fnDidRunCallback) try {
            result = fn.apply(_this, arguments);
        } finally{
            fnDidRunCallback();
        }
        else result = fn.apply(_this, arguments);
        return result;
    };
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var $a97ac34a660813f6$export$6936595027d5d5e8;
(function(Iterable) {
    function is(thing) {
        return thing && typeof thing === 'object' && typeof thing[Symbol.iterator] === 'function';
    }
    Iterable.is = is;
    const _empty = Object.freeze([]);
    function empty() {
        return _empty;
    }
    Iterable.empty = empty;
    function* single(element) {
        yield element;
    }
    Iterable.single = single;
    function wrap(iterableOrElement) {
        if (is(iterableOrElement)) return iterableOrElement;
        else return single(iterableOrElement);
    }
    Iterable.wrap = wrap;
    function from(iterable) {
        return iterable || _empty;
    }
    Iterable.from = from;
    function* reverse(array) {
        for(let i = array.length - 1; i >= 0; i--)yield array[i];
    }
    Iterable.reverse = reverse;
    function isEmpty(iterable) {
        return !iterable || iterable[Symbol.iterator]().next().done === true;
    }
    Iterable.isEmpty = isEmpty;
    function first(iterable) {
        return iterable[Symbol.iterator]().next().value;
    }
    Iterable.first = first;
    function some(iterable, predicate) {
        let i = 0;
        for (const element of iterable){
            if (predicate(element, i++)) return true;
        }
        return false;
    }
    Iterable.some = some;
    function find(iterable, predicate) {
        for (const element of iterable){
            if (predicate(element)) return element;
        }
        return undefined;
    }
    Iterable.find = find;
    function* filter(iterable, predicate) {
        for (const element of iterable)if (predicate(element)) yield element;
    }
    Iterable.filter = filter;
    function* map(iterable, fn) {
        let index = 0;
        for (const element of iterable)yield fn(element, index++);
    }
    Iterable.map = map;
    function* flatMap(iterable, fn) {
        let index = 0;
        for (const element of iterable)yield* fn(element, index++);
    }
    Iterable.flatMap = flatMap;
    function* concat(...iterables) {
        for (const iterable of iterables)yield* iterable;
    }
    Iterable.concat = concat;
    function reduce(iterable, reducer, initialValue) {
        let value = initialValue;
        for (const element of iterable)value = reducer(value, element);
        return value;
    }
    Iterable.reduce = reduce;
    /**
     * Returns an iterable slice of the array, with the same semantics as `array.slice()`.
     */ function* slice(arr, from, to = arr.length) {
        if (from < 0) from += arr.length;
        if (to < 0) to += arr.length;
        else if (to > arr.length) to = arr.length;
        for(; from < to; from++)yield arr[from];
    }
    Iterable.slice = slice;
    /**
     * Consumes `atMost` elements from iterable and returns the consumed elements,
     * and an iterable for the rest of the elements.
     */ function consume(iterable, atMost = Number.POSITIVE_INFINITY) {
        const consumed = [];
        if (atMost === 0) return [
            consumed,
            iterable
        ];
        const iterator = iterable[Symbol.iterator]();
        for(let i = 0; i < atMost; i++){
            const next = iterator.next();
            if (next.done) return [
                consumed,
                Iterable.empty()
            ];
            consumed.push(next.value);
        }
        return [
            consumed,
            {
                [Symbol.iterator] () {
                    return iterator;
                }
            }
        ];
    }
    Iterable.consume = consume;
    async function asyncToArray(iterable) {
        const result = [];
        for await (const item of iterable)result.push(item);
        return Promise.resolve(result);
    }
    Iterable.asyncToArray = asyncToArray;
})($a97ac34a660813f6$export$6936595027d5d5e8 || ($a97ac34a660813f6$export$6936595027d5d5e8 = {}));


// #region Disposable Tracking
/**
 * Enables logging of potentially leaked disposables.
 *
 * A disposable is considered leaked if it is not disposed or not registered as the child of
 * another disposable. This tracking is very simple an only works for classes that either
 * extend Disposable or use a DisposableStore. This means there are a lot of false positives.
 */ const $c817ee4fd79558e8$var$TRACK_DISPOSABLES = false;
let $c817ee4fd79558e8$var$disposableTracker = null;
function $c817ee4fd79558e8$export$e63c03833aa051b9(tracker) {
    $c817ee4fd79558e8$var$disposableTracker = tracker;
}
if ($c817ee4fd79558e8$var$TRACK_DISPOSABLES) {
    const __is_disposable_tracked__ = '__is_disposable_tracked__';
    $c817ee4fd79558e8$export$e63c03833aa051b9(new class {
        trackDisposable(x) {
            const stack = new Error('Potentially leaked disposable').stack;
            setTimeout(()=>{
                if (!x[__is_disposable_tracked__]) console.log(stack);
            }, 3000);
        }
        setParent(child, parent) {
            if (child && child !== $c817ee4fd79558e8$export$252720412a173de.None) try {
                child[__is_disposable_tracked__] = true;
            } catch  {
            // noop
            }
        }
        markAsDisposed(disposable) {
            if (disposable && disposable !== $c817ee4fd79558e8$export$252720412a173de.None) try {
                disposable[__is_disposable_tracked__] = true;
            } catch  {
            // noop
            }
        }
        markAsSingleton(disposable) {}
    });
}
function $c817ee4fd79558e8$export$b461124a363cc1df(x) {
    $c817ee4fd79558e8$var$disposableTracker?.trackDisposable(x);
    return x;
}
function $c817ee4fd79558e8$export$171694d5c87cc412(disposable) {
    $c817ee4fd79558e8$var$disposableTracker?.markAsDisposed(disposable);
}
function $c817ee4fd79558e8$var$setParentOfDisposable(child, parent) {
    $c817ee4fd79558e8$var$disposableTracker?.setParent(child, parent);
}
function $c817ee4fd79558e8$var$setParentOfDisposables(children, parent) {
    if (!$c817ee4fd79558e8$var$disposableTracker) return;
    for (const child of children)$c817ee4fd79558e8$var$disposableTracker.setParent(child, parent);
}
function $c817ee4fd79558e8$export$c5d42901e167ec17(singleton) {
    $c817ee4fd79558e8$var$disposableTracker?.markAsSingleton(singleton);
    return singleton;
}
function $c817ee4fd79558e8$export$e29d65b7eabdc6dd(thing) {
    return typeof thing === 'object' && thing !== null && typeof thing.dispose === 'function' && thing.dispose.length === 0;
}
function $c817ee4fd79558e8$export$fcfbbcec2cb820d5(arg) {
    if ((0, $a97ac34a660813f6$export$6936595027d5d5e8).is(arg)) {
        const errors = [];
        for (const d of arg){
            if (d) try {
                d.dispose();
            } catch (e) {
                errors.push(e);
            }
        }
        if (errors.length === 1) throw errors[0];
        else if (errors.length > 1) throw new AggregateError(errors, 'Encountered errors while disposing of store');
        return Array.isArray(arg) ? [] : arg;
    } else if (arg) {
        arg.dispose();
        return arg;
    }
}
function $c817ee4fd79558e8$export$af1265bd87a01240(...disposables) {
    const parent = $c817ee4fd79558e8$export$aef110c64ebd5f30(()=>$c817ee4fd79558e8$export$fcfbbcec2cb820d5(disposables));
    $c817ee4fd79558e8$var$setParentOfDisposables(disposables, parent);
    return parent;
}
function $c817ee4fd79558e8$export$aef110c64ebd5f30(fn) {
    const self = $c817ee4fd79558e8$export$b461124a363cc1df({
        dispose: (0, $b56110d2573a94c5$export$186dce416cd8f0f)(()=>{
            $c817ee4fd79558e8$export$171694d5c87cc412(self);
            fn();
        })
    });
    return self;
}
class $c817ee4fd79558e8$export$a4767a0b211c710a {
    static{
        this.DISABLE_DISPOSED_WARNING = false;
    }
    constructor(){
        this._toDispose = new Set();
        this._isDisposed = false;
        $c817ee4fd79558e8$export$b461124a363cc1df(this);
    }
    /**
     * Dispose of all registered disposables and mark this object as disposed.
     *
     * Any future disposables added to this object will be disposed of on `add`.
     */ dispose() {
        if (this._isDisposed) return;
        $c817ee4fd79558e8$export$171694d5c87cc412(this);
        this._isDisposed = true;
        this.clear();
    }
    /**
     * @return `true` if this object has been disposed of.
     */ get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of all registered disposables but do not mark this object as disposed.
     */ clear() {
        if (this._toDispose.size === 0) return;
        try {
            $c817ee4fd79558e8$export$fcfbbcec2cb820d5(this._toDispose);
        } finally{
            this._toDispose.clear();
        }
    }
    /**
     * Add a new {@link IDisposable disposable} to the collection.
     */ add(o) {
        if (!o) return o;
        if (o === this) throw new Error('Cannot register a disposable on itself!');
        $c817ee4fd79558e8$var$setParentOfDisposable(o, this);
        if (this._isDisposed) {
            if (!$c817ee4fd79558e8$export$a4767a0b211c710a.DISABLE_DISPOSED_WARNING) console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
        } else this._toDispose.add(o);
        return o;
    }
    /**
     * Deletes the value from the store, but does not dispose it.
     */ deleteAndLeak(o) {
        if (!o) return;
        if (this._toDispose.has(o)) {
            this._toDispose.delete(o);
            $c817ee4fd79558e8$var$setParentOfDisposable(o, null);
        }
    }
}
class $c817ee4fd79558e8$export$252720412a173de {
    /**
     * A disposable that does nothing when it is disposed of.
     *
     * TODO: This should not be a static property.
     */ static{
        this.None = Object.freeze({
            dispose () {}
        });
    }
    constructor(){
        this._store = new $c817ee4fd79558e8$export$a4767a0b211c710a();
        $c817ee4fd79558e8$export$b461124a363cc1df(this);
        $c817ee4fd79558e8$var$setParentOfDisposable(this._store, this);
    }
    dispose() {
        $c817ee4fd79558e8$export$171694d5c87cc412(this);
        this._store.dispose();
    }
    /**
     * Adds `o` to the collection of disposables managed by this object.
     */ _register(o) {
        if (o === this) throw new Error('Cannot register a disposable on itself!');
        return this._store.add(o);
    }
}
class $c817ee4fd79558e8$export$14deb141aeb0dbde {
    constructor(){
        this._isDisposed = false;
        $c817ee4fd79558e8$export$b461124a363cc1df(this);
    }
    get value() {
        return this._isDisposed ? undefined : this._value;
    }
    set value(value) {
        if (this._isDisposed || value === this._value) return;
        this._value?.dispose();
        if (value) $c817ee4fd79558e8$var$setParentOfDisposable(value, this);
        this._value = value;
    }
    /**
     * Resets the stored value and disposed of the previously stored value.
     */ clear() {
        this.value = undefined;
    }
    dispose() {
        this._isDisposed = true;
        $c817ee4fd79558e8$export$171694d5c87cc412(this);
        this._value?.dispose();
        this._value = undefined;
    }
}
class $c817ee4fd79558e8$export$c4d368cf7eca5195 {
    constructor(_disposable){
        this._disposable = _disposable;
        this._counter = 1;
    }
    acquire() {
        this._counter++;
        return this;
    }
    release() {
        if (--this._counter === 0) this._disposable.dispose();
        return this;
    }
}
class $c817ee4fd79558e8$export$e74423228a7ead67 {
    constructor(object){
        this.object = object;
    }
    dispose() {}
}
class $c817ee4fd79558e8$export$12d855cd4b4af66 {
    constructor(){
        this._store = new Map();
        this._isDisposed = false;
        $c817ee4fd79558e8$export$b461124a363cc1df(this);
    }
    /**
     * Disposes of all stored values and mark this object as disposed.
     *
     * Trying to use this object after it has been disposed of is an error.
     */ dispose() {
        $c817ee4fd79558e8$export$171694d5c87cc412(this);
        this._isDisposed = true;
        this.clearAndDisposeAll();
    }
    /**
     * Disposes of all stored values and clear the map, but DO NOT mark this object as disposed.
     */ clearAndDisposeAll() {
        if (!this._store.size) return;
        try {
            $c817ee4fd79558e8$export$fcfbbcec2cb820d5(this._store.values());
        } finally{
            this._store.clear();
        }
    }
    get(key) {
        return this._store.get(key);
    }
    set(key, value, skipDisposeOnOverwrite = false) {
        if (this._isDisposed) console.warn(new Error('Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!').stack);
        if (!skipDisposeOnOverwrite) this._store.get(key)?.dispose();
        this._store.set(key, value);
    }
    /**
     * Delete the value stored for `key` from this map and also dispose of it.
     */ deleteAndDispose(key) {
        this._store.get(key)?.dispose();
        this._store.delete(key);
    }
    [Symbol.iterator]() {
        return this._store[Symbol.iterator]();
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $c3771893894cd9dc$var$Node {
    static{
        this.Undefined = new $c3771893894cd9dc$var$Node(undefined);
    }
    constructor(element){
        this.element = element;
        this.next = $c3771893894cd9dc$var$Node.Undefined;
        this.prev = $c3771893894cd9dc$var$Node.Undefined;
    }
}
class $c3771893894cd9dc$export$f0ef28713f767754 {
    constructor(){
        this._first = $c3771893894cd9dc$var$Node.Undefined;
        this._last = $c3771893894cd9dc$var$Node.Undefined;
        this._size = 0;
    }
    get size() {
        return this._size;
    }
    isEmpty() {
        return this._first === $c3771893894cd9dc$var$Node.Undefined;
    }
    clear() {
        let node = this._first;
        while(node !== $c3771893894cd9dc$var$Node.Undefined){
            const next = node.next;
            node.prev = $c3771893894cd9dc$var$Node.Undefined;
            node.next = $c3771893894cd9dc$var$Node.Undefined;
            node = next;
        }
        this._first = $c3771893894cd9dc$var$Node.Undefined;
        this._last = $c3771893894cd9dc$var$Node.Undefined;
        this._size = 0;
    }
    unshift(element) {
        return this._insert(element, false);
    }
    push(element) {
        return this._insert(element, true);
    }
    _insert(element, atTheEnd) {
        const newNode = new $c3771893894cd9dc$var$Node(element);
        if (this._first === $c3771893894cd9dc$var$Node.Undefined) {
            this._first = newNode;
            this._last = newNode;
        } else if (atTheEnd) {
            // push
            const oldLast = this._last;
            this._last = newNode;
            newNode.prev = oldLast;
            oldLast.next = newNode;
        } else {
            // unshift
            const oldFirst = this._first;
            this._first = newNode;
            newNode.next = oldFirst;
            oldFirst.prev = newNode;
        }
        this._size += 1;
        let didRemove = false;
        return ()=>{
            if (!didRemove) {
                didRemove = true;
                this._remove(newNode);
            }
        };
    }
    shift() {
        if (this._first === $c3771893894cd9dc$var$Node.Undefined) return undefined;
        else {
            const res = this._first.element;
            this._remove(this._first);
            return res;
        }
    }
    pop() {
        if (this._last === $c3771893894cd9dc$var$Node.Undefined) return undefined;
        else {
            const res = this._last.element;
            this._remove(this._last);
            return res;
        }
    }
    _remove(node) {
        if (node.prev !== $c3771893894cd9dc$var$Node.Undefined && node.next !== $c3771893894cd9dc$var$Node.Undefined) {
            // middle
            const anchor = node.prev;
            anchor.next = node.next;
            node.next.prev = anchor;
        } else if (node.prev === $c3771893894cd9dc$var$Node.Undefined && node.next === $c3771893894cd9dc$var$Node.Undefined) {
            // only node
            this._first = $c3771893894cd9dc$var$Node.Undefined;
            this._last = $c3771893894cd9dc$var$Node.Undefined;
        } else if (node.next === $c3771893894cd9dc$var$Node.Undefined) {
            // last
            this._last = this._last.prev;
            this._last.next = $c3771893894cd9dc$var$Node.Undefined;
        } else if (node.prev === $c3771893894cd9dc$var$Node.Undefined) {
            // first
            this._first = this._first.next;
            this._first.prev = $c3771893894cd9dc$var$Node.Undefined;
        }
        // done
        this._size -= 1;
    }
    *[Symbol.iterator]() {
        let node = this._first;
        while(node !== $c3771893894cd9dc$var$Node.Undefined){
            yield node.element;
            node = node.next;
        }
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const $d288f1fc58ade510$var$hasPerformanceNow = globalThis.performance && typeof globalThis.performance.now === 'function';
class $d288f1fc58ade510$export$81ce11201617bceb {
    static create(highResolution) {
        return new $d288f1fc58ade510$export$81ce11201617bceb(highResolution);
    }
    constructor(highResolution){
        this._now = $d288f1fc58ade510$var$hasPerformanceNow && highResolution === false ? Date.now : globalThis.performance.now.bind(globalThis.performance);
        this._startTime = this._now();
        this._stopTime = -1;
    }
    stop() {
        this._stopTime = this._now();
    }
    reset() {
        this._startTime = this._now();
        this._stopTime = -1;
    }
    elapsed() {
        if (this._stopTime !== -1) return this._stopTime - this._startTime;
        return this._now() - this._startTime;
    }
}


// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever a listener is GC'ed without having been disposed. This is a LEAK.
// -----------------------------------------------------------------------------------------------------------------------
const $d7b8088681a716ec$var$_enableListenerGCedWarning = false;
// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever an emitter with listeners is disposed. That is a sign of code smell.
// -----------------------------------------------------------------------------------------------------------------------
const $d7b8088681a716ec$var$_enableDisposeWithListenerWarning = false;
// -----------------------------------------------------------------------------------------------------------------------
// Uncomment the next line to print warnings whenever a snapshotted event is used repeatedly without cleanup.
// See https://github.com/microsoft/vscode/issues/142851
// -----------------------------------------------------------------------------------------------------------------------
const $d7b8088681a716ec$var$_enableSnapshotPotentialLeakWarning = false;
var $d7b8088681a716ec$export$d61e24a684f9e51;
(function(Event) {
    Event.None = ()=>(0, $c817ee4fd79558e8$export$252720412a173de).None;
    function _addLeakageTraceLogic(options) {
        if ($d7b8088681a716ec$var$_enableSnapshotPotentialLeakWarning) {
            const { onDidAddListener: origListenerDidAdd } = options;
            const stack = $d7b8088681a716ec$var$Stacktrace.create();
            let count = 0;
            options.onDidAddListener = ()=>{
                if (++count === 2) {
                    console.warn('snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here');
                    stack.print();
                }
                origListenerDidAdd?.();
            };
        }
    }
    /**
     * Given an event, returns another event which debounces calls and defers the listeners to a later task via a shared
     * `setTimeout`. The event is converted into a signal (`Event<void>`) to avoid additional object creation as a
     * result of merging events and to try prevent race conditions that could arise when using related deferred and
     * non-deferred events.
     *
     * This is useful for deferring non-critical work (eg. general UI updates) to ensure it does not block critical work
     * (eg. latency of keypress to text rendered).
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @param event The event source for the new event.
     * @param disposable A disposable store to add the new EventEmitter to.
     */ function defer(event, disposable) {
        return debounce(event, ()=>void 0, 0, undefined, true, undefined, disposable);
    }
    Event.defer = defer;
    /**
     * Given an event, returns another event which only fires once.
     *
     * @param event The event source for the new event.
     */ function once(event) {
        return (listener, thisArgs = null, disposables)=>{
            // we need this, in case the event fires during the listener call
            let didFire = false;
            let result = undefined;
            result = event((e)=>{
                if (didFire) return;
                else if (result) result.dispose();
                else didFire = true;
                return listener.call(thisArgs, e);
            }, null, disposables);
            if (didFire) result.dispose();
            return result;
        };
    }
    Event.once = once;
    /**
     * Given an event, returns another event which only fires once, and only when the condition is met.
     *
     * @param event The event source for the new event.
     */ function onceIf(event, condition) {
        return Event.once(Event.filter(event, condition));
    }
    Event.onceIf = onceIf;
    /**
     * Maps an event of one type into an event of another type using a mapping function, similar to how
     * `Array.prototype.map` works.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @param event The event source for the new event.
     * @param map The mapping function.
     * @param disposable A disposable store to add the new EventEmitter to.
     */ function map(event, map, disposable) {
        return snapshot((listener, thisArgs = null, disposables)=>event((i)=>listener.call(thisArgs, map(i)), null, disposables), disposable);
    }
    Event.map = map;
    /**
     * Wraps an event in another event that performs some function on the event object before firing.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @param event The event source for the new event.
     * @param each The function to perform on the event object.
     * @param disposable A disposable store to add the new EventEmitter to.
     */ function forEach(event, each, disposable) {
        return snapshot((listener, thisArgs = null, disposables)=>event((i)=>{
                each(i);
                listener.call(thisArgs, i);
            }, null, disposables), disposable);
    }
    Event.forEach = forEach;
    function filter(event, filter, disposable) {
        return snapshot((listener, thisArgs = null, disposables)=>event((e)=>filter(e) && listener.call(thisArgs, e), null, disposables), disposable);
    }
    Event.filter = filter;
    /**
     * Given an event, returns the same event but typed as `Event<void>`.
     */ function signal(event) {
        return event;
    }
    Event.signal = signal;
    function any(...events) {
        return (listener, thisArgs = null, disposables)=>{
            const disposable = (0, $c817ee4fd79558e8$export$af1265bd87a01240)(...events.map((event)=>event((e)=>listener.call(thisArgs, e))));
            return addAndReturnDisposable(disposable, disposables);
        };
    }
    Event.any = any;
    /**
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     */ function reduce(event, merge, initial, disposable) {
        let output = initial;
        return map(event, (e)=>{
            output = merge(output, e);
            return output;
        }, disposable);
    }
    Event.reduce = reduce;
    function snapshot(event, disposable) {
        let listener;
        const options = {
            onWillAddFirstListener () {
                listener = event(emitter.fire, emitter);
            },
            onDidRemoveLastListener () {
                listener?.dispose();
            }
        };
        if (!disposable) _addLeakageTraceLogic(options);
        const emitter = new $d7b8088681a716ec$export$4293555f241ae35a(options);
        disposable?.add(emitter);
        return emitter.event;
    }
    /**
     * Adds the IDisposable to the store if it's set, and returns it. Useful to
     * Event function implementation.
     */ function addAndReturnDisposable(d, store) {
        if (store instanceof Array) store.push(d);
        else if (store) store.add(d);
        return d;
    }
    function debounce(event, merge, delay = 100, leading = false, flushOnListenerRemove = false, leakWarningThreshold, disposable) {
        let subscription;
        let output = undefined;
        let handle = undefined;
        let numDebouncedCalls = 0;
        let doFire;
        const options = {
            leakWarningThreshold: leakWarningThreshold,
            onWillAddFirstListener () {
                subscription = event((cur)=>{
                    numDebouncedCalls++;
                    output = merge(output, cur);
                    if (leading && !handle) {
                        emitter.fire(output);
                        output = undefined;
                    }
                    doFire = ()=>{
                        const _output = output;
                        output = undefined;
                        handle = undefined;
                        if (!leading || numDebouncedCalls > 1) emitter.fire(_output);
                        numDebouncedCalls = 0;
                    };
                    if (typeof delay === 'number') {
                        clearTimeout(handle);
                        handle = setTimeout(doFire, delay);
                    } else if (handle === undefined) {
                        handle = 0;
                        queueMicrotask(doFire);
                    }
                });
            },
            onWillRemoveListener () {
                if (flushOnListenerRemove && numDebouncedCalls > 0) doFire?.();
            },
            onDidRemoveLastListener () {
                doFire = undefined;
                subscription.dispose();
            }
        };
        if (!disposable) _addLeakageTraceLogic(options);
        const emitter = new $d7b8088681a716ec$export$4293555f241ae35a(options);
        disposable?.add(emitter);
        return emitter.event;
    }
    Event.debounce = debounce;
    /**
     * Debounces an event, firing after some delay (default=0) with an array of all event original objects.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     */ function accumulate(event, delay = 0, disposable) {
        return Event.debounce(event, (last, e)=>{
            if (!last) return [
                e
            ];
            last.push(e);
            return last;
        }, delay, undefined, true, undefined, disposable);
    }
    Event.accumulate = accumulate;
    /**
     * Filters an event such that some condition is _not_ met more than once in a row, effectively ensuring duplicate
     * event objects from different sources do not fire the same event object.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @param event The event source for the new event.
     * @param equals The equality condition.
     * @param disposable A disposable store to add the new EventEmitter to.
     *
     * @example
     * ```
     * // Fire only one time when a single window is opened or focused
     * Event.latch(Event.any(onDidOpenWindow, onDidFocusWindow))
     * ```
     */ function latch(event, equals = (a, b)=>a === b, disposable) {
        let firstCall = true;
        let cache;
        return filter(event, (value)=>{
            const shouldEmit = firstCall || !equals(value, cache);
            firstCall = false;
            cache = value;
            return shouldEmit;
        }, disposable);
    }
    Event.latch = latch;
    /**
     * Splits an event whose parameter is a union type into 2 separate events for each type in the union.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @example
     * ```
     * const event = new EventEmitter<number | undefined>().event;
     * const [numberEvent, undefinedEvent] = Event.split(event, isUndefined);
     * ```
     *
     * @param event The event source for the new event.
     * @param isT A function that determines what event is of the first type.
     * @param disposable A disposable store to add the new EventEmitter to.
     */ function split(event, isT, disposable) {
        return [
            Event.filter(event, isT, disposable),
            Event.filter(event, (e)=>!isT(e), disposable)
        ];
    }
    Event.split = split;
    /**
     * Buffers an event until it has a listener attached.
     *
     * *NOTE* that this function returns an `Event` and it MUST be called with a `DisposableStore` whenever the returned
     * event is accessible to "third parties", e.g the event is a public property. Otherwise a leaked listener on the
     * returned event causes this utility to leak a listener on the original event.
     *
     * @param event The event source for the new event.
     * @param flushAfterTimeout Determines whether to flush the buffer after a timeout immediately or after a
     * `setTimeout` when the first event listener is added.
     * @param _buffer Internal: A source event array used for tests.
     *
     * @example
     * ```
     * // Start accumulating events, when the first listener is attached, flush
     * // the event after a timeout such that multiple listeners attached before
     * // the timeout would receive the event
     * this.onInstallExtension = Event.buffer(service.onInstallExtension, true);
     * ```
     */ function buffer(event, flushAfterTimeout = false, _buffer = [], disposable) {
        let buffer1 = _buffer.slice();
        let listener = event((e)=>{
            if (buffer1) buffer1.push(e);
            else emitter.fire(e);
        });
        if (disposable) disposable.add(listener);
        const flush = ()=>{
            buffer1?.forEach((e)=>emitter.fire(e));
            buffer1 = null;
        };
        const emitter = new $d7b8088681a716ec$export$4293555f241ae35a({
            onWillAddFirstListener () {
                if (!listener) {
                    listener = event((e)=>emitter.fire(e));
                    if (disposable) disposable.add(listener);
                }
            },
            onDidAddFirstListener () {
                if (buffer1) {
                    if (flushAfterTimeout) setTimeout(flush);
                    else flush();
                }
            },
            onDidRemoveLastListener () {
                if (listener) listener.dispose();
                listener = null;
            }
        });
        if (disposable) disposable.add(emitter);
        return emitter.event;
    }
    Event.buffer = buffer;
    /**
     * Wraps the event in an {@link IChainableEvent}, allowing a more functional programming style.
     *
     * @example
     * ```
     * // Normal
     * const onEnterPressNormal = Event.filter(
     *   Event.map(onKeyPress.event, e => new StandardKeyboardEvent(e)),
     *   e.keyCode === KeyCode.Enter
     * ).event;
     *
     * // Using chain
     * const onEnterPressChain = Event.chain(onKeyPress.event, $ => $
     *   .map(e => new StandardKeyboardEvent(e))
     *   .filter(e => e.keyCode === KeyCode.Enter)
     * );
     * ```
     */ function chain(event, sythensize) {
        const fn = (listener, thisArgs, disposables)=>{
            const cs = sythensize(new ChainableSynthesis());
            return event(function(value) {
                const result = cs.evaluate(value);
                if (result !== HaltChainable) listener.call(thisArgs, result);
            }, undefined, disposables);
        };
        return fn;
    }
    Event.chain = chain;
    const HaltChainable = Symbol('HaltChainable');
    class ChainableSynthesis {
        constructor(){
            this.steps = [];
        }
        map(fn) {
            this.steps.push(fn);
            return this;
        }
        forEach(fn) {
            this.steps.push((v)=>{
                fn(v);
                return v;
            });
            return this;
        }
        filter(fn) {
            this.steps.push((v)=>fn(v) ? v : HaltChainable);
            return this;
        }
        reduce(merge, initial) {
            let last = initial;
            this.steps.push((v)=>{
                last = merge(last, v);
                return last;
            });
            return this;
        }
        latch(equals = (a, b)=>a === b) {
            let firstCall = true;
            let cache;
            this.steps.push((value)=>{
                const shouldEmit = firstCall || !equals(value, cache);
                firstCall = false;
                cache = value;
                return shouldEmit ? value : HaltChainable;
            });
            return this;
        }
        evaluate(value) {
            for (const step of this.steps){
                value = step(value);
                if (value === HaltChainable) break;
            }
            return value;
        }
    }
    /**
     * Creates an {@link Event} from a node event emitter.
     */ function fromNodeEventEmitter(emitter, eventName, map = (id)=>id) {
        const fn = (...args)=>result.fire(map(...args));
        const onFirstListenerAdd = ()=>emitter.on(eventName, fn);
        const onLastListenerRemove = ()=>emitter.removeListener(eventName, fn);
        const result = new $d7b8088681a716ec$export$4293555f241ae35a({
            onWillAddFirstListener: onFirstListenerAdd,
            onDidRemoveLastListener: onLastListenerRemove
        });
        return result.event;
    }
    Event.fromNodeEventEmitter = fromNodeEventEmitter;
    /**
     * Creates an {@link Event} from a DOM event emitter.
     */ function fromDOMEventEmitter(emitter, eventName, map = (id)=>id) {
        const fn = (...args)=>result.fire(map(...args));
        const onFirstListenerAdd = ()=>emitter.addEventListener(eventName, fn);
        const onLastListenerRemove = ()=>emitter.removeEventListener(eventName, fn);
        const result = new $d7b8088681a716ec$export$4293555f241ae35a({
            onWillAddFirstListener: onFirstListenerAdd,
            onDidRemoveLastListener: onLastListenerRemove
        });
        return result.event;
    }
    Event.fromDOMEventEmitter = fromDOMEventEmitter;
    /**
     * Creates a promise out of an event, using the {@link Event.once} helper.
     */ function toPromise(event) {
        return new Promise((resolve)=>once(event)(resolve));
    }
    Event.toPromise = toPromise;
    /**
     * Creates an event out of a promise that fires once when the promise is
     * resolved with the result of the promise or `undefined`.
     */ function fromPromise(promise) {
        const result = new $d7b8088681a716ec$export$4293555f241ae35a();
        promise.then((res)=>{
            result.fire(res);
        }, ()=>{
            result.fire(undefined);
        }).finally(()=>{
            result.dispose();
        });
        return result.event;
    }
    Event.fromPromise = fromPromise;
    /**
     * A convenience function for forwarding an event to another emitter which
     * improves readability.
     *
     * This is similar to {@link Relay} but allows instantiating and forwarding
     * on a single line and also allows for multiple source events.
     * @param from The event to forward.
     * @param to The emitter to forward the event to.
     * @example
     * Event.forward(event, emitter);
     * // equivalent to
     * event(e => emitter.fire(e));
     * // equivalent to
     * event(emitter.fire, emitter);
     */ function forward(from, to) {
        return from((e)=>to.fire(e));
    }
    Event.forward = forward;
    function runAndSubscribe(event, handler, initial) {
        handler(initial);
        return event((e)=>handler(e));
    }
    Event.runAndSubscribe = runAndSubscribe;
    class EmitterObserver {
        constructor(_observable, store){
            this._observable = _observable;
            this._counter = 0;
            this._hasChanged = false;
            const options = {
                onWillAddFirstListener: ()=>{
                    _observable.addObserver(this);
                    // Communicate to the observable that we received its current value and would like to be notified about future changes.
                    this._observable.reportChanges();
                },
                onDidRemoveLastListener: ()=>{
                    _observable.removeObserver(this);
                }
            };
            if (!store) _addLeakageTraceLogic(options);
            this.emitter = new $d7b8088681a716ec$export$4293555f241ae35a(options);
            if (store) store.add(this.emitter);
        }
        beginUpdate(_observable) {
            // assert(_observable === this.obs);
            this._counter++;
        }
        handlePossibleChange(_observable) {
        // assert(_observable === this.obs);
        }
        handleChange(_observable, _change) {
            // assert(_observable === this.obs);
            this._hasChanged = true;
        }
        endUpdate(_observable) {
            // assert(_observable === this.obs);
            this._counter--;
            if (this._counter === 0) {
                this._observable.reportChanges();
                if (this._hasChanged) {
                    this._hasChanged = false;
                    this.emitter.fire(this._observable.get());
                }
            }
        }
    }
    /**
     * Creates an event emitter that is fired when the observable changes.
     * Each listeners subscribes to the emitter.
     */ function fromObservable(obs, store) {
        const observer = new EmitterObserver(obs, store);
        return observer.emitter.event;
    }
    Event.fromObservable = fromObservable;
    /**
     * Each listener is attached to the observable directly.
     */ function fromObservableLight(observable) {
        return (listener, thisArgs, disposables)=>{
            let count = 0;
            let didChange = false;
            const observer = {
                beginUpdate () {
                    count++;
                },
                endUpdate () {
                    count--;
                    if (count === 0) {
                        observable.reportChanges();
                        if (didChange) {
                            didChange = false;
                            listener.call(thisArgs);
                        }
                    }
                },
                handlePossibleChange () {
                // noop
                },
                handleChange () {
                    didChange = true;
                }
            };
            observable.addObserver(observer);
            observable.reportChanges();
            const disposable = {
                dispose () {
                    observable.removeObserver(observer);
                }
            };
            if (disposables instanceof (0, $c817ee4fd79558e8$export$a4767a0b211c710a)) disposables.add(disposable);
            else if (Array.isArray(disposables)) disposables.push(disposable);
            return disposable;
        };
    }
    Event.fromObservableLight = fromObservableLight;
})($d7b8088681a716ec$export$d61e24a684f9e51 || ($d7b8088681a716ec$export$d61e24a684f9e51 = {}));
class $d7b8088681a716ec$export$e8da86104b2aebe9 {
    static{
        this.all = new Set();
    }
    static{
        this._idPool = 0;
    }
    constructor(name){
        this.listenerCount = 0;
        this.invocationCount = 0;
        this.elapsedOverall = 0;
        this.durations = [];
        this.name = `${name}_${$d7b8088681a716ec$export$e8da86104b2aebe9._idPool++}`;
        $d7b8088681a716ec$export$e8da86104b2aebe9.all.add(this);
    }
    start(listenerCount) {
        this._stopWatch = new (0, $d288f1fc58ade510$export$81ce11201617bceb)();
        this.listenerCount = listenerCount;
    }
    stop() {
        if (this._stopWatch) {
            const elapsed = this._stopWatch.elapsed();
            this.durations.push(elapsed);
            this.elapsedOverall += elapsed;
            this.invocationCount += 1;
            this._stopWatch = undefined;
        }
    }
}
let $d7b8088681a716ec$var$_globalLeakWarningThreshold = -1;
class $d7b8088681a716ec$var$LeakageMonitor {
    static{
        this._idPool = 1;
    }
    constructor(_errorHandler, threshold, name = ($d7b8088681a716ec$var$LeakageMonitor._idPool++).toString(16).padStart(3, '0')){
        this._errorHandler = _errorHandler;
        this.threshold = threshold;
        this.name = name;
        this._warnCountdown = 0;
    }
    dispose() {
        this._stacks?.clear();
    }
    check(stack, listenerCount) {
        const threshold = this.threshold;
        if (threshold <= 0 || listenerCount < threshold) return undefined;
        if (!this._stacks) this._stacks = new Map();
        const count = this._stacks.get(stack.value) || 0;
        this._stacks.set(stack.value, count + 1);
        this._warnCountdown -= 1;
        if (this._warnCountdown <= 0) {
            // only warn on first exceed and then every time the limit
            // is exceeded by 50% again
            this._warnCountdown = threshold * 0.5;
            const [topStack, topCount] = this.getMostFrequentStack();
            const message = `[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`;
            console.warn(message);
            console.warn(topStack);
            const error = new $d7b8088681a716ec$export$1ec03c0819a82711(message, topStack);
            this._errorHandler(error);
        }
        return ()=>{
            const count = this._stacks.get(stack.value) || 0;
            this._stacks.set(stack.value, count - 1);
        };
    }
    getMostFrequentStack() {
        if (!this._stacks) return undefined;
        let topStack;
        let topCount = 0;
        for (const [stack, count] of this._stacks)if (!topStack || topCount < count) {
            topStack = [
                stack,
                count
            ];
            topCount = count;
        }
        return topStack;
    }
}
class $d7b8088681a716ec$var$Stacktrace {
    static create() {
        const err = new Error();
        return new $d7b8088681a716ec$var$Stacktrace(err.stack ?? '');
    }
    constructor(value){
        this.value = value;
    }
    print() {
        console.warn(this.value.split('\n').slice(2).join('\n'));
    }
}
class $d7b8088681a716ec$export$1ec03c0819a82711 extends Error {
    constructor(message, stack){
        super(message);
        this.name = 'ListenerLeakError';
        this.stack = stack;
    }
}
class $d7b8088681a716ec$export$4b8738701e9a4cbb extends Error {
    constructor(message, stack){
        super(message);
        this.name = 'ListenerRefusalError';
        this.stack = stack;
    }
}
class $d7b8088681a716ec$var$UniqueContainer {
    constructor(value){
        this.value = value;
    }
}
const $d7b8088681a716ec$var$compactionThreshold = 2;
const $d7b8088681a716ec$var$forEachListener = (listeners, fn)=>{
    if (listeners instanceof $d7b8088681a716ec$var$UniqueContainer) fn(listeners);
    else for(let i = 0; i < listeners.length; i++){
        const l = listeners[i];
        if (l) fn(l);
    }
};
let $d7b8088681a716ec$var$_listenerFinalizers;
if ($d7b8088681a716ec$var$_enableListenerGCedWarning) {
    const leaks = [];
    setInterval(()=>{
        if (leaks.length === 0) return;
        console.warn('[LEAKING LISTENERS] GC\'ed these listeners that were NOT yet disposed:');
        console.warn(leaks.join('\n'));
        leaks.length = 0;
    }, 3000);
    $d7b8088681a716ec$var$_listenerFinalizers = new FinalizationRegistry((heldValue)=>{
        if (typeof heldValue === 'string') leaks.push(heldValue);
    });
}
class $d7b8088681a716ec$export$4293555f241ae35a {
    constructor(options){
        this._size = 0;
        this._options = options;
        this._leakageMon = $d7b8088681a716ec$var$_globalLeakWarningThreshold > 0 || this._options?.leakWarningThreshold ? new $d7b8088681a716ec$var$LeakageMonitor(options?.onListenerError ?? (0, $da7a53421655f39f$export$fbc590487568d5a6), this._options?.leakWarningThreshold ?? $d7b8088681a716ec$var$_globalLeakWarningThreshold) : undefined;
        this._perfMon = this._options?._profName ? new $d7b8088681a716ec$export$e8da86104b2aebe9(this._options._profName) : undefined;
        this._deliveryQueue = this._options?.deliveryQueue;
    }
    dispose() {
        if (!this._disposed) {
            this._disposed = true;
            // It is bad to have listeners at the time of disposing an emitter, it is worst to have listeners keep the emitter
            // alive via the reference that's embedded in their disposables. Therefore we loop over all remaining listeners and
            // unset their subscriptions/disposables. Looping and blaming remaining listeners is done on next tick because the
            // the following programming pattern is very popular:
            //
            // const someModel = this._disposables.add(new ModelObject()); // (1) create and register model
            // this._disposables.add(someModel.onDidChange(() => { ... }); // (2) subscribe and register model-event listener
            // ...later...
            // this._disposables.dispose(); disposes (1) then (2): don't warn after (1) but after the "overall dispose" is done
            if (this._deliveryQueue?.current === this) this._deliveryQueue.reset();
            if (this._listeners) {
                if ($d7b8088681a716ec$var$_enableDisposeWithListenerWarning) {
                    const listeners = this._listeners;
                    queueMicrotask(()=>{
                        $d7b8088681a716ec$var$forEachListener(listeners, (l)=>l.stack?.print());
                    });
                }
                this._listeners = undefined;
                this._size = 0;
            }
            this._options?.onDidRemoveLastListener?.();
            this._leakageMon?.dispose();
        }
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */ get event() {
        this._event ??= (callback, thisArgs, disposables)=>{
            if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
                const message = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
                console.warn(message);
                const tuple = this._leakageMon.getMostFrequentStack() ?? [
                    'UNKNOWN stack',
                    -1
                ];
                const error = new $d7b8088681a716ec$export$4b8738701e9a4cbb(`${message}. HINT: Stack shows most frequent listener (${tuple[1]}-times)`, tuple[0]);
                const errorHandler = this._options?.onListenerError || (0, $da7a53421655f39f$export$fbc590487568d5a6);
                errorHandler(error);
                return (0, $c817ee4fd79558e8$export$252720412a173de).None;
            }
            if (this._disposed) // todo: should we warn if a listener is added to a disposed emitter? This happens often
            return (0, $c817ee4fd79558e8$export$252720412a173de).None;
            if (thisArgs) callback = callback.bind(thisArgs);
            const contained = new $d7b8088681a716ec$var$UniqueContainer(callback);
            let removeMonitor;
            let stack;
            if (this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2)) {
                // check and record this emitter for potential leakage
                contained.stack = $d7b8088681a716ec$var$Stacktrace.create();
                removeMonitor = this._leakageMon.check(contained.stack, this._size + 1);
            }
            if ($d7b8088681a716ec$var$_enableDisposeWithListenerWarning) contained.stack = stack ?? $d7b8088681a716ec$var$Stacktrace.create();
            if (!this._listeners) {
                this._options?.onWillAddFirstListener?.(this);
                this._listeners = contained;
                this._options?.onDidAddFirstListener?.(this);
            } else if (this._listeners instanceof $d7b8088681a716ec$var$UniqueContainer) {
                this._deliveryQueue ??= new $d7b8088681a716ec$var$EventDeliveryQueuePrivate();
                this._listeners = [
                    this._listeners,
                    contained
                ];
            } else this._listeners.push(contained);
            this._size++;
            const result = (0, $c817ee4fd79558e8$export$aef110c64ebd5f30)(()=>{
                $d7b8088681a716ec$var$_listenerFinalizers?.unregister(result);
                removeMonitor?.();
                this._removeListener(contained);
            });
            if (disposables instanceof (0, $c817ee4fd79558e8$export$a4767a0b211c710a)) disposables.add(result);
            else if (Array.isArray(disposables)) disposables.push(result);
            if ($d7b8088681a716ec$var$_listenerFinalizers) {
                const stack = new Error().stack.split('\n').slice(2, 3).join('\n').trim();
                const match = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(stack);
                $d7b8088681a716ec$var$_listenerFinalizers.register(result, match?.[2] ?? stack, result);
            }
            return result;
        };
        return this._event;
    }
    _removeListener(listener) {
        this._options?.onWillRemoveListener?.(this);
        if (!this._listeners) return; // expected if a listener gets disposed
        if (this._size === 1) {
            this._listeners = undefined;
            this._options?.onDidRemoveLastListener?.(this);
            this._size = 0;
            return;
        }
        // size > 1 which requires that listeners be a list:
        const listeners = this._listeners;
        const index = listeners.indexOf(listener);
        if (index === -1) {
            console.log('disposed?', this._disposed);
            console.log('size?', this._size);
            console.log('arr?', JSON.stringify(this._listeners));
            throw new Error('Attempted to dispose unknown listener');
        }
        this._size--;
        listeners[index] = undefined;
        const adjustDeliveryQueue = this._deliveryQueue.current === this;
        if (this._size * $d7b8088681a716ec$var$compactionThreshold <= listeners.length) {
            let n = 0;
            for(let i = 0; i < listeners.length; i++){
                if (listeners[i]) listeners[n++] = listeners[i];
                else if (adjustDeliveryQueue) {
                    this._deliveryQueue.end--;
                    if (n < this._deliveryQueue.i) this._deliveryQueue.i--;
                }
            }
            listeners.length = n;
        }
    }
    _deliver(listener, value) {
        if (!listener) return;
        const errorHandler = this._options?.onListenerError || (0, $da7a53421655f39f$export$fbc590487568d5a6);
        if (!errorHandler) {
            listener.value(value);
            return;
        }
        try {
            listener.value(value);
        } catch (e) {
            errorHandler(e);
        }
    }
    /** Delivers items in the queue. Assumes the queue is ready to go. */ _deliverQueue(dq) {
        const listeners = dq.current._listeners;
        while(dq.i < dq.end)// important: dq.i is incremented before calling deliver() because it might reenter deliverQueue()
        this._deliver(listeners[dq.i++], dq.value);
        dq.reset();
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */ fire(event) {
        if (this._deliveryQueue?.current) {
            this._deliverQueue(this._deliveryQueue);
            this._perfMon?.stop(); // last fire() will have starting perfmon, stop it before starting the next dispatch
        }
        this._perfMon?.start(this._size);
        if (!this._listeners) ;
        else if (this._listeners instanceof $d7b8088681a716ec$var$UniqueContainer) this._deliver(this._listeners, event);
        else {
            const dq = this._deliveryQueue;
            dq.enqueue(this, event, this._listeners.length);
            this._deliverQueue(dq);
        }
        this._perfMon?.stop();
    }
    hasListeners() {
        return this._size > 0;
    }
}
const $d7b8088681a716ec$export$606c94061cc1de73 = ()=>new $d7b8088681a716ec$var$EventDeliveryQueuePrivate();
class $d7b8088681a716ec$var$EventDeliveryQueuePrivate {
    constructor(){
        /**
         * Index in current's listener list.
         */ this.i = -1;
        /**
         * The last index in the listener's list to deliver.
         */ this.end = 0;
    }
    enqueue(emitter, value, end) {
        this.i = 0;
        this.end = end;
        this.current = emitter;
        this.value = value;
    }
    reset() {
        this.i = this.end; // force any current emission loop to stop, mainly for during dispose
        this.current = undefined;
        this.value = undefined;
    }
}
class $d7b8088681a716ec$export$50cc72e0613c49b7 extends $d7b8088681a716ec$export$4293555f241ae35a {
    constructor(options){
        super(options);
        this._isPaused = 0;
        this._eventQueue = new (0, $c3771893894cd9dc$export$f0ef28713f767754)();
        this._mergeFn = options?.merge;
    }
    pause() {
        this._isPaused++;
    }
    resume() {
        if (this._isPaused !== 0 && --this._isPaused === 0) {
            if (this._mergeFn) // use the merge function to create a single composite
            // event. make a copy in case firing pauses this emitter
            {
                if (this._eventQueue.size > 0) {
                    const events = Array.from(this._eventQueue);
                    this._eventQueue.clear();
                    super.fire(this._mergeFn(events));
                }
            } else // no merging, fire each event individually and test
            // that this emitter isn't paused halfway through
            while(!this._isPaused && this._eventQueue.size !== 0)super.fire(this._eventQueue.shift());
        }
    }
    fire(event) {
        if (this._size) {
            if (this._isPaused !== 0) this._eventQueue.push(event);
            else super.fire(event);
        }
    }
}
class $d7b8088681a716ec$export$7a454984aadf3ed8 extends $d7b8088681a716ec$export$50cc72e0613c49b7 {
    constructor(options){
        super(options);
        this._delay = options.delay ?? 100;
    }
    fire(event) {
        if (!this._handle) {
            this.pause();
            this._handle = setTimeout(()=>{
                this._handle = undefined;
                this.resume();
            }, this._delay);
        }
        super.fire(event);
    }
}
class $d7b8088681a716ec$export$cedc6c2eda77714b extends $d7b8088681a716ec$export$4293555f241ae35a {
    constructor(options){
        super(options);
        this._queuedEvents = [];
        this._mergeFn = options?.merge;
    }
    fire(event) {
        if (!this.hasListeners()) return;
        this._queuedEvents.push(event);
        if (this._queuedEvents.length === 1) queueMicrotask(()=>{
            if (this._mergeFn) super.fire(this._mergeFn(this._queuedEvents));
            else this._queuedEvents.forEach((e)=>super.fire(e));
            this._queuedEvents = [];
        });
    }
}
class $d7b8088681a716ec$export$d9adc7829ac32435 {
    constructor(){
        this.hasListeners = false;
        this.events = [];
        this.emitter = new $d7b8088681a716ec$export$4293555f241ae35a({
            onWillAddFirstListener: ()=>this.onFirstListenerAdd(),
            onDidRemoveLastListener: ()=>this.onLastListenerRemove()
        });
    }
    get event() {
        return this.emitter.event;
    }
    add(event) {
        const e = {
            event: event,
            listener: null
        };
        this.events.push(e);
        if (this.hasListeners) this.hook(e);
        const dispose = ()=>{
            if (this.hasListeners) this.unhook(e);
            const idx = this.events.indexOf(e);
            this.events.splice(idx, 1);
        };
        return (0, $c817ee4fd79558e8$export$aef110c64ebd5f30)((0, $b56110d2573a94c5$export$186dce416cd8f0f)(dispose));
    }
    onFirstListenerAdd() {
        this.hasListeners = true;
        this.events.forEach((e)=>this.hook(e));
    }
    onLastListenerRemove() {
        this.hasListeners = false;
        this.events.forEach((e)=>this.unhook(e));
    }
    hook(e) {
        e.listener = e.event((r)=>this.emitter.fire(r));
    }
    unhook(e) {
        e.listener?.dispose();
        e.listener = null;
    }
    dispose() {
        this.emitter.dispose();
        for (const e of this.events)e.listener?.dispose();
        this.events = [];
    }
}
class $d7b8088681a716ec$export$a838b8d6428a60a1 {
    constructor(){
        this.data = [];
    }
    wrapEvent(event, reduce, initial) {
        return (listener, thisArgs, disposables)=>{
            return event((i)=>{
                const data = this.data[this.data.length - 1];
                // Non-reduce scenario
                if (!reduce) {
                    // Buffering case
                    if (data) data.buffers.push(()=>listener.call(thisArgs, i));
                    else // Not buffering case
                    listener.call(thisArgs, i);
                    return;
                }
                // Reduce scenario
                const reduceData = data;
                // Not buffering case
                if (!reduceData) {
                    // TODO: Is there a way to cache this reduce call for all listeners?
                    listener.call(thisArgs, reduce(initial, i));
                    return;
                }
                // Buffering case
                reduceData.items ??= [];
                reduceData.items.push(i);
                if (reduceData.buffers.length === 0) // Include a single buffered function that will reduce all events when we're done buffering events
                data.buffers.push(()=>{
                    // cache the reduced result so that the value can be shared across all listeners
                    reduceData.reducedResult ??= initial ? reduceData.items.reduce(reduce, initial) : reduceData.items.reduce(reduce);
                    listener.call(thisArgs, reduceData.reducedResult);
                });
            }, undefined, disposables);
        };
    }
    bufferEvents(fn) {
        const data = {
            buffers: new Array()
        };
        this.data.push(data);
        const r = fn();
        this.data.pop();
        data.buffers.forEach((flush)=>flush());
        return r;
    }
}
class $d7b8088681a716ec$export$325be0d991c73dc2 {
    constructor(){
        this.listening = false;
        this.inputEvent = $d7b8088681a716ec$export$d61e24a684f9e51.None;
        this.inputEventListener = (0, $c817ee4fd79558e8$export$252720412a173de).None;
        this.emitter = new $d7b8088681a716ec$export$4293555f241ae35a({
            onDidAddFirstListener: ()=>{
                this.listening = true;
                this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
            },
            onDidRemoveLastListener: ()=>{
                this.listening = false;
                this.inputEventListener.dispose();
            }
        });
        this.event = this.emitter.event;
    }
    set input(event) {
        this.inputEvent = event;
        if (this.listening) {
            this.inputEventListener.dispose();
            this.inputEventListener = event(this.emitter.fire, this.emitter);
        }
    }
    dispose() {
        this.inputEventListener.dispose();
        this.emitter.dispose();
    }
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ // eslint-disable-next-line local/code-import-patterns
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*
 * This module exists so that the AMD build of the monaco editor can replace this with an async loader plugin.
 * If you add new functions to this module make sure that they are also provided in the AMD build of the monaco editor.
 */ function $d3f124df8b6c5790$export$6279135baf0834b2() {
    return globalThis._VSCODE_NLS_MESSAGES;
}
function $d3f124df8b6c5790$export$d68d1ffac09ed7e1() {
    return globalThis._VSCODE_NLS_LANGUAGE;
}


const $83cfef769dcbd0a2$var$isPseudo = (0, $d3f124df8b6c5790$export$d68d1ffac09ed7e1)() === 'pseudo' || typeof document !== 'undefined' && document.location && document.location.hash.indexOf('pseudo=true') >= 0;
function $83cfef769dcbd0a2$var$_format(message, args) {
    let result;
    if (args.length === 0) result = message;
    else result = message.replace(/\{(\d+)\}/g, (match, rest)=>{
        const index = rest[0];
        const arg = args[index];
        let result = match;
        if (typeof arg === 'string') result = arg;
        else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === void 0 || arg === null) result = String(arg);
        return result;
    });
    if ($83cfef769dcbd0a2$var$isPseudo) // FF3B and FF3D is the Unicode zenkaku representation for [ and ]
    result = '\uFF3B' + result.replace(/[aouei]/g, '$&$&') + '\uFF3D';
    return result;
}
function $83cfef769dcbd0a2$export$b3bd0bc58e36cd63(data /* | number when built */ , message /* | null when built */ , ...args) {
    if (typeof data === 'number') return $83cfef769dcbd0a2$var$_format($83cfef769dcbd0a2$var$lookupMessage(data, message), args);
    return $83cfef769dcbd0a2$var$_format(message, args);
}
/**
 * Only used when built: Looks up the message in the global NLS table.
 * This table is being made available as a global through bootstrapping
 * depending on the target context.
 */ function $83cfef769dcbd0a2$var$lookupMessage(index, fallback) {
    const message = (0, $d3f124df8b6c5790$export$6279135baf0834b2)()?.[index];
    if (typeof message !== 'string') {
        if (typeof fallback === 'string') return fallback;
        throw new Error(`!!! NLS MISSING: ${index} !!!`);
    }
    return message;
}
function $83cfef769dcbd0a2$export$a900c3148b2b9068(data /* | number when built */ , originalMessage, ...args) {
    let message;
    if (typeof data === 'number') message = $83cfef769dcbd0a2$var$lookupMessage(data, originalMessage);
    else message = originalMessage;
    const value = $83cfef769dcbd0a2$var$_format(message, args);
    return {
        value: value,
        original: originalMessage === message ? value : $83cfef769dcbd0a2$var$_format(originalMessage, args)
    };
}


var $46c1ba077691f8ff$exports = {};
"use strict";


const $9e1677203ec6aef4$export$965070396d8ca009 = 'en';
let $9e1677203ec6aef4$var$_isWindows = false;
let $9e1677203ec6aef4$var$_isMacintosh = false;
let $9e1677203ec6aef4$var$_isLinux = false;
let $9e1677203ec6aef4$var$_isLinuxSnap = false;
let $9e1677203ec6aef4$var$_isNative = false;
let $9e1677203ec6aef4$var$_isWeb = false;
let $9e1677203ec6aef4$var$_isElectron = false;
let $9e1677203ec6aef4$var$_isIOS = false;
let $9e1677203ec6aef4$var$_isCI = false;
let $9e1677203ec6aef4$var$_isMobile = false;
let $9e1677203ec6aef4$var$_locale = undefined;
let $9e1677203ec6aef4$var$_language = $9e1677203ec6aef4$export$965070396d8ca009;
let $9e1677203ec6aef4$var$_platformLocale = $9e1677203ec6aef4$export$965070396d8ca009;
let $9e1677203ec6aef4$var$_translationsConfigFile = undefined;
let $9e1677203ec6aef4$var$_userAgent = undefined;
const $9e1677203ec6aef4$var$$globalThis = globalThis;
let $9e1677203ec6aef4$var$nodeProcess = undefined;
if (typeof $9e1677203ec6aef4$var$$globalThis.vscode !== 'undefined' && typeof $9e1677203ec6aef4$var$$globalThis.vscode.process !== 'undefined') // Native environment (sandboxed)
$9e1677203ec6aef4$var$nodeProcess = $9e1677203ec6aef4$var$$globalThis.vscode.process;
else if (typeof $46c1ba077691f8ff$exports !== 'undefined' && typeof $46c1ba077691f8ff$exports?.versions?.node === 'string') // Native environment (non-sandboxed)
$9e1677203ec6aef4$var$nodeProcess = $46c1ba077691f8ff$exports;
const $9e1677203ec6aef4$var$isElectronProcess = typeof $9e1677203ec6aef4$var$nodeProcess?.versions?.electron === 'string';
const $9e1677203ec6aef4$var$isElectronRenderer = $9e1677203ec6aef4$var$isElectronProcess && $9e1677203ec6aef4$var$nodeProcess?.type === 'renderer';
// Native environment
if (typeof $9e1677203ec6aef4$var$nodeProcess === 'object') {
    $9e1677203ec6aef4$var$_isWindows = $9e1677203ec6aef4$var$nodeProcess.platform === 'win32';
    $9e1677203ec6aef4$var$_isMacintosh = $9e1677203ec6aef4$var$nodeProcess.platform === 'darwin';
    $9e1677203ec6aef4$var$_isLinux = $9e1677203ec6aef4$var$nodeProcess.platform === 'linux';
    $9e1677203ec6aef4$var$_isLinuxSnap = $9e1677203ec6aef4$var$_isLinux && !!$9e1677203ec6aef4$var$nodeProcess.env['SNAP'] && !!$9e1677203ec6aef4$var$nodeProcess.env['SNAP_REVISION'];
    $9e1677203ec6aef4$var$_isElectron = $9e1677203ec6aef4$var$isElectronProcess;
    $9e1677203ec6aef4$var$_isCI = !!$9e1677203ec6aef4$var$nodeProcess.env['CI'] || !!$9e1677203ec6aef4$var$nodeProcess.env['BUILD_ARTIFACTSTAGINGDIRECTORY'];
    $9e1677203ec6aef4$var$_locale = $9e1677203ec6aef4$export$965070396d8ca009;
    $9e1677203ec6aef4$var$_language = $9e1677203ec6aef4$export$965070396d8ca009;
    const rawNlsConfig = $9e1677203ec6aef4$var$nodeProcess.env['VSCODE_NLS_CONFIG'];
    if (rawNlsConfig) try {
        const nlsConfig = JSON.parse(rawNlsConfig);
        $9e1677203ec6aef4$var$_locale = nlsConfig.userLocale;
        $9e1677203ec6aef4$var$_platformLocale = nlsConfig.osLocale;
        $9e1677203ec6aef4$var$_language = nlsConfig.resolvedLanguage || $9e1677203ec6aef4$export$965070396d8ca009;
        $9e1677203ec6aef4$var$_translationsConfigFile = nlsConfig.languagePack?.translationsConfigFile;
    } catch (e) {}
    $9e1677203ec6aef4$var$_isNative = true;
} else if (typeof navigator === 'object' && !$9e1677203ec6aef4$var$isElectronRenderer) {
    $9e1677203ec6aef4$var$_userAgent = navigator.userAgent;
    $9e1677203ec6aef4$var$_isWindows = $9e1677203ec6aef4$var$_userAgent.indexOf('Windows') >= 0;
    $9e1677203ec6aef4$var$_isMacintosh = $9e1677203ec6aef4$var$_userAgent.indexOf('Macintosh') >= 0;
    $9e1677203ec6aef4$var$_isIOS = ($9e1677203ec6aef4$var$_userAgent.indexOf('Macintosh') >= 0 || $9e1677203ec6aef4$var$_userAgent.indexOf('iPad') >= 0 || $9e1677203ec6aef4$var$_userAgent.indexOf('iPhone') >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
    $9e1677203ec6aef4$var$_isLinux = $9e1677203ec6aef4$var$_userAgent.indexOf('Linux') >= 0;
    $9e1677203ec6aef4$var$_isMobile = $9e1677203ec6aef4$var$_userAgent?.indexOf('Mobi') >= 0;
    $9e1677203ec6aef4$var$_isWeb = true;
    $9e1677203ec6aef4$var$_language = $d3f124df8b6c5790$export$d68d1ffac09ed7e1() || $9e1677203ec6aef4$export$965070396d8ca009;
    $9e1677203ec6aef4$var$_locale = navigator.language.toLowerCase();
    $9e1677203ec6aef4$var$_platformLocale = $9e1677203ec6aef4$var$_locale;
} else console.error('Unable to resolve platform.');
let $9e1677203ec6aef4$var$_platform = 0 /* Platform.Web */ ;
if ($9e1677203ec6aef4$var$_isMacintosh) $9e1677203ec6aef4$var$_platform = 1 /* Platform.Mac */ ;
else if ($9e1677203ec6aef4$var$_isWindows) $9e1677203ec6aef4$var$_platform = 3 /* Platform.Windows */ ;
else if ($9e1677203ec6aef4$var$_isLinux) $9e1677203ec6aef4$var$_platform = 2 /* Platform.Linux */ ;
const $9e1677203ec6aef4$export$f993c945890e93ba = $9e1677203ec6aef4$var$_isWindows;
const $9e1677203ec6aef4$export$94df8cd5b2bf5797 = $9e1677203ec6aef4$var$_isMacintosh;
const $9e1677203ec6aef4$export$a10d59b01729022b = $9e1677203ec6aef4$var$_isLinux;
const $9e1677203ec6aef4$export$43ab85c863381e0 = $9e1677203ec6aef4$var$_isNative;
const $9e1677203ec6aef4$export$60fea7e8d59d4bc0 = $9e1677203ec6aef4$var$_isWeb;
const $9e1677203ec6aef4$export$97b87b8868ff7a3c = $9e1677203ec6aef4$var$_isWeb && typeof $9e1677203ec6aef4$var$$globalThis.importScripts === 'function';
const $9e1677203ec6aef4$export$d01de2ac8155a88e = $9e1677203ec6aef4$export$97b87b8868ff7a3c ? $9e1677203ec6aef4$var$$globalThis.origin : undefined;
const $9e1677203ec6aef4$export$fedb369cb70207f1 = $9e1677203ec6aef4$var$_isIOS;
const $9e1677203ec6aef4$export$d0a8044dce8ff2fc = $9e1677203ec6aef4$var$_isMobile;
const $9e1677203ec6aef4$export$3dcce53a3755dc8c = $9e1677203ec6aef4$var$_userAgent;
const $9e1677203ec6aef4$export$789c912f57fe164c = $9e1677203ec6aef4$var$_language;
const $9e1677203ec6aef4$export$baa58354bd438196 = typeof $9e1677203ec6aef4$var$$globalThis.postMessage === 'function' && !$9e1677203ec6aef4$var$$globalThis.importScripts;
const $9e1677203ec6aef4$export$64a561ae64a9738c = (()=>{
    if ($9e1677203ec6aef4$export$baa58354bd438196) {
        const pending = [];
        $9e1677203ec6aef4$var$$globalThis.addEventListener('message', (e)=>{
            if (e.data && e.data.vscodeScheduleAsyncWork) for(let i = 0, len = pending.length; i < len; i++){
                const candidate = pending[i];
                if (candidate.id === e.data.vscodeScheduleAsyncWork) {
                    pending.splice(i, 1);
                    candidate.callback();
                    return;
                }
            }
        });
        let lastId = 0;
        return (callback)=>{
            const myId = ++lastId;
            pending.push({
                id: myId,
                callback: callback
            });
            $9e1677203ec6aef4$var$$globalThis.postMessage({
                vscodeScheduleAsyncWork: myId
            }, '*');
        };
    }
    return (callback)=>setTimeout(callback);
})();
const $9e1677203ec6aef4$export$decc4a6e69bbf763 = $9e1677203ec6aef4$var$_isMacintosh || $9e1677203ec6aef4$var$_isIOS ? 2 /* OperatingSystem.Macintosh */  : $9e1677203ec6aef4$var$_isWindows ? 1 /* OperatingSystem.Windows */  : 3 /* OperatingSystem.Linux */ ;
let $9e1677203ec6aef4$var$_isLittleEndian = true;
let $9e1677203ec6aef4$var$_isLittleEndianComputed = false;
function $9e1677203ec6aef4$export$50a7e2d9fa5ce460() {
    if (!$9e1677203ec6aef4$var$_isLittleEndianComputed) {
        $9e1677203ec6aef4$var$_isLittleEndianComputed = true;
        const test = new Uint8Array(2);
        test[0] = 1;
        test[1] = 2;
        const view = new Uint16Array(test.buffer);
        $9e1677203ec6aef4$var$_isLittleEndian = view[0] === 513;
    }
    return $9e1677203ec6aef4$var$_isLittleEndian;
}
const $9e1677203ec6aef4$export$6446a186d09e379e = !!($9e1677203ec6aef4$export$3dcce53a3755dc8c && $9e1677203ec6aef4$export$3dcce53a3755dc8c.indexOf('Chrome') >= 0);
const $9e1677203ec6aef4$export$b7d78993b74f766d = !!($9e1677203ec6aef4$export$3dcce53a3755dc8c && $9e1677203ec6aef4$export$3dcce53a3755dc8c.indexOf('Firefox') >= 0);
const $9e1677203ec6aef4$export$95df08bae54cb4df = !!(!$9e1677203ec6aef4$export$6446a186d09e379e && $9e1677203ec6aef4$export$3dcce53a3755dc8c && $9e1677203ec6aef4$export$3dcce53a3755dc8c.indexOf('Safari') >= 0);
const $9e1677203ec6aef4$export$cac3980734d91fbe = !!($9e1677203ec6aef4$export$3dcce53a3755dc8c && $9e1677203ec6aef4$export$3dcce53a3755dc8c.indexOf('Edg/') >= 0);
const $9e1677203ec6aef4$export$a11b0059900ceec8 = !!($9e1677203ec6aef4$export$3dcce53a3755dc8c && $9e1677203ec6aef4$export$3dcce53a3755dc8c.indexOf('Android') >= 0);


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function $cf0af188a02c1cfc$export$f0954fd7d5368655(t) {
    return t;
}
class $cf0af188a02c1cfc$export$f9b79ca6baca2f60 {
    constructor(arg1, arg2){
        this.lastCache = undefined;
        this.lastArgKey = undefined;
        if (typeof arg1 === 'function') {
            this._fn = arg1;
            this._computeKey = $cf0af188a02c1cfc$export$f0954fd7d5368655;
        } else {
            this._fn = arg2;
            this._computeKey = arg1.getCacheKey;
        }
    }
    get(arg) {
        const key = this._computeKey(arg);
        if (this.lastArgKey !== key) {
            this.lastArgKey = key;
            this.lastCache = this._fn(arg);
        }
        return this.lastCache;
    }
}
class $cf0af188a02c1cfc$export$390abf32e31fa0d9 {
    get cachedValues() {
        return this._map;
    }
    constructor(arg1, arg2){
        this._map = new Map();
        this._map2 = new Map();
        if (typeof arg1 === 'function') {
            this._fn = arg1;
            this._computeKey = $cf0af188a02c1cfc$export$f0954fd7d5368655;
        } else {
            this._fn = arg2;
            this._computeKey = arg1.getCacheKey;
        }
    }
    get(arg) {
        const key = this._computeKey(arg);
        if (this._map2.has(key)) return this._map2.get(key);
        const value = this._fn(arg);
        this._map.set(arg, value);
        this._map2.set(key, value);
        return value;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $dcb28a5594492bc0$export$b624eff549462981 {
    constructor(executor){
        this.executor = executor;
        this._didRun = false;
    }
    /**
     * Get the wrapped value.
     *
     * This will force evaluation of the lazy value if it has not been resolved yet. Lazy values are only
     * resolved once. `getValue` will re-throw exceptions that are hit while resolving the value
     */ get value() {
        if (!this._didRun) try {
            this._value = this.executor();
        } catch (err) {
            this._error = err;
        } finally{
            this._didRun = true;
        }
        if (this._error) throw this._error;
        return this._value;
    }
    /**
     * Get the wrapped value without forcing evaluation.
     */ get rawValue() {
        return this._value;
    }
}


function $88789e6252368c20$export$3d28549060624a1(str) {
    if (!str || typeof str !== 'string') return true;
    return str.trim().length === 0;
}
const $88789e6252368c20$var$_formatRegexp = /{(\d+)}/g;
function $88789e6252368c20$export$d9468344d3651243(value, ...args) {
    if (args.length === 0) return value;
    return value.replace($88789e6252368c20$var$_formatRegexp, function(match, group) {
        const idx = parseInt(group, 10);
        return isNaN(idx) || idx < 0 || idx >= args.length ? match : args[idx];
    });
}
function $88789e6252368c20$export$79489bcf04b43e01(value) {
    return value.replace(/[<>"'&]/g, (ch)=>{
        switch(ch){
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '\'':
                return '&apos;';
            case '&':
                return '&amp;';
        }
        return ch;
    });
}
function $88789e6252368c20$export$4e7f196112fea3c5(html) {
    return html.replace(/[<>&]/g, function(match) {
        switch(match){
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            default:
                return match;
        }
    });
}
function $88789e6252368c20$export$a218487c9626e4be(value) {
    return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
}
function $88789e6252368c20$export$87c2784dc9fc4ab(haystack, needle = ' ') {
    const trimmed = $88789e6252368c20$export$c6a55a9d77585122(haystack, needle);
    return $88789e6252368c20$export$770c7916125832a9(trimmed, needle);
}
function $88789e6252368c20$export$c6a55a9d77585122(haystack, needle) {
    if (!haystack || !needle) return haystack;
    const needleLen = needle.length;
    if (needleLen === 0 || haystack.length === 0) return haystack;
    let offset = 0;
    while(haystack.indexOf(needle, offset) === offset)offset = offset + needleLen;
    return haystack.substring(offset);
}
function $88789e6252368c20$export$770c7916125832a9(haystack, needle) {
    if (!haystack || !needle) return haystack;
    const needleLen = needle.length, haystackLen = haystack.length;
    if (needleLen === 0 || haystackLen === 0) return haystack;
    let offset = haystackLen, idx = -1;
    while(true){
        idx = haystack.lastIndexOf(needle, offset - 1);
        if (idx === -1 || idx + needleLen !== offset) break;
        if (idx === 0) return '';
        offset = idx;
    }
    return haystack.substring(0, offset);
}
function $88789e6252368c20$export$4d4f3e97266c6260(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}
function $88789e6252368c20$export$f5631fc88493a1ce(pattern) {
    return pattern.replace(/\*/g, '');
}
function $88789e6252368c20$export$d898a7a1ede8c92(searchString, isRegex, options = {}) {
    if (!searchString) throw new Error('Cannot create regex from empty string');
    if (!isRegex) searchString = $88789e6252368c20$export$a218487c9626e4be(searchString);
    if (options.wholeWord) {
        if (!/\B/.test(searchString.charAt(0))) searchString = '\\b' + searchString;
        if (!/\B/.test(searchString.charAt(searchString.length - 1))) searchString = searchString + '\\b';
    }
    let modifiers = '';
    if (options.global) modifiers += 'g';
    if (!options.matchCase) modifiers += 'i';
    if (options.multiline) modifiers += 'm';
    if (options.unicode) modifiers += 'u';
    return new RegExp(searchString, modifiers);
}
function $88789e6252368c20$export$ca9e38314a5f106d(regexp) {
    // Exit early if it's one of these special cases which are meant to match
    // against an empty string
    if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') return false;
    // We check against an empty string. If the regular expression doesn't advance
    // (e.g. ends in an endless loop) it will match an empty string.
    const match = regexp.exec('');
    return !!(match && regexp.lastIndex === 0);
}
function $88789e6252368c20$export$88c07fe39db9eaa1(str) {
    return str.split(/\r\n|\r|\n/);
}
function $88789e6252368c20$export$54bf544603444b5f(str) {
    const linesWithSeparators = [];
    const splitLinesAndSeparators = str.split(/(\r\n|\r|\n)/);
    for(let i = 0; i < Math.ceil(splitLinesAndSeparators.length / 2); i++)linesWithSeparators.push(splitLinesAndSeparators[2 * i] + (splitLinesAndSeparators[2 * i + 1] ?? ''));
    return linesWithSeparators;
}
function $88789e6252368c20$export$fa2e414c5029cd1e(str) {
    for(let i = 0, len = str.length; i < len; i++){
        const chCode = str.charCodeAt(i);
        if (chCode !== 32 /* CharCode.Space */  && chCode !== 9 /* CharCode.Tab */ ) return i;
    }
    return -1;
}
function $88789e6252368c20$export$ffd279a1548eb30f(str, start = 0, end = str.length) {
    for(let i = start; i < end; i++){
        const chCode = str.charCodeAt(i);
        if (chCode !== 32 /* CharCode.Space */  && chCode !== 9 /* CharCode.Tab */ ) return str.substring(start, i);
    }
    return str.substring(start, end);
}
function $88789e6252368c20$export$fc26fd43ab190642(str, startIndex = str.length - 1) {
    for(let i = startIndex; i >= 0; i--){
        const chCode = str.charCodeAt(i);
        if (chCode !== 32 /* CharCode.Space */  && chCode !== 9 /* CharCode.Tab */ ) return i;
    }
    return -1;
}
function $88789e6252368c20$export$398604a469f7de9a(a, b) {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
}
function $88789e6252368c20$export$5b3fd1648d8efcd6(a, b, aStart = 0, aEnd = a.length, bStart = 0, bEnd = b.length) {
    for(; aStart < aEnd && bStart < bEnd; aStart++, bStart++){
        const codeA = a.charCodeAt(aStart);
        const codeB = b.charCodeAt(bStart);
        if (codeA < codeB) return -1;
        else if (codeA > codeB) return 1;
    }
    const aLen = aEnd - aStart;
    const bLen = bEnd - bStart;
    if (aLen < bLen) return -1;
    else if (aLen > bLen) return 1;
    return 0;
}
function $88789e6252368c20$export$d8dd5bf0f45452aa(a, b) {
    return $88789e6252368c20$export$9785f45aba684615(a, b, 0, a.length, 0, b.length);
}
function $88789e6252368c20$export$9785f45aba684615(a, b, aStart = 0, aEnd = a.length, bStart = 0, bEnd = b.length) {
    for(; aStart < aEnd && bStart < bEnd; aStart++, bStart++){
        let codeA = a.charCodeAt(aStart);
        let codeB = b.charCodeAt(bStart);
        if (codeA === codeB) continue;
        if (codeA >= 128 || codeB >= 128) // not ASCII letters -> fallback to lower-casing strings
        return $88789e6252368c20$export$5b3fd1648d8efcd6(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
        // mapper lower-case ascii letter onto upper-case varinats
        // [97-122] (lower ascii) --> [65-90] (upper ascii)
        if ($88789e6252368c20$export$70b9b1e8732527d4(codeA)) codeA -= 32;
        if ($88789e6252368c20$export$70b9b1e8732527d4(codeB)) codeB -= 32;
        // compare both code points
        const diff = codeA - codeB;
        if (diff === 0) continue;
        return diff;
    }
    const aLen = aEnd - aStart;
    const bLen = bEnd - bStart;
    if (aLen < bLen) return -1;
    else if (aLen > bLen) return 1;
    return 0;
}
function $88789e6252368c20$export$4b80675cefe20f84(code) {
    return code >= 48 /* CharCode.Digit0 */  && code <= 57 /* CharCode.Digit9 */ ;
}
function $88789e6252368c20$export$70b9b1e8732527d4(code) {
    return code >= 97 /* CharCode.a */  && code <= 122 /* CharCode.z */ ;
}
function $88789e6252368c20$export$30bfb1359626e305(code) {
    return code >= 65 /* CharCode.A */  && code <= 90 /* CharCode.Z */ ;
}
function $88789e6252368c20$export$d9ffdbc590df6d8a(a, b) {
    return a.length === b.length && $88789e6252368c20$export$9785f45aba684615(a, b) === 0;
}
function $88789e6252368c20$export$22a6b7ef892ce92c(str, candidate) {
    const candidateLength = candidate.length;
    if (candidate.length > str.length) return false;
    return $88789e6252368c20$export$9785f45aba684615(str, candidate, 0, candidateLength) === 0;
}
function $88789e6252368c20$export$d8e92260a7910561(a, b) {
    const len = Math.min(a.length, b.length);
    let i;
    for(i = 0; i < len; i++){
        if (a.charCodeAt(i) !== b.charCodeAt(i)) return i;
    }
    return len;
}
function $88789e6252368c20$export$3104c96177ff88de(a, b) {
    const len = Math.min(a.length, b.length);
    let i;
    const aLastIndex = a.length - 1;
    const bLastIndex = b.length - 1;
    for(i = 0; i < len; i++){
        if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) return i;
    }
    return len;
}
function $88789e6252368c20$export$9be78f542969c681(charCode) {
    return 0xD800 <= charCode && charCode <= 0xDBFF;
}
function $88789e6252368c20$export$5b64095866343cd(charCode) {
    return 0xDC00 <= charCode && charCode <= 0xDFFF;
}
function $88789e6252368c20$export$769ca25c1e6d54a5(highSurrogate, lowSurrogate) {
    return (highSurrogate - 0xD800 << 10) + (lowSurrogate - 0xDC00) + 0x10000;
}
function $88789e6252368c20$export$12f0b64547f341eb(str, len, offset) {
    const charCode = str.charCodeAt(offset);
    if ($88789e6252368c20$export$9be78f542969c681(charCode) && offset + 1 < len) {
        const nextCharCode = str.charCodeAt(offset + 1);
        if ($88789e6252368c20$export$5b64095866343cd(nextCharCode)) return $88789e6252368c20$export$769ca25c1e6d54a5(charCode, nextCharCode);
    }
    return charCode;
}
/**
 * get the code point that ends right before offset `offset`
 */ function $88789e6252368c20$var$getPrevCodePoint(str, offset) {
    const charCode = str.charCodeAt(offset - 1);
    if ($88789e6252368c20$export$5b64095866343cd(charCode) && offset > 1) {
        const prevCharCode = str.charCodeAt(offset - 2);
        if ($88789e6252368c20$export$9be78f542969c681(prevCharCode)) return $88789e6252368c20$export$769ca25c1e6d54a5(prevCharCode, charCode);
    }
    return charCode;
}
class $88789e6252368c20$export$fa638cd9aee3cdf4 {
    get offset() {
        return this._offset;
    }
    constructor(str, offset = 0){
        this._str = str;
        this._len = str.length;
        this._offset = offset;
    }
    setOffset(offset) {
        this._offset = offset;
    }
    prevCodePoint() {
        const codePoint = $88789e6252368c20$var$getPrevCodePoint(this._str, this._offset);
        this._offset -= codePoint >= 65536 /* Constants.UNICODE_SUPPLEMENTARY_PLANE_BEGIN */  ? 2 : 1;
        return codePoint;
    }
    nextCodePoint() {
        const codePoint = $88789e6252368c20$export$12f0b64547f341eb(this._str, this._len, this._offset);
        this._offset += codePoint >= 65536 /* Constants.UNICODE_SUPPLEMENTARY_PLANE_BEGIN */  ? 2 : 1;
        return codePoint;
    }
    eol() {
        return this._offset >= this._len;
    }
}
class $88789e6252368c20$export$3d3663d17d1e8bcc {
    get offset() {
        return this._iterator.offset;
    }
    constructor(str, offset = 0){
        this._iterator = new $88789e6252368c20$export$fa638cd9aee3cdf4(str, offset);
    }
    nextGraphemeLength() {
        const graphemeBreakTree = $88789e6252368c20$var$GraphemeBreakTree.getInstance();
        const iterator = this._iterator;
        const initialOffset = iterator.offset;
        let graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(iterator.nextCodePoint());
        while(!iterator.eol()){
            const offset = iterator.offset;
            const nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(iterator.nextCodePoint());
            if ($88789e6252368c20$var$breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
                // move iterator back
                iterator.setOffset(offset);
                break;
            }
            graphemeBreakType = nextGraphemeBreakType;
        }
        return iterator.offset - initialOffset;
    }
    prevGraphemeLength() {
        const graphemeBreakTree = $88789e6252368c20$var$GraphemeBreakTree.getInstance();
        const iterator = this._iterator;
        const initialOffset = iterator.offset;
        let graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(iterator.prevCodePoint());
        while(iterator.offset > 0){
            const offset = iterator.offset;
            const prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(iterator.prevCodePoint());
            if ($88789e6252368c20$var$breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
                // move iterator back
                iterator.setOffset(offset);
                break;
            }
            graphemeBreakType = prevGraphemeBreakType;
        }
        return initialOffset - iterator.offset;
    }
    eol() {
        return this._iterator.eol();
    }
}
function $88789e6252368c20$export$a0c299bd40f5706f(str, initialOffset) {
    const iterator = new $88789e6252368c20$export$3d3663d17d1e8bcc(str, initialOffset);
    return iterator.nextGraphemeLength();
}
function $88789e6252368c20$export$264eb99afc0267f9(str, initialOffset) {
    const iterator = new $88789e6252368c20$export$3d3663d17d1e8bcc(str, initialOffset);
    return iterator.prevGraphemeLength();
}
function $88789e6252368c20$export$6db896d3662c4760(str, offset) {
    if (offset > 0 && $88789e6252368c20$export$5b64095866343cd(str.charCodeAt(offset))) offset--;
    const endOffset = offset + $88789e6252368c20$export$a0c299bd40f5706f(str, offset);
    const startOffset = endOffset - $88789e6252368c20$export$264eb99afc0267f9(str, endOffset);
    return [
        startOffset,
        endOffset
    ];
}
let $88789e6252368c20$var$CONTAINS_RTL = undefined;
function $88789e6252368c20$var$makeContainsRtl() {
    // Generated using https://github.com/alexdima/unicode-utils/blob/main/rtl-test.js
    return /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
}
function $88789e6252368c20$export$d637ead74e95271(str) {
    if (!$88789e6252368c20$var$CONTAINS_RTL) $88789e6252368c20$var$CONTAINS_RTL = $88789e6252368c20$var$makeContainsRtl();
    return $88789e6252368c20$var$CONTAINS_RTL.test(str);
}
const $88789e6252368c20$var$IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
function $88789e6252368c20$export$81d0b64a0f99c2e8(str) {
    return $88789e6252368c20$var$IS_BASIC_ASCII.test(str);
}
const $88789e6252368c20$export$8dd08b7bddf69ff2 = /[\u2028\u2029]/; // LINE SEPARATOR (LS) or PARAGRAPH SEPARATOR (PS)
function $88789e6252368c20$export$41e1391916034278(str) {
    return $88789e6252368c20$export$8dd08b7bddf69ff2.test(str);
}
function $88789e6252368c20$export$5c1414cf11fdbc16(charCode) {
    // Do a cheap trick to better support wrapping of wide characters, treat them as 2 columns
    // http://jrgraphix.net/research/unicode_blocks.php
    //          2E80 - 2EFF   CJK Radicals Supplement
    //          2F00 - 2FDF   Kangxi Radicals
    //          2FF0 - 2FFF   Ideographic Description Characters
    //          3000 - 303F   CJK Symbols and Punctuation
    //          3040 - 309F   Hiragana
    //          30A0 - 30FF   Katakana
    //          3100 - 312F   Bopomofo
    //          3130 - 318F   Hangul Compatibility Jamo
    //          3190 - 319F   Kanbun
    //          31A0 - 31BF   Bopomofo Extended
    //          31F0 - 31FF   Katakana Phonetic Extensions
    //          3200 - 32FF   Enclosed CJK Letters and Months
    //          3300 - 33FF   CJK Compatibility
    //          3400 - 4DBF   CJK Unified Ideographs Extension A
    //          4DC0 - 4DFF   Yijing Hexagram Symbols
    //          4E00 - 9FFF   CJK Unified Ideographs
    //          A000 - A48F   Yi Syllables
    //          A490 - A4CF   Yi Radicals
    //          AC00 - D7AF   Hangul Syllables
    // [IGNORE] D800 - DB7F   High Surrogates
    // [IGNORE] DB80 - DBFF   High Private Use Surrogates
    // [IGNORE] DC00 - DFFF   Low Surrogates
    // [IGNORE] E000 - F8FF   Private Use Area
    //          F900 - FAFF   CJK Compatibility Ideographs
    // [IGNORE] FB00 - FB4F   Alphabetic Presentation Forms
    // [IGNORE] FB50 - FDFF   Arabic Presentation Forms-A
    // [IGNORE] FE00 - FE0F   Variation Selectors
    // [IGNORE] FE20 - FE2F   Combining Half Marks
    // [IGNORE] FE30 - FE4F   CJK Compatibility Forms
    // [IGNORE] FE50 - FE6F   Small Form Variants
    // [IGNORE] FE70 - FEFF   Arabic Presentation Forms-B
    //          FF00 - FFEF   Halfwidth and Fullwidth Forms
    //               [https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms]
    //               of which FF01 - FF5E fullwidth ASCII of 21 to 7E
    // [IGNORE]    and FF65 - FFDC halfwidth of Katakana and Hangul
    // [IGNORE] FFF0 - FFFF   Specials
    return charCode >= 0x2E80 && charCode <= 0xD7AF || charCode >= 0xF900 && charCode <= 0xFAFF || charCode >= 0xFF01 && charCode <= 0xFF5E;
}
function $88789e6252368c20$export$63021e60bbc3f30d(x) {
    return x >= 0x1F1E6 && x <= 0x1F1FF || x === 8986 || x === 8987 || x === 9200 || x === 9203 || x >= 9728 && x <= 10175 || x === 11088 || x === 11093 || x >= 127744 && x <= 128591 || x >= 128640 && x <= 128764 || x >= 128992 && x <= 129008 || x >= 129280 && x <= 129535 || x >= 129648 && x <= 129782;
}
const $88789e6252368c20$export$2e18dd4aa766a7c5 = String.fromCharCode(65279 /* CharCode.UTF8_BOM */ );
function $88789e6252368c20$export$b2b5b12371540183(str) {
    return !!(str && str.length > 0 && str.charCodeAt(0) === 65279 /* CharCode.UTF8_BOM */ );
}
function $88789e6252368c20$export$9fa67695c9dba055(target, ignoreEscapedChars = false) {
    if (!target) return false;
    if (ignoreEscapedChars) target = target.replace(/\\./g, '');
    return target.toLowerCase() !== target;
}
function $88789e6252368c20$export$a32b24d525d06b7(n) {
    const LETTERS_CNT = 26;
    n = n % (2 * LETTERS_CNT);
    if (n < LETTERS_CNT) return String.fromCharCode(97 /* CharCode.a */  + n);
    return String.fromCharCode(65 /* CharCode.A */  + n - LETTERS_CNT);
}
function $88789e6252368c20$var$breakBetweenGraphemeBreakType(breakTypeA, breakTypeB) {
    // http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundary_Rules
    // !!! Let's make the common case a bit faster
    if (breakTypeA === 0 /* GraphemeBreakType.Other */ ) // see https://www.unicode.org/Public/13.0.0/ucd/auxiliary/GraphemeBreakTest-13.0.0d10.html#table
    return breakTypeB !== 5 /* GraphemeBreakType.Extend */  && breakTypeB !== 7 /* GraphemeBreakType.SpacingMark */ ;
    // Do not break between a CR and LF. Otherwise, break before and after controls.
    // GB3                                        CR × LF
    // GB4                       (Control | CR | LF) ÷
    // GB5                                           ÷ (Control | CR | LF)
    if (breakTypeA === 2 /* GraphemeBreakType.CR */ ) {
        if (breakTypeB === 3 /* GraphemeBreakType.LF */ ) return false; // GB3
    }
    if (breakTypeA === 4 /* GraphemeBreakType.Control */  || breakTypeA === 2 /* GraphemeBreakType.CR */  || breakTypeA === 3 /* GraphemeBreakType.LF */ ) return true; // GB4
    if (breakTypeB === 4 /* GraphemeBreakType.Control */  || breakTypeB === 2 /* GraphemeBreakType.CR */  || breakTypeB === 3 /* GraphemeBreakType.LF */ ) return true; // GB5
    // Do not break Hangul syllable sequences.
    // GB6                                         L × (L | V | LV | LVT)
    // GB7                                  (LV | V) × (V | T)
    // GB8                                 (LVT | T) × T
    if (breakTypeA === 8 /* GraphemeBreakType.L */ ) {
        if (breakTypeB === 8 /* GraphemeBreakType.L */  || breakTypeB === 9 /* GraphemeBreakType.V */  || breakTypeB === 11 /* GraphemeBreakType.LV */  || breakTypeB === 12 /* GraphemeBreakType.LVT */ ) return false; // GB6
    }
    if (breakTypeA === 11 /* GraphemeBreakType.LV */  || breakTypeA === 9 /* GraphemeBreakType.V */ ) {
        if (breakTypeB === 9 /* GraphemeBreakType.V */  || breakTypeB === 10 /* GraphemeBreakType.T */ ) return false; // GB7
    }
    if (breakTypeA === 12 /* GraphemeBreakType.LVT */  || breakTypeA === 10 /* GraphemeBreakType.T */ ) {
        if (breakTypeB === 10 /* GraphemeBreakType.T */ ) return false; // GB8
    }
    // Do not break before extending characters or ZWJ.
    // GB9                                           × (Extend | ZWJ)
    if (breakTypeB === 5 /* GraphemeBreakType.Extend */  || breakTypeB === 13 /* GraphemeBreakType.ZWJ */ ) return false; // GB9
    // The GB9a and GB9b rules only apply to extended grapheme clusters:
    // Do not break before SpacingMarks, or after Prepend characters.
    // GB9a                                          × SpacingMark
    // GB9b                                  Prepend ×
    if (breakTypeB === 7 /* GraphemeBreakType.SpacingMark */ ) return false; // GB9a
    if (breakTypeA === 1 /* GraphemeBreakType.Prepend */ ) return false; // GB9b
    // Do not break within emoji modifier sequences or emoji zwj sequences.
    // GB11    \p{Extended_Pictographic} Extend* ZWJ × \p{Extended_Pictographic}
    if (breakTypeA === 13 /* GraphemeBreakType.ZWJ */  && breakTypeB === 14 /* GraphemeBreakType.Extended_Pictographic */ ) // Note: we are not implementing the rule entirely here to avoid introducing states
    return false; // GB11
    // GB12                          sot (RI RI)* RI × RI
    // GB13                        [^RI] (RI RI)* RI × RI
    if (breakTypeA === 6 /* GraphemeBreakType.Regional_Indicator */  && breakTypeB === 6 /* GraphemeBreakType.Regional_Indicator */ ) // Note: we are not implementing the rule entirely here to avoid introducing states
    return false; // GB12 & GB13
    // GB999                                     Any ÷ Any
    return true;
}
class $88789e6252368c20$var$GraphemeBreakTree {
    static{
        this._INSTANCE = null;
    }
    static getInstance() {
        if (!$88789e6252368c20$var$GraphemeBreakTree._INSTANCE) $88789e6252368c20$var$GraphemeBreakTree._INSTANCE = new $88789e6252368c20$var$GraphemeBreakTree();
        return $88789e6252368c20$var$GraphemeBreakTree._INSTANCE;
    }
    constructor(){
        this._data = $88789e6252368c20$var$getGraphemeBreakRawData();
    }
    getGraphemeBreakType(codePoint) {
        // !!! Let's make 7bit ASCII a bit faster: 0..31
        if (codePoint < 32) {
            if (codePoint === 10 /* CharCode.LineFeed */ ) return 3 /* GraphemeBreakType.LF */ ;
            if (codePoint === 13 /* CharCode.CarriageReturn */ ) return 2 /* GraphemeBreakType.CR */ ;
            return 4 /* GraphemeBreakType.Control */ ;
        }
        // !!! Let's make 7bit ASCII a bit faster: 32..126
        if (codePoint < 127) return 0 /* GraphemeBreakType.Other */ ;
        const data = this._data;
        const nodeCount = data.length / 3;
        let nodeIndex = 1;
        while(nodeIndex <= nodeCount){
            if (codePoint < data[3 * nodeIndex]) // go left
            nodeIndex = 2 * nodeIndex;
            else if (codePoint > data[3 * nodeIndex + 1]) // go right
            nodeIndex = 2 * nodeIndex + 1;
            else // hit
            return data[3 * nodeIndex + 2];
        }
        return 0 /* GraphemeBreakType.Other */ ;
    }
}
function $88789e6252368c20$var$getGraphemeBreakRawData() {
    // generated using https://github.com/alexdima/unicode-utils/blob/main/grapheme-break.js
    return JSON.parse('[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]');
}
function $88789e6252368c20$export$3afff68d1b8a64dc(offset, str) {
    if (offset === 0) return 0;
    // Try to delete emoji part.
    const emojiOffset = $88789e6252368c20$var$getOffsetBeforeLastEmojiComponent(offset, str);
    if (emojiOffset !== undefined) return emojiOffset;
    // Otherwise, just skip a single code point.
    const iterator = new $88789e6252368c20$export$fa638cd9aee3cdf4(str, offset);
    iterator.prevCodePoint();
    return iterator.offset;
}
function $88789e6252368c20$var$getOffsetBeforeLastEmojiComponent(initialOffset, str) {
    // See https://www.unicode.org/reports/tr51/tr51-14.html#EBNF_and_Regex for the
    // structure of emojis.
    const iterator = new $88789e6252368c20$export$fa638cd9aee3cdf4(str, initialOffset);
    let codePoint = iterator.prevCodePoint();
    // Skip modifiers
    while($88789e6252368c20$var$isEmojiModifier(codePoint) || codePoint === 65039 /* CodePoint.emojiVariantSelector */  || codePoint === 8419 /* CodePoint.enclosingKeyCap */ ){
        if (iterator.offset === 0) // Cannot skip modifier, no preceding emoji base.
        return undefined;
        codePoint = iterator.prevCodePoint();
    }
    // Expect base emoji
    if (!$88789e6252368c20$export$63021e60bbc3f30d(codePoint)) // Unexpected code point, not a valid emoji.
    return undefined;
    let resultOffset = iterator.offset;
    if (resultOffset > 0) {
        // Skip optional ZWJ code points that combine multiple emojis.
        // In theory, we should check if that ZWJ actually combines multiple emojis
        // to prevent deleting ZWJs in situations we didn't account for.
        const optionalZwjCodePoint = iterator.prevCodePoint();
        if (optionalZwjCodePoint === 8205 /* CodePoint.zwj */ ) resultOffset = iterator.offset;
    }
    return resultOffset;
}
function $88789e6252368c20$var$isEmojiModifier(codePoint) {
    return 0x1F3FB <= codePoint && codePoint <= 0x1F3FF;
}
const $88789e6252368c20$export$8e8f2a1255896772 = '\xa0';
class $88789e6252368c20$export$e31bad1c158baf54 {
    static{
        this.ambiguousCharacterData = new (0, $dcb28a5594492bc0$export$b624eff549462981)(()=>{
            // Generated using https://github.com/hediet/vscode-unicode-data
            // Stored as key1, value1, key2, value2, ...
            return JSON.parse('{\"_common\":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],\"_default\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"cs\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"de\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"es\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"fr\":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"it\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ja\":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],\"ko\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pl\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pt-BR\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"qps-ploc\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ru\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"tr\":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"zh-hans\":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],\"zh-hant\":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}');
        });
    }
    static{
        this.cache = new (0, $cf0af188a02c1cfc$export$f9b79ca6baca2f60)({
            getCacheKey: JSON.stringify
        }, (locales)=>{
            function arrayToMap(arr) {
                const result = new Map();
                for(let i = 0; i < arr.length; i += 2)result.set(arr[i], arr[i + 1]);
                return result;
            }
            function mergeMaps(map1, map2) {
                const result = new Map(map1);
                for (const [key, value] of map2)result.set(key, value);
                return result;
            }
            function intersectMaps(map1, map2) {
                if (!map1) return map2;
                const result = new Map();
                for (const [key, value] of map1)if (map2.has(key)) result.set(key, value);
                return result;
            }
            const data = this.ambiguousCharacterData.value;
            let filteredLocales = locales.filter((l)=>!l.startsWith('_') && l in data);
            if (filteredLocales.length === 0) filteredLocales = [
                '_default'
            ];
            let languageSpecificMap = undefined;
            for (const locale of filteredLocales){
                const map = arrayToMap(data[locale]);
                languageSpecificMap = intersectMaps(languageSpecificMap, map);
            }
            const commonMap = arrayToMap(data['_common']);
            const map = mergeMaps(commonMap, languageSpecificMap);
            return new $88789e6252368c20$export$e31bad1c158baf54(map);
        });
    }
    static getInstance(locales) {
        return $88789e6252368c20$export$e31bad1c158baf54.cache.get(Array.from(locales));
    }
    static{
        this._locales = new (0, $dcb28a5594492bc0$export$b624eff549462981)(()=>Object.keys($88789e6252368c20$export$e31bad1c158baf54.ambiguousCharacterData.value).filter((k)=>!k.startsWith('_')));
    }
    static getLocales() {
        return $88789e6252368c20$export$e31bad1c158baf54._locales.value;
    }
    constructor(confusableDictionary){
        this.confusableDictionary = confusableDictionary;
    }
    isAmbiguous(codePoint) {
        return this.confusableDictionary.has(codePoint);
    }
    /**
     * Returns the non basic ASCII code point that the given code point can be confused,
     * or undefined if such code point does note exist.
     */ getPrimaryConfusable(codePoint) {
        return this.confusableDictionary.get(codePoint);
    }
    getConfusableCodePoints() {
        return new Set(this.confusableDictionary.keys());
    }
}
class $88789e6252368c20$export$f5602f83e5c5c07 {
    static getRawData() {
        // Generated using https://github.com/hediet/vscode-unicode-data
        return JSON.parse('[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]');
    }
    static{
        this._data = undefined;
    }
    static getData() {
        if (!this._data) this._data = new Set($88789e6252368c20$export$f5602f83e5c5c07.getRawData());
        return this._data;
    }
    static isInvisibleCharacter(codePoint) {
        return $88789e6252368c20$export$f5602f83e5c5c07.getData().has(codePoint);
    }
    static get codePoints() {
        return $88789e6252368c20$export$f5602f83e5c5c07.getData();
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ // NOTE: VSCode's copy of nodejs path library to be usable in common (non-node) namespace
// Copied from: https://github.com/nodejs/node/commits/v20.9.0/lib/path.js
// Excluding: the change that adds primordials
// (https://github.com/nodejs/node/commit/187a862d221dec42fa9a5c4214e7034d9092792f and others)
/**
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

let $4a90f084dc3c6879$var$safeProcess;
// Native sandbox environment
const $4a90f084dc3c6879$var$vscodeGlobal = globalThis.vscode;
if (typeof $4a90f084dc3c6879$var$vscodeGlobal !== 'undefined' && typeof $4a90f084dc3c6879$var$vscodeGlobal.process !== 'undefined') {
    const sandboxProcess = $4a90f084dc3c6879$var$vscodeGlobal.process;
    $4a90f084dc3c6879$var$safeProcess = {
        get platform () {
            return sandboxProcess.platform;
        },
        get arch () {
            return sandboxProcess.arch;
        },
        get env () {
            return sandboxProcess.env;
        },
        cwd () {
            return sandboxProcess.cwd();
        }
    };
} else if (typeof $46c1ba077691f8ff$exports !== 'undefined' && typeof $46c1ba077691f8ff$exports?.versions?.node === 'string') $4a90f084dc3c6879$var$safeProcess = {
    get platform () {
        return $46c1ba077691f8ff$exports.platform;
    },
    get arch () {
        return $46c1ba077691f8ff$exports.arch;
    },
    get env () {
        return $46c1ba077691f8ff$exports.env;
    },
    cwd () {
        return $46c1ba077691f8ff$exports.cwd();
    }
};
else $4a90f084dc3c6879$var$safeProcess = {
    // Supported
    get platform () {
        return (0, $9e1677203ec6aef4$export$f993c945890e93ba) ? 'win32' : (0, $9e1677203ec6aef4$export$94df8cd5b2bf5797) ? 'darwin' : 'linux';
    },
    get arch () {
        return undefined; /* arch is undefined in web */ 
    },
    // Unsupported
    get env () {
        return {};
    },
    cwd () {
        return '/';
    }
};
const $4a90f084dc3c6879$export$5f7bb87daeae59c1 = $4a90f084dc3c6879$var$safeProcess.cwd;
const $4a90f084dc3c6879$export$a7b6bc01c63cdfc3 = $4a90f084dc3c6879$var$safeProcess.env;
const $4a90f084dc3c6879$export$722a64dea1b767dc = $4a90f084dc3c6879$var$safeProcess.platform;


const $27626fd0dd3f5fee$var$CHAR_UPPERCASE_A = 65; /* A */ 
const $27626fd0dd3f5fee$var$CHAR_LOWERCASE_A = 97; /* a */ 
const $27626fd0dd3f5fee$var$CHAR_UPPERCASE_Z = 90; /* Z */ 
const $27626fd0dd3f5fee$var$CHAR_LOWERCASE_Z = 122; /* z */ 
const $27626fd0dd3f5fee$var$CHAR_DOT = 46; /* . */ 
const $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH = 47; /* / */ 
const $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH = 92; /* \ */ 
const $27626fd0dd3f5fee$var$CHAR_COLON = 58; /* : */ 
const $27626fd0dd3f5fee$var$CHAR_QUESTION_MARK = 63; /* ? */ 
class $27626fd0dd3f5fee$var$ErrorInvalidArgType extends Error {
    constructor(name, expected, actual){
        // determiner: 'must be' or 'must not be'
        let determiner;
        if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
            determiner = 'must not be';
            expected = expected.replace(/^not /, '');
        } else determiner = 'must be';
        const type = name.indexOf('.') !== -1 ? 'property' : 'argument';
        let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
        msg += `. Received type ${typeof actual}`;
        super(msg);
        this.code = 'ERR_INVALID_ARG_TYPE';
    }
}
function $27626fd0dd3f5fee$var$validateObject(pathObject, name) {
    if (pathObject === null || typeof pathObject !== 'object') throw new $27626fd0dd3f5fee$var$ErrorInvalidArgType(name, 'Object', pathObject);
}
function $27626fd0dd3f5fee$var$validateString(value, name) {
    if (typeof value !== 'string') throw new $27626fd0dd3f5fee$var$ErrorInvalidArgType(name, 'string', value);
}
const $27626fd0dd3f5fee$var$platformIsWin32 = $4a90f084dc3c6879$export$722a64dea1b767dc === 'win32';
function $27626fd0dd3f5fee$var$isPathSeparator(code) {
    return code === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH || code === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH;
}
function $27626fd0dd3f5fee$var$isPosixPathSeparator(code) {
    return code === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
}
function $27626fd0dd3f5fee$var$isWindowsDeviceRoot(code) {
    return code >= $27626fd0dd3f5fee$var$CHAR_UPPERCASE_A && code <= $27626fd0dd3f5fee$var$CHAR_UPPERCASE_Z || code >= $27626fd0dd3f5fee$var$CHAR_LOWERCASE_A && code <= $27626fd0dd3f5fee$var$CHAR_LOWERCASE_Z;
}
// Resolves . and .. elements in a path with directory names
function $27626fd0dd3f5fee$var$normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = '';
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = 0;
    for(let i = 0; i <= path.length; ++i){
        if (i < path.length) code = path.charCodeAt(i);
        else if (isPathSeparator(code)) break;
        else code = $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) ;
            else if (dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== $27626fd0dd3f5fee$var$CHAR_DOT || res.charCodeAt(res.length - 2) !== $27626fd0dd3f5fee$var$CHAR_DOT) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = '';
                            lastSegmentLength = 0;
                        } else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    } else if (res.length !== 0) {
                        res = '';
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    res += res.length > 0 ? `${separator}..` : '..';
                    lastSegmentLength = 2;
                }
            } else {
                if (res.length > 0) res += `${separator}${path.slice(lastSlash + 1, i)}`;
                else res = path.slice(lastSlash + 1, i);
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        } else if (code === $27626fd0dd3f5fee$var$CHAR_DOT && dots !== -1) ++dots;
        else dots = -1;
    }
    return res;
}
function $27626fd0dd3f5fee$var$formatExt(ext) {
    return ext ? `${ext[0] === '.' ? '' : '.'}${ext}` : '';
}
function $27626fd0dd3f5fee$var$_format(sep, pathObject) {
    $27626fd0dd3f5fee$var$validateObject(pathObject, 'pathObject');
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || `${pathObject.name || ''}${$27626fd0dd3f5fee$var$formatExt(pathObject.ext)}`;
    if (!dir) return base;
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`;
}
const $27626fd0dd3f5fee$export$e242fbdac2d35a87 = {
    // path.resolve([from ...], to)
    resolve (...pathSegments) {
        let resolvedDevice = '';
        let resolvedTail = '';
        let resolvedAbsolute = false;
        for(let i = pathSegments.length - 1; i >= -1; i--){
            let path;
            if (i >= 0) {
                path = pathSegments[i];
                $27626fd0dd3f5fee$var$validateString(path, `paths[${i}]`);
                // Skip empty entries
                if (path.length === 0) continue;
            } else if (resolvedDevice.length === 0) path = $4a90f084dc3c6879$export$5f7bb87daeae59c1();
            else {
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = $4a90f084dc3c6879$export$a7b6bc01c63cdfc3[`=${resolvedDevice}`] || $4a90f084dc3c6879$export$5f7bb87daeae59c1();
                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined || path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() && path.charCodeAt(2) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) path = `${resolvedDevice}\\`;
            }
            const len = path.length;
            let rootEnd = 0;
            let device = '';
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len === 1) {
                if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
                    // `path` contains just a path separator
                    rootEnd = 1;
                    isAbsolute = true;
                }
            } else if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an
                // absolute path of some kind (UNC or otherwise)
                isAbsolute = true;
                if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while(j < len && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                            if (j === len || j !== last) {
                                // We matched a UNC root
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                } else rootEnd = 1;
            } else if ($27626fd0dd3f5fee$var$isWindowsDeviceRoot(code) && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON) {
                // Possible device root
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2 && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(2))) {
                    // Treat separator following drive name as an absolute path
                    // indicator
                    isAbsolute = true;
                    rootEnd = 3;
                }
            }
            if (device.length > 0) {
                if (resolvedDevice.length > 0) {
                    if (device.toLowerCase() !== resolvedDevice.toLowerCase()) continue;
                } else resolvedDevice = device;
            }
            if (resolvedAbsolute) {
                if (resolvedDevice.length > 0) break;
            } else {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
                if (isAbsolute && resolvedDevice.length > 0) break;
            }
        }
        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)
        // Normalize the tail path
        resolvedTail = $27626fd0dd3f5fee$var$normalizeString(resolvedTail, !resolvedAbsolute, '\\', $27626fd0dd3f5fee$var$isPathSeparator);
        return resolvedAbsolute ? `${resolvedDevice}\\${resolvedTail}` : `${resolvedDevice}${resolvedTail}` || '.';
    },
    normalize (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        const len = path.length;
        if (len === 0) return '.';
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len === 1) // `path` contains just a single char, exit early to avoid
        // unnecessary work
        return $27626fd0dd3f5fee$var$isPosixPathSeparator(code) ? '\\' : path;
        if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
            // Possible UNC root
            // If we started with a separator, we know we at least have an absolute
            // path of some kind (UNC or otherwise)
            isAbsolute = true;
            if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while(j < len && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                        if (j === len) // We matched a UNC root only
                        // Return the normalized version of the UNC root since there
                        // is nothing left to process
                        return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            } else rootEnd = 1;
        } else if ($27626fd0dd3f5fee$var$isWindowsDeviceRoot(code) && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON) {
            // Possible device root
            device = path.slice(0, 2);
            rootEnd = 2;
            if (len > 2 && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(2))) {
                // Treat separator following drive name as an absolute path
                // indicator
                isAbsolute = true;
                rootEnd = 3;
            }
        }
        let tail = rootEnd < len ? $27626fd0dd3f5fee$var$normalizeString(path.slice(rootEnd), !isAbsolute, '\\', $27626fd0dd3f5fee$var$isPathSeparator) : '';
        if (tail.length === 0 && !isAbsolute) tail = '.';
        if (tail.length > 0 && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(len - 1))) tail += '\\';
        if (device === undefined) return isAbsolute ? `\\${tail}` : tail;
        return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`;
    },
    isAbsolute (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        const len = path.length;
        if (len === 0) return false;
        const code = path.charCodeAt(0);
        return $27626fd0dd3f5fee$var$isPathSeparator(code) || // Possible device root
        len > 2 && $27626fd0dd3f5fee$var$isWindowsDeviceRoot(code) && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(2));
    },
    join (...paths) {
        if (paths.length === 0) return '.';
        let joined;
        let firstPart;
        for(let i = 0; i < paths.length; ++i){
            const arg = paths[i];
            $27626fd0dd3f5fee$var$validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) joined = firstPart = arg;
                else joined += `\\${arg}`;
            }
        }
        if (joined === undefined) return '.';
        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for a UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at a UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as a UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        if (typeof firstPart === 'string' && $27626fd0dd3f5fee$var$isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1 && $27626fd0dd3f5fee$var$isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if ($27626fd0dd3f5fee$var$isPathSeparator(firstPart.charCodeAt(2))) ++slashCount;
                    else // We matched a UNC path in the first part
                    needsReplace = false;
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            while(slashCount < joined.length && $27626fd0dd3f5fee$var$isPathSeparator(joined.charCodeAt(slashCount)))slashCount++;
            // Replace the slashes if needed
            if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`;
        }
        return $27626fd0dd3f5fee$export$e242fbdac2d35a87.normalize(joined);
    },
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    relative (from, to) {
        $27626fd0dd3f5fee$var$validateString(from, 'from');
        $27626fd0dd3f5fee$var$validateString(to, 'to');
        if (from === to) return '';
        const fromOrig = $27626fd0dd3f5fee$export$e242fbdac2d35a87.resolve(from);
        const toOrig = $27626fd0dd3f5fee$export$e242fbdac2d35a87.resolve(to);
        if (fromOrig === toOrig) return '';
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to) return '';
        // Trim any leading backslashes
        let fromStart = 0;
        while(fromStart < from.length && from.charCodeAt(fromStart) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH)fromStart++;
        // Trim trailing backslashes (applicable to UNC paths only)
        let fromEnd = from.length;
        while(fromEnd - 1 > fromStart && from.charCodeAt(fromEnd - 1) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH)fromEnd--;
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 0;
        while(toStart < to.length && to.charCodeAt(toStart) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH)toStart++;
        // Trim trailing backslashes (applicable to UNC paths only)
        let toEnd = to.length;
        while(toEnd - 1 > toStart && to.charCodeAt(toEnd - 1) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH)toEnd--;
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for(; i < length; i++){
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) break;
            else if (fromCode === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) lastCommonSep = i;
        }
        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length) {
            if (lastCommonSep === -1) return toOrig;
        } else {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) // We get here if `from` is the exact base path for `to`.
                // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                return toOrig.slice(toStart + i + 1);
                if (i === 2) // We get here if `from` is the device root.
                // For example: from='C:\\'; to='C:\\foo'
                return toOrig.slice(toStart + i);
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) // We get here if `to` is the exact base path for `from`.
                // For example: from='C:\\foo\\bar'; to='C:\\foo'
                lastCommonSep = i;
                else if (i === 2) // We get here if `to` is the device root.
                // For example: from='C:\\foo\\bar'; to='C:\\'
                lastCommonSep = 3;
            }
            if (lastCommonSep === -1) lastCommonSep = 0;
        }
        let out = '';
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i)if (i === fromEnd || from.charCodeAt(i) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) out += out.length === 0 ? '..' : '\\..';
        toStart += lastCommonSep;
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) return `${out}${toOrig.slice(toStart, toEnd)}`;
        if (toOrig.charCodeAt(toStart) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) ++toStart;
        return toOrig.slice(toStart, toEnd);
    },
    toNamespacedPath (path) {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== 'string' || path.length === 0) return path;
        const resolvedPath = $27626fd0dd3f5fee$export$e242fbdac2d35a87.resolve(path);
        if (resolvedPath.length <= 2) return path;
        if (resolvedPath.charCodeAt(0) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) // Possible UNC root
        {
            if (resolvedPath.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== $27626fd0dd3f5fee$var$CHAR_QUESTION_MARK && code !== $27626fd0dd3f5fee$var$CHAR_DOT) // Matched non-long UNC root, convert the path to a long UNC path
                return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
            }
        } else if ($27626fd0dd3f5fee$var$isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) && resolvedPath.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON && resolvedPath.charCodeAt(2) === $27626fd0dd3f5fee$var$CHAR_BACKWARD_SLASH) // Matched device root, convert the path to a long UNC path
        return `\\\\?\\${resolvedPath}`;
        return path;
    },
    dirname (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        const len = path.length;
        if (len === 0) return '.';
        let rootEnd = -1;
        let offset = 0;
        const code = path.charCodeAt(0);
        if (len === 1) // `path` contains just a path separator, exit early to avoid
        // unnecessary work or a dot.
        return $27626fd0dd3f5fee$var$isPathSeparator(code) ? path : '.';
        // Try to match a root
        if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
            // Possible UNC root
            rootEnd = offset = 1;
            if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while(j < len && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                        if (j === len) // We matched a UNC root only
                        return path;
                        if (j !== last) // We matched a UNC root with leftovers
                        // Offset by 1 to include the separator after the UNC root to
                        // treat it as a "normal root" on top of a (UNC) root
                        rootEnd = offset = j + 1;
                    }
                }
            }
        // Possible device root
        } else if ($27626fd0dd3f5fee$var$isWindowsDeviceRoot(code) && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON) {
            rootEnd = len > 2 && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
            offset = rootEnd;
        }
        let end = -1;
        let matchedSlash = true;
        for(let i = len - 1; i >= offset; --i){
            if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            } else // We saw the first non-path separator
            matchedSlash = false;
        }
        if (end === -1) {
            if (rootEnd === -1) return '.';
            end = rootEnd;
        }
        return path.slice(0, end);
    },
    basename (path, suffix) {
        if (suffix !== undefined) $27626fd0dd3f5fee$var$validateString(suffix, 'suffix');
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 && $27626fd0dd3f5fee$var$isWindowsDeviceRoot(path.charCodeAt(0)) && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON) start = 2;
        if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {
            if (suffix === path) return '';
            let extIdx = suffix.length - 1;
            let firstNonSlashEnd = -1;
            for(i = path.length - 1; i >= start; --i){
                const code = path.charCodeAt(i);
                if ($27626fd0dd3f5fee$var$isPathSeparator(code)) // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === suffix.charCodeAt(extIdx)) {
                            if (--extIdx === -1) // We matched the extension, so mark this as the end of our path
                            // component
                            end = i;
                        } else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) end = firstNonSlashEnd;
            else if (end === -1) end = path.length;
            return path.slice(start, end);
        }
        for(i = path.length - 1; i >= start; --i){
            if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(i))) // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return '';
        return path.slice(start, end);
    },
    extname (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON && $27626fd0dd3f5fee$var$isWindowsDeviceRoot(path.charCodeAt(0))) start = startPart = 2;
        for(let i = path.length - 1; i >= start; --i){
            const code = path.charCodeAt(i);
            if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === $27626fd0dd3f5fee$var$CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return '';
        return path.slice(startDot, end);
    },
    format: $27626fd0dd3f5fee$var$_format.bind(null, '\\'),
    parse (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        const ret = {
            root: '',
            dir: '',
            base: '',
            ext: '',
            name: ''
        };
        if (path.length === 0) return ret;
        const len = path.length;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        if (len === 1) {
            if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            ret.base = ret.name = path;
            return ret;
        }
        // Try to match a root
        if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
            // Possible UNC root
            rootEnd = 1;
            if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while(j < len && $27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while(j < len && !$27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(j)))j++;
                        if (j === len) // We matched a UNC root only
                        rootEnd = j;
                        else if (j !== last) // We matched a UNC root with leftovers
                        rootEnd = j + 1;
                    }
                }
            }
        } else if ($27626fd0dd3f5fee$var$isWindowsDeviceRoot(code) && path.charCodeAt(1) === $27626fd0dd3f5fee$var$CHAR_COLON) {
            // Possible device root
            if (len <= 2) {
                // `path` contains just a drive root, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            rootEnd = 2;
            if ($27626fd0dd3f5fee$var$isPathSeparator(path.charCodeAt(2))) {
                if (len === 3) {
                    // `path` contains just a drive root, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path;
                    return ret;
                }
                rootEnd = 3;
            }
        }
        if (rootEnd > 0) ret.root = path.slice(0, rootEnd);
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for(; i >= rootEnd; --i){
            code = path.charCodeAt(i);
            if ($27626fd0dd3f5fee$var$isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === $27626fd0dd3f5fee$var$CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (end !== -1) {
            if (startDot === -1 || // We saw a non-dot character immediately before the dot
            preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
            preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) ret.base = ret.name = path.slice(startPart, end);
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) ret.dir = path.slice(0, startPart - 1);
        else ret.dir = ret.root;
        return ret;
    },
    sep: '\\',
    delimiter: ';',
    win32: null,
    posix: null
};
const $27626fd0dd3f5fee$var$posixCwd = (()=>{
    if ($27626fd0dd3f5fee$var$platformIsWin32) {
        // Converts Windows' backslash path separators to POSIX forward slashes
        // and truncates any drive indicator
        const regexp = /\\/g;
        return ()=>{
            const cwd = $4a90f084dc3c6879$export$5f7bb87daeae59c1().replace(regexp, '/');
            return cwd.slice(cwd.indexOf('/'));
        };
    }
    // We're already on POSIX, no need for any transformations
    return ()=>$4a90f084dc3c6879$export$5f7bb87daeae59c1();
})();
const $27626fd0dd3f5fee$export$8585d06717c0ab37 = {
    // path.resolve([from ...], to)
    resolve (...pathSegments) {
        let resolvedPath = '';
        let resolvedAbsolute = false;
        for(let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--){
            const path = i >= 0 ? pathSegments[i] : $27626fd0dd3f5fee$var$posixCwd();
            $27626fd0dd3f5fee$var$validateString(path, `paths[${i}]`);
            // Skip empty entries
            if (path.length === 0) continue;
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = $27626fd0dd3f5fee$var$normalizeString(resolvedPath, !resolvedAbsolute, '/', $27626fd0dd3f5fee$var$isPosixPathSeparator);
        if (resolvedAbsolute) return `/${resolvedPath}`;
        return resolvedPath.length > 0 ? resolvedPath : '.';
    },
    normalize (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        if (path.length === 0) return '.';
        const isAbsolute = path.charCodeAt(0) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
        // Normalize the path
        path = $27626fd0dd3f5fee$var$normalizeString(path, !isAbsolute, '/', $27626fd0dd3f5fee$var$isPosixPathSeparator);
        if (path.length === 0) {
            if (isAbsolute) return '/';
            return trailingSeparator ? './' : '.';
        }
        if (trailingSeparator) path += '/';
        return isAbsolute ? `/${path}` : path;
    },
    isAbsolute (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        return path.length > 0 && path.charCodeAt(0) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
    },
    join (...paths) {
        if (paths.length === 0) return '.';
        let joined;
        for(let i = 0; i < paths.length; ++i){
            const arg = paths[i];
            $27626fd0dd3f5fee$var$validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) joined = arg;
                else joined += `/${arg}`;
            }
        }
        if (joined === undefined) return '.';
        return $27626fd0dd3f5fee$export$8585d06717c0ab37.normalize(joined);
    },
    relative (from, to) {
        $27626fd0dd3f5fee$var$validateString(from, 'from');
        $27626fd0dd3f5fee$var$validateString(to, 'to');
        if (from === to) return '';
        // Trim leading forward slashes.
        from = $27626fd0dd3f5fee$export$8585d06717c0ab37.resolve(from);
        to = $27626fd0dd3f5fee$export$8585d06717c0ab37.resolve(to);
        if (from === to) return '';
        const fromStart = 1;
        const fromEnd = from.length;
        const fromLen = fromEnd - fromStart;
        const toStart = 1;
        const toLen = to.length - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for(; i < length; i++){
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) break;
            else if (fromCode === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) lastCommonSep = i;
        }
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) // We get here if `from` is the exact base path for `to`.
                // For example: from='/foo/bar'; to='/foo/bar/baz'
                return to.slice(toStart + i + 1);
                if (i === 0) // We get here if `from` is the root
                // For example: from='/'; to='/foo'
                return to.slice(toStart + i);
            } else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) // We get here if `to` is the exact base path for `from`.
                // For example: from='/foo/bar/baz'; to='/foo/bar'
                lastCommonSep = i;
                else if (i === 0) // We get here if `to` is the root.
                // For example: from='/foo/bar'; to='/'
                lastCommonSep = 0;
            }
        }
        let out = '';
        // Generate the relative path based on the path difference between `to`
        // and `from`.
        for(i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i)if (i === fromEnd || from.charCodeAt(i) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) out += out.length === 0 ? '..' : '/..';
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts.
        return `${out}${to.slice(toStart + lastCommonSep)}`;
    },
    toNamespacedPath (path) {
        // Non-op on posix systems
        return path;
    },
    dirname (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        if (path.length === 0) return '.';
        const hasRoot = path.charCodeAt(0) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for(let i = path.length - 1; i >= 1; --i){
            if (path.charCodeAt(i) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            } else // We saw the first non-path separator
            matchedSlash = false;
        }
        if (end === -1) return hasRoot ? '/' : '.';
        if (hasRoot && end === 1) return '//';
        return path.slice(0, end);
    },
    basename (path, suffix) {
        if (suffix !== undefined) $27626fd0dd3f5fee$var$validateString(suffix, 'ext');
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (suffix !== undefined && suffix.length > 0 && suffix.length <= path.length) {
            if (suffix === path) return '';
            let extIdx = suffix.length - 1;
            let firstNonSlashEnd = -1;
            for(i = path.length - 1; i >= 0; --i){
                const code = path.charCodeAt(i);
                if (code === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                {
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                } else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === suffix.charCodeAt(extIdx)) {
                            if (--extIdx === -1) // We matched the extension, so mark this as the end of our path
                            // component
                            end = i;
                        } else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) end = firstNonSlashEnd;
            else if (end === -1) end = path.length;
            return path.slice(start, end);
        }
        for(i = path.length - 1; i >= 0; --i){
            if (path.charCodeAt(i) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            {
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            } else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) return '';
        return path.slice(start, end);
    },
    extname (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        for(let i = path.length - 1; i >= 0; --i){
            const code = path.charCodeAt(i);
            if (code === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === $27626fd0dd3f5fee$var$CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
        preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) return '';
        return path.slice(startDot, end);
    },
    format: $27626fd0dd3f5fee$var$_format.bind(null, '/'),
    parse (path) {
        $27626fd0dd3f5fee$var$validateString(path, 'path');
        const ret = {
            root: '',
            dir: '',
            base: '',
            ext: '',
            name: ''
        };
        if (path.length === 0) return ret;
        const isAbsolute = path.charCodeAt(0) === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = '/';
            start = 1;
        } else start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for(; i >= start; --i){
            const code = path.charCodeAt(i);
            if (code === $27626fd0dd3f5fee$var$CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === $27626fd0dd3f5fee$var$CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) startDot = i;
                else if (preDotState !== 1) preDotState = 1;
            } else if (startDot !== -1) // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
        if (end !== -1) {
            const start = startPart === 0 && isAbsolute ? 1 : startPart;
            if (startDot === -1 || // We saw a non-dot character immediately before the dot
            preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
            preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) ret.base = ret.name = path.slice(start, end);
            else {
                ret.name = path.slice(start, startDot);
                ret.base = path.slice(start, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
        else if (isAbsolute) ret.dir = '/';
        return ret;
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null
};
$27626fd0dd3f5fee$export$8585d06717c0ab37.win32 = $27626fd0dd3f5fee$export$e242fbdac2d35a87.win32 = $27626fd0dd3f5fee$export$e242fbdac2d35a87;
$27626fd0dd3f5fee$export$8585d06717c0ab37.posix = $27626fd0dd3f5fee$export$e242fbdac2d35a87.posix = $27626fd0dd3f5fee$export$8585d06717c0ab37;
const $27626fd0dd3f5fee$export$a3295358bff77e = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.normalize : $27626fd0dd3f5fee$export$8585d06717c0ab37.normalize;
const $27626fd0dd3f5fee$export$f7e2c8231c57a8bd = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.join : $27626fd0dd3f5fee$export$8585d06717c0ab37.join;
const $27626fd0dd3f5fee$export$f7ad0328861e2f03 = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.resolve : $27626fd0dd3f5fee$export$8585d06717c0ab37.resolve;
const $27626fd0dd3f5fee$export$f0e7d1106eeabbe6 = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.relative : $27626fd0dd3f5fee$export$8585d06717c0ab37.relative;
const $27626fd0dd3f5fee$export$7f7b8152cc673abe = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.dirname : $27626fd0dd3f5fee$export$8585d06717c0ab37.dirname;
const $27626fd0dd3f5fee$export$9bf319d8f74f51d1 = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.basename : $27626fd0dd3f5fee$export$8585d06717c0ab37.basename;
const $27626fd0dd3f5fee$export$d0e86f3a75393fa3 = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.extname : $27626fd0dd3f5fee$export$8585d06717c0ab37.extname;
const $27626fd0dd3f5fee$export$5aee1a5bd9743d8f = $27626fd0dd3f5fee$var$platformIsWin32 ? $27626fd0dd3f5fee$export$e242fbdac2d35a87.sep : $27626fd0dd3f5fee$export$8585d06717c0ab37.sep;



const $35ec765602f96f4b$var$_schemePattern = /^\w[\w\d+.-]*$/;
const $35ec765602f96f4b$var$_singleSlashStart = /^\//;
const $35ec765602f96f4b$var$_doubleSlashStart = /^\/\//;
function $35ec765602f96f4b$var$_validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme && _strict) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${ret.authority}", path: "${ret.path}", query: "${ret.query}", fragment: "${ret.fragment}"}`);
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !$35ec765602f96f4b$var$_schemePattern.test(ret.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.');
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!$35ec765602f96f4b$var$_singleSlashStart.test(ret.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else {
            if ($35ec765602f96f4b$var$_doubleSlashStart.test(ret.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
        }
    }
}
// for a while we allowed uris *without* schemes and this is the migration
// for them, e.g. an uri without scheme and without strict-mode warns and falls
// back to the file-scheme. that should cause the least carnage and still be a
// clear warning
function $35ec765602f96f4b$var$_schemeFix(scheme, _strict) {
    if (!scheme && !_strict) return 'file';
    return scheme;
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
function $35ec765602f96f4b$var$_referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch(scheme){
        case 'https':
        case 'http':
        case 'file':
            if (!path) path = $35ec765602f96f4b$var$_slash;
            else if (path[0] !== $35ec765602f96f4b$var$_slash) path = $35ec765602f96f4b$var$_slash + path;
            break;
    }
    return path;
}
const $35ec765602f96f4b$var$_empty = '';
const $35ec765602f96f4b$var$_slash = '/';
const $35ec765602f96f4b$var$_regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
class $35ec765602f96f4b$export$9156e739aa33e19f {
    static isUri(thing) {
        if (thing instanceof $35ec765602f96f4b$export$9156e739aa33e19f) return true;
        if (!thing) return false;
        return typeof thing.authority === 'string' && typeof thing.fragment === 'string' && typeof thing.path === 'string' && typeof thing.query === 'string' && typeof thing.scheme === 'string' && typeof thing.fsPath === 'string' && typeof thing.with === 'function' && typeof thing.toString === 'function';
    }
    /**
     * @internal
     */ constructor(schemeOrData, authority, path, query, fragment, _strict = false){
        if (typeof schemeOrData === 'object') {
            this.scheme = schemeOrData.scheme || $35ec765602f96f4b$var$_empty;
            this.authority = schemeOrData.authority || $35ec765602f96f4b$var$_empty;
            this.path = schemeOrData.path || $35ec765602f96f4b$var$_empty;
            this.query = schemeOrData.query || $35ec765602f96f4b$var$_empty;
            this.fragment = schemeOrData.fragment || $35ec765602f96f4b$var$_empty;
        // no validation because it's this URI
        // that creates uri components.
        // _validateUri(this);
        } else {
            this.scheme = $35ec765602f96f4b$var$_schemeFix(schemeOrData, _strict);
            this.authority = authority || $35ec765602f96f4b$var$_empty;
            this.path = $35ec765602f96f4b$var$_referenceResolution(this.scheme, path || $35ec765602f96f4b$var$_empty);
            this.query = query || $35ec765602f96f4b$var$_empty;
            this.fragment = fragment || $35ec765602f96f4b$var$_empty;
            $35ec765602f96f4b$var$_validateUri(this, _strict);
        }
    }
    // ---- filesystem path -----------------------
    /**
     * Returns a string representing the corresponding file system path of this URI.
     * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
     * platform specific path separator.
     *
     * * Will *not* validate the path for invalid characters and semantics.
     * * Will *not* look at the scheme of this URI.
     * * The result shall *not* be used for display purposes but for accessing a file on disk.
     *
     *
     * The *difference* to `URI#path` is the use of the platform specific separator and the handling
     * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
     *
     * ```ts
        const u = URI.parse('file://server/c$/folder/file.txt')
        u.authority === 'server'
        u.path === '/shares/c$/file.txt'
        u.fsPath === '\\server\c$\folder\file.txt'
    ```
     *
     * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
     * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
     * with URIs that represent files on disk (`file` scheme).
     */ get fsPath() {
        // if (this.scheme !== 'file') {
        // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
        // }
        return $35ec765602f96f4b$export$17ec47117b6fa85a(this, false);
    }
    // ---- modify to new -------------------------
    with(change) {
        if (!change) return this;
        let { scheme: scheme, authority: authority, path: path, query: query, fragment: fragment } = change;
        if (scheme === undefined) scheme = this.scheme;
        else if (scheme === null) scheme = $35ec765602f96f4b$var$_empty;
        if (authority === undefined) authority = this.authority;
        else if (authority === null) authority = $35ec765602f96f4b$var$_empty;
        if (path === undefined) path = this.path;
        else if (path === null) path = $35ec765602f96f4b$var$_empty;
        if (query === undefined) query = this.query;
        else if (query === null) query = $35ec765602f96f4b$var$_empty;
        if (fragment === undefined) fragment = this.fragment;
        else if (fragment === null) fragment = $35ec765602f96f4b$var$_empty;
        if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) return this;
        return new $35ec765602f96f4b$var$Uri(scheme, authority, path, query, fragment);
    }
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.example.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */ static parse(value, _strict = false) {
        const match = $35ec765602f96f4b$var$_regexp.exec(value);
        if (!match) return new $35ec765602f96f4b$var$Uri($35ec765602f96f4b$var$_empty, $35ec765602f96f4b$var$_empty, $35ec765602f96f4b$var$_empty, $35ec765602f96f4b$var$_empty, $35ec765602f96f4b$var$_empty);
        return new $35ec765602f96f4b$var$Uri(match[2] || $35ec765602f96f4b$var$_empty, $35ec765602f96f4b$var$percentDecode(match[4] || $35ec765602f96f4b$var$_empty), $35ec765602f96f4b$var$percentDecode(match[5] || $35ec765602f96f4b$var$_empty), $35ec765602f96f4b$var$percentDecode(match[7] || $35ec765602f96f4b$var$_empty), $35ec765602f96f4b$var$percentDecode(match[9] || $35ec765602f96f4b$var$_empty), _strict);
    }
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';
    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */ static file(path) {
        let authority = $35ec765602f96f4b$var$_empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (0, $9e1677203ec6aef4$export$f993c945890e93ba) path = path.replace(/\\/g, $35ec765602f96f4b$var$_slash);
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === $35ec765602f96f4b$var$_slash && path[1] === $35ec765602f96f4b$var$_slash) {
            const idx = path.indexOf($35ec765602f96f4b$var$_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = $35ec765602f96f4b$var$_slash;
            } else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || $35ec765602f96f4b$var$_slash;
            }
        }
        return new $35ec765602f96f4b$var$Uri('file', authority, path, $35ec765602f96f4b$var$_empty, $35ec765602f96f4b$var$_empty);
    }
    /**
     * Creates new URI from uri components.
     *
     * Unless `strict` is `true` the scheme is defaults to be `file`. This function performs
     * validation and should be used for untrusted uri components retrieved from storage,
     * user input, command arguments etc
     */ static from(components, strict) {
        const result = new $35ec765602f96f4b$var$Uri(components.scheme, components.authority, components.path, components.query, components.fragment, strict);
        return result;
    }
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @param uri The input URI.
     * @param pathFragment The path fragment to add to the URI path.
     * @returns The resulting URI.
     */ static joinPath(uri, ...pathFragment) {
        if (!uri.path) throw new Error(`[UriError]: cannot call joinPath on URI without path`);
        let newPath;
        if ((0, $9e1677203ec6aef4$export$f993c945890e93ba) && uri.scheme === 'file') newPath = $35ec765602f96f4b$export$9156e739aa33e19f.file($27626fd0dd3f5fee$export$e242fbdac2d35a87.join($35ec765602f96f4b$export$17ec47117b6fa85a(uri, true), ...pathFragment)).path;
        else newPath = $27626fd0dd3f5fee$export$8585d06717c0ab37.join(uri.path, ...pathFragment);
        return uri.with({
            path: newPath
        });
    }
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */ toString(skipEncoding = false) {
        return $35ec765602f96f4b$var$_asFormatted(this, skipEncoding);
    }
    toJSON() {
        return this;
    }
    static revive(data) {
        if (!data) return data;
        else if (data instanceof $35ec765602f96f4b$export$9156e739aa33e19f) return data;
        else {
            const result = new $35ec765602f96f4b$var$Uri(data);
            result._formatted = data.external ?? null;
            result._fsPath = data._sep === $35ec765602f96f4b$var$_pathSepMarker ? data.fsPath ?? null : null;
            return result;
        }
    }
}
const $35ec765602f96f4b$var$_pathSepMarker = (0, $9e1677203ec6aef4$export$f993c945890e93ba) ? 1 : undefined;
// This class exists so that URI is compatible with vscode.Uri (API).
class $35ec765602f96f4b$var$Uri extends $35ec765602f96f4b$export$9156e739aa33e19f {
    constructor(){
        super(...arguments);
        this._formatted = null;
        this._fsPath = null;
    }
    get fsPath() {
        if (!this._fsPath) this._fsPath = $35ec765602f96f4b$export$17ec47117b6fa85a(this, false);
        return this._fsPath;
    }
    toString(skipEncoding = false) {
        if (!skipEncoding) {
            if (!this._formatted) this._formatted = $35ec765602f96f4b$var$_asFormatted(this, false);
            return this._formatted;
        } else // we don't cache that
        return $35ec765602f96f4b$var$_asFormatted(this, true);
    }
    toJSON() {
        const res = {
            $mid: 1 /* MarshalledId.Uri */ 
        };
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
            res._sep = $35ec765602f96f4b$var$_pathSepMarker;
        }
        if (this._formatted) res.external = this._formatted;
        //--- uri components
        if (this.path) res.path = this.path;
        // TODO
        // this isn't correct and can violate the UriComponents contract but
        // this is part of the vscode.Uri API and we shouldn't change how that
        // works anymore
        if (this.scheme) res.scheme = this.scheme;
        if (this.authority) res.authority = this.authority;
        if (this.query) res.query = this.query;
        if (this.fragment) res.fragment = this.fragment;
        return res;
    }
}
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
const $35ec765602f96f4b$var$encodeTable = {
    [58 /* CharCode.Colon */ ]: '%3A',
    [47 /* CharCode.Slash */ ]: '%2F',
    [63 /* CharCode.QuestionMark */ ]: '%3F',
    [35 /* CharCode.Hash */ ]: '%23',
    [91 /* CharCode.OpenSquareBracket */ ]: '%5B',
    [93 /* CharCode.CloseSquareBracket */ ]: '%5D',
    [64 /* CharCode.AtSign */ ]: '%40',
    [33 /* CharCode.ExclamationMark */ ]: '%21',
    [36 /* CharCode.DollarSign */ ]: '%24',
    [38 /* CharCode.Ampersand */ ]: '%26',
    [39 /* CharCode.SingleQuote */ ]: '%27',
    [40 /* CharCode.OpenParen */ ]: '%28',
    [41 /* CharCode.CloseParen */ ]: '%29',
    [42 /* CharCode.Asterisk */ ]: '%2A',
    [43 /* CharCode.Plus */ ]: '%2B',
    [44 /* CharCode.Comma */ ]: '%2C',
    [59 /* CharCode.Semicolon */ ]: '%3B',
    [61 /* CharCode.Equals */ ]: '%3D',
    [32 /* CharCode.Space */ ]: '%20'
};
function $35ec765602f96f4b$var$encodeURIComponentFast(uriComponent, isPath, isAuthority) {
    let res = undefined;
    let nativeEncodePos = -1;
    for(let pos = 0; pos < uriComponent.length; pos++){
        const code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if (code >= 97 /* CharCode.a */  && code <= 122 /* CharCode.z */  || code >= 65 /* CharCode.A */  && code <= 90 /* CharCode.Z */  || code >= 48 /* CharCode.Digit0 */  && code <= 57 /* CharCode.Digit9 */  || code === 45 /* CharCode.Dash */  || code === 46 /* CharCode.Period */  || code === 95 /* CharCode.Underline */  || code === 126 /* CharCode.Tilde */  || isPath && code === 47 /* CharCode.Slash */  || isAuthority && code === 91 /* CharCode.OpenSquareBracket */  || isAuthority && code === 93 /* CharCode.CloseSquareBracket */  || isAuthority && code === 58 /* CharCode.Colon */ ) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) res += uriComponent.charAt(pos);
        } else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) res = uriComponent.substr(0, pos);
            // check with default table first
            const escaped = $35ec765602f96f4b$var$encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            } else if (nativeEncodePos === -1) // use native encode only when needed
            nativeEncodePos = pos;
        }
    }
    if (nativeEncodePos !== -1) res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    return res !== undefined ? res : uriComponent;
}
function $35ec765602f96f4b$var$encodeURIComponentMinimal(path) {
    let res = undefined;
    for(let pos = 0; pos < path.length; pos++){
        const code = path.charCodeAt(pos);
        if (code === 35 /* CharCode.Hash */  || code === 63 /* CharCode.QuestionMark */ ) {
            if (res === undefined) res = path.substr(0, pos);
            res += $35ec765602f96f4b$var$encodeTable[code];
        } else if (res !== undefined) res += path[pos];
    }
    return res !== undefined ? res : path;
}
function $35ec765602f96f4b$export$17ec47117b6fa85a(uri, keepDriveLetterCasing) {
    let value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') // unc path: file://shares/c$/far/boo
    value = `//${uri.authority}${uri.path}`;
    else if (uri.path.charCodeAt(0) === 47 /* CharCode.Slash */  && (uri.path.charCodeAt(1) >= 65 /* CharCode.A */  && uri.path.charCodeAt(1) <= 90 /* CharCode.Z */  || uri.path.charCodeAt(1) >= 97 /* CharCode.a */  && uri.path.charCodeAt(1) <= 122 /* CharCode.z */ ) && uri.path.charCodeAt(2) === 58 /* CharCode.Colon */ ) {
        if (!keepDriveLetterCasing) // windows drive letter: file:///c:/far/boo
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
        else value = uri.path.substr(1);
    } else // other path
    value = uri.path;
    if (0, $9e1677203ec6aef4$export$f993c945890e93ba) value = value.replace(/\//g, '\\');
    return value;
}
/**
 * Create the external version of a uri
 */ function $35ec765602f96f4b$var$_asFormatted(uri, skipEncoding) {
    const encoder = !skipEncoding ? $35ec765602f96f4b$var$encodeURIComponentFast : $35ec765602f96f4b$var$encodeURIComponentMinimal;
    let res = '';
    let { scheme: scheme, authority: authority, path: path, query: query, fragment: fragment } = uri;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += $35ec765602f96f4b$var$_slash;
        res += $35ec765602f96f4b$var$_slash;
    }
    if (authority) {
        let idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            const userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.lastIndexOf(':');
            if (idx === -1) res += encoder(userinfo, false, false);
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false, false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false, true);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.lastIndexOf(':');
        if (idx === -1) res += encoder(authority, false, true);
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false, true);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* CharCode.Slash */  && path.charCodeAt(2) === 58 /* CharCode.Colon */ ) {
            const code = path.charCodeAt(1);
            if (code >= 65 /* CharCode.A */  && code <= 90 /* CharCode.Z */ ) path = `/${String.fromCharCode(code + 32)}:${path.substr(3)}`; // "/c:".length === 3
        } else if (path.length >= 2 && path.charCodeAt(1) === 58 /* CharCode.Colon */ ) {
            const code = path.charCodeAt(0);
            if (code >= 65 /* CharCode.A */  && code <= 90 /* CharCode.Z */ ) path = `${String.fromCharCode(code + 32)}:${path.substr(2)}`; // "/c:".length === 3
        }
        // encode the rest of the path
        res += encoder(path, true, false);
    }
    if (query) {
        res += '?';
        res += encoder(query, false, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? $35ec765602f96f4b$var$encodeURIComponentFast(fragment, false, false) : fragment;
    }
    return res;
}
// --- decode
function $35ec765602f96f4b$var$decodeURIComponentGraceful(str) {
    try {
        return decodeURIComponent(str);
    } catch  {
        if (str.length > 3) return str.substr(0, 3) + $35ec765602f96f4b$var$decodeURIComponentGraceful(str.substr(3));
        else return str;
    }
}
const $35ec765602f96f4b$var$_rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function $35ec765602f96f4b$var$percentDecode(str) {
    if (!str.match($35ec765602f96f4b$var$_rEncodedAsHex)) return str;
    return str.replace($35ec765602f96f4b$var$_rEncodedAsHex, (match)=>$35ec765602f96f4b$var$decodeURIComponentGraceful(match));
}



var $58fba7516e2bbdb8$export$e49b768f28ad1b60;
(function(Schemas) {
    /**
     * A schema that is used for models that exist in memory
     * only and that have no correspondence on a server or such.
     */ Schemas.inMemory = 'inmemory';
    /**
     * A schema that is used for setting files
     */ Schemas.vscode = 'vscode';
    /**
     * A schema that is used for internal private files
     */ Schemas.internal = 'private';
    /**
     * A walk-through document.
     */ Schemas.walkThrough = 'walkThrough';
    /**
     * An embedded code snippet.
     */ Schemas.walkThroughSnippet = 'walkThroughSnippet';
    Schemas.http = 'http';
    Schemas.https = 'https';
    Schemas.file = 'file';
    Schemas.mailto = 'mailto';
    Schemas.untitled = 'untitled';
    Schemas.data = 'data';
    Schemas.command = 'command';
    Schemas.vscodeRemote = 'vscode-remote';
    Schemas.vscodeRemoteResource = 'vscode-remote-resource';
    Schemas.vscodeManagedRemoteResource = 'vscode-managed-remote-resource';
    Schemas.vscodeUserData = 'vscode-userdata';
    Schemas.vscodeCustomEditor = 'vscode-custom-editor';
    Schemas.vscodeNotebookCell = 'vscode-notebook-cell';
    Schemas.vscodeNotebookCellMetadata = 'vscode-notebook-cell-metadata';
    Schemas.vscodeNotebookCellMetadataDiff = 'vscode-notebook-cell-metadata-diff';
    Schemas.vscodeNotebookCellOutput = 'vscode-notebook-cell-output';
    Schemas.vscodeNotebookCellOutputDiff = 'vscode-notebook-cell-output-diff';
    Schemas.vscodeNotebookMetadata = 'vscode-notebook-metadata';
    Schemas.vscodeInteractiveInput = 'vscode-interactive-input';
    Schemas.vscodeSettings = 'vscode-settings';
    Schemas.vscodeWorkspaceTrust = 'vscode-workspace-trust';
    Schemas.vscodeTerminal = 'vscode-terminal';
    /** Scheme used for code blocks in chat. */ Schemas.vscodeChatCodeBlock = 'vscode-chat-code-block';
    /** Scheme used for LHS of code compare (aka diff) blocks in chat. */ Schemas.vscodeChatCodeCompareBlock = 'vscode-chat-code-compare-block';
    /** Scheme used for the chat input editor. */ Schemas.vscodeChatSesssion = 'vscode-chat-editor';
    /**
     * Scheme used internally for webviews that aren't linked to a resource (i.e. not custom editors)
     */ Schemas.webviewPanel = 'webview-panel';
    /**
     * Scheme used for loading the wrapper html and script in webviews.
     */ Schemas.vscodeWebview = 'vscode-webview';
    /**
     * Scheme used for extension pages
     */ Schemas.extension = 'extension';
    /**
     * Scheme used as a replacement of `file` scheme to load
     * files with our custom protocol handler (desktop only).
     */ Schemas.vscodeFileResource = 'vscode-file';
    /**
     * Scheme used for temporary resources
     */ Schemas.tmp = 'tmp';
    /**
     * Scheme used vs live share
     */ Schemas.vsls = 'vsls';
    /**
     * Scheme used for the Source Control commit input's text document
     */ Schemas.vscodeSourceControl = 'vscode-scm';
    /**
     * Scheme used for input box for creating comments.
     */ Schemas.commentsInput = 'comment';
    /**
     * Scheme used for special rendering of settings in the release notes
     */ Schemas.codeSetting = 'code-setting';
    /**
     * Scheme used for output panel resources
     */ Schemas.outputChannel = 'output';
})($58fba7516e2bbdb8$export$e49b768f28ad1b60 || ($58fba7516e2bbdb8$export$e49b768f28ad1b60 = {}));
function $58fba7516e2bbdb8$export$b61001cb00f4e9d4(target, scheme) {
    if ((0, $35ec765602f96f4b$export$9156e739aa33e19f).isUri(target)) return (0, $88789e6252368c20$export$d9ffdbc590df6d8a)(target.scheme, scheme);
    else return (0, $88789e6252368c20$export$22a6b7ef892ce92c)(target, scheme + ':');
}
function $58fba7516e2bbdb8$export$4208ffcd6d9dc80f(target, ...schemes) {
    return schemes.some((scheme)=>$58fba7516e2bbdb8$export$b61001cb00f4e9d4(target, scheme));
}
const $58fba7516e2bbdb8$export$44d69dbc1c6354a6 = 'tkn';
class $58fba7516e2bbdb8$var$RemoteAuthoritiesImpl {
    constructor(){
        this._hosts = Object.create(null);
        this._ports = Object.create(null);
        this._connectionTokens = Object.create(null);
        this._preferredWebSchema = 'http';
        this._delegate = null;
        this._serverRootPath = '/';
    }
    setPreferredWebSchema(schema) {
        this._preferredWebSchema = schema;
    }
    get _remoteResourcesPath() {
        return $27626fd0dd3f5fee$export$8585d06717c0ab37.join(this._serverRootPath, $58fba7516e2bbdb8$export$e49b768f28ad1b60.vscodeRemoteResource);
    }
    rewrite(uri) {
        if (this._delegate) try {
            return this._delegate(uri);
        } catch (err) {
            $da7a53421655f39f$export$fbc590487568d5a6(err);
            return uri;
        }
        const authority = uri.authority;
        let host = this._hosts[authority];
        if (host && host.indexOf(':') !== -1 && host.indexOf('[') === -1) host = `[${host}]`;
        const port = this._ports[authority];
        const connectionToken = this._connectionTokens[authority];
        let query = `path=${encodeURIComponent(uri.path)}`;
        if (typeof connectionToken === 'string') query += `&${$58fba7516e2bbdb8$export$44d69dbc1c6354a6}=${encodeURIComponent(connectionToken)}`;
        return (0, $35ec765602f96f4b$export$9156e739aa33e19f).from({
            scheme: $9e1677203ec6aef4$export$60fea7e8d59d4bc0 ? this._preferredWebSchema : $58fba7516e2bbdb8$export$e49b768f28ad1b60.vscodeRemoteResource,
            authority: `${host}:${port}`,
            path: this._remoteResourcesPath,
            query: query
        });
    }
}
const $58fba7516e2bbdb8$export$be9b80ad8e0fe14b = new $58fba7516e2bbdb8$var$RemoteAuthoritiesImpl();
const $58fba7516e2bbdb8$export$7f6685acb1375e50 = 'vscode-app';
class $58fba7516e2bbdb8$var$FileAccessImpl {
    static{
        this.FALLBACK_AUTHORITY = $58fba7516e2bbdb8$export$7f6685acb1375e50;
    }
    /**
     * Returns a URI to use in contexts where the browser is responsible
     * for loading (e.g. fetch()) or when used within the DOM.
     *
     * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
     */ asBrowserUri(resourcePath) {
        // ESM-comment-begin
        // 		const uri = this.toUri(resourcePath, require);
        // ESM-comment-end
        // ESM-uncomment-begin
        const uri = this.toUri(resourcePath);
        // ESM-uncomment-end
        return this.uriToBrowserUri(uri);
    }
    /**
     * Returns a URI to use in contexts where the browser is responsible
     * for loading (e.g. fetch()) or when used within the DOM.
     *
     * **Note:** use `dom.ts#asCSSUrl` whenever the URL is to be used in CSS context.
     */ uriToBrowserUri(uri) {
        // Handle remote URIs via `RemoteAuthorities`
        if (uri.scheme === $58fba7516e2bbdb8$export$e49b768f28ad1b60.vscodeRemote) return $58fba7516e2bbdb8$export$be9b80ad8e0fe14b.rewrite(uri);
        // Convert to `vscode-file` resource..
        if (// ...only ever for `file` resources
        uri.scheme === $58fba7516e2bbdb8$export$e49b768f28ad1b60.file && // ...and we run in native environments
        ($9e1677203ec6aef4$export$43ab85c863381e0 || // ...or web worker extensions on desktop
        $9e1677203ec6aef4$export$d01de2ac8155a88e === `${$58fba7516e2bbdb8$export$e49b768f28ad1b60.vscodeFileResource}://${$58fba7516e2bbdb8$var$FileAccessImpl.FALLBACK_AUTHORITY}`)) return uri.with({
            scheme: $58fba7516e2bbdb8$export$e49b768f28ad1b60.vscodeFileResource,
            // We need to provide an authority here so that it can serve
            // as origin for network and loading matters in chromium.
            // If the URI is not coming with an authority already, we
            // add our own
            authority: uri.authority || $58fba7516e2bbdb8$var$FileAccessImpl.FALLBACK_AUTHORITY,
            query: null,
            fragment: null
        });
        return uri;
    }
    toUri(uriOrModule, moduleIdToUrl) {
        if ((0, $35ec765602f96f4b$export$9156e739aa33e19f).isUri(uriOrModule)) return uriOrModule;
        if (globalThis._VSCODE_FILE_ROOT) {
            const rootUriOrPath = globalThis._VSCODE_FILE_ROOT;
            // File URL (with scheme)
            if (/^\w[\w\d+.-]*:\/\//.test(rootUriOrPath)) return (0, $35ec765602f96f4b$export$9156e739aa33e19f).joinPath((0, $35ec765602f96f4b$export$9156e739aa33e19f).parse(rootUriOrPath, true), uriOrModule);
            // File Path (no scheme)
            const modulePath = $27626fd0dd3f5fee$export$f7e2c8231c57a8bd(rootUriOrPath, uriOrModule);
            return (0, $35ec765602f96f4b$export$9156e739aa33e19f).file(modulePath);
        }
        return (0, $35ec765602f96f4b$export$9156e739aa33e19f).parse(moduleIdToUrl.toUrl(uriOrModule));
    }
}
const $58fba7516e2bbdb8$export$9d9d3e1f87d32a98 = new $58fba7516e2bbdb8$var$FileAccessImpl();
var $58fba7516e2bbdb8$export$892b5f80dab9a2fb;
(function(COI) {
    const coiHeaders = new Map([
        [
            '1',
            {
                'Cross-Origin-Opener-Policy': 'same-origin'
            }
        ],
        [
            '2',
            {
                'Cross-Origin-Embedder-Policy': 'require-corp'
            }
        ],
        [
            '3',
            {
                'Cross-Origin-Opener-Policy': 'same-origin',
                'Cross-Origin-Embedder-Policy': 'require-corp'
            }
        ]
    ]);
    COI.CoopAndCoep = Object.freeze(coiHeaders.get('3'));
    const coiSearchParamName = 'vscode-coi';
    /**
     * Extract desired headers from `vscode-coi` invocation
     */ function getHeadersFromQuery(url) {
        let params;
        if (typeof url === 'string') params = new URL(url).searchParams;
        else if (url instanceof URL) params = url.searchParams;
        else if ((0, $35ec765602f96f4b$export$9156e739aa33e19f).isUri(url)) params = new URL(url.toString(true)).searchParams;
        const value = params?.get(coiSearchParamName);
        if (!value) return undefined;
        return coiHeaders.get(value);
    }
    COI.getHeadersFromQuery = getHeadersFromQuery;
    /**
     * Add the `vscode-coi` query attribute based on wanting `COOP` and `COEP`. Will be a noop when `crossOriginIsolated`
     * isn't enabled the current context
     */ function addSearchParam(urlOrSearch, coop, coep) {
        if (!globalThis.crossOriginIsolated) // depends on the current context being COI
        return;
        const value = coop && coep ? '3' : coep ? '2' : '1';
        if (urlOrSearch instanceof URLSearchParams) urlOrSearch.set(coiSearchParamName, value);
        else urlOrSearch[coiSearchParamName] = value;
    }
    COI.addSearchParam = addSearchParam;
})($58fba7516e2bbdb8$export$892b5f80dab9a2fb || ($58fba7516e2bbdb8$export$892b5f80dab9a2fb = {}));




// ESM-comment-begin
// const isESM = false;
// ESM-comment-end
// ESM-uncomment-begin
const $121ec0291bdf5ebd$var$isESM = true;
// ESM-uncomment-end
const $121ec0291bdf5ebd$var$DEFAULT_CHANNEL = 'default';
const $121ec0291bdf5ebd$var$INITIALIZE = '$initialize';
let $121ec0291bdf5ebd$var$webWorkerWarningLogged = false;
function $121ec0291bdf5ebd$export$27314eb92dd0840c(err) {
    if (!(0, $9e1677203ec6aef4$export$60fea7e8d59d4bc0)) // running tests
    return;
    if (!$121ec0291bdf5ebd$var$webWorkerWarningLogged) {
        $121ec0291bdf5ebd$var$webWorkerWarningLogged = true;
        console.warn('Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq');
    }
    console.warn(err.message);
}
class $121ec0291bdf5ebd$var$RequestMessage {
    constructor(vsWorker, req, channel, method, args){
        this.vsWorker = vsWorker;
        this.req = req;
        this.channel = channel;
        this.method = method;
        this.args = args;
        this.type = 0 /* MessageType.Request */ ;
    }
}
class $121ec0291bdf5ebd$var$ReplyMessage {
    constructor(vsWorker, seq, res, err){
        this.vsWorker = vsWorker;
        this.seq = seq;
        this.res = res;
        this.err = err;
        this.type = 1 /* MessageType.Reply */ ;
    }
}
class $121ec0291bdf5ebd$var$SubscribeEventMessage {
    constructor(vsWorker, req, channel, eventName, arg){
        this.vsWorker = vsWorker;
        this.req = req;
        this.channel = channel;
        this.eventName = eventName;
        this.arg = arg;
        this.type = 2 /* MessageType.SubscribeEvent */ ;
    }
}
class $121ec0291bdf5ebd$var$EventMessage {
    constructor(vsWorker, req, event){
        this.vsWorker = vsWorker;
        this.req = req;
        this.event = event;
        this.type = 3 /* MessageType.Event */ ;
    }
}
class $121ec0291bdf5ebd$var$UnsubscribeEventMessage {
    constructor(vsWorker, req){
        this.vsWorker = vsWorker;
        this.req = req;
        this.type = 4 /* MessageType.UnsubscribeEvent */ ;
    }
}
class $121ec0291bdf5ebd$var$SimpleWorkerProtocol {
    constructor(handler){
        this._workerId = -1;
        this._handler = handler;
        this._lastSentReq = 0;
        this._pendingReplies = Object.create(null);
        this._pendingEmitters = new Map();
        this._pendingEvents = new Map();
    }
    setWorkerId(workerId) {
        this._workerId = workerId;
    }
    sendMessage(channel, method, args) {
        const req = String(++this._lastSentReq);
        return new Promise((resolve, reject)=>{
            this._pendingReplies[req] = {
                resolve: resolve,
                reject: reject
            };
            this._send(new $121ec0291bdf5ebd$var$RequestMessage(this._workerId, req, channel, method, args));
        });
    }
    listen(channel, eventName, arg) {
        let req = null;
        const emitter = new (0, $d7b8088681a716ec$export$4293555f241ae35a)({
            onWillAddFirstListener: ()=>{
                req = String(++this._lastSentReq);
                this._pendingEmitters.set(req, emitter);
                this._send(new $121ec0291bdf5ebd$var$SubscribeEventMessage(this._workerId, req, channel, eventName, arg));
            },
            onDidRemoveLastListener: ()=>{
                this._pendingEmitters.delete(req);
                this._send(new $121ec0291bdf5ebd$var$UnsubscribeEventMessage(this._workerId, req));
                req = null;
            }
        });
        return emitter.event;
    }
    handleMessage(message) {
        if (!message || !message.vsWorker) return;
        if (this._workerId !== -1 && message.vsWorker !== this._workerId) return;
        this._handleMessage(message);
    }
    createProxyToRemoteChannel(channel, sendMessageBarrier) {
        const handler = {
            get: (target, name)=>{
                if (typeof name === 'string' && !target[name]) {
                    if ($121ec0291bdf5ebd$var$propertyIsDynamicEvent(name)) target[name] = (arg)=>{
                        return this.listen(channel, name, arg);
                    };
                    else if ($121ec0291bdf5ebd$var$propertyIsEvent(name)) target[name] = this.listen(channel, name, undefined);
                    else if (name.charCodeAt(0) === 36 /* CharCode.DollarSign */ ) target[name] = async (...myArgs)=>{
                        await sendMessageBarrier?.();
                        return this.sendMessage(channel, name, myArgs);
                    };
                }
                return target[name];
            }
        };
        return new Proxy(Object.create(null), handler);
    }
    _handleMessage(msg) {
        switch(msg.type){
            case 1 /* MessageType.Reply */ :
                return this._handleReplyMessage(msg);
            case 0 /* MessageType.Request */ :
                return this._handleRequestMessage(msg);
            case 2 /* MessageType.SubscribeEvent */ :
                return this._handleSubscribeEventMessage(msg);
            case 3 /* MessageType.Event */ :
                return this._handleEventMessage(msg);
            case 4 /* MessageType.UnsubscribeEvent */ :
                return this._handleUnsubscribeEventMessage(msg);
        }
    }
    _handleReplyMessage(replyMessage) {
        if (!this._pendingReplies[replyMessage.seq]) {
            console.warn('Got reply to unknown seq');
            return;
        }
        const reply = this._pendingReplies[replyMessage.seq];
        delete this._pendingReplies[replyMessage.seq];
        if (replyMessage.err) {
            let err = replyMessage.err;
            if (replyMessage.err.$isError) {
                err = new Error();
                err.name = replyMessage.err.name;
                err.message = replyMessage.err.message;
                err.stack = replyMessage.err.stack;
            }
            reply.reject(err);
            return;
        }
        reply.resolve(replyMessage.res);
    }
    _handleRequestMessage(requestMessage) {
        const req = requestMessage.req;
        const result = this._handler.handleMessage(requestMessage.channel, requestMessage.method, requestMessage.args);
        result.then((r)=>{
            this._send(new $121ec0291bdf5ebd$var$ReplyMessage(this._workerId, req, r, undefined));
        }, (e)=>{
            if (e.detail instanceof Error) // Loading errors have a detail property that points to the actual error
            e.detail = (0, $da7a53421655f39f$export$429f1291766e5908)(e.detail);
            this._send(new $121ec0291bdf5ebd$var$ReplyMessage(this._workerId, req, undefined, (0, $da7a53421655f39f$export$429f1291766e5908)(e)));
        });
    }
    _handleSubscribeEventMessage(msg) {
        const req = msg.req;
        const disposable = this._handler.handleEvent(msg.channel, msg.eventName, msg.arg)((event)=>{
            this._send(new $121ec0291bdf5ebd$var$EventMessage(this._workerId, req, event));
        });
        this._pendingEvents.set(req, disposable);
    }
    _handleEventMessage(msg) {
        if (!this._pendingEmitters.has(msg.req)) {
            console.warn('Got event for unknown req');
            return;
        }
        this._pendingEmitters.get(msg.req).fire(msg.event);
    }
    _handleUnsubscribeEventMessage(msg) {
        if (!this._pendingEvents.has(msg.req)) {
            console.warn('Got unsubscribe for unknown req');
            return;
        }
        this._pendingEvents.get(msg.req).dispose();
        this._pendingEvents.delete(msg.req);
    }
    _send(msg) {
        const transfer = [];
        if (msg.type === 0 /* MessageType.Request */ ) {
            for(let i = 0; i < msg.args.length; i++)if (msg.args[i] instanceof ArrayBuffer) transfer.push(msg.args[i]);
        } else if (msg.type === 1 /* MessageType.Reply */ ) {
            if (msg.res instanceof ArrayBuffer) transfer.push(msg.res);
        }
        this._handler.sendMessage(msg, transfer);
    }
}
class $121ec0291bdf5ebd$export$c4b1de8d391cba72 extends (0, $c817ee4fd79558e8$export$252720412a173de) {
    constructor(workerFactory, workerDescriptor){
        super();
        this._localChannels = new Map();
        this._worker = this._register(workerFactory.create({
            amdModuleId: 'vs/base/common/worker/simpleWorker',
            esmModuleLocation: workerDescriptor.esmModuleLocation,
            label: workerDescriptor.label
        }, (msg)=>{
            this._protocol.handleMessage(msg);
        }, (err)=>{
            // in Firefox, web workers fail lazily :(
            // we will reject the proxy
            (0, $da7a53421655f39f$export$fbc590487568d5a6)(err);
        }));
        this._protocol = new $121ec0291bdf5ebd$var$SimpleWorkerProtocol({
            sendMessage: (msg, transfer)=>{
                this._worker.postMessage(msg, transfer);
            },
            handleMessage: (channel, method, args)=>{
                return this._handleMessage(channel, method, args);
            },
            handleEvent: (channel, eventName, arg)=>{
                return this._handleEvent(channel, eventName, arg);
            }
        });
        this._protocol.setWorkerId(this._worker.getId());
        // Gather loader configuration
        let loaderConfiguration = null;
        const globalRequire = globalThis.require;
        if (typeof globalRequire !== 'undefined' && typeof globalRequire.getConfig === 'function') // Get the configuration from the Monaco AMD Loader
        loaderConfiguration = globalRequire.getConfig();
        else if (typeof globalThis.requirejs !== 'undefined') // Get the configuration from requirejs
        loaderConfiguration = globalThis.requirejs.s.contexts._.config;
        // Send initialize message
        this._onModuleLoaded = this._protocol.sendMessage($121ec0291bdf5ebd$var$DEFAULT_CHANNEL, $121ec0291bdf5ebd$var$INITIALIZE, [
            this._worker.getId(),
            JSON.parse(JSON.stringify(loaderConfiguration)),
            workerDescriptor.amdModuleId
        ]);
        this.proxy = this._protocol.createProxyToRemoteChannel($121ec0291bdf5ebd$var$DEFAULT_CHANNEL, async ()=>{
            await this._onModuleLoaded;
        });
        this._onModuleLoaded.catch((e)=>{
            this._onError('Worker failed to load ' + workerDescriptor.amdModuleId, e);
        });
    }
    _handleMessage(channelName, method, args) {
        const channel = this._localChannels.get(channelName);
        if (!channel) return Promise.reject(new Error(`Missing channel ${channelName} on main thread`));
        if (typeof channel[method] !== 'function') return Promise.reject(new Error(`Missing method ${method} on main thread channel ${channelName}`));
        try {
            return Promise.resolve(channel[method].apply(channel, args));
        } catch (e) {
            return Promise.reject(e);
        }
    }
    _handleEvent(channelName, eventName, arg) {
        const channel = this._localChannels.get(channelName);
        if (!channel) throw new Error(`Missing channel ${channelName} on main thread`);
        if ($121ec0291bdf5ebd$var$propertyIsDynamicEvent(eventName)) {
            const event = channel[eventName].call(channel, arg);
            if (typeof event !== 'function') throw new Error(`Missing dynamic event ${eventName} on main thread channel ${channelName}.`);
            return event;
        }
        if ($121ec0291bdf5ebd$var$propertyIsEvent(eventName)) {
            const event = channel[eventName];
            if (typeof event !== 'function') throw new Error(`Missing event ${eventName} on main thread channel ${channelName}.`);
            return event;
        }
        throw new Error(`Malformed event name ${eventName}`);
    }
    setChannel(channel, handler) {
        this._localChannels.set(channel, handler);
    }
    _onError(message, error) {
        console.error(message);
        console.info(error);
    }
}
function $121ec0291bdf5ebd$var$propertyIsEvent(name) {
    // Assume a property is an event if it has a form of "onSomething"
    return name[0] === 'o' && name[1] === 'n' && $88789e6252368c20$export$30bfb1359626e305(name.charCodeAt(2));
}
function $121ec0291bdf5ebd$var$propertyIsDynamicEvent(name) {
    // Assume a property is a dynamic event (a method that returns an event) if it has a form of "onDynamicSomething"
    return /^onDynamic/.test(name) && $88789e6252368c20$export$30bfb1359626e305(name.charCodeAt(9));
}
class $121ec0291bdf5ebd$export$fe78f12d00d1b03d {
    constructor(postMessage, requestHandlerFactory){
        this._localChannels = new Map();
        this._remoteChannels = new Map();
        this._requestHandlerFactory = requestHandlerFactory;
        this._requestHandler = null;
        this._protocol = new $121ec0291bdf5ebd$var$SimpleWorkerProtocol({
            sendMessage: (msg, transfer)=>{
                postMessage(msg, transfer);
            },
            handleMessage: (channel, method, args)=>this._handleMessage(channel, method, args),
            handleEvent: (channel, eventName, arg)=>this._handleEvent(channel, eventName, arg)
        });
    }
    onmessage(msg) {
        this._protocol.handleMessage(msg);
    }
    _handleMessage(channel, method, args) {
        if (channel === $121ec0291bdf5ebd$var$DEFAULT_CHANNEL && method === $121ec0291bdf5ebd$var$INITIALIZE) return this.initialize(args[0], args[1], args[2]);
        const requestHandler = channel === $121ec0291bdf5ebd$var$DEFAULT_CHANNEL ? this._requestHandler : this._localChannels.get(channel);
        if (!requestHandler) return Promise.reject(new Error(`Missing channel ${channel} on worker thread`));
        if (typeof requestHandler[method] !== 'function') return Promise.reject(new Error(`Missing method ${method} on worker thread channel ${channel}`));
        try {
            return Promise.resolve(requestHandler[method].apply(requestHandler, args));
        } catch (e) {
            return Promise.reject(e);
        }
    }
    _handleEvent(channel, eventName, arg) {
        const requestHandler = channel === $121ec0291bdf5ebd$var$DEFAULT_CHANNEL ? this._requestHandler : this._localChannels.get(channel);
        if (!requestHandler) throw new Error(`Missing channel ${channel} on worker thread`);
        if ($121ec0291bdf5ebd$var$propertyIsDynamicEvent(eventName)) {
            const event = requestHandler[eventName].call(requestHandler, arg);
            if (typeof event !== 'function') throw new Error(`Missing dynamic event ${eventName} on request handler.`);
            return event;
        }
        if ($121ec0291bdf5ebd$var$propertyIsEvent(eventName)) {
            const event = requestHandler[eventName];
            if (typeof event !== 'function') throw new Error(`Missing event ${eventName} on request handler.`);
            return event;
        }
        throw new Error(`Malformed event name ${eventName}`);
    }
    getChannel(channel) {
        if (!this._remoteChannels.has(channel)) {
            const inst = this._protocol.createProxyToRemoteChannel(channel);
            this._remoteChannels.set(channel, inst);
        }
        return this._remoteChannels.get(channel);
    }
    async initialize(workerId, loaderConfig, moduleId) {
        this._protocol.setWorkerId(workerId);
        if (this._requestHandlerFactory) {
            // static request handler
            this._requestHandler = this._requestHandlerFactory(this);
            return;
        }
        if (loaderConfig) {
            // Remove 'baseUrl', handling it is beyond scope for now
            if (typeof loaderConfig.baseUrl !== 'undefined') delete loaderConfig['baseUrl'];
            if (typeof loaderConfig.paths !== 'undefined') {
                if (typeof loaderConfig.paths.vs !== 'undefined') delete loaderConfig.paths['vs'];
            }
            if (typeof loaderConfig.trustedTypesPolicy !== 'undefined') // don't use, it has been destroyed during serialize
            delete loaderConfig['trustedTypesPolicy'];
            // Since this is in a web worker, enable catching errors
            loaderConfig.catchError = true;
            globalThis.require.config(loaderConfig);
        }
        if ($121ec0291bdf5ebd$var$isESM) {
            const url = (0, $58fba7516e2bbdb8$export$9d9d3e1f87d32a98).asBrowserUri(`${moduleId}.js`).toString(true);
            return import(`${url}`).then((module)=>{
                this._requestHandler = module.create(this);
                if (!this._requestHandler) throw new Error(`No RequestHandler!`);
            });
        }
        return new Promise((resolve, reject)=>{
            // Use the global require to be sure to get the global config
            // ESM-comment-begin
            // 			const req = (globalThis.require || require);
            // ESM-comment-end
            // ESM-uncomment-begin
            const req = globalThis.require;
            // ESM-uncomment-end
            req([
                moduleId
            ], (module)=>{
                this._requestHandler = module.create(this);
                if (!this._requestHandler) {
                    reject(new Error(`No RequestHandler!`));
                    return;
                }
                resolve();
            }, reject);
        });
    }
}
function $121ec0291bdf5ebd$export$185802fd694ee1f5(postMessage) {
    return new $121ec0291bdf5ebd$export$fe78f12d00d1b03d(postMessage, null);
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Represents information about a specific difference between two sequences.
 */ class $40b45ff5e7e81351$export$7ffab24b9fbeea53 {
    /**
     * Constructs a new DiffChange with the given sequence information
     * and content.
     */ constructor(originalStart, originalLength, modifiedStart, modifiedLength){
        //Debug.Assert(originalLength > 0 || modifiedLength > 0, "originalLength and modifiedLength cannot both be <= 0");
        this.originalStart = originalStart;
        this.originalLength = originalLength;
        this.modifiedStart = modifiedStart;
        this.modifiedLength = modifiedLength;
    }
    /**
     * The end point (exclusive) of the change in the original sequence.
     */ getOriginalEnd() {
        return this.originalStart + this.originalLength;
    }
    /**
     * The end point (exclusive) of the change in the modified sequence.
     */ getModifiedEnd() {
        return this.modifiedStart + this.modifiedLength;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
function $9c4fa676032c9b83$export$d6af199866bfb566(obj) {
    return $9c4fa676032c9b83$export$c085668325ced66c(obj, 0);
}
function $9c4fa676032c9b83$export$c085668325ced66c(obj, hashVal) {
    switch(typeof obj){
        case 'object':
            if (obj === null) return $9c4fa676032c9b83$export$a9844eb73de0a218(349, hashVal);
            else if (Array.isArray(obj)) return $9c4fa676032c9b83$var$arrayHash(obj, hashVal);
            return $9c4fa676032c9b83$var$objectHash(obj, hashVal);
        case 'string':
            return $9c4fa676032c9b83$export$b9b095ec8c02760b(obj, hashVal);
        case 'boolean':
            return $9c4fa676032c9b83$var$booleanHash(obj, hashVal);
        case 'number':
            return $9c4fa676032c9b83$export$a9844eb73de0a218(obj, hashVal);
        case 'undefined':
            return $9c4fa676032c9b83$export$a9844eb73de0a218(937, hashVal);
        default:
            return $9c4fa676032c9b83$export$a9844eb73de0a218(617, hashVal);
    }
}
function $9c4fa676032c9b83$export$a9844eb73de0a218(val, initialHashVal) {
    return (initialHashVal << 5) - initialHashVal + val | 0; // hashVal * 31 + ch, keep as int32
}
function $9c4fa676032c9b83$var$booleanHash(b, initialHashVal) {
    return $9c4fa676032c9b83$export$a9844eb73de0a218(b ? 433 : 863, initialHashVal);
}
function $9c4fa676032c9b83$export$b9b095ec8c02760b(s, hashVal) {
    hashVal = $9c4fa676032c9b83$export$a9844eb73de0a218(149417, hashVal);
    for(let i = 0, length = s.length; i < length; i++)hashVal = $9c4fa676032c9b83$export$a9844eb73de0a218(s.charCodeAt(i), hashVal);
    return hashVal;
}
function $9c4fa676032c9b83$var$arrayHash(arr, initialHashVal) {
    initialHashVal = $9c4fa676032c9b83$export$a9844eb73de0a218(104579, initialHashVal);
    return arr.reduce((hashVal, item)=>$9c4fa676032c9b83$export$c085668325ced66c(item, hashVal), initialHashVal);
}
function $9c4fa676032c9b83$var$objectHash(obj, initialHashVal) {
    initialHashVal = $9c4fa676032c9b83$export$a9844eb73de0a218(181387, initialHashVal);
    return Object.keys(obj).sort().reduce((hashVal, key)=>{
        hashVal = $9c4fa676032c9b83$export$b9b095ec8c02760b(key, hashVal);
        return $9c4fa676032c9b83$export$c085668325ced66c(obj[key], hashVal);
    }, initialHashVal);
}
function $9c4fa676032c9b83$var$leftRotate(value, bits, totalBits = 32) {
    // delta + bits = totalBits
    const delta = totalBits - bits;
    // All ones, expect `delta` zeros aligned to the right
    const mask = ~((1 << delta) - 1);
    // Join (value left-shifted `bits` bits) with (masked value right-shifted `delta` bits)
    return (value << bits | (mask & value) >>> delta) >>> 0;
}
function $9c4fa676032c9b83$var$fill(dest, index = 0, count = dest.byteLength, value = 0) {
    for(let i = 0; i < count; i++)dest[index + i] = value;
}
function $9c4fa676032c9b83$var$leftPad(value, length, char = '0') {
    while(value.length < length)value = char + value;
    return value;
}
function $9c4fa676032c9b83$export$f4915efbb94d4d01(bufferOrValue, bitsize = 32) {
    if (bufferOrValue instanceof ArrayBuffer) return Array.from(new Uint8Array(bufferOrValue)).map((b)=>b.toString(16).padStart(2, '0')).join('');
    return $9c4fa676032c9b83$var$leftPad((bufferOrValue >>> 0).toString(16), bitsize / 4);
}
class $9c4fa676032c9b83$export$7192dac9dc2e5b3d {
    static{
        this._bigBlock32 = new DataView(new ArrayBuffer(320));
    }
    constructor(){
        this._h0 = 0x67452301;
        this._h1 = 0xEFCDAB89;
        this._h2 = 0x98BADCFE;
        this._h3 = 0x10325476;
        this._h4 = 0xC3D2E1F0;
        this._buff = new Uint8Array(67 /* to fit any utf-8 */ );
        this._buffDV = new DataView(this._buff.buffer);
        this._buffLen = 0;
        this._totalLen = 0;
        this._leftoverHighSurrogate = 0;
        this._finished = false;
    }
    update(str) {
        const strLen = str.length;
        if (strLen === 0) return;
        const buff = this._buff;
        let buffLen = this._buffLen;
        let leftoverHighSurrogate = this._leftoverHighSurrogate;
        let charCode;
        let offset;
        if (leftoverHighSurrogate !== 0) {
            charCode = leftoverHighSurrogate;
            offset = -1;
            leftoverHighSurrogate = 0;
        } else {
            charCode = str.charCodeAt(0);
            offset = 0;
        }
        while(true){
            let codePoint = charCode;
            if ($88789e6252368c20$export$9be78f542969c681(charCode)) {
                if (offset + 1 < strLen) {
                    const nextCharCode = str.charCodeAt(offset + 1);
                    if ($88789e6252368c20$export$5b64095866343cd(nextCharCode)) {
                        offset++;
                        codePoint = $88789e6252368c20$export$769ca25c1e6d54a5(charCode, nextCharCode);
                    } else // illegal => unicode replacement character
                    codePoint = 65533 /* SHA1Constant.UNICODE_REPLACEMENT */ ;
                } else {
                    // last character is a surrogate pair
                    leftoverHighSurrogate = charCode;
                    break;
                }
            } else if ($88789e6252368c20$export$5b64095866343cd(charCode)) // illegal => unicode replacement character
            codePoint = 65533 /* SHA1Constant.UNICODE_REPLACEMENT */ ;
            buffLen = this._push(buff, buffLen, codePoint);
            offset++;
            if (offset < strLen) charCode = str.charCodeAt(offset);
            else break;
        }
        this._buffLen = buffLen;
        this._leftoverHighSurrogate = leftoverHighSurrogate;
    }
    _push(buff, buffLen, codePoint) {
        if (codePoint < 0x0080) buff[buffLen++] = codePoint;
        else if (codePoint < 0x0800) {
            buff[buffLen++] = 192 | (codePoint & 1984) >>> 6;
            buff[buffLen++] = 128 | (codePoint & 63) >>> 0;
        } else if (codePoint < 0x10000) {
            buff[buffLen++] = 224 | (codePoint & 61440) >>> 12;
            buff[buffLen++] = 128 | (codePoint & 4032) >>> 6;
            buff[buffLen++] = 128 | (codePoint & 63) >>> 0;
        } else {
            buff[buffLen++] = 240 | (codePoint & 1835008) >>> 18;
            buff[buffLen++] = 128 | (codePoint & 258048) >>> 12;
            buff[buffLen++] = 128 | (codePoint & 4032) >>> 6;
            buff[buffLen++] = 128 | (codePoint & 63) >>> 0;
        }
        if (buffLen >= 64 /* SHA1Constant.BLOCK_SIZE */ ) {
            this._step();
            buffLen -= 64 /* SHA1Constant.BLOCK_SIZE */ ;
            this._totalLen += 64 /* SHA1Constant.BLOCK_SIZE */ ;
            // take last 3 in case of UTF8 overflow
            buff[0] = buff[64];
            buff[1] = buff[65];
            buff[2] = buff[66];
        }
        return buffLen;
    }
    digest() {
        if (!this._finished) {
            this._finished = true;
            if (this._leftoverHighSurrogate) {
                // illegal => unicode replacement character
                this._leftoverHighSurrogate = 0;
                this._buffLen = this._push(this._buff, this._buffLen, 65533 /* SHA1Constant.UNICODE_REPLACEMENT */ );
            }
            this._totalLen += this._buffLen;
            this._wrapUp();
        }
        return $9c4fa676032c9b83$export$f4915efbb94d4d01(this._h0) + $9c4fa676032c9b83$export$f4915efbb94d4d01(this._h1) + $9c4fa676032c9b83$export$f4915efbb94d4d01(this._h2) + $9c4fa676032c9b83$export$f4915efbb94d4d01(this._h3) + $9c4fa676032c9b83$export$f4915efbb94d4d01(this._h4);
    }
    _wrapUp() {
        this._buff[this._buffLen++] = 0x80;
        $9c4fa676032c9b83$var$fill(this._buff, this._buffLen);
        if (this._buffLen > 56) {
            this._step();
            $9c4fa676032c9b83$var$fill(this._buff);
        }
        // this will fit because the mantissa can cover up to 52 bits
        const ml = 8 * this._totalLen;
        this._buffDV.setUint32(56, Math.floor(ml / 4294967296), false);
        this._buffDV.setUint32(60, ml % 4294967296, false);
        this._step();
    }
    _step() {
        const bigBlock32 = $9c4fa676032c9b83$export$7192dac9dc2e5b3d._bigBlock32;
        const data = this._buffDV;
        for(let j = 0; j < 64 /* 16*4 */ ; j += 4)bigBlock32.setUint32(j, data.getUint32(j, false), false);
        for(let j = 64; j < 320 /* 80*4 */ ; j += 4)bigBlock32.setUint32(j, $9c4fa676032c9b83$var$leftRotate(bigBlock32.getUint32(j - 12, false) ^ bigBlock32.getUint32(j - 32, false) ^ bigBlock32.getUint32(j - 56, false) ^ bigBlock32.getUint32(j - 64, false), 1), false);
        let a = this._h0;
        let b = this._h1;
        let c = this._h2;
        let d = this._h3;
        let e = this._h4;
        let f, k;
        let temp;
        for(let j = 0; j < 80; j++){
            if (j < 20) {
                f = b & c | ~b & d;
                k = 0x5A827999;
            } else if (j < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            } else if (j < 60) {
                f = b & c | b & d | c & d;
                k = 0x8F1BBCDC;
            } else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            temp = $9c4fa676032c9b83$var$leftRotate(a, 5) + f + e + k + bigBlock32.getUint32(j * 4, false) & 0xffffffff;
            e = d;
            d = c;
            c = $9c4fa676032c9b83$var$leftRotate(b, 30);
            b = a;
            a = temp;
        }
        this._h0 = this._h0 + a & 0xffffffff;
        this._h1 = this._h1 + b & 0xffffffff;
        this._h2 = this._h2 + c & 0xffffffff;
        this._h3 = this._h3 + d & 0xffffffff;
        this._h4 = this._h4 + e & 0xffffffff;
    }
}


class $1ea388bf6703bdba$export$5a9cc03ceca04ab8 {
    constructor(source){
        this.source = source;
    }
    getElements() {
        const source = this.source;
        const characters = new Int32Array(source.length);
        for(let i = 0, len = source.length; i < len; i++)characters[i] = source.charCodeAt(i);
        return characters;
    }
}
function $1ea388bf6703bdba$export$bd89d8a46320fa8b(original, modified, pretty) {
    return new $1ea388bf6703bdba$export$3bc348b9a4e4a6f5(new $1ea388bf6703bdba$export$5a9cc03ceca04ab8(original), new $1ea388bf6703bdba$export$5a9cc03ceca04ab8(modified)).ComputeDiff(pretty).changes;
}
//
// The code below has been ported from a C# implementation in VS
//
class $1ea388bf6703bdba$var$Debug {
    static Assert(condition, message) {
        if (!condition) throw new Error(message);
    }
}
class $1ea388bf6703bdba$var$MyArray {
    /**
     * Copies a range of elements from an Array starting at the specified source index and pastes
     * them to another Array starting at the specified destination index. The length and the indexes
     * are specified as 64-bit integers.
     * sourceArray:
     *		The Array that contains the data to copy.
     * sourceIndex:
     *		A 64-bit integer that represents the index in the sourceArray at which copying begins.
     * destinationArray:
     *		The Array that receives the data.
     * destinationIndex:
     *		A 64-bit integer that represents the index in the destinationArray at which storing begins.
     * length:
     *		A 64-bit integer that represents the number of elements to copy.
     */ static Copy(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        for(let i = 0; i < length; i++)destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
    }
    static Copy2(sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        for(let i = 0; i < length; i++)destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
    }
}
/**
 * A utility class which helps to create the set of DiffChanges from
 * a difference operation. This class accepts original DiffElements and
 * modified DiffElements that are involved in a particular change. The
 * MarkNextChange() method can be called to mark the separation between
 * distinct changes. At the end, the Changes property can be called to retrieve
 * the constructed changes.
 */ class $1ea388bf6703bdba$var$DiffChangeHelper {
    /**
     * Constructs a new DiffChangeHelper for the given DiffSequences.
     */ constructor(){
        this.m_changes = [];
        this.m_originalStart = 1073741824 /* Constants.MAX_SAFE_SMALL_INTEGER */ ;
        this.m_modifiedStart = 1073741824 /* Constants.MAX_SAFE_SMALL_INTEGER */ ;
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
    }
    /**
     * Marks the beginning of the next change in the set of differences.
     */ MarkNextChange() {
        // Only add to the list if there is something to add
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) // Add the new change to our list
        this.m_changes.push(new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount));
        // Reset for the next change
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
        this.m_originalStart = 1073741824 /* Constants.MAX_SAFE_SMALL_INTEGER */ ;
        this.m_modifiedStart = 1073741824 /* Constants.MAX_SAFE_SMALL_INTEGER */ ;
    }
    /**
     * Adds the original element at the given position to the elements
     * affected by the current change. The modified index gives context
     * to the change position with respect to the original sequence.
     * @param originalIndex The index of the original element to add.
     * @param modifiedIndex The index of the modified element that provides corresponding position in the modified sequence.
     */ AddOriginalElement(originalIndex, modifiedIndex) {
        // The 'true' start index is the smallest of the ones we've seen
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_originalCount++;
    }
    /**
     * Adds the modified element at the given position to the elements
     * affected by the current change. The original index gives context
     * to the change position with respect to the modified sequence.
     * @param originalIndex The index of the original element that provides corresponding position in the original sequence.
     * @param modifiedIndex The index of the modified element to add.
     */ AddModifiedElement(originalIndex, modifiedIndex) {
        // The 'true' start index is the smallest of the ones we've seen
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_modifiedCount++;
    }
    /**
     * Retrieves all of the changes marked by the class.
     */ getChanges() {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) // Finish up on whatever is left
        this.MarkNextChange();
        return this.m_changes;
    }
    /**
     * Retrieves all of the changes marked by the class in the reverse order
     */ getReverseChanges() {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) // Finish up on whatever is left
        this.MarkNextChange();
        this.m_changes.reverse();
        return this.m_changes;
    }
}
class $1ea388bf6703bdba$export$3bc348b9a4e4a6f5 {
    /**
     * Constructs the DiffFinder
     */ constructor(originalSequence, modifiedSequence, continueProcessingPredicate = null){
        this.ContinueProcessingPredicate = continueProcessingPredicate;
        this._originalSequence = originalSequence;
        this._modifiedSequence = modifiedSequence;
        const [originalStringElements, originalElementsOrHash, originalHasStrings] = $1ea388bf6703bdba$export$3bc348b9a4e4a6f5._getElements(originalSequence);
        const [modifiedStringElements, modifiedElementsOrHash, modifiedHasStrings] = $1ea388bf6703bdba$export$3bc348b9a4e4a6f5._getElements(modifiedSequence);
        this._hasStrings = originalHasStrings && modifiedHasStrings;
        this._originalStringElements = originalStringElements;
        this._originalElementsOrHash = originalElementsOrHash;
        this._modifiedStringElements = modifiedStringElements;
        this._modifiedElementsOrHash = modifiedElementsOrHash;
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
    }
    static _isStringArray(arr) {
        return arr.length > 0 && typeof arr[0] === 'string';
    }
    static _getElements(sequence) {
        const elements = sequence.getElements();
        if ($1ea388bf6703bdba$export$3bc348b9a4e4a6f5._isStringArray(elements)) {
            const hashes = new Int32Array(elements.length);
            for(let i = 0, len = elements.length; i < len; i++)hashes[i] = (0, $9c4fa676032c9b83$export$b9b095ec8c02760b)(elements[i], 0);
            return [
                elements,
                hashes,
                true
            ];
        }
        if (elements instanceof Int32Array) return [
            [],
            elements,
            false
        ];
        return [
            [],
            new Int32Array(elements),
            false
        ];
    }
    ElementsAreEqual(originalIndex, newIndex) {
        if (this._originalElementsOrHash[originalIndex] !== this._modifiedElementsOrHash[newIndex]) return false;
        return this._hasStrings ? this._originalStringElements[originalIndex] === this._modifiedStringElements[newIndex] : true;
    }
    ElementsAreStrictEqual(originalIndex, newIndex) {
        if (!this.ElementsAreEqual(originalIndex, newIndex)) return false;
        const originalElement = $1ea388bf6703bdba$export$3bc348b9a4e4a6f5._getStrictElement(this._originalSequence, originalIndex);
        const modifiedElement = $1ea388bf6703bdba$export$3bc348b9a4e4a6f5._getStrictElement(this._modifiedSequence, newIndex);
        return originalElement === modifiedElement;
    }
    static _getStrictElement(sequence, index) {
        if (typeof sequence.getStrictElement === 'function') return sequence.getStrictElement(index);
        return null;
    }
    OriginalElementsAreEqual(index1, index2) {
        if (this._originalElementsOrHash[index1] !== this._originalElementsOrHash[index2]) return false;
        return this._hasStrings ? this._originalStringElements[index1] === this._originalStringElements[index2] : true;
    }
    ModifiedElementsAreEqual(index1, index2) {
        if (this._modifiedElementsOrHash[index1] !== this._modifiedElementsOrHash[index2]) return false;
        return this._hasStrings ? this._modifiedStringElements[index1] === this._modifiedStringElements[index2] : true;
    }
    ComputeDiff(pretty) {
        return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, pretty);
    }
    /**
     * Computes the differences between the original and modified input
     * sequences on the bounded range.
     * @returns An array of the differences between the two input sequences.
     */ _ComputeDiff(originalStart, originalEnd, modifiedStart, modifiedEnd, pretty) {
        const quitEarlyArr = [
            false
        ];
        let changes = this.ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr);
        if (pretty) // We have to clean up the computed diff to be more intuitive
        // but it turns out this cannot be done correctly until the entire set
        // of diffs have been computed
        changes = this.PrettifyChanges(changes);
        return {
            quitEarly: quitEarlyArr[0],
            changes: changes
        };
    }
    /**
     * Private helper method which computes the differences on the bounded range
     * recursively.
     * @returns An array of the differences between the two input sequences.
     */ ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr) {
        quitEarlyArr[0] = false;
        // Find the start of the differences
        while(originalStart <= originalEnd && modifiedStart <= modifiedEnd && this.ElementsAreEqual(originalStart, modifiedStart)){
            originalStart++;
            modifiedStart++;
        }
        // Find the end of the differences
        while(originalEnd >= originalStart && modifiedEnd >= modifiedStart && this.ElementsAreEqual(originalEnd, modifiedEnd)){
            originalEnd--;
            modifiedEnd--;
        }
        // In the special case where we either have all insertions or all deletions or the sequences are identical
        if (originalStart > originalEnd || modifiedStart > modifiedEnd) {
            let changes;
            if (modifiedStart <= modifiedEnd) {
                $1ea388bf6703bdba$var$Debug.Assert(originalStart === originalEnd + 1, 'originalStart should only be one more than originalEnd');
                // All insertions
                changes = [
                    new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(originalStart, 0, modifiedStart, modifiedEnd - modifiedStart + 1)
                ];
            } else if (originalStart <= originalEnd) {
                $1ea388bf6703bdba$var$Debug.Assert(modifiedStart === modifiedEnd + 1, 'modifiedStart should only be one more than modifiedEnd');
                // All deletions
                changes = [
                    new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(originalStart, originalEnd - originalStart + 1, modifiedStart, 0)
                ];
            } else {
                $1ea388bf6703bdba$var$Debug.Assert(originalStart === originalEnd + 1, 'originalStart should only be one more than originalEnd');
                $1ea388bf6703bdba$var$Debug.Assert(modifiedStart === modifiedEnd + 1, 'modifiedStart should only be one more than modifiedEnd');
                // Identical sequences - No differences
                changes = [];
            }
            return changes;
        }
        // This problem can be solved using the Divide-And-Conquer technique.
        const midOriginalArr = [
            0
        ];
        const midModifiedArr = [
            0
        ];
        const result = this.ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr);
        const midOriginal = midOriginalArr[0];
        const midModified = midModifiedArr[0];
        if (result !== null) // Result is not-null when there was enough memory to compute the changes while
        // searching for the recursion point
        return result;
        else if (!quitEarlyArr[0]) {
            // We can break the problem down recursively by finding the changes in the
            // First Half:   (originalStart, modifiedStart) to (midOriginal, midModified)
            // Second Half:  (midOriginal + 1, minModified + 1) to (originalEnd, modifiedEnd)
            // NOTE: ComputeDiff() is inclusive, therefore the second range starts on the next point
            const leftChanges = this.ComputeDiffRecursive(originalStart, midOriginal, modifiedStart, midModified, quitEarlyArr);
            let rightChanges = [];
            if (!quitEarlyArr[0]) rightChanges = this.ComputeDiffRecursive(midOriginal + 1, originalEnd, midModified + 1, modifiedEnd, quitEarlyArr);
            else // We didn't have time to finish the first half, so we don't have time to compute this half.
            // Consider the entire rest of the sequence different.
            rightChanges = [
                new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(midOriginal + 1, originalEnd - (midOriginal + 1) + 1, midModified + 1, modifiedEnd - (midModified + 1) + 1)
            ];
            return this.ConcatenateChanges(leftChanges, rightChanges);
        }
        // If we hit here, we quit early, and so can't return anything meaningful
        return [
            new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)
        ];
    }
    WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr) {
        let forwardChanges = null;
        let reverseChanges = null;
        // First, walk backward through the forward diagonals history
        let changeHelper = new $1ea388bf6703bdba$var$DiffChangeHelper();
        let diagonalMin = diagonalForwardStart;
        let diagonalMax = diagonalForwardEnd;
        let diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalForwardOffset;
        let lastOriginalIndex = -1073741824 /* Constants.MIN_SAFE_SMALL_INTEGER */ ;
        let historyIndex = this.m_forwardHistory.length - 1;
        do {
            // Get the diagonal index from the relative diagonal number
            const diagonal = diagonalRelative + diagonalForwardBase;
            // Figure out where we came from
            if (diagonal === diagonalMin || diagonal < diagonalMax && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
                // Vertical line (the element is an insert)
                originalIndex = forwardPoints[diagonal + 1];
                modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
                if (originalIndex < lastOriginalIndex) changeHelper.MarkNextChange();
                lastOriginalIndex = originalIndex;
                changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex);
                diagonalRelative = diagonal + 1 - diagonalForwardBase; //Setup for the next iteration
            } else {
                // Horizontal line (the element is a deletion)
                originalIndex = forwardPoints[diagonal - 1] + 1;
                modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
                if (originalIndex < lastOriginalIndex) changeHelper.MarkNextChange();
                lastOriginalIndex = originalIndex - 1;
                changeHelper.AddOriginalElement(originalIndex, modifiedIndex + 1);
                diagonalRelative = diagonal - 1 - diagonalForwardBase; //Setup for the next iteration
            }
            if (historyIndex >= 0) {
                forwardPoints = this.m_forwardHistory[historyIndex];
                diagonalForwardBase = forwardPoints[0]; //We stored this in the first spot
                diagonalMin = 1;
                diagonalMax = forwardPoints.length - 1;
            }
        }while (--historyIndex >= -1);
        // Ironically, we get the forward changes as the reverse of the
        // order we added them since we technically added them backwards
        forwardChanges = changeHelper.getReverseChanges();
        if (quitEarlyArr[0]) {
            // TODO: Calculate a partial from the reverse diagonals.
            //       For now, just assume everything after the midOriginal/midModified point is a diff
            let originalStartPoint = midOriginalArr[0] + 1;
            let modifiedStartPoint = midModifiedArr[0] + 1;
            if (forwardChanges !== null && forwardChanges.length > 0) {
                const lastForwardChange = forwardChanges[forwardChanges.length - 1];
                originalStartPoint = Math.max(originalStartPoint, lastForwardChange.getOriginalEnd());
                modifiedStartPoint = Math.max(modifiedStartPoint, lastForwardChange.getModifiedEnd());
            }
            reverseChanges = [
                new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(originalStartPoint, originalEnd - originalStartPoint + 1, modifiedStartPoint, modifiedEnd - modifiedStartPoint + 1)
            ];
        } else {
            // Now walk backward through the reverse diagonals history
            changeHelper = new $1ea388bf6703bdba$var$DiffChangeHelper();
            diagonalMin = diagonalReverseStart;
            diagonalMax = diagonalReverseEnd;
            diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalReverseOffset;
            lastOriginalIndex = 1073741824 /* Constants.MAX_SAFE_SMALL_INTEGER */ ;
            historyIndex = deltaIsEven ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
            do {
                // Get the diagonal index from the relative diagonal number
                const diagonal = diagonalRelative + diagonalReverseBase;
                // Figure out where we came from
                if (diagonal === diagonalMin || diagonal < diagonalMax && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
                    // Horizontal line (the element is a deletion))
                    originalIndex = reversePoints[diagonal + 1] - 1;
                    modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
                    if (originalIndex > lastOriginalIndex) changeHelper.MarkNextChange();
                    lastOriginalIndex = originalIndex + 1;
                    changeHelper.AddOriginalElement(originalIndex + 1, modifiedIndex + 1);
                    diagonalRelative = diagonal + 1 - diagonalReverseBase; //Setup for the next iteration
                } else {
                    // Vertical line (the element is an insertion)
                    originalIndex = reversePoints[diagonal - 1];
                    modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
                    if (originalIndex > lastOriginalIndex) changeHelper.MarkNextChange();
                    lastOriginalIndex = originalIndex;
                    changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex + 1);
                    diagonalRelative = diagonal - 1 - diagonalReverseBase; //Setup for the next iteration
                }
                if (historyIndex >= 0) {
                    reversePoints = this.m_reverseHistory[historyIndex];
                    diagonalReverseBase = reversePoints[0]; //We stored this in the first spot
                    diagonalMin = 1;
                    diagonalMax = reversePoints.length - 1;
                }
            }while (--historyIndex >= -1);
            // There are cases where the reverse history will find diffs that
            // are correct, but not intuitive, so we need shift them.
            reverseChanges = changeHelper.getChanges();
        }
        return this.ConcatenateChanges(forwardChanges, reverseChanges);
    }
    /**
     * Given the range to compute the diff on, this method finds the point:
     * (midOriginal, midModified)
     * that exists in the middle of the LCS of the two sequences and
     * is the point at which the LCS problem may be broken down recursively.
     * This method will try to keep the LCS trace in memory. If the LCS recursion
     * point is calculated and the full trace is available in memory, then this method
     * will return the change list.
     * @param originalStart The start bound of the original sequence range
     * @param originalEnd The end bound of the original sequence range
     * @param modifiedStart The start bound of the modified sequence range
     * @param modifiedEnd The end bound of the modified sequence range
     * @param midOriginal The middle point of the original sequence range
     * @param midModified The middle point of the modified sequence range
     * @returns The diff changes, if available, otherwise null
     */ ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr) {
        let originalIndex = 0, modifiedIndex = 0;
        let diagonalForwardStart = 0, diagonalForwardEnd = 0;
        let diagonalReverseStart = 0, diagonalReverseEnd = 0;
        // To traverse the edit graph and produce the proper LCS, our actual
        // start position is just outside the given boundary
        originalStart--;
        modifiedStart--;
        // We set these up to make the compiler happy, but they will
        // be replaced before we return with the actual recursion point
        midOriginalArr[0] = 0;
        midModifiedArr[0] = 0;
        // Clear out the history
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
        // Each cell in the two arrays corresponds to a diagonal in the edit graph.
        // The integer value in the cell represents the originalIndex of the furthest
        // reaching point found so far that ends in that diagonal.
        // The modifiedIndex can be computed mathematically from the originalIndex and the diagonal number.
        const maxDifferences = originalEnd - originalStart + (modifiedEnd - modifiedStart);
        const numDiagonals = maxDifferences + 1;
        const forwardPoints = new Int32Array(numDiagonals);
        const reversePoints = new Int32Array(numDiagonals);
        // diagonalForwardBase: Index into forwardPoints of the diagonal which passes through (originalStart, modifiedStart)
        // diagonalReverseBase: Index into reversePoints of the diagonal which passes through (originalEnd, modifiedEnd)
        const diagonalForwardBase = modifiedEnd - modifiedStart;
        const diagonalReverseBase = originalEnd - originalStart;
        // diagonalForwardOffset: Geometric offset which allows modifiedIndex to be computed from originalIndex and the
        //    diagonal number (relative to diagonalForwardBase)
        // diagonalReverseOffset: Geometric offset which allows modifiedIndex to be computed from originalIndex and the
        //    diagonal number (relative to diagonalReverseBase)
        const diagonalForwardOffset = originalStart - modifiedStart;
        const diagonalReverseOffset = originalEnd - modifiedEnd;
        // delta: The difference between the end diagonal and the start diagonal. This is used to relate diagonal numbers
        //   relative to the start diagonal with diagonal numbers relative to the end diagonal.
        // The Even/Oddn-ness of this delta is important for determining when we should check for overlap
        const delta = diagonalReverseBase - diagonalForwardBase;
        const deltaIsEven = delta % 2 === 0;
        // Here we set up the start and end points as the furthest points found so far
        // in both the forward and reverse directions, respectively
        forwardPoints[diagonalForwardBase] = originalStart;
        reversePoints[diagonalReverseBase] = originalEnd;
        // Remember if we quit early, and thus need to do a best-effort result instead of a real result.
        quitEarlyArr[0] = false;
        // A couple of points:
        // --With this method, we iterate on the number of differences between the two sequences.
        //   The more differences there actually are, the longer this will take.
        // --Also, as the number of differences increases, we have to search on diagonals further
        //   away from the reference diagonal (which is diagonalForwardBase for forward, diagonalReverseBase for reverse).
        // --We extend on even diagonals (relative to the reference diagonal) only when numDifferences
        //   is even and odd diagonals only when numDifferences is odd.
        for(let numDifferences = 1; numDifferences <= maxDifferences / 2 + 1; numDifferences++){
            let furthestOriginalIndex = 0;
            let furthestModifiedIndex = 0;
            // Run the algorithm in the forward direction
            diagonalForwardStart = this.ClipDiagonalBound(diagonalForwardBase - numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
            diagonalForwardEnd = this.ClipDiagonalBound(diagonalForwardBase + numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
            for(let diagonal = diagonalForwardStart; diagonal <= diagonalForwardEnd; diagonal += 2){
                // STEP 1: We extend the furthest reaching point in the present diagonal
                // by looking at the diagonals above and below and picking the one whose point
                // is further away from the start point (originalStart, modifiedStart)
                if (diagonal === diagonalForwardStart || diagonal < diagonalForwardEnd && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) originalIndex = forwardPoints[diagonal + 1];
                else originalIndex = forwardPoints[diagonal - 1] + 1;
                modifiedIndex = originalIndex - (diagonal - diagonalForwardBase) - diagonalForwardOffset;
                // Save the current originalIndex so we can test for false overlap in step 3
                const tempOriginalIndex = originalIndex;
                // STEP 2: We can continue to extend the furthest reaching point in the present diagonal
                // so long as the elements are equal.
                while(originalIndex < originalEnd && modifiedIndex < modifiedEnd && this.ElementsAreEqual(originalIndex + 1, modifiedIndex + 1)){
                    originalIndex++;
                    modifiedIndex++;
                }
                forwardPoints[diagonal] = originalIndex;
                if (originalIndex + modifiedIndex > furthestOriginalIndex + furthestModifiedIndex) {
                    furthestOriginalIndex = originalIndex;
                    furthestModifiedIndex = modifiedIndex;
                }
                // STEP 3: If delta is odd (overlap first happens on forward when delta is odd)
                // and diagonal is in the range of reverse diagonals computed for numDifferences-1
                // (the previous iteration; we haven't computed reverse diagonals for numDifferences yet)
                // then check for overlap.
                if (!deltaIsEven && Math.abs(diagonal - diagonalReverseBase) <= numDifferences - 1) {
                    if (originalIndex >= reversePoints[diagonal]) {
                        midOriginalArr[0] = originalIndex;
                        midModifiedArr[0] = modifiedIndex;
                        if (tempOriginalIndex <= reversePoints[diagonal] && true && numDifferences <= 1448) // BINGO! We overlapped, and we have the full trace in memory!
                        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                        else // Either false overlap, or we didn't have enough memory for the full trace
                        // Just return the recursion point
                        return null;
                    }
                }
            }
            // Check to see if we should be quitting early, before moving on to the next iteration.
            const matchLengthOfLongest = (furthestOriginalIndex - originalStart + (furthestModifiedIndex - modifiedStart) - numDifferences) / 2;
            if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(furthestOriginalIndex, matchLengthOfLongest)) {
                // We can't finish, so skip ahead to generating a result from what we have.
                quitEarlyArr[0] = true;
                // Use the furthest distance we got in the forward direction.
                midOriginalArr[0] = furthestOriginalIndex;
                midModifiedArr[0] = furthestModifiedIndex;
                if (matchLengthOfLongest > 0 && true && numDifferences <= 1448) // Enough of the history is in memory to walk it backwards
                return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                else {
                    // We didn't actually remember enough of the history.
                    //Since we are quitting the diff early, we need to shift back the originalStart and modified start
                    //back into the boundary limits since we decremented their value above beyond the boundary limit.
                    originalStart++;
                    modifiedStart++;
                    return [
                        new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)
                    ];
                }
            }
            // Run the algorithm in the reverse direction
            diagonalReverseStart = this.ClipDiagonalBound(diagonalReverseBase - numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
            diagonalReverseEnd = this.ClipDiagonalBound(diagonalReverseBase + numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
            for(let diagonal = diagonalReverseStart; diagonal <= diagonalReverseEnd; diagonal += 2){
                // STEP 1: We extend the furthest reaching point in the present diagonal
                // by looking at the diagonals above and below and picking the one whose point
                // is further away from the start point (originalEnd, modifiedEnd)
                if (diagonal === diagonalReverseStart || diagonal < diagonalReverseEnd && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) originalIndex = reversePoints[diagonal + 1] - 1;
                else originalIndex = reversePoints[diagonal - 1];
                modifiedIndex = originalIndex - (diagonal - diagonalReverseBase) - diagonalReverseOffset;
                // Save the current originalIndex so we can test for false overlap
                const tempOriginalIndex = originalIndex;
                // STEP 2: We can continue to extend the furthest reaching point in the present diagonal
                // as long as the elements are equal.
                while(originalIndex > originalStart && modifiedIndex > modifiedStart && this.ElementsAreEqual(originalIndex, modifiedIndex)){
                    originalIndex--;
                    modifiedIndex--;
                }
                reversePoints[diagonal] = originalIndex;
                // STEP 4: If delta is even (overlap first happens on reverse when delta is even)
                // and diagonal is in the range of forward diagonals computed for numDifferences
                // then check for overlap.
                if (deltaIsEven && Math.abs(diagonal - diagonalForwardBase) <= numDifferences) {
                    if (originalIndex <= forwardPoints[diagonal]) {
                        midOriginalArr[0] = originalIndex;
                        midModifiedArr[0] = modifiedIndex;
                        if (tempOriginalIndex >= forwardPoints[diagonal] && true && numDifferences <= 1448) // BINGO! We overlapped, and we have the full trace in memory!
                        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                        else // Either false overlap, or we didn't have enough memory for the full trace
                        // Just return the recursion point
                        return null;
                    }
                }
            }
            // Save current vectors to history before the next iteration
            if (numDifferences <= 1447 /* LocalConstants.MaxDifferencesHistory */ ) {
                // We are allocating space for one extra int, which we fill with
                // the index of the diagonal base index
                let temp = new Int32Array(diagonalForwardEnd - diagonalForwardStart + 2);
                temp[0] = diagonalForwardBase - diagonalForwardStart + 1;
                $1ea388bf6703bdba$var$MyArray.Copy2(forwardPoints, diagonalForwardStart, temp, 1, diagonalForwardEnd - diagonalForwardStart + 1);
                this.m_forwardHistory.push(temp);
                temp = new Int32Array(diagonalReverseEnd - diagonalReverseStart + 2);
                temp[0] = diagonalReverseBase - diagonalReverseStart + 1;
                $1ea388bf6703bdba$var$MyArray.Copy2(reversePoints, diagonalReverseStart, temp, 1, diagonalReverseEnd - diagonalReverseStart + 1);
                this.m_reverseHistory.push(temp);
            }
        }
        // If we got here, then we have the full trace in history. We just have to convert it to a change list
        // NOTE: This part is a bit messy
        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
    }
    /**
     * Shifts the given changes to provide a more intuitive diff.
     * While the first element in a diff matches the first element after the diff,
     * we shift the diff down.
     *
     * @param changes The list of changes to shift
     * @returns The shifted changes
     */ PrettifyChanges(changes) {
        // Shift all the changes down first
        for(let i = 0; i < changes.length; i++){
            const change = changes[i];
            const originalStop = i < changes.length - 1 ? changes[i + 1].originalStart : this._originalElementsOrHash.length;
            const modifiedStop = i < changes.length - 1 ? changes[i + 1].modifiedStart : this._modifiedElementsOrHash.length;
            const checkOriginal = change.originalLength > 0;
            const checkModified = change.modifiedLength > 0;
            while(change.originalStart + change.originalLength < originalStop && change.modifiedStart + change.modifiedLength < modifiedStop && (!checkOriginal || this.OriginalElementsAreEqual(change.originalStart, change.originalStart + change.originalLength)) && (!checkModified || this.ModifiedElementsAreEqual(change.modifiedStart, change.modifiedStart + change.modifiedLength))){
                const startStrictEqual = this.ElementsAreStrictEqual(change.originalStart, change.modifiedStart);
                const endStrictEqual = this.ElementsAreStrictEqual(change.originalStart + change.originalLength, change.modifiedStart + change.modifiedLength);
                if (endStrictEqual && !startStrictEqual) break;
                change.originalStart++;
                change.modifiedStart++;
            }
            const mergedChangeArr = [
                null
            ];
            if (i < changes.length - 1 && this.ChangesOverlap(changes[i], changes[i + 1], mergedChangeArr)) {
                changes[i] = mergedChangeArr[0];
                changes.splice(i + 1, 1);
                i--;
                continue;
            }
        }
        // Shift changes back up until we hit empty or whitespace-only lines
        for(let i = changes.length - 1; i >= 0; i--){
            const change = changes[i];
            let originalStop = 0;
            let modifiedStop = 0;
            if (i > 0) {
                const prevChange = changes[i - 1];
                originalStop = prevChange.originalStart + prevChange.originalLength;
                modifiedStop = prevChange.modifiedStart + prevChange.modifiedLength;
            }
            const checkOriginal = change.originalLength > 0;
            const checkModified = change.modifiedLength > 0;
            let bestDelta = 0;
            let bestScore = this._boundaryScore(change.originalStart, change.originalLength, change.modifiedStart, change.modifiedLength);
            for(let delta = 1;; delta++){
                const originalStart = change.originalStart - delta;
                const modifiedStart = change.modifiedStart - delta;
                if (originalStart < originalStop || modifiedStart < modifiedStop) break;
                if (checkOriginal && !this.OriginalElementsAreEqual(originalStart, originalStart + change.originalLength)) break;
                if (checkModified && !this.ModifiedElementsAreEqual(modifiedStart, modifiedStart + change.modifiedLength)) break;
                const touchingPreviousChange = originalStart === originalStop && modifiedStart === modifiedStop;
                const score = (touchingPreviousChange ? 5 : 0) + this._boundaryScore(originalStart, change.originalLength, modifiedStart, change.modifiedLength);
                if (score > bestScore) {
                    bestScore = score;
                    bestDelta = delta;
                }
            }
            change.originalStart -= bestDelta;
            change.modifiedStart -= bestDelta;
            const mergedChangeArr = [
                null
            ];
            if (i > 0 && this.ChangesOverlap(changes[i - 1], changes[i], mergedChangeArr)) {
                changes[i - 1] = mergedChangeArr[0];
                changes.splice(i, 1);
                i++;
                continue;
            }
        }
        // There could be multiple longest common substrings.
        // Give preference to the ones containing longer lines
        if (this._hasStrings) for(let i = 1, len = changes.length; i < len; i++){
            const aChange = changes[i - 1];
            const bChange = changes[i];
            const matchedLength = bChange.originalStart - aChange.originalStart - aChange.originalLength;
            const aOriginalStart = aChange.originalStart;
            const bOriginalEnd = bChange.originalStart + bChange.originalLength;
            const abOriginalLength = bOriginalEnd - aOriginalStart;
            const aModifiedStart = aChange.modifiedStart;
            const bModifiedEnd = bChange.modifiedStart + bChange.modifiedLength;
            const abModifiedLength = bModifiedEnd - aModifiedStart;
            // Avoid wasting a lot of time with these searches
            if (matchedLength < 5 && abOriginalLength < 20 && abModifiedLength < 20) {
                const t = this._findBetterContiguousSequence(aOriginalStart, abOriginalLength, aModifiedStart, abModifiedLength, matchedLength);
                if (t) {
                    const [originalMatchStart, modifiedMatchStart] = t;
                    if (originalMatchStart !== aChange.originalStart + aChange.originalLength || modifiedMatchStart !== aChange.modifiedStart + aChange.modifiedLength) {
                        // switch to another sequence that has a better score
                        aChange.originalLength = originalMatchStart - aChange.originalStart;
                        aChange.modifiedLength = modifiedMatchStart - aChange.modifiedStart;
                        bChange.originalStart = originalMatchStart + matchedLength;
                        bChange.modifiedStart = modifiedMatchStart + matchedLength;
                        bChange.originalLength = bOriginalEnd - bChange.originalStart;
                        bChange.modifiedLength = bModifiedEnd - bChange.modifiedStart;
                    }
                }
            }
        }
        return changes;
    }
    _findBetterContiguousSequence(originalStart, originalLength, modifiedStart, modifiedLength, desiredLength) {
        if (originalLength < desiredLength || modifiedLength < desiredLength) return null;
        const originalMax = originalStart + originalLength - desiredLength + 1;
        const modifiedMax = modifiedStart + modifiedLength - desiredLength + 1;
        let bestScore = 0;
        let bestOriginalStart = 0;
        let bestModifiedStart = 0;
        for(let i = originalStart; i < originalMax; i++)for(let j = modifiedStart; j < modifiedMax; j++){
            const score = this._contiguousSequenceScore(i, j, desiredLength);
            if (score > 0 && score > bestScore) {
                bestScore = score;
                bestOriginalStart = i;
                bestModifiedStart = j;
            }
        }
        if (bestScore > 0) return [
            bestOriginalStart,
            bestModifiedStart
        ];
        return null;
    }
    _contiguousSequenceScore(originalStart, modifiedStart, length) {
        let score = 0;
        for(let l = 0; l < length; l++){
            if (!this.ElementsAreEqual(originalStart + l, modifiedStart + l)) return 0;
            score += this._originalStringElements[originalStart + l].length;
        }
        return score;
    }
    _OriginalIsBoundary(index) {
        if (index <= 0 || index >= this._originalElementsOrHash.length - 1) return true;
        return this._hasStrings && /^\s*$/.test(this._originalStringElements[index]);
    }
    _OriginalRegionIsBoundary(originalStart, originalLength) {
        if (this._OriginalIsBoundary(originalStart) || this._OriginalIsBoundary(originalStart - 1)) return true;
        if (originalLength > 0) {
            const originalEnd = originalStart + originalLength;
            if (this._OriginalIsBoundary(originalEnd - 1) || this._OriginalIsBoundary(originalEnd)) return true;
        }
        return false;
    }
    _ModifiedIsBoundary(index) {
        if (index <= 0 || index >= this._modifiedElementsOrHash.length - 1) return true;
        return this._hasStrings && /^\s*$/.test(this._modifiedStringElements[index]);
    }
    _ModifiedRegionIsBoundary(modifiedStart, modifiedLength) {
        if (this._ModifiedIsBoundary(modifiedStart) || this._ModifiedIsBoundary(modifiedStart - 1)) return true;
        if (modifiedLength > 0) {
            const modifiedEnd = modifiedStart + modifiedLength;
            if (this._ModifiedIsBoundary(modifiedEnd - 1) || this._ModifiedIsBoundary(modifiedEnd)) return true;
        }
        return false;
    }
    _boundaryScore(originalStart, originalLength, modifiedStart, modifiedLength) {
        const originalScore = this._OriginalRegionIsBoundary(originalStart, originalLength) ? 1 : 0;
        const modifiedScore = this._ModifiedRegionIsBoundary(modifiedStart, modifiedLength) ? 1 : 0;
        return originalScore + modifiedScore;
    }
    /**
     * Concatenates the two input DiffChange lists and returns the resulting
     * list.
     * @param The left changes
     * @param The right changes
     * @returns The concatenated list
     */ ConcatenateChanges(left, right) {
        const mergedChangeArr = [];
        if (left.length === 0 || right.length === 0) return right.length > 0 ? right : left;
        else if (this.ChangesOverlap(left[left.length - 1], right[0], mergedChangeArr)) {
            // Since we break the problem down recursively, it is possible that we
            // might recurse in the middle of a change thereby splitting it into
            // two changes. Here in the combining stage, we detect and fuse those
            // changes back together
            const result = new Array(left.length + right.length - 1);
            $1ea388bf6703bdba$var$MyArray.Copy(left, 0, result, 0, left.length - 1);
            result[left.length - 1] = mergedChangeArr[0];
            $1ea388bf6703bdba$var$MyArray.Copy(right, 1, result, left.length, right.length - 1);
            return result;
        } else {
            const result = new Array(left.length + right.length);
            $1ea388bf6703bdba$var$MyArray.Copy(left, 0, result, 0, left.length);
            $1ea388bf6703bdba$var$MyArray.Copy(right, 0, result, left.length, right.length);
            return result;
        }
    }
    /**
     * Returns true if the two changes overlap and can be merged into a single
     * change
     * @param left The left change
     * @param right The right change
     * @param mergedChange The merged change if the two overlap, null otherwise
     * @returns True if the two changes overlap
     */ ChangesOverlap(left, right, mergedChangeArr) {
        $1ea388bf6703bdba$var$Debug.Assert(left.originalStart <= right.originalStart, 'Left change is not less than or equal to right change');
        $1ea388bf6703bdba$var$Debug.Assert(left.modifiedStart <= right.modifiedStart, 'Left change is not less than or equal to right change');
        if (left.originalStart + left.originalLength >= right.originalStart || left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
            const originalStart = left.originalStart;
            let originalLength = left.originalLength;
            const modifiedStart = left.modifiedStart;
            let modifiedLength = left.modifiedLength;
            if (left.originalStart + left.originalLength >= right.originalStart) originalLength = right.originalStart + right.originalLength - left.originalStart;
            if (left.modifiedStart + left.modifiedLength >= right.modifiedStart) modifiedLength = right.modifiedStart + right.modifiedLength - left.modifiedStart;
            mergedChangeArr[0] = new (0, $40b45ff5e7e81351$export$7ffab24b9fbeea53)(originalStart, originalLength, modifiedStart, modifiedLength);
            return true;
        } else {
            mergedChangeArr[0] = null;
            return false;
        }
    }
    /**
     * Helper method used to clip a diagonal index to the range of valid
     * diagonals. This also decides whether or not the diagonal index,
     * if it exceeds the boundary, should be clipped to the boundary or clipped
     * one inside the boundary depending on the Even/Odd status of the boundary
     * and numDifferences.
     * @param diagonal The index of the diagonal to clip.
     * @param numDifferences The current number of differences being iterated upon.
     * @param diagonalBaseIndex The base reference diagonal.
     * @param numDiagonals The total number of diagonals.
     * @returns The clipped diagonal index.
     */ ClipDiagonalBound(diagonal, numDifferences, diagonalBaseIndex, numDiagonals) {
        if (diagonal >= 0 && diagonal < numDiagonals) // Nothing to clip, its in range
        return diagonal;
        // diagonalsBelow: The number of diagonals below the reference diagonal
        // diagonalsAbove: The number of diagonals above the reference diagonal
        const diagonalsBelow = diagonalBaseIndex;
        const diagonalsAbove = numDiagonals - diagonalBaseIndex - 1;
        const diffEven = numDifferences % 2 === 0;
        if (diagonal < 0) {
            const lowerBoundEven = diagonalsBelow % 2 === 0;
            return diffEven === lowerBoundEven ? 0 : 1;
        } else {
            const upperBoundEven = diagonalsAbove % 2 === 0;
            return diffEven === upperBoundEven ? numDiagonals - 1 : numDiagonals - 2;
        }
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * A position in the editor.
 */ class $52194de676ded133$export$13807d9ee5a34a42 {
    constructor(lineNumber, column){
        this.lineNumber = lineNumber;
        this.column = column;
    }
    /**
     * Create a new position from this position.
     *
     * @param newLineNumber new line number
     * @param newColumn new column
     */ with(newLineNumber = this.lineNumber, newColumn = this.column) {
        if (newLineNumber === this.lineNumber && newColumn === this.column) return this;
        else return new $52194de676ded133$export$13807d9ee5a34a42(newLineNumber, newColumn);
    }
    /**
     * Derive a new position from this position.
     *
     * @param deltaLineNumber line number delta
     * @param deltaColumn column delta
     */ delta(deltaLineNumber = 0, deltaColumn = 0) {
        return this.with(this.lineNumber + deltaLineNumber, this.column + deltaColumn);
    }
    /**
     * Test if this position equals other position
     */ equals(other) {
        return $52194de676ded133$export$13807d9ee5a34a42.equals(this, other);
    }
    /**
     * Test if position `a` equals position `b`
     */ static equals(a, b) {
        if (!a && !b) return true;
        return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
    }
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */ isBefore(other) {
        return $52194de676ded133$export$13807d9ee5a34a42.isBefore(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */ static isBefore(a, b) {
        if (a.lineNumber < b.lineNumber) return true;
        if (b.lineNumber < a.lineNumber) return false;
        return a.column < b.column;
    }
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */ isBeforeOrEqual(other) {
        return $52194de676ded133$export$13807d9ee5a34a42.isBeforeOrEqual(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */ static isBeforeOrEqual(a, b) {
        if (a.lineNumber < b.lineNumber) return true;
        if (b.lineNumber < a.lineNumber) return false;
        return a.column <= b.column;
    }
    /**
     * A function that compares positions, useful for sorting
     */ static compare(a, b) {
        const aLineNumber = a.lineNumber | 0;
        const bLineNumber = b.lineNumber | 0;
        if (aLineNumber === bLineNumber) {
            const aColumn = a.column | 0;
            const bColumn = b.column | 0;
            return aColumn - bColumn;
        }
        return aLineNumber - bLineNumber;
    }
    /**
     * Clone this position.
     */ clone() {
        return new $52194de676ded133$export$13807d9ee5a34a42(this.lineNumber, this.column);
    }
    /**
     * Convert to a human-readable representation.
     */ toString() {
        return '(' + this.lineNumber + ',' + this.column + ')';
    }
    // ---
    /**
     * Create a `Position` from an `IPosition`.
     */ static lift(pos) {
        return new $52194de676ded133$export$13807d9ee5a34a42(pos.lineNumber, pos.column);
    }
    /**
     * Test if `obj` is an `IPosition`.
     */ static isIPosition(obj) {
        return obj && typeof obj.lineNumber === 'number' && typeof obj.column === 'number';
    }
    toJSON() {
        return {
            lineNumber: this.lineNumber,
            column: this.column
        };
    }
}


class $e71303feb34bd76c$export$9a58ef0d7ad3278c {
    constructor(startLineNumber, startColumn, endLineNumber, endColumn){
        if (startLineNumber > endLineNumber || startLineNumber === endLineNumber && startColumn > endColumn) {
            this.startLineNumber = endLineNumber;
            this.startColumn = endColumn;
            this.endLineNumber = startLineNumber;
            this.endColumn = startColumn;
        } else {
            this.startLineNumber = startLineNumber;
            this.startColumn = startColumn;
            this.endLineNumber = endLineNumber;
            this.endColumn = endColumn;
        }
    }
    /**
     * Test if this range is empty.
     */ isEmpty() {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.isEmpty(this);
    }
    /**
     * Test if `range` is empty.
     */ static isEmpty(range) {
        return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
    }
    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */ containsPosition(position) {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.containsPosition(this, position);
    }
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return true.
     */ static containsPosition(range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) return false;
        if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) return false;
        if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) return false;
        return true;
    }
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return false.
     * @internal
     */ static strictContainsPosition(range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) return false;
        if (position.lineNumber === range.startLineNumber && position.column <= range.startColumn) return false;
        if (position.lineNumber === range.endLineNumber && position.column >= range.endColumn) return false;
        return true;
    }
    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */ containsRange(range) {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.containsRange(this, range);
    }
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */ static containsRange(range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) return false;
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) return false;
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) return false;
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) return false;
        return true;
    }
    /**
     * Test if `range` is strictly in this range. `range` must start after and end before this range for the result to be true.
     */ strictContainsRange(range) {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.strictContainsRange(this, range);
    }
    /**
     * Test if `otherRange` is strictly in `range` (must start after, and end before). If the ranges are equal, will return false.
     */ static strictContainsRange(range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) return false;
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) return false;
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) return false;
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) return false;
        return true;
    }
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */ plusRange(range) {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.plusRange(this, range);
    }
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */ static plusRange(a, b) {
        let startLineNumber;
        let startColumn;
        let endLineNumber;
        let endColumn;
        if (b.startLineNumber < a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = b.startColumn;
        } else if (b.startLineNumber === a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = Math.min(b.startColumn, a.startColumn);
        } else {
            startLineNumber = a.startLineNumber;
            startColumn = a.startColumn;
        }
        if (b.endLineNumber > a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = b.endColumn;
        } else if (b.endLineNumber === a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = Math.max(b.endColumn, a.endColumn);
        } else {
            endLineNumber = a.endLineNumber;
            endColumn = a.endColumn;
        }
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(startLineNumber, startColumn, endLineNumber, endColumn);
    }
    /**
     * A intersection of the two ranges.
     */ intersectRanges(range) {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.intersectRanges(this, range);
    }
    /**
     * A intersection of the two ranges.
     */ static intersectRanges(a, b) {
        let resultStartLineNumber = a.startLineNumber;
        let resultStartColumn = a.startColumn;
        let resultEndLineNumber = a.endLineNumber;
        let resultEndColumn = a.endColumn;
        const otherStartLineNumber = b.startLineNumber;
        const otherStartColumn = b.startColumn;
        const otherEndLineNumber = b.endLineNumber;
        const otherEndColumn = b.endColumn;
        if (resultStartLineNumber < otherStartLineNumber) {
            resultStartLineNumber = otherStartLineNumber;
            resultStartColumn = otherStartColumn;
        } else if (resultStartLineNumber === otherStartLineNumber) resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
        if (resultEndLineNumber > otherEndLineNumber) {
            resultEndLineNumber = otherEndLineNumber;
            resultEndColumn = otherEndColumn;
        } else if (resultEndLineNumber === otherEndLineNumber) resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
        // Check if selection is now empty
        if (resultStartLineNumber > resultEndLineNumber) return null;
        if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) return null;
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
    }
    /**
     * Test if this range equals other.
     */ equalsRange(other) {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.equalsRange(this, other);
    }
    /**
     * Test if range `a` equals `b`.
     */ static equalsRange(a, b) {
        if (!a && !b) return true;
        return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
    }
    /**
     * Return the end position (which will be after or equal to the start position)
     */ getEndPosition() {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.getEndPosition(this);
    }
    /**
     * Return the end position (which will be after or equal to the start position)
     */ static getEndPosition(range) {
        return new (0, $52194de676ded133$export$13807d9ee5a34a42)(range.endLineNumber, range.endColumn);
    }
    /**
     * Return the start position (which will be before or equal to the end position)
     */ getStartPosition() {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.getStartPosition(this);
    }
    /**
     * Return the start position (which will be before or equal to the end position)
     */ static getStartPosition(range) {
        return new (0, $52194de676ded133$export$13807d9ee5a34a42)(range.startLineNumber, range.startColumn);
    }
    /**
     * Transform to a user presentable string representation.
     */ toString() {
        return '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']';
    }
    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */ setEndPosition(endLineNumber, endColumn) {
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    }
    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */ setStartPosition(startLineNumber, startColumn) {
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    }
    /**
     * Create a new empty range using this range's start position.
     */ collapseToStart() {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.collapseToStart(this);
    }
    /**
     * Create a new empty range using this range's start position.
     */ static collapseToStart(range) {
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
    }
    /**
     * Create a new empty range using this range's end position.
     */ collapseToEnd() {
        return $e71303feb34bd76c$export$9a58ef0d7ad3278c.collapseToEnd(this);
    }
    /**
     * Create a new empty range using this range's end position.
     */ static collapseToEnd(range) {
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(range.endLineNumber, range.endColumn, range.endLineNumber, range.endColumn);
    }
    /**
     * Moves the range by the given amount of lines.
     */ delta(lineCount) {
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(this.startLineNumber + lineCount, this.startColumn, this.endLineNumber + lineCount, this.endColumn);
    }
    // ---
    static fromPositions(start, end = start) {
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    static lift(range) {
        if (!range) return null;
        return new $e71303feb34bd76c$export$9a58ef0d7ad3278c(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    }
    /**
     * Test if `obj` is an `IRange`.
     */ static isIRange(obj) {
        return obj && typeof obj.startLineNumber === 'number' && typeof obj.startColumn === 'number' && typeof obj.endLineNumber === 'number' && typeof obj.endColumn === 'number';
    }
    /**
     * Test if the two ranges are touching in any way.
     */ static areIntersectingOrTouching(a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn) return false;
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn) return false;
        // These ranges must intersect
        return true;
    }
    /**
     * Test if the two ranges are intersecting. If the ranges are touching it returns true.
     */ static areIntersecting(a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn <= b.startColumn) return false;
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn <= a.startColumn) return false;
        // These ranges must intersect
        return true;
    }
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the startPosition and then on the endPosition
     */ static compareRangesUsingStarts(a, b) {
        if (a && b) {
            const aStartLineNumber = a.startLineNumber | 0;
            const bStartLineNumber = b.startLineNumber | 0;
            if (aStartLineNumber === bStartLineNumber) {
                const aStartColumn = a.startColumn | 0;
                const bStartColumn = b.startColumn | 0;
                if (aStartColumn === bStartColumn) {
                    const aEndLineNumber = a.endLineNumber | 0;
                    const bEndLineNumber = b.endLineNumber | 0;
                    if (aEndLineNumber === bEndLineNumber) {
                        const aEndColumn = a.endColumn | 0;
                        const bEndColumn = b.endColumn | 0;
                        return aEndColumn - bEndColumn;
                    }
                    return aEndLineNumber - bEndLineNumber;
                }
                return aStartColumn - bStartColumn;
            }
            return aStartLineNumber - bStartLineNumber;
        }
        const aExists = a ? 1 : 0;
        const bExists = b ? 1 : 0;
        return aExists - bExists;
    }
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the endPosition and then on the startPosition
     */ static compareRangesUsingEnds(a, b) {
        if (a.endLineNumber === b.endLineNumber) {
            if (a.endColumn === b.endColumn) {
                if (a.startLineNumber === b.startLineNumber) return a.startColumn - b.startColumn;
                return a.startLineNumber - b.startLineNumber;
            }
            return a.endColumn - b.endColumn;
        }
        return a.endLineNumber - b.endLineNumber;
    }
    /**
     * Test if the range spans multiple lines.
     */ static spansMultipleLines(range) {
        return range.endLineNumber > range.startLineNumber;
    }
    toJSON() {
        return this;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function $2db288e50eb34b16$export$63c3de442720649(v) {
    if (v < 0) return 0;
    if (v > 255 /* Constants.MAX_UINT_8 */ ) return 255 /* Constants.MAX_UINT_8 */ ;
    return v | 0;
}
function $2db288e50eb34b16$export$56cfc59269b52afc(v) {
    if (v < 0) return 0;
    if (v > 4294967295 /* Constants.MAX_UINT_32 */ ) return 4294967295 /* Constants.MAX_UINT_32 */ ;
    return v | 0;
}


class $ea9d6fc8c109dc3b$export$b6ac4c7493566675 {
    constructor(_defaultValue){
        const defaultValue = (0, $2db288e50eb34b16$export$63c3de442720649)(_defaultValue);
        this._defaultValue = defaultValue;
        this._asciiMap = $ea9d6fc8c109dc3b$export$b6ac4c7493566675._createAsciiMap(defaultValue);
        this._map = new Map();
    }
    static _createAsciiMap(defaultValue) {
        const asciiMap = new Uint8Array(256);
        asciiMap.fill(defaultValue);
        return asciiMap;
    }
    set(charCode, _value) {
        const value = (0, $2db288e50eb34b16$export$63c3de442720649)(_value);
        if (charCode >= 0 && charCode < 256) this._asciiMap[charCode] = value;
        else this._map.set(charCode, value);
    }
    get(charCode) {
        if (charCode >= 0 && charCode < 256) return this._asciiMap[charCode];
        else return this._map.get(charCode) || this._defaultValue;
    }
    clear() {
        this._asciiMap.fill(this._defaultValue);
        this._map.clear();
    }
}
class $ea9d6fc8c109dc3b$export$fba22c9d3f66adb {
    constructor(){
        this._actual = new $ea9d6fc8c109dc3b$export$b6ac4c7493566675(0 /* Boolean.False */ );
    }
    add(charCode) {
        this._actual.set(charCode, 1 /* Boolean.True */ );
    }
    has(charCode) {
        return this._actual.get(charCode) === 1 /* Boolean.True */ ;
    }
    clear() {
        return this._actual.clear();
    }
}


class $805d79ebadc747f2$var$Uint8Matrix {
    constructor(rows, cols, defaultValue){
        const data = new Uint8Array(rows * cols);
        for(let i = 0, len = rows * cols; i < len; i++)data[i] = defaultValue;
        this._data = data;
        this.rows = rows;
        this.cols = cols;
    }
    get(row, col) {
        return this._data[row * this.cols + col];
    }
    set(row, col, value) {
        this._data[row * this.cols + col] = value;
    }
}
class $805d79ebadc747f2$export$cbf2d83d1eab018a {
    constructor(edges){
        let maxCharCode = 0;
        let maxState = 0 /* State.Invalid */ ;
        for(let i = 0, len = edges.length; i < len; i++){
            const [from, chCode, to] = edges[i];
            if (chCode > maxCharCode) maxCharCode = chCode;
            if (from > maxState) maxState = from;
            if (to > maxState) maxState = to;
        }
        maxCharCode++;
        maxState++;
        const states = new $805d79ebadc747f2$var$Uint8Matrix(maxState, maxCharCode, 0 /* State.Invalid */ );
        for(let i = 0, len = edges.length; i < len; i++){
            const [from, chCode, to] = edges[i];
            states.set(from, chCode, to);
        }
        this._states = states;
        this._maxCharCode = maxCharCode;
    }
    nextState(currentState, chCode) {
        if (chCode < 0 || chCode >= this._maxCharCode) return 0 /* State.Invalid */ ;
        return this._states.get(currentState, chCode);
    }
}
// State machine for http:// or https:// or file://
let $805d79ebadc747f2$var$_stateMachine = null;
function $805d79ebadc747f2$var$getStateMachine() {
    if ($805d79ebadc747f2$var$_stateMachine === null) $805d79ebadc747f2$var$_stateMachine = new $805d79ebadc747f2$export$cbf2d83d1eab018a([
        [
            1 /* State.Start */ ,
            104 /* CharCode.h */ ,
            2 /* State.H */ 
        ],
        [
            1 /* State.Start */ ,
            72 /* CharCode.H */ ,
            2 /* State.H */ 
        ],
        [
            1 /* State.Start */ ,
            102 /* CharCode.f */ ,
            6 /* State.F */ 
        ],
        [
            1 /* State.Start */ ,
            70 /* CharCode.F */ ,
            6 /* State.F */ 
        ],
        [
            2 /* State.H */ ,
            116 /* CharCode.t */ ,
            3 /* State.HT */ 
        ],
        [
            2 /* State.H */ ,
            84 /* CharCode.T */ ,
            3 /* State.HT */ 
        ],
        [
            3 /* State.HT */ ,
            116 /* CharCode.t */ ,
            4 /* State.HTT */ 
        ],
        [
            3 /* State.HT */ ,
            84 /* CharCode.T */ ,
            4 /* State.HTT */ 
        ],
        [
            4 /* State.HTT */ ,
            112 /* CharCode.p */ ,
            5 /* State.HTTP */ 
        ],
        [
            4 /* State.HTT */ ,
            80 /* CharCode.P */ ,
            5 /* State.HTTP */ 
        ],
        [
            5 /* State.HTTP */ ,
            115 /* CharCode.s */ ,
            9 /* State.BeforeColon */ 
        ],
        [
            5 /* State.HTTP */ ,
            83 /* CharCode.S */ ,
            9 /* State.BeforeColon */ 
        ],
        [
            5 /* State.HTTP */ ,
            58 /* CharCode.Colon */ ,
            10 /* State.AfterColon */ 
        ],
        [
            6 /* State.F */ ,
            105 /* CharCode.i */ ,
            7 /* State.FI */ 
        ],
        [
            6 /* State.F */ ,
            73 /* CharCode.I */ ,
            7 /* State.FI */ 
        ],
        [
            7 /* State.FI */ ,
            108 /* CharCode.l */ ,
            8 /* State.FIL */ 
        ],
        [
            7 /* State.FI */ ,
            76 /* CharCode.L */ ,
            8 /* State.FIL */ 
        ],
        [
            8 /* State.FIL */ ,
            101 /* CharCode.e */ ,
            9 /* State.BeforeColon */ 
        ],
        [
            8 /* State.FIL */ ,
            69 /* CharCode.E */ ,
            9 /* State.BeforeColon */ 
        ],
        [
            9 /* State.BeforeColon */ ,
            58 /* CharCode.Colon */ ,
            10 /* State.AfterColon */ 
        ],
        [
            10 /* State.AfterColon */ ,
            47 /* CharCode.Slash */ ,
            11 /* State.AlmostThere */ 
        ],
        [
            11 /* State.AlmostThere */ ,
            47 /* CharCode.Slash */ ,
            12 /* State.End */ 
        ]
    ]);
    return $805d79ebadc747f2$var$_stateMachine;
}
let $805d79ebadc747f2$var$_classifier = null;
function $805d79ebadc747f2$var$getClassifier() {
    if ($805d79ebadc747f2$var$_classifier === null) {
        $805d79ebadc747f2$var$_classifier = new (0, $ea9d6fc8c109dc3b$export$b6ac4c7493566675)(0 /* CharacterClass.None */ );
        // allow-any-unicode-next-line
        const FORCE_TERMINATION_CHARACTERS = " 	<>'\"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026";
        for(let i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++)$805d79ebadc747f2$var$_classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1 /* CharacterClass.ForceTermination */ );
        const CANNOT_END_WITH_CHARACTERS = '.,;:';
        for(let i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++)$805d79ebadc747f2$var$_classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2 /* CharacterClass.CannotEndIn */ );
    }
    return $805d79ebadc747f2$var$_classifier;
}
class $805d79ebadc747f2$export$250a25c683974a30 {
    static _createLink(classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
        // Do not allow to end link in certain characters...
        let lastIncludedCharIndex = linkEndIndex - 1;
        do {
            const chCode = line.charCodeAt(lastIncludedCharIndex);
            const chClass = classifier.get(chCode);
            if (chClass !== 2 /* CharacterClass.CannotEndIn */ ) break;
            lastIncludedCharIndex--;
        }while (lastIncludedCharIndex > linkBeginIndex);
        // Handle links enclosed in parens, square brackets and curlys.
        if (linkBeginIndex > 0) {
            const charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
            const lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
            if (charCodeBeforeLink === 40 /* CharCode.OpenParen */  && lastCharCodeInLink === 41 /* CharCode.CloseParen */  || charCodeBeforeLink === 91 /* CharCode.OpenSquareBracket */  && lastCharCodeInLink === 93 /* CharCode.CloseSquareBracket */  || charCodeBeforeLink === 123 /* CharCode.OpenCurlyBrace */  && lastCharCodeInLink === 125 /* CharCode.CloseCurlyBrace */ ) // Do not end in ) if ( is before the link start
            // Do not end in ] if [ is before the link start
            // Do not end in } if { is before the link start
            lastIncludedCharIndex--;
        }
        return {
            range: {
                startLineNumber: lineNumber,
                startColumn: linkBeginIndex + 1,
                endLineNumber: lineNumber,
                endColumn: lastIncludedCharIndex + 2
            },
            url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
        };
    }
    static computeLinks(model, stateMachine = $805d79ebadc747f2$var$getStateMachine()) {
        const classifier = $805d79ebadc747f2$var$getClassifier();
        const result = [];
        for(let i = 1, lineCount = model.getLineCount(); i <= lineCount; i++){
            const line = model.getLineContent(i);
            const len = line.length;
            let j = 0;
            let linkBeginIndex = 0;
            let linkBeginChCode = 0;
            let state = 1 /* State.Start */ ;
            let hasOpenParens = false;
            let hasOpenSquareBracket = false;
            let inSquareBrackets = false;
            let hasOpenCurlyBracket = false;
            while(j < len){
                let resetStateMachine = false;
                const chCode = line.charCodeAt(j);
                if (state === 13 /* State.Accept */ ) {
                    let chClass;
                    switch(chCode){
                        case 40 /* CharCode.OpenParen */ :
                            hasOpenParens = true;
                            chClass = 0 /* CharacterClass.None */ ;
                            break;
                        case 41 /* CharCode.CloseParen */ :
                            chClass = hasOpenParens ? 0 /* CharacterClass.None */  : 1 /* CharacterClass.ForceTermination */ ;
                            break;
                        case 91 /* CharCode.OpenSquareBracket */ :
                            inSquareBrackets = true;
                            hasOpenSquareBracket = true;
                            chClass = 0 /* CharacterClass.None */ ;
                            break;
                        case 93 /* CharCode.CloseSquareBracket */ :
                            inSquareBrackets = false;
                            chClass = hasOpenSquareBracket ? 0 /* CharacterClass.None */  : 1 /* CharacterClass.ForceTermination */ ;
                            break;
                        case 123 /* CharCode.OpenCurlyBrace */ :
                            hasOpenCurlyBracket = true;
                            chClass = 0 /* CharacterClass.None */ ;
                            break;
                        case 125 /* CharCode.CloseCurlyBrace */ :
                            chClass = hasOpenCurlyBracket ? 0 /* CharacterClass.None */  : 1 /* CharacterClass.ForceTermination */ ;
                            break;
                        // The following three rules make it that ' or " or ` are allowed inside links
                        // only if the link is wrapped by some other quote character
                        case 39 /* CharCode.SingleQuote */ :
                        case 34 /* CharCode.DoubleQuote */ :
                        case 96 /* CharCode.BackTick */ :
                            if (linkBeginChCode === chCode) chClass = 1 /* CharacterClass.ForceTermination */ ;
                            else if (linkBeginChCode === 39 /* CharCode.SingleQuote */  || linkBeginChCode === 34 /* CharCode.DoubleQuote */  || linkBeginChCode === 96 /* CharCode.BackTick */ ) chClass = 0 /* CharacterClass.None */ ;
                            else chClass = 1 /* CharacterClass.ForceTermination */ ;
                            break;
                        case 42 /* CharCode.Asterisk */ :
                            // `*` terminates a link if the link began with `*`
                            chClass = linkBeginChCode === 42 /* CharCode.Asterisk */  ? 1 /* CharacterClass.ForceTermination */  : 0 /* CharacterClass.None */ ;
                            break;
                        case 124 /* CharCode.Pipe */ :
                            // `|` terminates a link if the link began with `|`
                            chClass = linkBeginChCode === 124 /* CharCode.Pipe */  ? 1 /* CharacterClass.ForceTermination */  : 0 /* CharacterClass.None */ ;
                            break;
                        case 32 /* CharCode.Space */ :
                            // ` ` allow space in between [ and ]
                            chClass = inSquareBrackets ? 0 /* CharacterClass.None */  : 1 /* CharacterClass.ForceTermination */ ;
                            break;
                        default:
                            chClass = classifier.get(chCode);
                    }
                    // Check if character terminates link
                    if (chClass === 1 /* CharacterClass.ForceTermination */ ) {
                        result.push($805d79ebadc747f2$export$250a25c683974a30._createLink(classifier, line, i, linkBeginIndex, j));
                        resetStateMachine = true;
                    }
                } else if (state === 12 /* State.End */ ) {
                    let chClass;
                    if (chCode === 91 /* CharCode.OpenSquareBracket */ ) {
                        // Allow for the authority part to contain ipv6 addresses which contain [ and ]
                        hasOpenSquareBracket = true;
                        chClass = 0 /* CharacterClass.None */ ;
                    } else chClass = classifier.get(chCode);
                    // Check if character terminates link
                    if (chClass === 1 /* CharacterClass.ForceTermination */ ) resetStateMachine = true;
                    else state = 13 /* State.Accept */ ;
                } else {
                    state = stateMachine.nextState(state, chCode);
                    if (state === 0 /* State.Invalid */ ) resetStateMachine = true;
                }
                if (resetStateMachine) {
                    state = 1 /* State.Start */ ;
                    hasOpenParens = false;
                    hasOpenSquareBracket = false;
                    hasOpenCurlyBracket = false;
                    // Record where the link started
                    linkBeginIndex = j + 1;
                    linkBeginChCode = chCode;
                }
                j++;
            }
            if (state === 13 /* State.Accept */ ) result.push($805d79ebadc747f2$export$250a25c683974a30._createLink(classifier, line, i, linkBeginIndex, len));
        }
        return result;
    }
}
function $805d79ebadc747f2$export$a3449ac4162db24e(model) {
    if (!model || typeof model.getLineCount !== 'function' || typeof model.getLineContent !== 'function') // Unknown caller!
    return [];
    return $805d79ebadc747f2$export$250a25c683974a30.computeLinks(model);
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $a72518348cf3c27b$export$ffc1829a39e8ccc0 {
    constructor(){
        this._defaultValueSet = [
            [
                'true',
                'false'
            ],
            [
                'True',
                'False'
            ],
            [
                'Private',
                'Public',
                'Friend',
                'ReadOnly',
                'Partial',
                'Protected',
                'WriteOnly'
            ],
            [
                'public',
                'protected',
                'private'
            ]
        ];
    }
    static{
        this.INSTANCE = new $a72518348cf3c27b$export$ffc1829a39e8ccc0();
    }
    navigateValueSet(range1, text1, range2, text2, up) {
        if (range1 && text1) {
            const result = this.doNavigateValueSet(text1, up);
            if (result) return {
                range: range1,
                value: result
            };
        }
        if (range2 && text2) {
            const result = this.doNavigateValueSet(text2, up);
            if (result) return {
                range: range2,
                value: result
            };
        }
        return null;
    }
    doNavigateValueSet(text, up) {
        const numberResult = this.numberReplace(text, up);
        if (numberResult !== null) return numberResult;
        return this.textReplace(text, up);
    }
    numberReplace(value, up) {
        const precision = Math.pow(10, value.length - (value.lastIndexOf('.') + 1));
        let n1 = Number(value);
        const n2 = parseFloat(value);
        if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
            if (n1 === 0 && !up) return null; // don't do negative
            else {
                n1 = Math.floor(n1 * precision);
                n1 += up ? precision : -precision;
                return String(n1 / precision);
            }
        }
        return null;
    }
    textReplace(value, up) {
        return this.valueSetsReplace(this._defaultValueSet, value, up);
    }
    valueSetsReplace(valueSets, value, up) {
        let result = null;
        for(let i = 0, len = valueSets.length; result === null && i < len; i++)result = this.valueSetReplace(valueSets[i], value, up);
        return result;
    }
    valueSetReplace(valueSet, value, up) {
        let idx = valueSet.indexOf(value);
        if (idx >= 0) {
            idx += up ? 1 : -1;
            if (idx < 0) idx = valueSet.length - 1;
            else idx %= valueSet.length;
            return valueSet[idx];
        }
        return null;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
const $783cd511690f9862$var$shortcutEvent = Object.freeze(function(callback, context) {
    const handle = setTimeout(callback.bind(context), 0);
    return {
        dispose () {
            clearTimeout(handle);
        }
    };
});
var $783cd511690f9862$export$9fd6763ef90dc41a;
(function(CancellationToken) {
    function isCancellationToken(thing) {
        if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) return true;
        if (thing instanceof $783cd511690f9862$var$MutableToken) return true;
        if (!thing || typeof thing !== 'object') return false;
        return typeof thing.isCancellationRequested === 'boolean' && typeof thing.onCancellationRequested === 'function';
    }
    CancellationToken.isCancellationToken = isCancellationToken;
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: (0, $d7b8088681a716ec$export$d61e24a684f9e51).None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: $783cd511690f9862$var$shortcutEvent
    });
})($783cd511690f9862$export$9fd6763ef90dc41a || ($783cd511690f9862$export$9fd6763ef90dc41a = {}));
class $783cd511690f9862$var$MutableToken {
    constructor(){
        this._isCancelled = false;
        this._emitter = null;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) return $783cd511690f9862$var$shortcutEvent;
        if (!this._emitter) this._emitter = new (0, $d7b8088681a716ec$export$4293555f241ae35a)();
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = null;
        }
    }
}
class $783cd511690f9862$export$80fbc6d68230dbd3 {
    constructor(parent){
        this._token = undefined;
        this._parentListener = undefined;
        this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
    }
    get token() {
        if (!this._token) // be lazy and create the token only when
        // actually needed
        this._token = new $783cd511690f9862$var$MutableToken();
        return this._token;
    }
    cancel() {
        if (!this._token) // save an object by returning the default
        // cancelled token when cancellation happens
        // before someone asks for the token
        this._token = $783cd511690f9862$export$9fd6763ef90dc41a.Cancelled;
        else if (this._token instanceof $783cd511690f9862$var$MutableToken) // actually cancel
        this._token.cancel();
    }
    dispose(cancel = false) {
        if (cancel) this.cancel();
        this._parentListener?.dispose();
        if (!this._token) // ensure to initialize with an empty token if we had none
        this._token = $783cd511690f9862$export$9fd6763ef90dc41a.None;
        else if (this._token instanceof $783cd511690f9862$var$MutableToken) // actually dispose
        this._token.dispose();
    }
}
function $783cd511690f9862$export$fb98fb3b848801c5(store) {
    const source = new $783cd511690f9862$export$80fbc6d68230dbd3();
    store.add({
        dispose () {
            source.cancel();
        }
    });
    return source.token;
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $4b635897f09d6339$var$KeyCodeStrMap {
    constructor(){
        this._keyCodeToStr = [];
        this._strToKeyCode = Object.create(null);
    }
    define(keyCode, str) {
        this._keyCodeToStr[keyCode] = str;
        this._strToKeyCode[str.toLowerCase()] = keyCode;
    }
    keyCodeToStr(keyCode) {
        return this._keyCodeToStr[keyCode];
    }
    strToKeyCode(str) {
        return this._strToKeyCode[str.toLowerCase()] || 0 /* KeyCode.Unknown */ ;
    }
}
const $4b635897f09d6339$var$uiMap = new $4b635897f09d6339$var$KeyCodeStrMap();
const $4b635897f09d6339$var$userSettingsUSMap = new $4b635897f09d6339$var$KeyCodeStrMap();
const $4b635897f09d6339$var$userSettingsGeneralMap = new $4b635897f09d6339$var$KeyCodeStrMap();
const $4b635897f09d6339$export$a89fdeab38110a59 = new Array(230);
const $4b635897f09d6339$export$5d0e989b44fb7e66 = {};
const $4b635897f09d6339$var$scanCodeIntToStr = [];
const $4b635897f09d6339$var$scanCodeStrToInt = Object.create(null);
const $4b635897f09d6339$var$scanCodeLowerCaseStrToInt = Object.create(null);
const $4b635897f09d6339$export$b7494e730e51f0a0 = [];
const $4b635897f09d6339$export$816ba744bddceede = [];
for(let i = 0; i <= 193 /* ScanCode.MAX_VALUE */ ; i++)$4b635897f09d6339$export$b7494e730e51f0a0[i] = -1 /* KeyCode.DependsOnKbLayout */ ;
for(let i = 0; i <= 132 /* KeyCode.MAX_VALUE */ ; i++)$4b635897f09d6339$export$816ba744bddceede[i] = -1 /* ScanCode.DependsOnKbLayout */ ;
(function() {
    // See https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
    // See https://github.com/microsoft/node-native-keymap/blob/88c0b0e5/deps/chromium/keyboard_codes_win.h
    const empty = '';
    const mappings = [
        // immutable, scanCode, scanCodeStr, keyCode, keyCodeStr, eventKeyCode, vkey, usUserSettingsLabel, generalUserSettingsLabel
        [
            1,
            0 /* ScanCode.None */ ,
            'None',
            0 /* KeyCode.Unknown */ ,
            'unknown',
            0,
            'VK_UNKNOWN',
            empty,
            empty
        ],
        [
            1,
            1 /* ScanCode.Hyper */ ,
            'Hyper',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            2 /* ScanCode.Super */ ,
            'Super',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            3 /* ScanCode.Fn */ ,
            'Fn',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            4 /* ScanCode.FnLock */ ,
            'FnLock',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            5 /* ScanCode.Suspend */ ,
            'Suspend',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            6 /* ScanCode.Resume */ ,
            'Resume',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            7 /* ScanCode.Turbo */ ,
            'Turbo',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            8 /* ScanCode.Sleep */ ,
            'Sleep',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_SLEEP',
            empty,
            empty
        ],
        [
            1,
            9 /* ScanCode.WakeUp */ ,
            'WakeUp',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            0,
            10 /* ScanCode.KeyA */ ,
            'KeyA',
            31 /* KeyCode.KeyA */ ,
            'A',
            65,
            'VK_A',
            empty,
            empty
        ],
        [
            0,
            11 /* ScanCode.KeyB */ ,
            'KeyB',
            32 /* KeyCode.KeyB */ ,
            'B',
            66,
            'VK_B',
            empty,
            empty
        ],
        [
            0,
            12 /* ScanCode.KeyC */ ,
            'KeyC',
            33 /* KeyCode.KeyC */ ,
            'C',
            67,
            'VK_C',
            empty,
            empty
        ],
        [
            0,
            13 /* ScanCode.KeyD */ ,
            'KeyD',
            34 /* KeyCode.KeyD */ ,
            'D',
            68,
            'VK_D',
            empty,
            empty
        ],
        [
            0,
            14 /* ScanCode.KeyE */ ,
            'KeyE',
            35 /* KeyCode.KeyE */ ,
            'E',
            69,
            'VK_E',
            empty,
            empty
        ],
        [
            0,
            15 /* ScanCode.KeyF */ ,
            'KeyF',
            36 /* KeyCode.KeyF */ ,
            'F',
            70,
            'VK_F',
            empty,
            empty
        ],
        [
            0,
            16 /* ScanCode.KeyG */ ,
            'KeyG',
            37 /* KeyCode.KeyG */ ,
            'G',
            71,
            'VK_G',
            empty,
            empty
        ],
        [
            0,
            17 /* ScanCode.KeyH */ ,
            'KeyH',
            38 /* KeyCode.KeyH */ ,
            'H',
            72,
            'VK_H',
            empty,
            empty
        ],
        [
            0,
            18 /* ScanCode.KeyI */ ,
            'KeyI',
            39 /* KeyCode.KeyI */ ,
            'I',
            73,
            'VK_I',
            empty,
            empty
        ],
        [
            0,
            19 /* ScanCode.KeyJ */ ,
            'KeyJ',
            40 /* KeyCode.KeyJ */ ,
            'J',
            74,
            'VK_J',
            empty,
            empty
        ],
        [
            0,
            20 /* ScanCode.KeyK */ ,
            'KeyK',
            41 /* KeyCode.KeyK */ ,
            'K',
            75,
            'VK_K',
            empty,
            empty
        ],
        [
            0,
            21 /* ScanCode.KeyL */ ,
            'KeyL',
            42 /* KeyCode.KeyL */ ,
            'L',
            76,
            'VK_L',
            empty,
            empty
        ],
        [
            0,
            22 /* ScanCode.KeyM */ ,
            'KeyM',
            43 /* KeyCode.KeyM */ ,
            'M',
            77,
            'VK_M',
            empty,
            empty
        ],
        [
            0,
            23 /* ScanCode.KeyN */ ,
            'KeyN',
            44 /* KeyCode.KeyN */ ,
            'N',
            78,
            'VK_N',
            empty,
            empty
        ],
        [
            0,
            24 /* ScanCode.KeyO */ ,
            'KeyO',
            45 /* KeyCode.KeyO */ ,
            'O',
            79,
            'VK_O',
            empty,
            empty
        ],
        [
            0,
            25 /* ScanCode.KeyP */ ,
            'KeyP',
            46 /* KeyCode.KeyP */ ,
            'P',
            80,
            'VK_P',
            empty,
            empty
        ],
        [
            0,
            26 /* ScanCode.KeyQ */ ,
            'KeyQ',
            47 /* KeyCode.KeyQ */ ,
            'Q',
            81,
            'VK_Q',
            empty,
            empty
        ],
        [
            0,
            27 /* ScanCode.KeyR */ ,
            'KeyR',
            48 /* KeyCode.KeyR */ ,
            'R',
            82,
            'VK_R',
            empty,
            empty
        ],
        [
            0,
            28 /* ScanCode.KeyS */ ,
            'KeyS',
            49 /* KeyCode.KeyS */ ,
            'S',
            83,
            'VK_S',
            empty,
            empty
        ],
        [
            0,
            29 /* ScanCode.KeyT */ ,
            'KeyT',
            50 /* KeyCode.KeyT */ ,
            'T',
            84,
            'VK_T',
            empty,
            empty
        ],
        [
            0,
            30 /* ScanCode.KeyU */ ,
            'KeyU',
            51 /* KeyCode.KeyU */ ,
            'U',
            85,
            'VK_U',
            empty,
            empty
        ],
        [
            0,
            31 /* ScanCode.KeyV */ ,
            'KeyV',
            52 /* KeyCode.KeyV */ ,
            'V',
            86,
            'VK_V',
            empty,
            empty
        ],
        [
            0,
            32 /* ScanCode.KeyW */ ,
            'KeyW',
            53 /* KeyCode.KeyW */ ,
            'W',
            87,
            'VK_W',
            empty,
            empty
        ],
        [
            0,
            33 /* ScanCode.KeyX */ ,
            'KeyX',
            54 /* KeyCode.KeyX */ ,
            'X',
            88,
            'VK_X',
            empty,
            empty
        ],
        [
            0,
            34 /* ScanCode.KeyY */ ,
            'KeyY',
            55 /* KeyCode.KeyY */ ,
            'Y',
            89,
            'VK_Y',
            empty,
            empty
        ],
        [
            0,
            35 /* ScanCode.KeyZ */ ,
            'KeyZ',
            56 /* KeyCode.KeyZ */ ,
            'Z',
            90,
            'VK_Z',
            empty,
            empty
        ],
        [
            0,
            36 /* ScanCode.Digit1 */ ,
            'Digit1',
            22 /* KeyCode.Digit1 */ ,
            '1',
            49,
            'VK_1',
            empty,
            empty
        ],
        [
            0,
            37 /* ScanCode.Digit2 */ ,
            'Digit2',
            23 /* KeyCode.Digit2 */ ,
            '2',
            50,
            'VK_2',
            empty,
            empty
        ],
        [
            0,
            38 /* ScanCode.Digit3 */ ,
            'Digit3',
            24 /* KeyCode.Digit3 */ ,
            '3',
            51,
            'VK_3',
            empty,
            empty
        ],
        [
            0,
            39 /* ScanCode.Digit4 */ ,
            'Digit4',
            25 /* KeyCode.Digit4 */ ,
            '4',
            52,
            'VK_4',
            empty,
            empty
        ],
        [
            0,
            40 /* ScanCode.Digit5 */ ,
            'Digit5',
            26 /* KeyCode.Digit5 */ ,
            '5',
            53,
            'VK_5',
            empty,
            empty
        ],
        [
            0,
            41 /* ScanCode.Digit6 */ ,
            'Digit6',
            27 /* KeyCode.Digit6 */ ,
            '6',
            54,
            'VK_6',
            empty,
            empty
        ],
        [
            0,
            42 /* ScanCode.Digit7 */ ,
            'Digit7',
            28 /* KeyCode.Digit7 */ ,
            '7',
            55,
            'VK_7',
            empty,
            empty
        ],
        [
            0,
            43 /* ScanCode.Digit8 */ ,
            'Digit8',
            29 /* KeyCode.Digit8 */ ,
            '8',
            56,
            'VK_8',
            empty,
            empty
        ],
        [
            0,
            44 /* ScanCode.Digit9 */ ,
            'Digit9',
            30 /* KeyCode.Digit9 */ ,
            '9',
            57,
            'VK_9',
            empty,
            empty
        ],
        [
            0,
            45 /* ScanCode.Digit0 */ ,
            'Digit0',
            21 /* KeyCode.Digit0 */ ,
            '0',
            48,
            'VK_0',
            empty,
            empty
        ],
        [
            1,
            46 /* ScanCode.Enter */ ,
            'Enter',
            3 /* KeyCode.Enter */ ,
            'Enter',
            13,
            'VK_RETURN',
            empty,
            empty
        ],
        [
            1,
            47 /* ScanCode.Escape */ ,
            'Escape',
            9 /* KeyCode.Escape */ ,
            'Escape',
            27,
            'VK_ESCAPE',
            empty,
            empty
        ],
        [
            1,
            48 /* ScanCode.Backspace */ ,
            'Backspace',
            1 /* KeyCode.Backspace */ ,
            'Backspace',
            8,
            'VK_BACK',
            empty,
            empty
        ],
        [
            1,
            49 /* ScanCode.Tab */ ,
            'Tab',
            2 /* KeyCode.Tab */ ,
            'Tab',
            9,
            'VK_TAB',
            empty,
            empty
        ],
        [
            1,
            50 /* ScanCode.Space */ ,
            'Space',
            10 /* KeyCode.Space */ ,
            'Space',
            32,
            'VK_SPACE',
            empty,
            empty
        ],
        [
            0,
            51 /* ScanCode.Minus */ ,
            'Minus',
            88 /* KeyCode.Minus */ ,
            '-',
            189,
            'VK_OEM_MINUS',
            '-',
            'OEM_MINUS'
        ],
        [
            0,
            52 /* ScanCode.Equal */ ,
            'Equal',
            86 /* KeyCode.Equal */ ,
            '=',
            187,
            'VK_OEM_PLUS',
            '=',
            'OEM_PLUS'
        ],
        [
            0,
            53 /* ScanCode.BracketLeft */ ,
            'BracketLeft',
            92 /* KeyCode.BracketLeft */ ,
            '[',
            219,
            'VK_OEM_4',
            '[',
            'OEM_4'
        ],
        [
            0,
            54 /* ScanCode.BracketRight */ ,
            'BracketRight',
            94 /* KeyCode.BracketRight */ ,
            ']',
            221,
            'VK_OEM_6',
            ']',
            'OEM_6'
        ],
        [
            0,
            55 /* ScanCode.Backslash */ ,
            'Backslash',
            93 /* KeyCode.Backslash */ ,
            '\\',
            220,
            'VK_OEM_5',
            '\\',
            'OEM_5'
        ],
        [
            0,
            56 /* ScanCode.IntlHash */ ,
            'IntlHash',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            0,
            57 /* ScanCode.Semicolon */ ,
            'Semicolon',
            85 /* KeyCode.Semicolon */ ,
            ';',
            186,
            'VK_OEM_1',
            ';',
            'OEM_1'
        ],
        [
            0,
            58 /* ScanCode.Quote */ ,
            'Quote',
            95 /* KeyCode.Quote */ ,
            '\'',
            222,
            'VK_OEM_7',
            '\'',
            'OEM_7'
        ],
        [
            0,
            59 /* ScanCode.Backquote */ ,
            'Backquote',
            91 /* KeyCode.Backquote */ ,
            '`',
            192,
            'VK_OEM_3',
            '`',
            'OEM_3'
        ],
        [
            0,
            60 /* ScanCode.Comma */ ,
            'Comma',
            87 /* KeyCode.Comma */ ,
            ',',
            188,
            'VK_OEM_COMMA',
            ',',
            'OEM_COMMA'
        ],
        [
            0,
            61 /* ScanCode.Period */ ,
            'Period',
            89 /* KeyCode.Period */ ,
            '.',
            190,
            'VK_OEM_PERIOD',
            '.',
            'OEM_PERIOD'
        ],
        [
            0,
            62 /* ScanCode.Slash */ ,
            'Slash',
            90 /* KeyCode.Slash */ ,
            '/',
            191,
            'VK_OEM_2',
            '/',
            'OEM_2'
        ],
        [
            1,
            63 /* ScanCode.CapsLock */ ,
            'CapsLock',
            8 /* KeyCode.CapsLock */ ,
            'CapsLock',
            20,
            'VK_CAPITAL',
            empty,
            empty
        ],
        [
            1,
            64 /* ScanCode.F1 */ ,
            'F1',
            59 /* KeyCode.F1 */ ,
            'F1',
            112,
            'VK_F1',
            empty,
            empty
        ],
        [
            1,
            65 /* ScanCode.F2 */ ,
            'F2',
            60 /* KeyCode.F2 */ ,
            'F2',
            113,
            'VK_F2',
            empty,
            empty
        ],
        [
            1,
            66 /* ScanCode.F3 */ ,
            'F3',
            61 /* KeyCode.F3 */ ,
            'F3',
            114,
            'VK_F3',
            empty,
            empty
        ],
        [
            1,
            67 /* ScanCode.F4 */ ,
            'F4',
            62 /* KeyCode.F4 */ ,
            'F4',
            115,
            'VK_F4',
            empty,
            empty
        ],
        [
            1,
            68 /* ScanCode.F5 */ ,
            'F5',
            63 /* KeyCode.F5 */ ,
            'F5',
            116,
            'VK_F5',
            empty,
            empty
        ],
        [
            1,
            69 /* ScanCode.F6 */ ,
            'F6',
            64 /* KeyCode.F6 */ ,
            'F6',
            117,
            'VK_F6',
            empty,
            empty
        ],
        [
            1,
            70 /* ScanCode.F7 */ ,
            'F7',
            65 /* KeyCode.F7 */ ,
            'F7',
            118,
            'VK_F7',
            empty,
            empty
        ],
        [
            1,
            71 /* ScanCode.F8 */ ,
            'F8',
            66 /* KeyCode.F8 */ ,
            'F8',
            119,
            'VK_F8',
            empty,
            empty
        ],
        [
            1,
            72 /* ScanCode.F9 */ ,
            'F9',
            67 /* KeyCode.F9 */ ,
            'F9',
            120,
            'VK_F9',
            empty,
            empty
        ],
        [
            1,
            73 /* ScanCode.F10 */ ,
            'F10',
            68 /* KeyCode.F10 */ ,
            'F10',
            121,
            'VK_F10',
            empty,
            empty
        ],
        [
            1,
            74 /* ScanCode.F11 */ ,
            'F11',
            69 /* KeyCode.F11 */ ,
            'F11',
            122,
            'VK_F11',
            empty,
            empty
        ],
        [
            1,
            75 /* ScanCode.F12 */ ,
            'F12',
            70 /* KeyCode.F12 */ ,
            'F12',
            123,
            'VK_F12',
            empty,
            empty
        ],
        [
            1,
            76 /* ScanCode.PrintScreen */ ,
            'PrintScreen',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            77 /* ScanCode.ScrollLock */ ,
            'ScrollLock',
            84 /* KeyCode.ScrollLock */ ,
            'ScrollLock',
            145,
            'VK_SCROLL',
            empty,
            empty
        ],
        [
            1,
            78 /* ScanCode.Pause */ ,
            'Pause',
            7 /* KeyCode.PauseBreak */ ,
            'PauseBreak',
            19,
            'VK_PAUSE',
            empty,
            empty
        ],
        [
            1,
            79 /* ScanCode.Insert */ ,
            'Insert',
            19 /* KeyCode.Insert */ ,
            'Insert',
            45,
            'VK_INSERT',
            empty,
            empty
        ],
        [
            1,
            80 /* ScanCode.Home */ ,
            'Home',
            14 /* KeyCode.Home */ ,
            'Home',
            36,
            'VK_HOME',
            empty,
            empty
        ],
        [
            1,
            81 /* ScanCode.PageUp */ ,
            'PageUp',
            11 /* KeyCode.PageUp */ ,
            'PageUp',
            33,
            'VK_PRIOR',
            empty,
            empty
        ],
        [
            1,
            82 /* ScanCode.Delete */ ,
            'Delete',
            20 /* KeyCode.Delete */ ,
            'Delete',
            46,
            'VK_DELETE',
            empty,
            empty
        ],
        [
            1,
            83 /* ScanCode.End */ ,
            'End',
            13 /* KeyCode.End */ ,
            'End',
            35,
            'VK_END',
            empty,
            empty
        ],
        [
            1,
            84 /* ScanCode.PageDown */ ,
            'PageDown',
            12 /* KeyCode.PageDown */ ,
            'PageDown',
            34,
            'VK_NEXT',
            empty,
            empty
        ],
        [
            1,
            85 /* ScanCode.ArrowRight */ ,
            'ArrowRight',
            17 /* KeyCode.RightArrow */ ,
            'RightArrow',
            39,
            'VK_RIGHT',
            'Right',
            empty
        ],
        [
            1,
            86 /* ScanCode.ArrowLeft */ ,
            'ArrowLeft',
            15 /* KeyCode.LeftArrow */ ,
            'LeftArrow',
            37,
            'VK_LEFT',
            'Left',
            empty
        ],
        [
            1,
            87 /* ScanCode.ArrowDown */ ,
            'ArrowDown',
            18 /* KeyCode.DownArrow */ ,
            'DownArrow',
            40,
            'VK_DOWN',
            'Down',
            empty
        ],
        [
            1,
            88 /* ScanCode.ArrowUp */ ,
            'ArrowUp',
            16 /* KeyCode.UpArrow */ ,
            'UpArrow',
            38,
            'VK_UP',
            'Up',
            empty
        ],
        [
            1,
            89 /* ScanCode.NumLock */ ,
            'NumLock',
            83 /* KeyCode.NumLock */ ,
            'NumLock',
            144,
            'VK_NUMLOCK',
            empty,
            empty
        ],
        [
            1,
            90 /* ScanCode.NumpadDivide */ ,
            'NumpadDivide',
            113 /* KeyCode.NumpadDivide */ ,
            'NumPad_Divide',
            111,
            'VK_DIVIDE',
            empty,
            empty
        ],
        [
            1,
            91 /* ScanCode.NumpadMultiply */ ,
            'NumpadMultiply',
            108 /* KeyCode.NumpadMultiply */ ,
            'NumPad_Multiply',
            106,
            'VK_MULTIPLY',
            empty,
            empty
        ],
        [
            1,
            92 /* ScanCode.NumpadSubtract */ ,
            'NumpadSubtract',
            111 /* KeyCode.NumpadSubtract */ ,
            'NumPad_Subtract',
            109,
            'VK_SUBTRACT',
            empty,
            empty
        ],
        [
            1,
            93 /* ScanCode.NumpadAdd */ ,
            'NumpadAdd',
            109 /* KeyCode.NumpadAdd */ ,
            'NumPad_Add',
            107,
            'VK_ADD',
            empty,
            empty
        ],
        [
            1,
            94 /* ScanCode.NumpadEnter */ ,
            'NumpadEnter',
            3 /* KeyCode.Enter */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            95 /* ScanCode.Numpad1 */ ,
            'Numpad1',
            99 /* KeyCode.Numpad1 */ ,
            'NumPad1',
            97,
            'VK_NUMPAD1',
            empty,
            empty
        ],
        [
            1,
            96 /* ScanCode.Numpad2 */ ,
            'Numpad2',
            100 /* KeyCode.Numpad2 */ ,
            'NumPad2',
            98,
            'VK_NUMPAD2',
            empty,
            empty
        ],
        [
            1,
            97 /* ScanCode.Numpad3 */ ,
            'Numpad3',
            101 /* KeyCode.Numpad3 */ ,
            'NumPad3',
            99,
            'VK_NUMPAD3',
            empty,
            empty
        ],
        [
            1,
            98 /* ScanCode.Numpad4 */ ,
            'Numpad4',
            102 /* KeyCode.Numpad4 */ ,
            'NumPad4',
            100,
            'VK_NUMPAD4',
            empty,
            empty
        ],
        [
            1,
            99 /* ScanCode.Numpad5 */ ,
            'Numpad5',
            103 /* KeyCode.Numpad5 */ ,
            'NumPad5',
            101,
            'VK_NUMPAD5',
            empty,
            empty
        ],
        [
            1,
            100 /* ScanCode.Numpad6 */ ,
            'Numpad6',
            104 /* KeyCode.Numpad6 */ ,
            'NumPad6',
            102,
            'VK_NUMPAD6',
            empty,
            empty
        ],
        [
            1,
            101 /* ScanCode.Numpad7 */ ,
            'Numpad7',
            105 /* KeyCode.Numpad7 */ ,
            'NumPad7',
            103,
            'VK_NUMPAD7',
            empty,
            empty
        ],
        [
            1,
            102 /* ScanCode.Numpad8 */ ,
            'Numpad8',
            106 /* KeyCode.Numpad8 */ ,
            'NumPad8',
            104,
            'VK_NUMPAD8',
            empty,
            empty
        ],
        [
            1,
            103 /* ScanCode.Numpad9 */ ,
            'Numpad9',
            107 /* KeyCode.Numpad9 */ ,
            'NumPad9',
            105,
            'VK_NUMPAD9',
            empty,
            empty
        ],
        [
            1,
            104 /* ScanCode.Numpad0 */ ,
            'Numpad0',
            98 /* KeyCode.Numpad0 */ ,
            'NumPad0',
            96,
            'VK_NUMPAD0',
            empty,
            empty
        ],
        [
            1,
            105 /* ScanCode.NumpadDecimal */ ,
            'NumpadDecimal',
            112 /* KeyCode.NumpadDecimal */ ,
            'NumPad_Decimal',
            110,
            'VK_DECIMAL',
            empty,
            empty
        ],
        [
            0,
            106 /* ScanCode.IntlBackslash */ ,
            'IntlBackslash',
            97 /* KeyCode.IntlBackslash */ ,
            'OEM_102',
            226,
            'VK_OEM_102',
            empty,
            empty
        ],
        [
            1,
            107 /* ScanCode.ContextMenu */ ,
            'ContextMenu',
            58 /* KeyCode.ContextMenu */ ,
            'ContextMenu',
            93,
            empty,
            empty,
            empty
        ],
        [
            1,
            108 /* ScanCode.Power */ ,
            'Power',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            109 /* ScanCode.NumpadEqual */ ,
            'NumpadEqual',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            110 /* ScanCode.F13 */ ,
            'F13',
            71 /* KeyCode.F13 */ ,
            'F13',
            124,
            'VK_F13',
            empty,
            empty
        ],
        [
            1,
            111 /* ScanCode.F14 */ ,
            'F14',
            72 /* KeyCode.F14 */ ,
            'F14',
            125,
            'VK_F14',
            empty,
            empty
        ],
        [
            1,
            112 /* ScanCode.F15 */ ,
            'F15',
            73 /* KeyCode.F15 */ ,
            'F15',
            126,
            'VK_F15',
            empty,
            empty
        ],
        [
            1,
            113 /* ScanCode.F16 */ ,
            'F16',
            74 /* KeyCode.F16 */ ,
            'F16',
            127,
            'VK_F16',
            empty,
            empty
        ],
        [
            1,
            114 /* ScanCode.F17 */ ,
            'F17',
            75 /* KeyCode.F17 */ ,
            'F17',
            128,
            'VK_F17',
            empty,
            empty
        ],
        [
            1,
            115 /* ScanCode.F18 */ ,
            'F18',
            76 /* KeyCode.F18 */ ,
            'F18',
            129,
            'VK_F18',
            empty,
            empty
        ],
        [
            1,
            116 /* ScanCode.F19 */ ,
            'F19',
            77 /* KeyCode.F19 */ ,
            'F19',
            130,
            'VK_F19',
            empty,
            empty
        ],
        [
            1,
            117 /* ScanCode.F20 */ ,
            'F20',
            78 /* KeyCode.F20 */ ,
            'F20',
            131,
            'VK_F20',
            empty,
            empty
        ],
        [
            1,
            118 /* ScanCode.F21 */ ,
            'F21',
            79 /* KeyCode.F21 */ ,
            'F21',
            132,
            'VK_F21',
            empty,
            empty
        ],
        [
            1,
            119 /* ScanCode.F22 */ ,
            'F22',
            80 /* KeyCode.F22 */ ,
            'F22',
            133,
            'VK_F22',
            empty,
            empty
        ],
        [
            1,
            120 /* ScanCode.F23 */ ,
            'F23',
            81 /* KeyCode.F23 */ ,
            'F23',
            134,
            'VK_F23',
            empty,
            empty
        ],
        [
            1,
            121 /* ScanCode.F24 */ ,
            'F24',
            82 /* KeyCode.F24 */ ,
            'F24',
            135,
            'VK_F24',
            empty,
            empty
        ],
        [
            1,
            122 /* ScanCode.Open */ ,
            'Open',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            123 /* ScanCode.Help */ ,
            'Help',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            124 /* ScanCode.Select */ ,
            'Select',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            125 /* ScanCode.Again */ ,
            'Again',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            126 /* ScanCode.Undo */ ,
            'Undo',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            127 /* ScanCode.Cut */ ,
            'Cut',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            128 /* ScanCode.Copy */ ,
            'Copy',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            129 /* ScanCode.Paste */ ,
            'Paste',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            130 /* ScanCode.Find */ ,
            'Find',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            131 /* ScanCode.AudioVolumeMute */ ,
            'AudioVolumeMute',
            117 /* KeyCode.AudioVolumeMute */ ,
            'AudioVolumeMute',
            173,
            'VK_VOLUME_MUTE',
            empty,
            empty
        ],
        [
            1,
            132 /* ScanCode.AudioVolumeUp */ ,
            'AudioVolumeUp',
            118 /* KeyCode.AudioVolumeUp */ ,
            'AudioVolumeUp',
            175,
            'VK_VOLUME_UP',
            empty,
            empty
        ],
        [
            1,
            133 /* ScanCode.AudioVolumeDown */ ,
            'AudioVolumeDown',
            119 /* KeyCode.AudioVolumeDown */ ,
            'AudioVolumeDown',
            174,
            'VK_VOLUME_DOWN',
            empty,
            empty
        ],
        [
            1,
            134 /* ScanCode.NumpadComma */ ,
            'NumpadComma',
            110 /* KeyCode.NUMPAD_SEPARATOR */ ,
            'NumPad_Separator',
            108,
            'VK_SEPARATOR',
            empty,
            empty
        ],
        [
            0,
            135 /* ScanCode.IntlRo */ ,
            'IntlRo',
            115 /* KeyCode.ABNT_C1 */ ,
            'ABNT_C1',
            193,
            'VK_ABNT_C1',
            empty,
            empty
        ],
        [
            1,
            136 /* ScanCode.KanaMode */ ,
            'KanaMode',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            0,
            137 /* ScanCode.IntlYen */ ,
            'IntlYen',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            138 /* ScanCode.Convert */ ,
            'Convert',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            139 /* ScanCode.NonConvert */ ,
            'NonConvert',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            140 /* ScanCode.Lang1 */ ,
            'Lang1',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            141 /* ScanCode.Lang2 */ ,
            'Lang2',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            142 /* ScanCode.Lang3 */ ,
            'Lang3',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            143 /* ScanCode.Lang4 */ ,
            'Lang4',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            144 /* ScanCode.Lang5 */ ,
            'Lang5',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            145 /* ScanCode.Abort */ ,
            'Abort',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            146 /* ScanCode.Props */ ,
            'Props',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            147 /* ScanCode.NumpadParenLeft */ ,
            'NumpadParenLeft',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            148 /* ScanCode.NumpadParenRight */ ,
            'NumpadParenRight',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            149 /* ScanCode.NumpadBackspace */ ,
            'NumpadBackspace',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            150 /* ScanCode.NumpadMemoryStore */ ,
            'NumpadMemoryStore',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            151 /* ScanCode.NumpadMemoryRecall */ ,
            'NumpadMemoryRecall',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            152 /* ScanCode.NumpadMemoryClear */ ,
            'NumpadMemoryClear',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            153 /* ScanCode.NumpadMemoryAdd */ ,
            'NumpadMemoryAdd',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            154 /* ScanCode.NumpadMemorySubtract */ ,
            'NumpadMemorySubtract',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            155 /* ScanCode.NumpadClear */ ,
            'NumpadClear',
            131 /* KeyCode.Clear */ ,
            'Clear',
            12,
            'VK_CLEAR',
            empty,
            empty
        ],
        [
            1,
            156 /* ScanCode.NumpadClearEntry */ ,
            'NumpadClearEntry',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            5 /* KeyCode.Ctrl */ ,
            'Ctrl',
            17,
            'VK_CONTROL',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            4 /* KeyCode.Shift */ ,
            'Shift',
            16,
            'VK_SHIFT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            6 /* KeyCode.Alt */ ,
            'Alt',
            18,
            'VK_MENU',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            57 /* KeyCode.Meta */ ,
            'Meta',
            91,
            'VK_COMMAND',
            empty,
            empty
        ],
        [
            1,
            157 /* ScanCode.ControlLeft */ ,
            'ControlLeft',
            5 /* KeyCode.Ctrl */ ,
            empty,
            0,
            'VK_LCONTROL',
            empty,
            empty
        ],
        [
            1,
            158 /* ScanCode.ShiftLeft */ ,
            'ShiftLeft',
            4 /* KeyCode.Shift */ ,
            empty,
            0,
            'VK_LSHIFT',
            empty,
            empty
        ],
        [
            1,
            159 /* ScanCode.AltLeft */ ,
            'AltLeft',
            6 /* KeyCode.Alt */ ,
            empty,
            0,
            'VK_LMENU',
            empty,
            empty
        ],
        [
            1,
            160 /* ScanCode.MetaLeft */ ,
            'MetaLeft',
            57 /* KeyCode.Meta */ ,
            empty,
            0,
            'VK_LWIN',
            empty,
            empty
        ],
        [
            1,
            161 /* ScanCode.ControlRight */ ,
            'ControlRight',
            5 /* KeyCode.Ctrl */ ,
            empty,
            0,
            'VK_RCONTROL',
            empty,
            empty
        ],
        [
            1,
            162 /* ScanCode.ShiftRight */ ,
            'ShiftRight',
            4 /* KeyCode.Shift */ ,
            empty,
            0,
            'VK_RSHIFT',
            empty,
            empty
        ],
        [
            1,
            163 /* ScanCode.AltRight */ ,
            'AltRight',
            6 /* KeyCode.Alt */ ,
            empty,
            0,
            'VK_RMENU',
            empty,
            empty
        ],
        [
            1,
            164 /* ScanCode.MetaRight */ ,
            'MetaRight',
            57 /* KeyCode.Meta */ ,
            empty,
            0,
            'VK_RWIN',
            empty,
            empty
        ],
        [
            1,
            165 /* ScanCode.BrightnessUp */ ,
            'BrightnessUp',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            166 /* ScanCode.BrightnessDown */ ,
            'BrightnessDown',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            167 /* ScanCode.MediaPlay */ ,
            'MediaPlay',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            168 /* ScanCode.MediaRecord */ ,
            'MediaRecord',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            169 /* ScanCode.MediaFastForward */ ,
            'MediaFastForward',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            170 /* ScanCode.MediaRewind */ ,
            'MediaRewind',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            171 /* ScanCode.MediaTrackNext */ ,
            'MediaTrackNext',
            124 /* KeyCode.MediaTrackNext */ ,
            'MediaTrackNext',
            176,
            'VK_MEDIA_NEXT_TRACK',
            empty,
            empty
        ],
        [
            1,
            172 /* ScanCode.MediaTrackPrevious */ ,
            'MediaTrackPrevious',
            125 /* KeyCode.MediaTrackPrevious */ ,
            'MediaTrackPrevious',
            177,
            'VK_MEDIA_PREV_TRACK',
            empty,
            empty
        ],
        [
            1,
            173 /* ScanCode.MediaStop */ ,
            'MediaStop',
            126 /* KeyCode.MediaStop */ ,
            'MediaStop',
            178,
            'VK_MEDIA_STOP',
            empty,
            empty
        ],
        [
            1,
            174 /* ScanCode.Eject */ ,
            'Eject',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            175 /* ScanCode.MediaPlayPause */ ,
            'MediaPlayPause',
            127 /* KeyCode.MediaPlayPause */ ,
            'MediaPlayPause',
            179,
            'VK_MEDIA_PLAY_PAUSE',
            empty,
            empty
        ],
        [
            1,
            176 /* ScanCode.MediaSelect */ ,
            'MediaSelect',
            128 /* KeyCode.LaunchMediaPlayer */ ,
            'LaunchMediaPlayer',
            181,
            'VK_MEDIA_LAUNCH_MEDIA_SELECT',
            empty,
            empty
        ],
        [
            1,
            177 /* ScanCode.LaunchMail */ ,
            'LaunchMail',
            129 /* KeyCode.LaunchMail */ ,
            'LaunchMail',
            180,
            'VK_MEDIA_LAUNCH_MAIL',
            empty,
            empty
        ],
        [
            1,
            178 /* ScanCode.LaunchApp2 */ ,
            'LaunchApp2',
            130 /* KeyCode.LaunchApp2 */ ,
            'LaunchApp2',
            183,
            'VK_MEDIA_LAUNCH_APP2',
            empty,
            empty
        ],
        [
            1,
            179 /* ScanCode.LaunchApp1 */ ,
            'LaunchApp1',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_MEDIA_LAUNCH_APP1',
            empty,
            empty
        ],
        [
            1,
            180 /* ScanCode.SelectTask */ ,
            'SelectTask',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            181 /* ScanCode.LaunchScreenSaver */ ,
            'LaunchScreenSaver',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            182 /* ScanCode.BrowserSearch */ ,
            'BrowserSearch',
            120 /* KeyCode.BrowserSearch */ ,
            'BrowserSearch',
            170,
            'VK_BROWSER_SEARCH',
            empty,
            empty
        ],
        [
            1,
            183 /* ScanCode.BrowserHome */ ,
            'BrowserHome',
            121 /* KeyCode.BrowserHome */ ,
            'BrowserHome',
            172,
            'VK_BROWSER_HOME',
            empty,
            empty
        ],
        [
            1,
            184 /* ScanCode.BrowserBack */ ,
            'BrowserBack',
            122 /* KeyCode.BrowserBack */ ,
            'BrowserBack',
            166,
            'VK_BROWSER_BACK',
            empty,
            empty
        ],
        [
            1,
            185 /* ScanCode.BrowserForward */ ,
            'BrowserForward',
            123 /* KeyCode.BrowserForward */ ,
            'BrowserForward',
            167,
            'VK_BROWSER_FORWARD',
            empty,
            empty
        ],
        [
            1,
            186 /* ScanCode.BrowserStop */ ,
            'BrowserStop',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_BROWSER_STOP',
            empty,
            empty
        ],
        [
            1,
            187 /* ScanCode.BrowserRefresh */ ,
            'BrowserRefresh',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_BROWSER_REFRESH',
            empty,
            empty
        ],
        [
            1,
            188 /* ScanCode.BrowserFavorites */ ,
            'BrowserFavorites',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_BROWSER_FAVORITES',
            empty,
            empty
        ],
        [
            1,
            189 /* ScanCode.ZoomToggle */ ,
            'ZoomToggle',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            190 /* ScanCode.MailReply */ ,
            'MailReply',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            191 /* ScanCode.MailForward */ ,
            'MailForward',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        [
            1,
            192 /* ScanCode.MailSend */ ,
            'MailSend',
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            empty,
            empty,
            empty
        ],
        // See https://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
        // If an Input Method Editor is processing key input and the event is keydown, return 229.
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            114 /* KeyCode.KEY_IN_COMPOSITION */ ,
            'KeyInComposition',
            229,
            empty,
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            116 /* KeyCode.ABNT_C2 */ ,
            'ABNT_C2',
            194,
            'VK_ABNT_C2',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            96 /* KeyCode.OEM_8 */ ,
            'OEM_8',
            223,
            'VK_OEM_8',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_KANA',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_HANGUL',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_JUNJA',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_FINAL',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_HANJA',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_KANJI',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_CONVERT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_NONCONVERT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_ACCEPT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_MODECHANGE',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_SELECT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_PRINT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_EXECUTE',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_SNAPSHOT',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_HELP',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_APPS',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_PROCESSKEY',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_PACKET',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_DBE_SBCSCHAR',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_DBE_DBCSCHAR',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_ATTN',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_CRSEL',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_EXSEL',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_EREOF',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_PLAY',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_ZOOM',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_NONAME',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_PA1',
            empty,
            empty
        ],
        [
            1,
            0 /* ScanCode.None */ ,
            empty,
            0 /* KeyCode.Unknown */ ,
            empty,
            0,
            'VK_OEM_CLEAR',
            empty,
            empty
        ]
    ];
    const seenKeyCode = [];
    const seenScanCode = [];
    for (const mapping of mappings){
        const [immutable, scanCode, scanCodeStr, keyCode, keyCodeStr, eventKeyCode, vkey, usUserSettingsLabel, generalUserSettingsLabel] = mapping;
        if (!seenScanCode[scanCode]) {
            seenScanCode[scanCode] = true;
            $4b635897f09d6339$var$scanCodeIntToStr[scanCode] = scanCodeStr;
            $4b635897f09d6339$var$scanCodeStrToInt[scanCodeStr] = scanCode;
            $4b635897f09d6339$var$scanCodeLowerCaseStrToInt[scanCodeStr.toLowerCase()] = scanCode;
            if (immutable) {
                $4b635897f09d6339$export$b7494e730e51f0a0[scanCode] = keyCode;
                if (keyCode !== 0 /* KeyCode.Unknown */  && keyCode !== 3 /* KeyCode.Enter */  && keyCode !== 5 /* KeyCode.Ctrl */  && keyCode !== 4 /* KeyCode.Shift */  && keyCode !== 6 /* KeyCode.Alt */  && keyCode !== 57 /* KeyCode.Meta */ ) $4b635897f09d6339$export$816ba744bddceede[keyCode] = scanCode;
            }
        }
        if (!seenKeyCode[keyCode]) {
            seenKeyCode[keyCode] = true;
            if (!keyCodeStr) throw new Error(`String representation missing for key code ${keyCode} around scan code ${scanCodeStr}`);
            $4b635897f09d6339$var$uiMap.define(keyCode, keyCodeStr);
            $4b635897f09d6339$var$userSettingsUSMap.define(keyCode, usUserSettingsLabel || keyCodeStr);
            $4b635897f09d6339$var$userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel || usUserSettingsLabel || keyCodeStr);
        }
        if (eventKeyCode) $4b635897f09d6339$export$a89fdeab38110a59[eventKeyCode] = keyCode;
        if (vkey) $4b635897f09d6339$export$5d0e989b44fb7e66[vkey] = keyCode;
    }
    // Manually added due to the exclusion above (due to duplication with NumpadEnter)
    $4b635897f09d6339$export$816ba744bddceede[3 /* KeyCode.Enter */ ] = 46 /* ScanCode.Enter */ ;
})();
var $4b635897f09d6339$export$cef6d4bb4befe1d1;
(function(KeyCodeUtils) {
    function toString(keyCode) {
        return $4b635897f09d6339$var$uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toString = toString;
    function fromString(key) {
        return $4b635897f09d6339$var$uiMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromString = fromString;
    function toUserSettingsUS(keyCode) {
        return $4b635897f09d6339$var$userSettingsUSMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsUS = toUserSettingsUS;
    function toUserSettingsGeneral(keyCode) {
        return $4b635897f09d6339$var$userSettingsGeneralMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsGeneral = toUserSettingsGeneral;
    function fromUserSettings(key) {
        return $4b635897f09d6339$var$userSettingsUSMap.strToKeyCode(key) || $4b635897f09d6339$var$userSettingsGeneralMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromUserSettings = fromUserSettings;
    function toElectronAccelerator(keyCode) {
        if (keyCode >= 98 /* KeyCode.Numpad0 */  && keyCode <= 113 /* KeyCode.NumpadDivide */ ) // [Electron Accelerators] Electron is able to parse numpad keys, but unfortunately it
        // renders them just as regular keys in menus. For example, num0 is rendered as "0",
        // numdiv is rendered as "/", numsub is rendered as "-".
        //
        // This can lead to incredible confusion, as it makes numpad based keybindings indistinguishable
        // from keybindings based on regular keys.
        //
        // We therefore need to fall back to custom rendering for numpad keys.
        return null;
        switch(keyCode){
            case 16 /* KeyCode.UpArrow */ :
                return 'Up';
            case 18 /* KeyCode.DownArrow */ :
                return 'Down';
            case 15 /* KeyCode.LeftArrow */ :
                return 'Left';
            case 17 /* KeyCode.RightArrow */ :
                return 'Right';
        }
        return $4b635897f09d6339$var$uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toElectronAccelerator = toElectronAccelerator;
})($4b635897f09d6339$export$cef6d4bb4befe1d1 || ($4b635897f09d6339$export$cef6d4bb4befe1d1 = {}));
function $4b635897f09d6339$export$a5e557d68abc4534(firstPart, secondPart) {
    const chordPart = (secondPart & 0x0000FFFF) << 16 >>> 0;
    return (firstPart | chordPart) >>> 0;
}





/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

class $fabed10600aed0e4$export$52baac22726c72bf extends (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c) {
    constructor(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn){
        super(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn);
        this.selectionStartLineNumber = selectionStartLineNumber;
        this.selectionStartColumn = selectionStartColumn;
        this.positionLineNumber = positionLineNumber;
        this.positionColumn = positionColumn;
    }
    /**
     * Transform to a human-readable representation.
     */ toString() {
        return '[' + this.selectionStartLineNumber + ',' + this.selectionStartColumn + ' -> ' + this.positionLineNumber + ',' + this.positionColumn + ']';
    }
    /**
     * Test if equals other selection.
     */ equalsSelection(other) {
        return $fabed10600aed0e4$export$52baac22726c72bf.selectionsEqual(this, other);
    }
    /**
     * Test if the two selections are equal.
     */ static selectionsEqual(a, b) {
        return a.selectionStartLineNumber === b.selectionStartLineNumber && a.selectionStartColumn === b.selectionStartColumn && a.positionLineNumber === b.positionLineNumber && a.positionColumn === b.positionColumn;
    }
    /**
     * Get directions (LTR or RTL).
     */ getDirection() {
        if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) return 0 /* SelectionDirection.LTR */ ;
        return 1 /* SelectionDirection.RTL */ ;
    }
    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */ setEndPosition(endLineNumber, endColumn) {
        if (this.getDirection() === 0 /* SelectionDirection.LTR */ ) return new $fabed10600aed0e4$export$52baac22726c72bf(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
        return new $fabed10600aed0e4$export$52baac22726c72bf(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
    }
    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */ getPosition() {
        return new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.positionLineNumber, this.positionColumn);
    }
    /**
     * Get the position at the start of the selection.
    */ getSelectionStart() {
        return new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.selectionStartLineNumber, this.selectionStartColumn);
    }
    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */ setStartPosition(startLineNumber, startColumn) {
        if (this.getDirection() === 0 /* SelectionDirection.LTR */ ) return new $fabed10600aed0e4$export$52baac22726c72bf(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
        return new $fabed10600aed0e4$export$52baac22726c72bf(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
    }
    // ----
    /**
     * Create a `Selection` from one or two positions
     */ static fromPositions(start, end = start) {
        return new $fabed10600aed0e4$export$52baac22726c72bf(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    /**
     * Creates a `Selection` from a range, given a direction.
     */ static fromRange(range, direction) {
        if (direction === 0 /* SelectionDirection.LTR */ ) return new $fabed10600aed0e4$export$52baac22726c72bf(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
        else return new $fabed10600aed0e4$export$52baac22726c72bf(range.endLineNumber, range.endColumn, range.startLineNumber, range.startColumn);
    }
    /**
     * Create a `Selection` from an `ISelection`.
     */ static liftSelection(sel) {
        return new $fabed10600aed0e4$export$52baac22726c72bf(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
    }
    /**
     * `a` equals `b`.
     */ static selectionsArrEqual(a, b) {
        if (a && !b || !a && b) return false;
        if (!a && !b) return true;
        if (a.length !== b.length) return false;
        for(let i = 0, len = a.length; i < len; i++){
            if (!this.selectionsEqual(a[i], b[i])) return false;
        }
        return true;
    }
    /**
     * Test if `obj` is an `ISelection`.
     */ static isISelection(obj) {
        return obj && typeof obj.selectionStartLineNumber === 'number' && typeof obj.selectionStartColumn === 'number' && typeof obj.positionLineNumber === 'number' && typeof obj.positionColumn === 'number';
    }
    /**
     * Create with a direction.
     */ static createWithDirection(startLineNumber, startColumn, endLineNumber, endColumn, direction) {
        if (direction === 0 /* SelectionDirection.LTR */ ) return new $fabed10600aed0e4$export$52baac22726c72bf(startLineNumber, startColumn, endLineNumber, endColumn);
        return new $fabed10600aed0e4$export$52baac22726c72bf(endLineNumber, endColumn, startLineNumber, startColumn);
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * @returns whether the provided parameter is a JavaScript String or not.
 */ function $2581ede4232235dc$export$844ec244b1367d54(str) {
    return typeof str === 'string';
}
function $2581ede4232235dc$export$a6cdc56e425d0d0a(obj) {
    // The method can't do a type cast since there are type (like strings) which
    // are subclasses of any put not positvely matched by the function. Hence type
    // narrowing results in wrong results.
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp) && !(obj instanceof Date);
}
function $2581ede4232235dc$export$b119cc7e1840e59c(obj) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    return typeof obj === 'object' && obj instanceof TypedArray;
}
function $2581ede4232235dc$export$7e4aa119212bc614(obj) {
    return typeof obj === 'number' && !isNaN(obj);
}
function $2581ede4232235dc$export$9652023d9040757(obj) {
    return !!obj && typeof obj[Symbol.iterator] === 'function';
}
function $2581ede4232235dc$export$f9ce7b637dfbe238(obj) {
    return obj === true || obj === false;
}
function $2581ede4232235dc$export$fce6876652108ab(obj) {
    return typeof obj === 'undefined';
}
function $2581ede4232235dc$export$4e62c701997796c1(arg) {
    return !$2581ede4232235dc$export$ae45edb09e2fe7c2(arg);
}
function $2581ede4232235dc$export$ae45edb09e2fe7c2(obj) {
    return $2581ede4232235dc$export$fce6876652108ab(obj) || obj === null;
}
function $2581ede4232235dc$export$804de46662e4ac95(condition, type) {
    if (!condition) throw new Error(type ? `Unexpected type, expected '${type}'` : 'Unexpected type');
}
function $2581ede4232235dc$export$b2aaaa09c7269410(arg) {
    if ($2581ede4232235dc$export$ae45edb09e2fe7c2(arg)) throw new Error('Assertion Failed: argument is undefined or null');
    return arg;
}
function $2581ede4232235dc$export$f6e2535fb5126e54(obj) {
    return typeof obj === 'function';
}
function $2581ede4232235dc$export$c2f47bb60f51c7a8(args, constraints) {
    const len = Math.min(args.length, constraints.length);
    for(let i = 0; i < len; i++)$2581ede4232235dc$export$877f05df123a71c7(args[i], constraints[i]);
}
function $2581ede4232235dc$export$877f05df123a71c7(arg, constraint) {
    if ($2581ede4232235dc$export$844ec244b1367d54(constraint)) {
        if (typeof arg !== constraint) throw new Error(`argument does not match constraint: typeof ${constraint}`);
    } else if ($2581ede4232235dc$export$f6e2535fb5126e54(constraint)) {
        try {
            if (arg instanceof constraint) return;
        } catch  {
        // ignore
        }
        if (!$2581ede4232235dc$export$ae45edb09e2fe7c2(arg) && arg.constructor === constraint) return;
        if (constraint.length === 1 && constraint.call(undefined, arg) === true) return;
        throw new Error(`argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true`);
    }
}


const $1a275a372e799cd2$var$_codiconFontCharacters = Object.create(null);
function $1a275a372e799cd2$export$6503ec6e8aabbaf(id, fontCharacter) {
    if ((0, $2581ede4232235dc$export$844ec244b1367d54)(fontCharacter)) {
        const val = $1a275a372e799cd2$var$_codiconFontCharacters[fontCharacter];
        if (val === undefined) throw new Error(`${id} references an unknown codicon: ${fontCharacter}`);
        fontCharacter = val;
    }
    $1a275a372e799cd2$var$_codiconFontCharacters[id] = fontCharacter;
    return {
        id: id
    };
}
function $1a275a372e799cd2$export$f3538d95eedffbe5() {
    return $1a275a372e799cd2$var$_codiconFontCharacters;
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
const $f619a6f6ae9d80b8$export$2515b2d1f7bd1247 = {
    add: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('add', 0xea60),
    plus: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('plus', 0xea60),
    gistNew: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gist-new', 0xea60),
    repoCreate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-create', 0xea60),
    lightbulb: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('lightbulb', 0xea61),
    lightBulb: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('light-bulb', 0xea61),
    repo: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo', 0xea62),
    repoDelete: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-delete', 0xea62),
    gistFork: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gist-fork', 0xea63),
    repoForked: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-forked', 0xea63),
    gitPullRequest: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request', 0xea64),
    gitPullRequestAbandoned: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-abandoned', 0xea64),
    recordKeys: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('record-keys', 0xea65),
    keyboard: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('keyboard', 0xea65),
    tag: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tag', 0xea66),
    gitPullRequestLabel: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-label', 0xea66),
    tagAdd: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tag-add', 0xea66),
    tagRemove: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tag-remove', 0xea66),
    person: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('person', 0xea67),
    personFollow: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('person-follow', 0xea67),
    personOutline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('person-outline', 0xea67),
    personFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('person-filled', 0xea67),
    gitBranch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-branch', 0xea68),
    gitBranchCreate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-branch-create', 0xea68),
    gitBranchDelete: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-branch-delete', 0xea68),
    sourceControl: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('source-control', 0xea68),
    mirror: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mirror', 0xea69),
    mirrorPublic: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mirror-public', 0xea69),
    star: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('star', 0xea6a),
    starAdd: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('star-add', 0xea6a),
    starDelete: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('star-delete', 0xea6a),
    starEmpty: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('star-empty', 0xea6a),
    comment: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('comment', 0xea6b),
    commentAdd: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('comment-add', 0xea6b),
    alert: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('alert', 0xea6c),
    warning: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('warning', 0xea6c),
    search: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('search', 0xea6d),
    searchSave: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('search-save', 0xea6d),
    logOut: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('log-out', 0xea6e),
    signOut: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sign-out', 0xea6e),
    logIn: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('log-in', 0xea6f),
    signIn: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sign-in', 0xea6f),
    eye: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('eye', 0xea70),
    eyeUnwatch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('eye-unwatch', 0xea70),
    eyeWatch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('eye-watch', 0xea70),
    circleFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-filled', 0xea71),
    primitiveDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('primitive-dot', 0xea71),
    closeDirty: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('close-dirty', 0xea71),
    debugBreakpoint: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint', 0xea71),
    debugBreakpointDisabled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-disabled', 0xea71),
    debugHint: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-hint', 0xea71),
    terminalDecorationSuccess: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-decoration-success', 0xea71),
    primitiveSquare: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('primitive-square', 0xea72),
    edit: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('edit', 0xea73),
    pencil: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pencil', 0xea73),
    info: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('info', 0xea74),
    issueOpened: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('issue-opened', 0xea74),
    gistPrivate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gist-private', 0xea75),
    gitForkPrivate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-fork-private', 0xea75),
    lock: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('lock', 0xea75),
    mirrorPrivate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mirror-private', 0xea75),
    close: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('close', 0xea76),
    removeClose: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('remove-close', 0xea76),
    x: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('x', 0xea76),
    repoSync: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-sync', 0xea77),
    sync: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sync', 0xea77),
    clone: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('clone', 0xea78),
    desktopDownload: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('desktop-download', 0xea78),
    beaker: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('beaker', 0xea79),
    microscope: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('microscope', 0xea79),
    vm: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vm', 0xea7a),
    deviceDesktop: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('device-desktop', 0xea7a),
    file: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file', 0xea7b),
    fileText: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-text', 0xea7b),
    more: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('more', 0xea7c),
    ellipsis: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('ellipsis', 0xea7c),
    kebabHorizontal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('kebab-horizontal', 0xea7c),
    mailReply: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mail-reply', 0xea7d),
    reply: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('reply', 0xea7d),
    organization: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('organization', 0xea7e),
    organizationFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('organization-filled', 0xea7e),
    organizationOutline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('organization-outline', 0xea7e),
    newFile: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('new-file', 0xea7f),
    fileAdd: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-add', 0xea7f),
    newFolder: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('new-folder', 0xea80),
    fileDirectoryCreate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-directory-create', 0xea80),
    trash: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('trash', 0xea81),
    trashcan: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('trashcan', 0xea81),
    history: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('history', 0xea82),
    clock: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('clock', 0xea82),
    folder: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('folder', 0xea83),
    fileDirectory: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-directory', 0xea83),
    symbolFolder: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-folder', 0xea83),
    logoGithub: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('logo-github', 0xea84),
    markGithub: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mark-github', 0xea84),
    github: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('github', 0xea84),
    terminal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal', 0xea85),
    console: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('console', 0xea85),
    repl: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repl', 0xea85),
    zap: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('zap', 0xea86),
    symbolEvent: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-event', 0xea86),
    error: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('error', 0xea87),
    stop: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('stop', 0xea87),
    variable: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('variable', 0xea88),
    symbolVariable: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-variable', 0xea88),
    array: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('array', 0xea8a),
    symbolArray: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-array', 0xea8a),
    symbolModule: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-module', 0xea8b),
    symbolPackage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-package', 0xea8b),
    symbolNamespace: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-namespace', 0xea8b),
    symbolObject: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-object', 0xea8b),
    symbolMethod: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-method', 0xea8c),
    symbolFunction: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-function', 0xea8c),
    symbolConstructor: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-constructor', 0xea8c),
    symbolBoolean: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-boolean', 0xea8f),
    symbolNull: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-null', 0xea8f),
    symbolNumeric: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-numeric', 0xea90),
    symbolNumber: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-number', 0xea90),
    symbolStructure: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-structure', 0xea91),
    symbolStruct: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-struct', 0xea91),
    symbolParameter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-parameter', 0xea92),
    symbolTypeParameter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-type-parameter', 0xea92),
    symbolKey: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-key', 0xea93),
    symbolText: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-text', 0xea93),
    symbolReference: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-reference', 0xea94),
    goToFile: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('go-to-file', 0xea94),
    symbolEnum: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-enum', 0xea95),
    symbolValue: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-value', 0xea95),
    symbolRuler: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-ruler', 0xea96),
    symbolUnit: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-unit', 0xea96),
    activateBreakpoints: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('activate-breakpoints', 0xea97),
    archive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('archive', 0xea98),
    arrowBoth: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-both', 0xea99),
    arrowDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-down', 0xea9a),
    arrowLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-left', 0xea9b),
    arrowRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-right', 0xea9c),
    arrowSmallDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-small-down', 0xea9d),
    arrowSmallLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-small-left', 0xea9e),
    arrowSmallRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-small-right', 0xea9f),
    arrowSmallUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-small-up', 0xeaa0),
    arrowUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-up', 0xeaa1),
    bell: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bell', 0xeaa2),
    bold: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bold', 0xeaa3),
    book: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('book', 0xeaa4),
    bookmark: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bookmark', 0xeaa5),
    debugBreakpointConditionalUnverified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-conditional-unverified', 0xeaa6),
    debugBreakpointConditional: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-conditional', 0xeaa7),
    debugBreakpointConditionalDisabled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-conditional-disabled', 0xeaa7),
    debugBreakpointDataUnverified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-data-unverified', 0xeaa8),
    debugBreakpointData: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-data', 0xeaa9),
    debugBreakpointDataDisabled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-data-disabled', 0xeaa9),
    debugBreakpointLogUnverified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-log-unverified', 0xeaaa),
    debugBreakpointLog: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-log', 0xeaab),
    debugBreakpointLogDisabled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-log-disabled', 0xeaab),
    briefcase: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('briefcase', 0xeaac),
    broadcast: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('broadcast', 0xeaad),
    browser: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('browser', 0xeaae),
    bug: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bug', 0xeaaf),
    calendar: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('calendar', 0xeab0),
    caseSensitive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('case-sensitive', 0xeab1),
    check: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('check', 0xeab2),
    checklist: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('checklist', 0xeab3),
    chevronDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chevron-down', 0xeab4),
    chevronLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chevron-left', 0xeab5),
    chevronRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chevron-right', 0xeab6),
    chevronUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chevron-up', 0xeab7),
    chromeClose: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chrome-close', 0xeab8),
    chromeMaximize: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chrome-maximize', 0xeab9),
    chromeMinimize: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chrome-minimize', 0xeaba),
    chromeRestore: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chrome-restore', 0xeabb),
    circleOutline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-outline', 0xeabc),
    circle: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle', 0xeabc),
    debugBreakpointUnverified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-unverified', 0xeabc),
    terminalDecorationIncomplete: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-decoration-incomplete', 0xeabc),
    circleSlash: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-slash', 0xeabd),
    circuitBoard: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circuit-board', 0xeabe),
    clearAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('clear-all', 0xeabf),
    clippy: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('clippy', 0xeac0),
    closeAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('close-all', 0xeac1),
    cloudDownload: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('cloud-download', 0xeac2),
    cloudUpload: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('cloud-upload', 0xeac3),
    code: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('code', 0xeac4),
    collapseAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('collapse-all', 0xeac5),
    colorMode: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('color-mode', 0xeac6),
    commentDiscussion: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('comment-discussion', 0xeac7),
    creditCard: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('credit-card', 0xeac9),
    dash: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('dash', 0xeacc),
    dashboard: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('dashboard', 0xeacd),
    database: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('database', 0xeace),
    debugContinue: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-continue', 0xeacf),
    debugDisconnect: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-disconnect', 0xead0),
    debugPause: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-pause', 0xead1),
    debugRestart: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-restart', 0xead2),
    debugStart: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-start', 0xead3),
    debugStepInto: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-step-into', 0xead4),
    debugStepOut: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-step-out', 0xead5),
    debugStepOver: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-step-over', 0xead6),
    debugStop: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-stop', 0xead7),
    debug: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug', 0xead8),
    deviceCameraVideo: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('device-camera-video', 0xead9),
    deviceCamera: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('device-camera', 0xeada),
    deviceMobile: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('device-mobile', 0xeadb),
    diffAdded: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-added', 0xeadc),
    diffIgnored: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-ignored', 0xeadd),
    diffModified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-modified', 0xeade),
    diffRemoved: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-removed', 0xeadf),
    diffRenamed: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-renamed', 0xeae0),
    diff: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff', 0xeae1),
    diffSidebyside: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-sidebyside', 0xeae1),
    discard: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('discard', 0xeae2),
    editorLayout: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('editor-layout', 0xeae3),
    emptyWindow: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('empty-window', 0xeae4),
    exclude: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('exclude', 0xeae5),
    extensions: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('extensions', 0xeae6),
    eyeClosed: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('eye-closed', 0xeae7),
    fileBinary: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-binary', 0xeae8),
    fileCode: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-code', 0xeae9),
    fileMedia: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-media', 0xeaea),
    filePdf: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-pdf', 0xeaeb),
    fileSubmodule: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-submodule', 0xeaec),
    fileSymlinkDirectory: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-symlink-directory', 0xeaed),
    fileSymlinkFile: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-symlink-file', 0xeaee),
    fileZip: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('file-zip', 0xeaef),
    files: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('files', 0xeaf0),
    filter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('filter', 0xeaf1),
    flame: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('flame', 0xeaf2),
    foldDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold-down', 0xeaf3),
    foldUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold-up', 0xeaf4),
    fold: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold', 0xeaf5),
    folderActive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('folder-active', 0xeaf6),
    folderOpened: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('folder-opened', 0xeaf7),
    gear: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gear', 0xeaf8),
    gift: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gift', 0xeaf9),
    gistSecret: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gist-secret', 0xeafa),
    gist: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gist', 0xeafb),
    gitCommit: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-commit', 0xeafc),
    gitCompare: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-compare', 0xeafd),
    compareChanges: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('compare-changes', 0xeafd),
    gitMerge: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-merge', 0xeafe),
    githubAction: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('github-action', 0xeaff),
    githubAlt: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('github-alt', 0xeb00),
    globe: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('globe', 0xeb01),
    grabber: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('grabber', 0xeb02),
    graph: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('graph', 0xeb03),
    gripper: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gripper', 0xeb04),
    heart: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('heart', 0xeb05),
    home: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('home', 0xeb06),
    horizontalRule: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('horizontal-rule', 0xeb07),
    hubot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('hubot', 0xeb08),
    inbox: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('inbox', 0xeb09),
    issueReopened: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('issue-reopened', 0xeb0b),
    issues: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('issues', 0xeb0c),
    italic: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('italic', 0xeb0d),
    jersey: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('jersey', 0xeb0e),
    json: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('json', 0xeb0f),
    kebabVertical: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('kebab-vertical', 0xeb10),
    key: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('key', 0xeb11),
    law: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('law', 0xeb12),
    lightbulbAutofix: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('lightbulb-autofix', 0xeb13),
    linkExternal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('link-external', 0xeb14),
    link: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('link', 0xeb15),
    listOrdered: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('list-ordered', 0xeb16),
    listUnordered: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('list-unordered', 0xeb17),
    liveShare: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('live-share', 0xeb18),
    loading: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('loading', 0xeb19),
    location: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('location', 0xeb1a),
    mailRead: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mail-read', 0xeb1b),
    mail: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mail', 0xeb1c),
    markdown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('markdown', 0xeb1d),
    megaphone: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('megaphone', 0xeb1e),
    mention: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mention', 0xeb1f),
    milestone: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('milestone', 0xeb20),
    gitPullRequestMilestone: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-milestone', 0xeb20),
    mortarBoard: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mortar-board', 0xeb21),
    move: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('move', 0xeb22),
    multipleWindows: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('multiple-windows', 0xeb23),
    mute: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mute', 0xeb24),
    noNewline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('no-newline', 0xeb25),
    note: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('note', 0xeb26),
    octoface: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('octoface', 0xeb27),
    openPreview: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('open-preview', 0xeb28),
    package: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('package', 0xeb29),
    paintcan: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('paintcan', 0xeb2a),
    pin: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pin', 0xeb2b),
    play: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('play', 0xeb2c),
    run: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run', 0xeb2c),
    plug: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('plug', 0xeb2d),
    preserveCase: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('preserve-case', 0xeb2e),
    preview: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('preview', 0xeb2f),
    project: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('project', 0xeb30),
    pulse: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pulse', 0xeb31),
    question: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('question', 0xeb32),
    quote: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('quote', 0xeb33),
    radioTower: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('radio-tower', 0xeb34),
    reactions: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('reactions', 0xeb35),
    references: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('references', 0xeb36),
    refresh: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('refresh', 0xeb37),
    regex: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('regex', 0xeb38),
    remoteExplorer: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('remote-explorer', 0xeb39),
    remote: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('remote', 0xeb3a),
    remove: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('remove', 0xeb3b),
    replaceAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('replace-all', 0xeb3c),
    replace: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('replace', 0xeb3d),
    repoClone: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-clone', 0xeb3e),
    repoForcePush: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-force-push', 0xeb3f),
    repoPull: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-pull', 0xeb40),
    repoPush: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-push', 0xeb41),
    report: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('report', 0xeb42),
    requestChanges: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('request-changes', 0xeb43),
    rocket: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('rocket', 0xeb44),
    rootFolderOpened: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('root-folder-opened', 0xeb45),
    rootFolder: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('root-folder', 0xeb46),
    rss: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('rss', 0xeb47),
    ruby: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('ruby', 0xeb48),
    saveAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('save-all', 0xeb49),
    saveAs: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('save-as', 0xeb4a),
    save: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('save', 0xeb4b),
    screenFull: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('screen-full', 0xeb4c),
    screenNormal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('screen-normal', 0xeb4d),
    searchStop: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('search-stop', 0xeb4e),
    server: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('server', 0xeb50),
    settingsGear: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('settings-gear', 0xeb51),
    settings: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('settings', 0xeb52),
    shield: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('shield', 0xeb53),
    smiley: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('smiley', 0xeb54),
    sortPrecedence: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sort-precedence', 0xeb55),
    splitHorizontal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('split-horizontal', 0xeb56),
    splitVertical: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('split-vertical', 0xeb57),
    squirrel: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('squirrel', 0xeb58),
    starFull: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('star-full', 0xeb59),
    starHalf: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('star-half', 0xeb5a),
    symbolClass: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-class', 0xeb5b),
    symbolColor: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-color', 0xeb5c),
    symbolConstant: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-constant', 0xeb5d),
    symbolEnumMember: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-enum-member', 0xeb5e),
    symbolField: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-field', 0xeb5f),
    symbolFile: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-file', 0xeb60),
    symbolInterface: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-interface', 0xeb61),
    symbolKeyword: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-keyword', 0xeb62),
    symbolMisc: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-misc', 0xeb63),
    symbolOperator: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-operator', 0xeb64),
    symbolProperty: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-property', 0xeb65),
    wrench: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('wrench', 0xeb65),
    wrenchSubaction: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('wrench-subaction', 0xeb65),
    symbolSnippet: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-snippet', 0xeb66),
    tasklist: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tasklist', 0xeb67),
    telescope: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('telescope', 0xeb68),
    textSize: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('text-size', 0xeb69),
    threeBars: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('three-bars', 0xeb6a),
    thumbsdown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('thumbsdown', 0xeb6b),
    thumbsup: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('thumbsup', 0xeb6c),
    tools: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tools', 0xeb6d),
    triangleDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('triangle-down', 0xeb6e),
    triangleLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('triangle-left', 0xeb6f),
    triangleRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('triangle-right', 0xeb70),
    triangleUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('triangle-up', 0xeb71),
    twitter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('twitter', 0xeb72),
    unfold: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('unfold', 0xeb73),
    unlock: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('unlock', 0xeb74),
    unmute: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('unmute', 0xeb75),
    unverified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('unverified', 0xeb76),
    verified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('verified', 0xeb77),
    versions: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('versions', 0xeb78),
    vmActive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vm-active', 0xeb79),
    vmOutline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vm-outline', 0xeb7a),
    vmRunning: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vm-running', 0xeb7b),
    watch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('watch', 0xeb7c),
    whitespace: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('whitespace', 0xeb7d),
    wholeWord: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('whole-word', 0xeb7e),
    window: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('window', 0xeb7f),
    wordWrap: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('word-wrap', 0xeb80),
    zoomIn: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('zoom-in', 0xeb81),
    zoomOut: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('zoom-out', 0xeb82),
    listFilter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('list-filter', 0xeb83),
    listFlat: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('list-flat', 0xeb84),
    listSelection: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('list-selection', 0xeb85),
    selection: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('selection', 0xeb85),
    listTree: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('list-tree', 0xeb86),
    debugBreakpointFunctionUnverified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-function-unverified', 0xeb87),
    debugBreakpointFunction: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-function', 0xeb88),
    debugBreakpointFunctionDisabled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-function-disabled', 0xeb88),
    debugStackframeActive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-stackframe-active', 0xeb89),
    circleSmallFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-small-filled', 0xeb8a),
    debugStackframeDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-stackframe-dot', 0xeb8a),
    terminalDecorationMark: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-decoration-mark', 0xeb8a),
    debugStackframe: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-stackframe', 0xeb8b),
    debugStackframeFocused: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-stackframe-focused', 0xeb8b),
    debugBreakpointUnsupported: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-unsupported', 0xeb8c),
    symbolString: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-string', 0xeb8d),
    debugReverseContinue: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-reverse-continue', 0xeb8e),
    debugStepBack: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-step-back', 0xeb8f),
    debugRestartFrame: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-restart-frame', 0xeb90),
    debugAlt: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-alt', 0xeb91),
    callIncoming: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('call-incoming', 0xeb92),
    callOutgoing: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('call-outgoing', 0xeb93),
    menu: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('menu', 0xeb94),
    expandAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('expand-all', 0xeb95),
    feedback: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('feedback', 0xeb96),
    gitPullRequestReviewer: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-reviewer', 0xeb96),
    groupByRefType: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('group-by-ref-type', 0xeb97),
    ungroupByRefType: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('ungroup-by-ref-type', 0xeb98),
    account: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('account', 0xeb99),
    gitPullRequestAssignee: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-assignee', 0xeb99),
    bellDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bell-dot', 0xeb9a),
    debugConsole: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-console', 0xeb9b),
    library: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('library', 0xeb9c),
    output: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('output', 0xeb9d),
    runAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run-all', 0xeb9e),
    syncIgnored: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sync-ignored', 0xeb9f),
    pinned: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pinned', 0xeba0),
    githubInverted: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('github-inverted', 0xeba1),
    serverProcess: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('server-process', 0xeba2),
    serverEnvironment: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('server-environment', 0xeba3),
    pass: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pass', 0xeba4),
    issueClosed: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('issue-closed', 0xeba4),
    stopCircle: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('stop-circle', 0xeba5),
    playCircle: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('play-circle', 0xeba6),
    record: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('record', 0xeba7),
    debugAltSmall: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-alt-small', 0xeba8),
    vmConnect: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vm-connect', 0xeba9),
    cloud: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('cloud', 0xebaa),
    merge: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('merge', 0xebab),
    export: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('export', 0xebac),
    graphLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('graph-left', 0xebad),
    magnet: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('magnet', 0xebae),
    notebook: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('notebook', 0xebaf),
    redo: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('redo', 0xebb0),
    checkAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('check-all', 0xebb1),
    pinnedDirty: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pinned-dirty', 0xebb2),
    passFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pass-filled', 0xebb3),
    circleLargeFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-large-filled', 0xebb4),
    circleLarge: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-large', 0xebb5),
    circleLargeOutline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-large-outline', 0xebb5),
    combine: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('combine', 0xebb6),
    gather: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('gather', 0xebb6),
    table: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('table', 0xebb7),
    variableGroup: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('variable-group', 0xebb8),
    typeHierarchy: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('type-hierarchy', 0xebb9),
    typeHierarchySub: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('type-hierarchy-sub', 0xebba),
    typeHierarchySuper: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('type-hierarchy-super', 0xebbb),
    gitPullRequestCreate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-create', 0xebbc),
    runAbove: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run-above', 0xebbd),
    runBelow: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run-below', 0xebbe),
    notebookTemplate: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('notebook-template', 0xebbf),
    debugRerun: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-rerun', 0xebc0),
    workspaceTrusted: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('workspace-trusted', 0xebc1),
    workspaceUntrusted: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('workspace-untrusted', 0xebc2),
    workspaceUnknown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('workspace-unknown', 0xebc3),
    terminalCmd: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-cmd', 0xebc4),
    terminalDebian: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-debian', 0xebc5),
    terminalLinux: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-linux', 0xebc6),
    terminalPowershell: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-powershell', 0xebc7),
    terminalTmux: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-tmux', 0xebc8),
    terminalUbuntu: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-ubuntu', 0xebc9),
    terminalBash: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-bash', 0xebca),
    arrowSwap: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-swap', 0xebcb),
    copy: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('copy', 0xebcc),
    personAdd: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('person-add', 0xebcd),
    filterFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('filter-filled', 0xebce),
    wand: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('wand', 0xebcf),
    debugLineByLine: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-line-by-line', 0xebd0),
    inspect: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('inspect', 0xebd1),
    layers: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layers', 0xebd2),
    layersDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layers-dot', 0xebd3),
    layersActive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layers-active', 0xebd4),
    compass: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('compass', 0xebd5),
    compassDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('compass-dot', 0xebd6),
    compassActive: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('compass-active', 0xebd7),
    azure: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('azure', 0xebd8),
    issueDraft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('issue-draft', 0xebd9),
    gitPullRequestClosed: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-closed', 0xebda),
    gitPullRequestDraft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-draft', 0xebdb),
    debugAll: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-all', 0xebdc),
    debugCoverage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-coverage', 0xebdd),
    runErrors: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run-errors', 0xebde),
    folderLibrary: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('folder-library', 0xebdf),
    debugContinueSmall: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-continue-small', 0xebe0),
    beakerStop: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('beaker-stop', 0xebe1),
    graphLine: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('graph-line', 0xebe2),
    graphScatter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('graph-scatter', 0xebe3),
    pieChart: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('pie-chart', 0xebe4),
    bracket: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bracket', 0xeb0f),
    bracketDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bracket-dot', 0xebe5),
    bracketError: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bracket-error', 0xebe6),
    lockSmall: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('lock-small', 0xebe7),
    azureDevops: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('azure-devops', 0xebe8),
    verifiedFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('verified-filled', 0xebe9),
    newline: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('newline', 0xebea),
    layout: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout', 0xebeb),
    layoutActivitybarLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-activitybar-left', 0xebec),
    layoutActivitybarRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-activitybar-right', 0xebed),
    layoutPanelLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-panel-left', 0xebee),
    layoutPanelCenter: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-panel-center', 0xebef),
    layoutPanelJustify: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-panel-justify', 0xebf0),
    layoutPanelRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-panel-right', 0xebf1),
    layoutPanel: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-panel', 0xebf2),
    layoutSidebarLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-sidebar-left', 0xebf3),
    layoutSidebarRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-sidebar-right', 0xebf4),
    layoutStatusbar: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-statusbar', 0xebf5),
    layoutMenubar: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-menubar', 0xebf6),
    layoutCentered: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-centered', 0xebf7),
    target: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('target', 0xebf8),
    indent: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('indent', 0xebf9),
    recordSmall: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('record-small', 0xebfa),
    errorSmall: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('error-small', 0xebfb),
    terminalDecorationError: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('terminal-decoration-error', 0xebfb),
    arrowCircleDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-circle-down', 0xebfc),
    arrowCircleLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-circle-left', 0xebfd),
    arrowCircleRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-circle-right', 0xebfe),
    arrowCircleUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('arrow-circle-up', 0xebff),
    layoutSidebarRightOff: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-sidebar-right-off', 0xec00),
    layoutPanelOff: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-panel-off', 0xec01),
    layoutSidebarLeftOff: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('layout-sidebar-left-off', 0xec02),
    blank: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('blank', 0xec03),
    heartFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('heart-filled', 0xec04),
    map: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('map', 0xec05),
    mapHorizontal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('map-horizontal', 0xec05),
    foldHorizontal: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold-horizontal', 0xec05),
    mapFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('map-filled', 0xec06),
    mapHorizontalFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('map-horizontal-filled', 0xec06),
    foldHorizontalFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold-horizontal-filled', 0xec06),
    circleSmall: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('circle-small', 0xec07),
    bellSlash: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bell-slash', 0xec08),
    bellSlashDot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('bell-slash-dot', 0xec09),
    commentUnresolved: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('comment-unresolved', 0xec0a),
    gitPullRequestGoToChanges: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-go-to-changes', 0xec0b),
    gitPullRequestNewChanges: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-pull-request-new-changes', 0xec0c),
    searchFuzzy: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('search-fuzzy', 0xec0d),
    commentDraft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('comment-draft', 0xec0e),
    send: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('send', 0xec0f),
    sparkle: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sparkle', 0xec10),
    insert: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('insert', 0xec11),
    mic: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mic', 0xec12),
    thumbsdownFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('thumbsdown-filled', 0xec13),
    thumbsupFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('thumbsup-filled', 0xec14),
    coffee: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('coffee', 0xec15),
    snake: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('snake', 0xec16),
    game: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('game', 0xec17),
    vr: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vr', 0xec18),
    chip: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('chip', 0xec19),
    piano: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('piano', 0xec1a),
    music: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('music', 0xec1b),
    micFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('mic-filled', 0xec1c),
    repoFetch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('repo-fetch', 0xec1d),
    copilot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('copilot', 0xec1e),
    lightbulbSparkle: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('lightbulb-sparkle', 0xec1f),
    robot: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('robot', 0xec20),
    sparkleFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sparkle-filled', 0xec21),
    diffSingle: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-single', 0xec22),
    diffMultiple: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('diff-multiple', 0xec23),
    surroundWith: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('surround-with', 0xec24),
    share: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('share', 0xec25),
    gitStash: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-stash', 0xec26),
    gitStashApply: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-stash-apply', 0xec27),
    gitStashPop: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-stash-pop', 0xec28),
    vscode: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vscode', 0xec29),
    vscodeInsiders: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('vscode-insiders', 0xec2a),
    codeOss: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('code-oss', 0xec2b),
    runCoverage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run-coverage', 0xec2c),
    runAllCoverage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('run-all-coverage', 0xec2d),
    coverage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('coverage', 0xec2e),
    githubProject: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('github-project', 0xec2f),
    mapVertical: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('map-vertical', 0xec30),
    foldVertical: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold-vertical', 0xec30),
    mapVerticalFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('map-vertical-filled', 0xec31),
    foldVerticalFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('fold-vertical-filled', 0xec31),
    goToSearch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('go-to-search', 0xec32),
    percentage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('percentage', 0xec33),
    sortPercentage: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('sort-percentage', 0xec33),
    attach: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('attach', 0xec34)
};


const $c84964bd21eef0a6$export$ab7af05d1469a894 = {
    dialogError: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('dialog-error', 'error'),
    dialogWarning: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('dialog-warning', 'warning'),
    dialogInfo: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('dialog-info', 'info'),
    dialogClose: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('dialog-close', 'close'),
    treeItemExpanded: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tree-item-expanded', 'chevron-down'),
    treeFilterOnTypeOn: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tree-filter-on-type-on', 'list-filter'),
    treeFilterOnTypeOff: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tree-filter-on-type-off', 'list-selection'),
    treeFilterClear: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tree-filter-clear', 'close'),
    treeItemLoading: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('tree-item-loading', 'loading'),
    menuSelection: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('menu-selection', 'check'),
    menuSubmenu: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('menu-submenu', 'chevron-right'),
    menuBarMore: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('menubar-more', 'more'),
    scrollbarButtonLeft: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('scrollbar-button-left', 'triangle-left'),
    scrollbarButtonRight: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('scrollbar-button-right', 'triangle-right'),
    scrollbarButtonUp: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('scrollbar-button-up', 'triangle-up'),
    scrollbarButtonDown: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('scrollbar-button-down', 'triangle-down'),
    toolBarMore: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('toolbar-more', 'more'),
    quickInputBack: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('quick-input-back', 'arrow-left'),
    dropDownButton: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('drop-down-button', 0xeab4),
    symbolCustomColor: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('symbol-customcolor', 0xeb5c),
    exportIcon: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('export', 0xebac),
    workspaceUnspecified: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('workspace-unspecified', 0xebc3),
    newLine: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('newline', 0xebea),
    thumbsDownFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('thumbsdown-filled', 0xec13),
    thumbsUpFilled: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('thumbsup-filled', 0xec14),
    gitFetch: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('git-fetch', 0xec1d),
    lightbulbSparkleAutofix: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('lightbulb-sparkle-autofix', 0xec1f),
    debugBreakpointPending: (0, $1a275a372e799cd2$export$6503ec6e8aabbaf)('debug-breakpoint-pending', 0xebd9)
};
const $c84964bd21eef0a6$export$bdee77c893e444e6 = {
    ...(0, $f619a6f6ae9d80b8$export$2515b2d1f7bd1247),
    ...$c84964bd21eef0a6$export$ab7af05d1469a894
};




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

class $040701628193f5a7$export$df4366dca91e7ab1 {
    constructor(){
        this._tokenizationSupports = new Map();
        this._factories = new Map();
        this._onDidChange = new (0, $d7b8088681a716ec$export$4293555f241ae35a)();
        this.onDidChange = this._onDidChange.event;
        this._colorMap = null;
    }
    handleChange(languageIds) {
        this._onDidChange.fire({
            changedLanguages: languageIds,
            changedColorMap: false
        });
    }
    register(languageId, support) {
        this._tokenizationSupports.set(languageId, support);
        this.handleChange([
            languageId
        ]);
        return (0, $c817ee4fd79558e8$export$aef110c64ebd5f30)(()=>{
            if (this._tokenizationSupports.get(languageId) !== support) return;
            this._tokenizationSupports.delete(languageId);
            this.handleChange([
                languageId
            ]);
        });
    }
    get(languageId) {
        return this._tokenizationSupports.get(languageId) || null;
    }
    registerFactory(languageId, factory) {
        this._factories.get(languageId)?.dispose();
        const myData = new $040701628193f5a7$var$TokenizationSupportFactoryData(this, languageId, factory);
        this._factories.set(languageId, myData);
        return (0, $c817ee4fd79558e8$export$aef110c64ebd5f30)(()=>{
            const v = this._factories.get(languageId);
            if (!v || v !== myData) return;
            this._factories.delete(languageId);
            v.dispose();
        });
    }
    async getOrCreate(languageId) {
        // check first if the support is already set
        const tokenizationSupport = this.get(languageId);
        if (tokenizationSupport) return tokenizationSupport;
        const factory = this._factories.get(languageId);
        if (!factory || factory.isResolved) // no factory or factory.resolve already finished
        return null;
        await factory.resolve();
        return this.get(languageId);
    }
    isResolved(languageId) {
        const tokenizationSupport = this.get(languageId);
        if (tokenizationSupport) return true;
        const factory = this._factories.get(languageId);
        if (!factory || factory.isResolved) return true;
        return false;
    }
    setColorMap(colorMap) {
        this._colorMap = colorMap;
        this._onDidChange.fire({
            changedLanguages: Array.from(this._tokenizationSupports.keys()),
            changedColorMap: true
        });
    }
    getColorMap() {
        return this._colorMap;
    }
    getDefaultBackground() {
        if (this._colorMap && this._colorMap.length > 2 /* ColorId.DefaultBackground */ ) return this._colorMap[2 /* ColorId.DefaultBackground */ ];
        return null;
    }
}
class $040701628193f5a7$var$TokenizationSupportFactoryData extends (0, $c817ee4fd79558e8$export$252720412a173de) {
    get isResolved() {
        return this._isResolved;
    }
    constructor(_registry, _languageId, _factory){
        super();
        this._registry = _registry;
        this._languageId = _languageId;
        this._factory = _factory;
        this._isDisposed = false;
        this._resolvePromise = null;
        this._isResolved = false;
    }
    dispose() {
        this._isDisposed = true;
        super.dispose();
    }
    async resolve() {
        if (!this._resolvePromise) this._resolvePromise = this._create();
        return this._resolvePromise;
    }
    async _create() {
        const value = await this._factory.tokenizationSupport;
        this._isResolved = true;
        if (value && !this._isDisposed) this._register(this._registry.register(this._languageId, value));
    }
}



class $5e3486e25f60d1fa$export$50792b0e93539fde {
    constructor(offset, type, language){
        this.offset = offset;
        this.type = type;
        this.language = language;
        this._tokenBrand = undefined;
    }
    toString() {
        return '(' + this.offset + ', ' + this.type + ')';
    }
}
class $5e3486e25f60d1fa$export$67386d3db0427ad2 {
    constructor(tokens, endState){
        this.tokens = tokens;
        this.endState = endState;
        this._tokenizationResultBrand = undefined;
    }
}
class $5e3486e25f60d1fa$export$a5e0b084d24a2bae {
    constructor(/**
     * The tokens in binary format. Each token occupies two array indices. For token i:
     *  - at offset 2*i => startIndex
     *  - at offset 2*i + 1 => metadata
     *
     */ tokens, endState){
        this.tokens = tokens;
        this.endState = endState;
        this._encodedTokenizationResultBrand = undefined;
    }
}
var $5e3486e25f60d1fa$export$d08f6efc3ac3285;
(function(HoverVerbosityAction) {
    /**
     * Increase the verbosity of the hover
     */ HoverVerbosityAction[HoverVerbosityAction["Increase"] = 0] = "Increase";
    /**
     * Decrease the verbosity of the hover
     */ HoverVerbosityAction[HoverVerbosityAction["Decrease"] = 1] = "Decrease";
})($5e3486e25f60d1fa$export$d08f6efc3ac3285 || ($5e3486e25f60d1fa$export$d08f6efc3ac3285 = {}));
var $5e3486e25f60d1fa$export$bcc1eba0dce5435f;
(function(CompletionItemKinds) {
    const byKind = new Map();
    byKind.set(0 /* CompletionItemKind.Method */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolMethod);
    byKind.set(1 /* CompletionItemKind.Function */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolFunction);
    byKind.set(2 /* CompletionItemKind.Constructor */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolConstructor);
    byKind.set(3 /* CompletionItemKind.Field */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolField);
    byKind.set(4 /* CompletionItemKind.Variable */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolVariable);
    byKind.set(5 /* CompletionItemKind.Class */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolClass);
    byKind.set(6 /* CompletionItemKind.Struct */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolStruct);
    byKind.set(7 /* CompletionItemKind.Interface */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolInterface);
    byKind.set(8 /* CompletionItemKind.Module */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolModule);
    byKind.set(9 /* CompletionItemKind.Property */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolProperty);
    byKind.set(10 /* CompletionItemKind.Event */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEvent);
    byKind.set(11 /* CompletionItemKind.Operator */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolOperator);
    byKind.set(12 /* CompletionItemKind.Unit */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolUnit);
    byKind.set(13 /* CompletionItemKind.Value */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolValue);
    byKind.set(15 /* CompletionItemKind.Enum */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEnum);
    byKind.set(14 /* CompletionItemKind.Constant */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolConstant);
    byKind.set(15 /* CompletionItemKind.Enum */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEnum);
    byKind.set(16 /* CompletionItemKind.EnumMember */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEnumMember);
    byKind.set(17 /* CompletionItemKind.Keyword */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolKeyword);
    byKind.set(27 /* CompletionItemKind.Snippet */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolSnippet);
    byKind.set(18 /* CompletionItemKind.Text */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolText);
    byKind.set(19 /* CompletionItemKind.Color */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolColor);
    byKind.set(20 /* CompletionItemKind.File */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolFile);
    byKind.set(21 /* CompletionItemKind.Reference */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolReference);
    byKind.set(22 /* CompletionItemKind.Customcolor */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolCustomColor);
    byKind.set(23 /* CompletionItemKind.Folder */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolFolder);
    byKind.set(24 /* CompletionItemKind.TypeParameter */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolTypeParameter);
    byKind.set(25 /* CompletionItemKind.User */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).account);
    byKind.set(26 /* CompletionItemKind.Issue */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).issues);
    /**
     * @internal
     */ function toIcon(kind) {
        let codicon = byKind.get(kind);
        if (!codicon) {
            console.info('No codicon found for CompletionItemKind ' + kind);
            codicon = (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolProperty;
        }
        return codicon;
    }
    CompletionItemKinds.toIcon = toIcon;
    const data = new Map();
    data.set('method', 0 /* CompletionItemKind.Method */ );
    data.set('function', 1 /* CompletionItemKind.Function */ );
    data.set('constructor', 2 /* CompletionItemKind.Constructor */ );
    data.set('field', 3 /* CompletionItemKind.Field */ );
    data.set('variable', 4 /* CompletionItemKind.Variable */ );
    data.set('class', 5 /* CompletionItemKind.Class */ );
    data.set('struct', 6 /* CompletionItemKind.Struct */ );
    data.set('interface', 7 /* CompletionItemKind.Interface */ );
    data.set('module', 8 /* CompletionItemKind.Module */ );
    data.set('property', 9 /* CompletionItemKind.Property */ );
    data.set('event', 10 /* CompletionItemKind.Event */ );
    data.set('operator', 11 /* CompletionItemKind.Operator */ );
    data.set('unit', 12 /* CompletionItemKind.Unit */ );
    data.set('value', 13 /* CompletionItemKind.Value */ );
    data.set('constant', 14 /* CompletionItemKind.Constant */ );
    data.set('enum', 15 /* CompletionItemKind.Enum */ );
    data.set('enum-member', 16 /* CompletionItemKind.EnumMember */ );
    data.set('enumMember', 16 /* CompletionItemKind.EnumMember */ );
    data.set('keyword', 17 /* CompletionItemKind.Keyword */ );
    data.set('snippet', 27 /* CompletionItemKind.Snippet */ );
    data.set('text', 18 /* CompletionItemKind.Text */ );
    data.set('color', 19 /* CompletionItemKind.Color */ );
    data.set('file', 20 /* CompletionItemKind.File */ );
    data.set('reference', 21 /* CompletionItemKind.Reference */ );
    data.set('customcolor', 22 /* CompletionItemKind.Customcolor */ );
    data.set('folder', 23 /* CompletionItemKind.Folder */ );
    data.set('type-parameter', 24 /* CompletionItemKind.TypeParameter */ );
    data.set('typeParameter', 24 /* CompletionItemKind.TypeParameter */ );
    data.set('account', 25 /* CompletionItemKind.User */ );
    data.set('issue', 26 /* CompletionItemKind.Issue */ );
    /**
     * @internal
     */ function fromString(value, strict) {
        let res = data.get(value);
        if (typeof res === 'undefined' && !strict) res = 9 /* CompletionItemKind.Property */ ;
        return res;
    }
    CompletionItemKinds.fromString = fromString;
})($5e3486e25f60d1fa$export$bcc1eba0dce5435f || ($5e3486e25f60d1fa$export$bcc1eba0dce5435f = {}));
var $5e3486e25f60d1fa$export$6bafdd6d60c3d59c;
(function(InlineCompletionTriggerKind) {
    /**
     * Completion was triggered automatically while editing.
     * It is sufficient to return a single completion item in this case.
     */ InlineCompletionTriggerKind[InlineCompletionTriggerKind["Automatic"] = 0] = "Automatic";
    /**
     * Completion was triggered explicitly by a user gesture.
     * Return multiple completion items to enable cycling through them.
     */ InlineCompletionTriggerKind[InlineCompletionTriggerKind["Explicit"] = 1] = "Explicit";
})($5e3486e25f60d1fa$export$6bafdd6d60c3d59c || ($5e3486e25f60d1fa$export$6bafdd6d60c3d59c = {}));
class $5e3486e25f60d1fa$export$46ec7a013e4f2033 {
    constructor(range, text, completionKind, isSnippetText){
        this.range = range;
        this.text = text;
        this.completionKind = completionKind;
        this.isSnippetText = isSnippetText;
    }
    equals(other) {
        return (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).lift(this.range).equalsRange(other.range) && this.text === other.text && this.completionKind === other.completionKind && this.isSnippetText === other.isSnippetText;
    }
}
var $5e3486e25f60d1fa$export$cdb26f992c97d717;
(function(DocumentPasteTriggerKind) {
    DocumentPasteTriggerKind[DocumentPasteTriggerKind["Automatic"] = 0] = "Automatic";
    DocumentPasteTriggerKind[DocumentPasteTriggerKind["PasteAs"] = 1] = "PasteAs";
})($5e3486e25f60d1fa$export$cdb26f992c97d717 || ($5e3486e25f60d1fa$export$cdb26f992c97d717 = {}));
var $5e3486e25f60d1fa$export$9ae4890115b84f4c;
(function(SignatureHelpTriggerKind) {
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})($5e3486e25f60d1fa$export$9ae4890115b84f4c || ($5e3486e25f60d1fa$export$9ae4890115b84f4c = {}));
var $5e3486e25f60d1fa$export$c6fa1377d1045f77;
(function(DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */ DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
    /**
     * Read-access of a symbol, like reading a variable.
     */ DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
    /**
     * Write-access of a symbol, like writing to a variable.
     */ DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})($5e3486e25f60d1fa$export$c6fa1377d1045f77 || ($5e3486e25f60d1fa$export$c6fa1377d1045f77 = {}));
function $5e3486e25f60d1fa$export$1deea3ad79a9f5a6(thing) {
    return thing && (0, $35ec765602f96f4b$export$9156e739aa33e19f).isUri(thing.uri) && (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).isIRange(thing.range) && ((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).isIRange(thing.originSelectionRange) || (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).isIRange(thing.targetSelectionRange));
}
const $5e3486e25f60d1fa$export$276b7be91de572a0 = {
    [17 /* SymbolKind.Array */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Array', "array"),
    [16 /* SymbolKind.Boolean */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Boolean', "boolean"),
    [4 /* SymbolKind.Class */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Class', "class"),
    [13 /* SymbolKind.Constant */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Constant', "constant"),
    [8 /* SymbolKind.Constructor */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Constructor', "constructor"),
    [9 /* SymbolKind.Enum */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Enum', "enumeration"),
    [21 /* SymbolKind.EnumMember */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('EnumMember', "enumeration member"),
    [23 /* SymbolKind.Event */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Event', "event"),
    [7 /* SymbolKind.Field */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Field', "field"),
    [0 /* SymbolKind.File */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('File', "file"),
    [11 /* SymbolKind.Function */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Function', "function"),
    [10 /* SymbolKind.Interface */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Interface', "interface"),
    [19 /* SymbolKind.Key */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Key', "key"),
    [5 /* SymbolKind.Method */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Method', "method"),
    [1 /* SymbolKind.Module */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Module', "module"),
    [2 /* SymbolKind.Namespace */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Namespace', "namespace"),
    [20 /* SymbolKind.Null */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Null', "null"),
    [15 /* SymbolKind.Number */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Number', "number"),
    [18 /* SymbolKind.Object */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Object', "object"),
    [24 /* SymbolKind.Operator */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Operator', "operator"),
    [3 /* SymbolKind.Package */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Package', "package"),
    [6 /* SymbolKind.Property */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Property', "property"),
    [14 /* SymbolKind.String */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('String', "string"),
    [22 /* SymbolKind.Struct */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Struct', "struct"),
    [25 /* SymbolKind.TypeParameter */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('TypeParameter', "type parameter"),
    [12 /* SymbolKind.Variable */ ]: (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('Variable', "variable")
};
function $5e3486e25f60d1fa$export$9f93c1f90c2e8057(symbolName, kind) {
    return (0, $83cfef769dcbd0a2$export$b3bd0bc58e36cd63)('symbolAriaLabel', '{0} ({1})', symbolName, $5e3486e25f60d1fa$export$276b7be91de572a0[kind]);
}
var $5e3486e25f60d1fa$export$ee339f3b76c41b12;
(function(SymbolKinds) {
    const byKind = new Map();
    byKind.set(0 /* SymbolKind.File */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolFile);
    byKind.set(1 /* SymbolKind.Module */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolModule);
    byKind.set(2 /* SymbolKind.Namespace */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolNamespace);
    byKind.set(3 /* SymbolKind.Package */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolPackage);
    byKind.set(4 /* SymbolKind.Class */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolClass);
    byKind.set(5 /* SymbolKind.Method */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolMethod);
    byKind.set(6 /* SymbolKind.Property */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolProperty);
    byKind.set(7 /* SymbolKind.Field */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolField);
    byKind.set(8 /* SymbolKind.Constructor */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolConstructor);
    byKind.set(9 /* SymbolKind.Enum */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEnum);
    byKind.set(10 /* SymbolKind.Interface */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolInterface);
    byKind.set(11 /* SymbolKind.Function */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolFunction);
    byKind.set(12 /* SymbolKind.Variable */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolVariable);
    byKind.set(13 /* SymbolKind.Constant */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolConstant);
    byKind.set(14 /* SymbolKind.String */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolString);
    byKind.set(15 /* SymbolKind.Number */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolNumber);
    byKind.set(16 /* SymbolKind.Boolean */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolBoolean);
    byKind.set(17 /* SymbolKind.Array */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolArray);
    byKind.set(18 /* SymbolKind.Object */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolObject);
    byKind.set(19 /* SymbolKind.Key */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolKey);
    byKind.set(20 /* SymbolKind.Null */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolNull);
    byKind.set(21 /* SymbolKind.EnumMember */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEnumMember);
    byKind.set(22 /* SymbolKind.Struct */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolStruct);
    byKind.set(23 /* SymbolKind.Event */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolEvent);
    byKind.set(24 /* SymbolKind.Operator */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolOperator);
    byKind.set(25 /* SymbolKind.TypeParameter */ , (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolTypeParameter);
    /**
     * @internal
     */ function toIcon(kind) {
        let icon = byKind.get(kind);
        if (!icon) {
            console.info('No codicon found for SymbolKind ' + kind);
            icon = (0, $c84964bd21eef0a6$export$bdee77c893e444e6).symbolProperty;
        }
        return icon;
    }
    SymbolKinds.toIcon = toIcon;
})($5e3486e25f60d1fa$export$ee339f3b76c41b12 || ($5e3486e25f60d1fa$export$ee339f3b76c41b12 = {}));
class $5e3486e25f60d1fa$export$c5db55acc87904b6 {
}
class $5e3486e25f60d1fa$export$1239a593d25efa09 {
    /**
     * Kind for folding range representing a comment. The value of the kind is 'comment'.
     */ static{
        this.Comment = new $5e3486e25f60d1fa$export$1239a593d25efa09('comment');
    }
    /**
     * Kind for folding range representing a import. The value of the kind is 'imports'.
     */ static{
        this.Imports = new $5e3486e25f60d1fa$export$1239a593d25efa09('imports');
    }
    /**
     * Kind for folding range representing regions (for example marked by `#region`, `#endregion`).
     * The value of the kind is 'region'.
     */ static{
        this.Region = new $5e3486e25f60d1fa$export$1239a593d25efa09('region');
    }
    /**
     * Returns a {@link FoldingRangeKind} for the given value.
     *
     * @param value of the kind.
     */ static fromValue(value) {
        switch(value){
            case 'comment':
                return $5e3486e25f60d1fa$export$1239a593d25efa09.Comment;
            case 'imports':
                return $5e3486e25f60d1fa$export$1239a593d25efa09.Imports;
            case 'region':
                return $5e3486e25f60d1fa$export$1239a593d25efa09.Region;
        }
        return new $5e3486e25f60d1fa$export$1239a593d25efa09(value);
    }
    /**
     * Creates a new {@link FoldingRangeKind}.
     *
     * @param value of the kind.
     */ constructor(value){
        this.value = value;
    }
}
var $5e3486e25f60d1fa$export$bab0b0a8a8ed8748;
(function(NewSymbolNameTag) {
    NewSymbolNameTag[NewSymbolNameTag["AIGenerated"] = 1] = "AIGenerated";
})($5e3486e25f60d1fa$export$bab0b0a8a8ed8748 || ($5e3486e25f60d1fa$export$bab0b0a8a8ed8748 = {}));
var $5e3486e25f60d1fa$export$9cd1d72a90294bb0;
(function(NewSymbolNameTriggerKind) {
    NewSymbolNameTriggerKind[NewSymbolNameTriggerKind["Invoke"] = 0] = "Invoke";
    NewSymbolNameTriggerKind[NewSymbolNameTriggerKind["Automatic"] = 1] = "Automatic";
})($5e3486e25f60d1fa$export$9cd1d72a90294bb0 || ($5e3486e25f60d1fa$export$9cd1d72a90294bb0 = {}));
var $5e3486e25f60d1fa$export$cc7e12c76513e857;
(function(Command) {
    /**
     * @internal
     */ function is(obj) {
        if (!obj || typeof obj !== 'object') return false;
        return typeof obj.id === 'string' && typeof obj.title === 'string';
    }
    Command.is = is;
})($5e3486e25f60d1fa$export$cc7e12c76513e857 || ($5e3486e25f60d1fa$export$cc7e12c76513e857 = {}));
var $5e3486e25f60d1fa$export$3e6e7edd3baa8b2f;
(function(InlayHintKind) {
    InlayHintKind[InlayHintKind["Type"] = 1] = "Type";
    InlayHintKind[InlayHintKind["Parameter"] = 2] = "Parameter";
})($5e3486e25f60d1fa$export$3e6e7edd3baa8b2f || ($5e3486e25f60d1fa$export$3e6e7edd3baa8b2f = {}));
class $5e3486e25f60d1fa$export$f2380b609cf90ffd {
    constructor(createSupport){
        this.createSupport = createSupport;
        this._tokenizationSupport = null;
    }
    dispose() {
        if (this._tokenizationSupport) this._tokenizationSupport.then((support)=>{
            if (support) support.dispose();
        });
    }
    get tokenizationSupport() {
        if (!this._tokenizationSupport) this._tokenizationSupport = this.createSupport();
        return this._tokenizationSupport;
    }
}
const $5e3486e25f60d1fa$export$df4366dca91e7ab1 = new (0, $040701628193f5a7$export$df4366dca91e7ab1)();
const $5e3486e25f60d1fa$export$771b1a4eb9b4be07 = new (0, $040701628193f5a7$export$df4366dca91e7ab1)();
var $5e3486e25f60d1fa$export$72b97be94925c017;
(function(InlineEditTriggerKind) {
    InlineEditTriggerKind[InlineEditTriggerKind["Invoke"] = 0] = "Invoke";
    InlineEditTriggerKind[InlineEditTriggerKind["Automatic"] = 1] = "Automatic";
})($5e3486e25f60d1fa$export$72b97be94925c017 || ($5e3486e25f60d1fa$export$72b97be94925c017 = {}));


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ // THIS IS A GENERATED FILE. DO NOT EDIT DIRECTLY.
var $a0f96218742123a7$export$135fbbcd1a6725a5;
(function(AccessibilitySupport) {
    /**
     * This should be the browser case where it is not known if a screen reader is attached or no.
     */ AccessibilitySupport[AccessibilitySupport["Unknown"] = 0] = "Unknown";
    AccessibilitySupport[AccessibilitySupport["Disabled"] = 1] = "Disabled";
    AccessibilitySupport[AccessibilitySupport["Enabled"] = 2] = "Enabled";
})($a0f96218742123a7$export$135fbbcd1a6725a5 || ($a0f96218742123a7$export$135fbbcd1a6725a5 = {}));
var $a0f96218742123a7$export$937a531e0d3a74b6;
(function(CodeActionTriggerType) {
    CodeActionTriggerType[CodeActionTriggerType["Invoke"] = 1] = "Invoke";
    CodeActionTriggerType[CodeActionTriggerType["Auto"] = 2] = "Auto";
})($a0f96218742123a7$export$937a531e0d3a74b6 || ($a0f96218742123a7$export$937a531e0d3a74b6 = {}));
var $a0f96218742123a7$export$896b684319da334;
(function(CompletionItemInsertTextRule) {
    CompletionItemInsertTextRule[CompletionItemInsertTextRule["None"] = 0] = "None";
    /**
     * Adjust whitespace/indentation of multiline insert texts to
     * match the current line indentation.
     */ CompletionItemInsertTextRule[CompletionItemInsertTextRule["KeepWhitespace"] = 1] = "KeepWhitespace";
    /**
     * `insertText` is a snippet.
     */ CompletionItemInsertTextRule[CompletionItemInsertTextRule["InsertAsSnippet"] = 4] = "InsertAsSnippet";
})($a0f96218742123a7$export$896b684319da334 || ($a0f96218742123a7$export$896b684319da334 = {}));
var $a0f96218742123a7$export$99d00115014a86a8;
(function(CompletionItemKind) {
    CompletionItemKind[CompletionItemKind["Method"] = 0] = "Method";
    CompletionItemKind[CompletionItemKind["Function"] = 1] = "Function";
    CompletionItemKind[CompletionItemKind["Constructor"] = 2] = "Constructor";
    CompletionItemKind[CompletionItemKind["Field"] = 3] = "Field";
    CompletionItemKind[CompletionItemKind["Variable"] = 4] = "Variable";
    CompletionItemKind[CompletionItemKind["Class"] = 5] = "Class";
    CompletionItemKind[CompletionItemKind["Struct"] = 6] = "Struct";
    CompletionItemKind[CompletionItemKind["Interface"] = 7] = "Interface";
    CompletionItemKind[CompletionItemKind["Module"] = 8] = "Module";
    CompletionItemKind[CompletionItemKind["Property"] = 9] = "Property";
    CompletionItemKind[CompletionItemKind["Event"] = 10] = "Event";
    CompletionItemKind[CompletionItemKind["Operator"] = 11] = "Operator";
    CompletionItemKind[CompletionItemKind["Unit"] = 12] = "Unit";
    CompletionItemKind[CompletionItemKind["Value"] = 13] = "Value";
    CompletionItemKind[CompletionItemKind["Constant"] = 14] = "Constant";
    CompletionItemKind[CompletionItemKind["Enum"] = 15] = "Enum";
    CompletionItemKind[CompletionItemKind["EnumMember"] = 16] = "EnumMember";
    CompletionItemKind[CompletionItemKind["Keyword"] = 17] = "Keyword";
    CompletionItemKind[CompletionItemKind["Text"] = 18] = "Text";
    CompletionItemKind[CompletionItemKind["Color"] = 19] = "Color";
    CompletionItemKind[CompletionItemKind["File"] = 20] = "File";
    CompletionItemKind[CompletionItemKind["Reference"] = 21] = "Reference";
    CompletionItemKind[CompletionItemKind["Customcolor"] = 22] = "Customcolor";
    CompletionItemKind[CompletionItemKind["Folder"] = 23] = "Folder";
    CompletionItemKind[CompletionItemKind["TypeParameter"] = 24] = "TypeParameter";
    CompletionItemKind[CompletionItemKind["User"] = 25] = "User";
    CompletionItemKind[CompletionItemKind["Issue"] = 26] = "Issue";
    CompletionItemKind[CompletionItemKind["Snippet"] = 27] = "Snippet";
})($a0f96218742123a7$export$99d00115014a86a8 || ($a0f96218742123a7$export$99d00115014a86a8 = {}));
var $a0f96218742123a7$export$dac5702deb26775e;
(function(CompletionItemTag) {
    CompletionItemTag[CompletionItemTag["Deprecated"] = 1] = "Deprecated";
})($a0f96218742123a7$export$dac5702deb26775e || ($a0f96218742123a7$export$dac5702deb26775e = {}));
var $a0f96218742123a7$export$cca0c1cb3f1cfa30;
(function(CompletionTriggerKind) {
    CompletionTriggerKind[CompletionTriggerKind["Invoke"] = 0] = "Invoke";
    CompletionTriggerKind[CompletionTriggerKind["TriggerCharacter"] = 1] = "TriggerCharacter";
    CompletionTriggerKind[CompletionTriggerKind["TriggerForIncompleteCompletions"] = 2] = "TriggerForIncompleteCompletions";
})($a0f96218742123a7$export$cca0c1cb3f1cfa30 || ($a0f96218742123a7$export$cca0c1cb3f1cfa30 = {}));
var $a0f96218742123a7$export$ee12e4422b4a16ff;
(function(ContentWidgetPositionPreference) {
    /**
     * Place the content widget exactly at a position
     */ ContentWidgetPositionPreference[ContentWidgetPositionPreference["EXACT"] = 0] = "EXACT";
    /**
     * Place the content widget above a position
     */ ContentWidgetPositionPreference[ContentWidgetPositionPreference["ABOVE"] = 1] = "ABOVE";
    /**
     * Place the content widget below a position
     */ ContentWidgetPositionPreference[ContentWidgetPositionPreference["BELOW"] = 2] = "BELOW";
})($a0f96218742123a7$export$ee12e4422b4a16ff || ($a0f96218742123a7$export$ee12e4422b4a16ff = {}));
var $a0f96218742123a7$export$e5a62e92015809e4;
(function(CursorChangeReason) {
    /**
     * Unknown or not set.
     */ CursorChangeReason[CursorChangeReason["NotSet"] = 0] = "NotSet";
    /**
     * A `model.setValue()` was called.
     */ CursorChangeReason[CursorChangeReason["ContentFlush"] = 1] = "ContentFlush";
    /**
     * The `model` has been changed outside of this cursor and the cursor recovers its position from associated markers.
     */ CursorChangeReason[CursorChangeReason["RecoverFromMarkers"] = 2] = "RecoverFromMarkers";
    /**
     * There was an explicit user gesture.
     */ CursorChangeReason[CursorChangeReason["Explicit"] = 3] = "Explicit";
    /**
     * There was a Paste.
     */ CursorChangeReason[CursorChangeReason["Paste"] = 4] = "Paste";
    /**
     * There was an Undo.
     */ CursorChangeReason[CursorChangeReason["Undo"] = 5] = "Undo";
    /**
     * There was a Redo.
     */ CursorChangeReason[CursorChangeReason["Redo"] = 6] = "Redo";
})($a0f96218742123a7$export$e5a62e92015809e4 || ($a0f96218742123a7$export$e5a62e92015809e4 = {}));
var $a0f96218742123a7$export$7f6cb1a9fbc1529e;
(function(DefaultEndOfLine) {
    /**
     * Use line feed (\n) as the end of line character.
     */ DefaultEndOfLine[DefaultEndOfLine["LF"] = 1] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */ DefaultEndOfLine[DefaultEndOfLine["CRLF"] = 2] = "CRLF";
})($a0f96218742123a7$export$7f6cb1a9fbc1529e || ($a0f96218742123a7$export$7f6cb1a9fbc1529e = {}));
var $a0f96218742123a7$export$c6fa1377d1045f77;
(function(DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */ DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
    /**
     * Read-access of a symbol, like reading a variable.
     */ DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
    /**
     * Write-access of a symbol, like writing to a variable.
     */ DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})($a0f96218742123a7$export$c6fa1377d1045f77 || ($a0f96218742123a7$export$c6fa1377d1045f77 = {}));
var $a0f96218742123a7$export$ee33a5d7c9f30d0e;
(function(EditorAutoIndentStrategy) {
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["None"] = 0] = "None";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Keep"] = 1] = "Keep";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Brackets"] = 2] = "Brackets";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Advanced"] = 3] = "Advanced";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Full"] = 4] = "Full";
})($a0f96218742123a7$export$ee33a5d7c9f30d0e || ($a0f96218742123a7$export$ee33a5d7c9f30d0e = {}));
var $a0f96218742123a7$export$691ec5d1a6c1d955;
(function(EditorOption) {
    EditorOption[EditorOption["acceptSuggestionOnCommitCharacter"] = 0] = "acceptSuggestionOnCommitCharacter";
    EditorOption[EditorOption["acceptSuggestionOnEnter"] = 1] = "acceptSuggestionOnEnter";
    EditorOption[EditorOption["accessibilitySupport"] = 2] = "accessibilitySupport";
    EditorOption[EditorOption["accessibilityPageSize"] = 3] = "accessibilityPageSize";
    EditorOption[EditorOption["ariaLabel"] = 4] = "ariaLabel";
    EditorOption[EditorOption["ariaRequired"] = 5] = "ariaRequired";
    EditorOption[EditorOption["autoClosingBrackets"] = 6] = "autoClosingBrackets";
    EditorOption[EditorOption["autoClosingComments"] = 7] = "autoClosingComments";
    EditorOption[EditorOption["screenReaderAnnounceInlineSuggestion"] = 8] = "screenReaderAnnounceInlineSuggestion";
    EditorOption[EditorOption["autoClosingDelete"] = 9] = "autoClosingDelete";
    EditorOption[EditorOption["autoClosingOvertype"] = 10] = "autoClosingOvertype";
    EditorOption[EditorOption["autoClosingQuotes"] = 11] = "autoClosingQuotes";
    EditorOption[EditorOption["autoIndent"] = 12] = "autoIndent";
    EditorOption[EditorOption["automaticLayout"] = 13] = "automaticLayout";
    EditorOption[EditorOption["autoSurround"] = 14] = "autoSurround";
    EditorOption[EditorOption["bracketPairColorization"] = 15] = "bracketPairColorization";
    EditorOption[EditorOption["guides"] = 16] = "guides";
    EditorOption[EditorOption["codeLens"] = 17] = "codeLens";
    EditorOption[EditorOption["codeLensFontFamily"] = 18] = "codeLensFontFamily";
    EditorOption[EditorOption["codeLensFontSize"] = 19] = "codeLensFontSize";
    EditorOption[EditorOption["colorDecorators"] = 20] = "colorDecorators";
    EditorOption[EditorOption["colorDecoratorsLimit"] = 21] = "colorDecoratorsLimit";
    EditorOption[EditorOption["columnSelection"] = 22] = "columnSelection";
    EditorOption[EditorOption["comments"] = 23] = "comments";
    EditorOption[EditorOption["contextmenu"] = 24] = "contextmenu";
    EditorOption[EditorOption["copyWithSyntaxHighlighting"] = 25] = "copyWithSyntaxHighlighting";
    EditorOption[EditorOption["cursorBlinking"] = 26] = "cursorBlinking";
    EditorOption[EditorOption["cursorSmoothCaretAnimation"] = 27] = "cursorSmoothCaretAnimation";
    EditorOption[EditorOption["cursorStyle"] = 28] = "cursorStyle";
    EditorOption[EditorOption["cursorSurroundingLines"] = 29] = "cursorSurroundingLines";
    EditorOption[EditorOption["cursorSurroundingLinesStyle"] = 30] = "cursorSurroundingLinesStyle";
    EditorOption[EditorOption["cursorWidth"] = 31] = "cursorWidth";
    EditorOption[EditorOption["disableLayerHinting"] = 32] = "disableLayerHinting";
    EditorOption[EditorOption["disableMonospaceOptimizations"] = 33] = "disableMonospaceOptimizations";
    EditorOption[EditorOption["domReadOnly"] = 34] = "domReadOnly";
    EditorOption[EditorOption["dragAndDrop"] = 35] = "dragAndDrop";
    EditorOption[EditorOption["dropIntoEditor"] = 36] = "dropIntoEditor";
    EditorOption[EditorOption["emptySelectionClipboard"] = 37] = "emptySelectionClipboard";
    EditorOption[EditorOption["experimentalWhitespaceRendering"] = 38] = "experimentalWhitespaceRendering";
    EditorOption[EditorOption["extraEditorClassName"] = 39] = "extraEditorClassName";
    EditorOption[EditorOption["fastScrollSensitivity"] = 40] = "fastScrollSensitivity";
    EditorOption[EditorOption["find"] = 41] = "find";
    EditorOption[EditorOption["fixedOverflowWidgets"] = 42] = "fixedOverflowWidgets";
    EditorOption[EditorOption["folding"] = 43] = "folding";
    EditorOption[EditorOption["foldingStrategy"] = 44] = "foldingStrategy";
    EditorOption[EditorOption["foldingHighlight"] = 45] = "foldingHighlight";
    EditorOption[EditorOption["foldingImportsByDefault"] = 46] = "foldingImportsByDefault";
    EditorOption[EditorOption["foldingMaximumRegions"] = 47] = "foldingMaximumRegions";
    EditorOption[EditorOption["unfoldOnClickAfterEndOfLine"] = 48] = "unfoldOnClickAfterEndOfLine";
    EditorOption[EditorOption["fontFamily"] = 49] = "fontFamily";
    EditorOption[EditorOption["fontInfo"] = 50] = "fontInfo";
    EditorOption[EditorOption["fontLigatures"] = 51] = "fontLigatures";
    EditorOption[EditorOption["fontSize"] = 52] = "fontSize";
    EditorOption[EditorOption["fontWeight"] = 53] = "fontWeight";
    EditorOption[EditorOption["fontVariations"] = 54] = "fontVariations";
    EditorOption[EditorOption["formatOnPaste"] = 55] = "formatOnPaste";
    EditorOption[EditorOption["formatOnType"] = 56] = "formatOnType";
    EditorOption[EditorOption["glyphMargin"] = 57] = "glyphMargin";
    EditorOption[EditorOption["gotoLocation"] = 58] = "gotoLocation";
    EditorOption[EditorOption["hideCursorInOverviewRuler"] = 59] = "hideCursorInOverviewRuler";
    EditorOption[EditorOption["hover"] = 60] = "hover";
    EditorOption[EditorOption["inDiffEditor"] = 61] = "inDiffEditor";
    EditorOption[EditorOption["inlineSuggest"] = 62] = "inlineSuggest";
    EditorOption[EditorOption["inlineEdit"] = 63] = "inlineEdit";
    EditorOption[EditorOption["letterSpacing"] = 64] = "letterSpacing";
    EditorOption[EditorOption["lightbulb"] = 65] = "lightbulb";
    EditorOption[EditorOption["lineDecorationsWidth"] = 66] = "lineDecorationsWidth";
    EditorOption[EditorOption["lineHeight"] = 67] = "lineHeight";
    EditorOption[EditorOption["lineNumbers"] = 68] = "lineNumbers";
    EditorOption[EditorOption["lineNumbersMinChars"] = 69] = "lineNumbersMinChars";
    EditorOption[EditorOption["linkedEditing"] = 70] = "linkedEditing";
    EditorOption[EditorOption["links"] = 71] = "links";
    EditorOption[EditorOption["matchBrackets"] = 72] = "matchBrackets";
    EditorOption[EditorOption["minimap"] = 73] = "minimap";
    EditorOption[EditorOption["mouseStyle"] = 74] = "mouseStyle";
    EditorOption[EditorOption["mouseWheelScrollSensitivity"] = 75] = "mouseWheelScrollSensitivity";
    EditorOption[EditorOption["mouseWheelZoom"] = 76] = "mouseWheelZoom";
    EditorOption[EditorOption["multiCursorMergeOverlapping"] = 77] = "multiCursorMergeOverlapping";
    EditorOption[EditorOption["multiCursorModifier"] = 78] = "multiCursorModifier";
    EditorOption[EditorOption["multiCursorPaste"] = 79] = "multiCursorPaste";
    EditorOption[EditorOption["multiCursorLimit"] = 80] = "multiCursorLimit";
    EditorOption[EditorOption["occurrencesHighlight"] = 81] = "occurrencesHighlight";
    EditorOption[EditorOption["overviewRulerBorder"] = 82] = "overviewRulerBorder";
    EditorOption[EditorOption["overviewRulerLanes"] = 83] = "overviewRulerLanes";
    EditorOption[EditorOption["padding"] = 84] = "padding";
    EditorOption[EditorOption["pasteAs"] = 85] = "pasteAs";
    EditorOption[EditorOption["parameterHints"] = 86] = "parameterHints";
    EditorOption[EditorOption["peekWidgetDefaultFocus"] = 87] = "peekWidgetDefaultFocus";
    EditorOption[EditorOption["placeholder"] = 88] = "placeholder";
    EditorOption[EditorOption["definitionLinkOpensInPeek"] = 89] = "definitionLinkOpensInPeek";
    EditorOption[EditorOption["quickSuggestions"] = 90] = "quickSuggestions";
    EditorOption[EditorOption["quickSuggestionsDelay"] = 91] = "quickSuggestionsDelay";
    EditorOption[EditorOption["readOnly"] = 92] = "readOnly";
    EditorOption[EditorOption["readOnlyMessage"] = 93] = "readOnlyMessage";
    EditorOption[EditorOption["renameOnType"] = 94] = "renameOnType";
    EditorOption[EditorOption["renderControlCharacters"] = 95] = "renderControlCharacters";
    EditorOption[EditorOption["renderFinalNewline"] = 96] = "renderFinalNewline";
    EditorOption[EditorOption["renderLineHighlight"] = 97] = "renderLineHighlight";
    EditorOption[EditorOption["renderLineHighlightOnlyWhenFocus"] = 98] = "renderLineHighlightOnlyWhenFocus";
    EditorOption[EditorOption["renderValidationDecorations"] = 99] = "renderValidationDecorations";
    EditorOption[EditorOption["renderWhitespace"] = 100] = "renderWhitespace";
    EditorOption[EditorOption["revealHorizontalRightPadding"] = 101] = "revealHorizontalRightPadding";
    EditorOption[EditorOption["roundedSelection"] = 102] = "roundedSelection";
    EditorOption[EditorOption["rulers"] = 103] = "rulers";
    EditorOption[EditorOption["scrollbar"] = 104] = "scrollbar";
    EditorOption[EditorOption["scrollBeyondLastColumn"] = 105] = "scrollBeyondLastColumn";
    EditorOption[EditorOption["scrollBeyondLastLine"] = 106] = "scrollBeyondLastLine";
    EditorOption[EditorOption["scrollPredominantAxis"] = 107] = "scrollPredominantAxis";
    EditorOption[EditorOption["selectionClipboard"] = 108] = "selectionClipboard";
    EditorOption[EditorOption["selectionHighlight"] = 109] = "selectionHighlight";
    EditorOption[EditorOption["selectOnLineNumbers"] = 110] = "selectOnLineNumbers";
    EditorOption[EditorOption["showFoldingControls"] = 111] = "showFoldingControls";
    EditorOption[EditorOption["showUnused"] = 112] = "showUnused";
    EditorOption[EditorOption["snippetSuggestions"] = 113] = "snippetSuggestions";
    EditorOption[EditorOption["smartSelect"] = 114] = "smartSelect";
    EditorOption[EditorOption["smoothScrolling"] = 115] = "smoothScrolling";
    EditorOption[EditorOption["stickyScroll"] = 116] = "stickyScroll";
    EditorOption[EditorOption["stickyTabStops"] = 117] = "stickyTabStops";
    EditorOption[EditorOption["stopRenderingLineAfter"] = 118] = "stopRenderingLineAfter";
    EditorOption[EditorOption["suggest"] = 119] = "suggest";
    EditorOption[EditorOption["suggestFontSize"] = 120] = "suggestFontSize";
    EditorOption[EditorOption["suggestLineHeight"] = 121] = "suggestLineHeight";
    EditorOption[EditorOption["suggestOnTriggerCharacters"] = 122] = "suggestOnTriggerCharacters";
    EditorOption[EditorOption["suggestSelection"] = 123] = "suggestSelection";
    EditorOption[EditorOption["tabCompletion"] = 124] = "tabCompletion";
    EditorOption[EditorOption["tabIndex"] = 125] = "tabIndex";
    EditorOption[EditorOption["unicodeHighlighting"] = 126] = "unicodeHighlighting";
    EditorOption[EditorOption["unusualLineTerminators"] = 127] = "unusualLineTerminators";
    EditorOption[EditorOption["useShadowDOM"] = 128] = "useShadowDOM";
    EditorOption[EditorOption["useTabStops"] = 129] = "useTabStops";
    EditorOption[EditorOption["wordBreak"] = 130] = "wordBreak";
    EditorOption[EditorOption["wordSegmenterLocales"] = 131] = "wordSegmenterLocales";
    EditorOption[EditorOption["wordSeparators"] = 132] = "wordSeparators";
    EditorOption[EditorOption["wordWrap"] = 133] = "wordWrap";
    EditorOption[EditorOption["wordWrapBreakAfterCharacters"] = 134] = "wordWrapBreakAfterCharacters";
    EditorOption[EditorOption["wordWrapBreakBeforeCharacters"] = 135] = "wordWrapBreakBeforeCharacters";
    EditorOption[EditorOption["wordWrapColumn"] = 136] = "wordWrapColumn";
    EditorOption[EditorOption["wordWrapOverride1"] = 137] = "wordWrapOverride1";
    EditorOption[EditorOption["wordWrapOverride2"] = 138] = "wordWrapOverride2";
    EditorOption[EditorOption["wrappingIndent"] = 139] = "wrappingIndent";
    EditorOption[EditorOption["wrappingStrategy"] = 140] = "wrappingStrategy";
    EditorOption[EditorOption["showDeprecated"] = 141] = "showDeprecated";
    EditorOption[EditorOption["inlayHints"] = 142] = "inlayHints";
    EditorOption[EditorOption["editorClassName"] = 143] = "editorClassName";
    EditorOption[EditorOption["pixelRatio"] = 144] = "pixelRatio";
    EditorOption[EditorOption["tabFocusMode"] = 145] = "tabFocusMode";
    EditorOption[EditorOption["layoutInfo"] = 146] = "layoutInfo";
    EditorOption[EditorOption["wrappingInfo"] = 147] = "wrappingInfo";
    EditorOption[EditorOption["defaultColorDecorators"] = 148] = "defaultColorDecorators";
    EditorOption[EditorOption["colorDecoratorsActivatedOn"] = 149] = "colorDecoratorsActivatedOn";
    EditorOption[EditorOption["inlineCompletionsAccessibilityVerbose"] = 150] = "inlineCompletionsAccessibilityVerbose";
})($a0f96218742123a7$export$691ec5d1a6c1d955 || ($a0f96218742123a7$export$691ec5d1a6c1d955 = {}));
var $a0f96218742123a7$export$b606b30b966557d;
(function(EndOfLinePreference) {
    /**
     * Use the end of line character identified in the text buffer.
     */ EndOfLinePreference[EndOfLinePreference["TextDefined"] = 0] = "TextDefined";
    /**
     * Use line feed (\n) as the end of line character.
     */ EndOfLinePreference[EndOfLinePreference["LF"] = 1] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */ EndOfLinePreference[EndOfLinePreference["CRLF"] = 2] = "CRLF";
})($a0f96218742123a7$export$b606b30b966557d || ($a0f96218742123a7$export$b606b30b966557d = {}));
var $a0f96218742123a7$export$bb266a40482ffc87;
(function(EndOfLineSequence) {
    /**
     * Use line feed (\n) as the end of line character.
     */ EndOfLineSequence[EndOfLineSequence["LF"] = 0] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */ EndOfLineSequence[EndOfLineSequence["CRLF"] = 1] = "CRLF";
})($a0f96218742123a7$export$bb266a40482ffc87 || ($a0f96218742123a7$export$bb266a40482ffc87 = {}));
var $a0f96218742123a7$export$bb2acf536073323a;
(function(GlyphMarginLane) {
    GlyphMarginLane[GlyphMarginLane["Left"] = 1] = "Left";
    GlyphMarginLane[GlyphMarginLane["Center"] = 2] = "Center";
    GlyphMarginLane[GlyphMarginLane["Right"] = 3] = "Right";
})($a0f96218742123a7$export$bb2acf536073323a || ($a0f96218742123a7$export$bb2acf536073323a = {}));
var $a0f96218742123a7$export$d08f6efc3ac3285;
(function(HoverVerbosityAction) {
    /**
     * Increase the verbosity of the hover
     */ HoverVerbosityAction[HoverVerbosityAction["Increase"] = 0] = "Increase";
    /**
     * Decrease the verbosity of the hover
     */ HoverVerbosityAction[HoverVerbosityAction["Decrease"] = 1] = "Decrease";
})($a0f96218742123a7$export$d08f6efc3ac3285 || ($a0f96218742123a7$export$d08f6efc3ac3285 = {}));
var $a0f96218742123a7$export$bd7cc9510fcdcba6;
(function(IndentAction) {
    /**
     * Insert new line and copy the previous line's indentation.
     */ IndentAction[IndentAction["None"] = 0] = "None";
    /**
     * Insert new line and indent once (relative to the previous line's indentation).
     */ IndentAction[IndentAction["Indent"] = 1] = "Indent";
    /**
     * Insert two new lines:
     *  - the first one indented which will hold the cursor
     *  - the second one at the same indentation level
     */ IndentAction[IndentAction["IndentOutdent"] = 2] = "IndentOutdent";
    /**
     * Insert new line and outdent once (relative to the previous line's indentation).
     */ IndentAction[IndentAction["Outdent"] = 3] = "Outdent";
})($a0f96218742123a7$export$bd7cc9510fcdcba6 || ($a0f96218742123a7$export$bd7cc9510fcdcba6 = {}));
var $a0f96218742123a7$export$f5c5d924e2002c2f;
(function(InjectedTextCursorStops) {
    InjectedTextCursorStops[InjectedTextCursorStops["Both"] = 0] = "Both";
    InjectedTextCursorStops[InjectedTextCursorStops["Right"] = 1] = "Right";
    InjectedTextCursorStops[InjectedTextCursorStops["Left"] = 2] = "Left";
    InjectedTextCursorStops[InjectedTextCursorStops["None"] = 3] = "None";
})($a0f96218742123a7$export$f5c5d924e2002c2f || ($a0f96218742123a7$export$f5c5d924e2002c2f = {}));
var $a0f96218742123a7$export$3e6e7edd3baa8b2f;
(function(InlayHintKind) {
    InlayHintKind[InlayHintKind["Type"] = 1] = "Type";
    InlayHintKind[InlayHintKind["Parameter"] = 2] = "Parameter";
})($a0f96218742123a7$export$3e6e7edd3baa8b2f || ($a0f96218742123a7$export$3e6e7edd3baa8b2f = {}));
var $a0f96218742123a7$export$6bafdd6d60c3d59c;
(function(InlineCompletionTriggerKind) {
    /**
     * Completion was triggered automatically while editing.
     * It is sufficient to return a single completion item in this case.
     */ InlineCompletionTriggerKind[InlineCompletionTriggerKind["Automatic"] = 0] = "Automatic";
    /**
     * Completion was triggered explicitly by a user gesture.
     * Return multiple completion items to enable cycling through them.
     */ InlineCompletionTriggerKind[InlineCompletionTriggerKind["Explicit"] = 1] = "Explicit";
})($a0f96218742123a7$export$6bafdd6d60c3d59c || ($a0f96218742123a7$export$6bafdd6d60c3d59c = {}));
var $a0f96218742123a7$export$72b97be94925c017;
(function(InlineEditTriggerKind) {
    InlineEditTriggerKind[InlineEditTriggerKind["Invoke"] = 0] = "Invoke";
    InlineEditTriggerKind[InlineEditTriggerKind["Automatic"] = 1] = "Automatic";
})($a0f96218742123a7$export$72b97be94925c017 || ($a0f96218742123a7$export$72b97be94925c017 = {}));
var $a0f96218742123a7$export$e9e0d96f49f57c33;
(function(KeyCode) {
    KeyCode[KeyCode["DependsOnKbLayout"] = -1] = "DependsOnKbLayout";
    /**
     * Placed first to cover the 0 value of the enum.
     */ KeyCode[KeyCode["Unknown"] = 0] = "Unknown";
    KeyCode[KeyCode["Backspace"] = 1] = "Backspace";
    KeyCode[KeyCode["Tab"] = 2] = "Tab";
    KeyCode[KeyCode["Enter"] = 3] = "Enter";
    KeyCode[KeyCode["Shift"] = 4] = "Shift";
    KeyCode[KeyCode["Ctrl"] = 5] = "Ctrl";
    KeyCode[KeyCode["Alt"] = 6] = "Alt";
    KeyCode[KeyCode["PauseBreak"] = 7] = "PauseBreak";
    KeyCode[KeyCode["CapsLock"] = 8] = "CapsLock";
    KeyCode[KeyCode["Escape"] = 9] = "Escape";
    KeyCode[KeyCode["Space"] = 10] = "Space";
    KeyCode[KeyCode["PageUp"] = 11] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 12] = "PageDown";
    KeyCode[KeyCode["End"] = 13] = "End";
    KeyCode[KeyCode["Home"] = 14] = "Home";
    KeyCode[KeyCode["LeftArrow"] = 15] = "LeftArrow";
    KeyCode[KeyCode["UpArrow"] = 16] = "UpArrow";
    KeyCode[KeyCode["RightArrow"] = 17] = "RightArrow";
    KeyCode[KeyCode["DownArrow"] = 18] = "DownArrow";
    KeyCode[KeyCode["Insert"] = 19] = "Insert";
    KeyCode[KeyCode["Delete"] = 20] = "Delete";
    KeyCode[KeyCode["Digit0"] = 21] = "Digit0";
    KeyCode[KeyCode["Digit1"] = 22] = "Digit1";
    KeyCode[KeyCode["Digit2"] = 23] = "Digit2";
    KeyCode[KeyCode["Digit3"] = 24] = "Digit3";
    KeyCode[KeyCode["Digit4"] = 25] = "Digit4";
    KeyCode[KeyCode["Digit5"] = 26] = "Digit5";
    KeyCode[KeyCode["Digit6"] = 27] = "Digit6";
    KeyCode[KeyCode["Digit7"] = 28] = "Digit7";
    KeyCode[KeyCode["Digit8"] = 29] = "Digit8";
    KeyCode[KeyCode["Digit9"] = 30] = "Digit9";
    KeyCode[KeyCode["KeyA"] = 31] = "KeyA";
    KeyCode[KeyCode["KeyB"] = 32] = "KeyB";
    KeyCode[KeyCode["KeyC"] = 33] = "KeyC";
    KeyCode[KeyCode["KeyD"] = 34] = "KeyD";
    KeyCode[KeyCode["KeyE"] = 35] = "KeyE";
    KeyCode[KeyCode["KeyF"] = 36] = "KeyF";
    KeyCode[KeyCode["KeyG"] = 37] = "KeyG";
    KeyCode[KeyCode["KeyH"] = 38] = "KeyH";
    KeyCode[KeyCode["KeyI"] = 39] = "KeyI";
    KeyCode[KeyCode["KeyJ"] = 40] = "KeyJ";
    KeyCode[KeyCode["KeyK"] = 41] = "KeyK";
    KeyCode[KeyCode["KeyL"] = 42] = "KeyL";
    KeyCode[KeyCode["KeyM"] = 43] = "KeyM";
    KeyCode[KeyCode["KeyN"] = 44] = "KeyN";
    KeyCode[KeyCode["KeyO"] = 45] = "KeyO";
    KeyCode[KeyCode["KeyP"] = 46] = "KeyP";
    KeyCode[KeyCode["KeyQ"] = 47] = "KeyQ";
    KeyCode[KeyCode["KeyR"] = 48] = "KeyR";
    KeyCode[KeyCode["KeyS"] = 49] = "KeyS";
    KeyCode[KeyCode["KeyT"] = 50] = "KeyT";
    KeyCode[KeyCode["KeyU"] = 51] = "KeyU";
    KeyCode[KeyCode["KeyV"] = 52] = "KeyV";
    KeyCode[KeyCode["KeyW"] = 53] = "KeyW";
    KeyCode[KeyCode["KeyX"] = 54] = "KeyX";
    KeyCode[KeyCode["KeyY"] = 55] = "KeyY";
    KeyCode[KeyCode["KeyZ"] = 56] = "KeyZ";
    KeyCode[KeyCode["Meta"] = 57] = "Meta";
    KeyCode[KeyCode["ContextMenu"] = 58] = "ContextMenu";
    KeyCode[KeyCode["F1"] = 59] = "F1";
    KeyCode[KeyCode["F2"] = 60] = "F2";
    KeyCode[KeyCode["F3"] = 61] = "F3";
    KeyCode[KeyCode["F4"] = 62] = "F4";
    KeyCode[KeyCode["F5"] = 63] = "F5";
    KeyCode[KeyCode["F6"] = 64] = "F6";
    KeyCode[KeyCode["F7"] = 65] = "F7";
    KeyCode[KeyCode["F8"] = 66] = "F8";
    KeyCode[KeyCode["F9"] = 67] = "F9";
    KeyCode[KeyCode["F10"] = 68] = "F10";
    KeyCode[KeyCode["F11"] = 69] = "F11";
    KeyCode[KeyCode["F12"] = 70] = "F12";
    KeyCode[KeyCode["F13"] = 71] = "F13";
    KeyCode[KeyCode["F14"] = 72] = "F14";
    KeyCode[KeyCode["F15"] = 73] = "F15";
    KeyCode[KeyCode["F16"] = 74] = "F16";
    KeyCode[KeyCode["F17"] = 75] = "F17";
    KeyCode[KeyCode["F18"] = 76] = "F18";
    KeyCode[KeyCode["F19"] = 77] = "F19";
    KeyCode[KeyCode["F20"] = 78] = "F20";
    KeyCode[KeyCode["F21"] = 79] = "F21";
    KeyCode[KeyCode["F22"] = 80] = "F22";
    KeyCode[KeyCode["F23"] = 81] = "F23";
    KeyCode[KeyCode["F24"] = 82] = "F24";
    KeyCode[KeyCode["NumLock"] = 83] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 84] = "ScrollLock";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ';:' key
     */ KeyCode[KeyCode["Semicolon"] = 85] = "Semicolon";
    /**
     * For any country/region, the '+' key
     * For the US standard keyboard, the '=+' key
     */ KeyCode[KeyCode["Equal"] = 86] = "Equal";
    /**
     * For any country/region, the ',' key
     * For the US standard keyboard, the ',<' key
     */ KeyCode[KeyCode["Comma"] = 87] = "Comma";
    /**
     * For any country/region, the '-' key
     * For the US standard keyboard, the '-_' key
     */ KeyCode[KeyCode["Minus"] = 88] = "Minus";
    /**
     * For any country/region, the '.' key
     * For the US standard keyboard, the '.>' key
     */ KeyCode[KeyCode["Period"] = 89] = "Period";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '/?' key
     */ KeyCode[KeyCode["Slash"] = 90] = "Slash";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '`~' key
     */ KeyCode[KeyCode["Backquote"] = 91] = "Backquote";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '[{' key
     */ KeyCode[KeyCode["BracketLeft"] = 92] = "BracketLeft";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '\|' key
     */ KeyCode[KeyCode["Backslash"] = 93] = "Backslash";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ']}' key
     */ KeyCode[KeyCode["BracketRight"] = 94] = "BracketRight";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ''"' key
     */ KeyCode[KeyCode["Quote"] = 95] = "Quote";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     */ KeyCode[KeyCode["OEM_8"] = 96] = "OEM_8";
    /**
     * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
     */ KeyCode[KeyCode["IntlBackslash"] = 97] = "IntlBackslash";
    KeyCode[KeyCode["Numpad0"] = 98] = "Numpad0";
    KeyCode[KeyCode["Numpad1"] = 99] = "Numpad1";
    KeyCode[KeyCode["Numpad2"] = 100] = "Numpad2";
    KeyCode[KeyCode["Numpad3"] = 101] = "Numpad3";
    KeyCode[KeyCode["Numpad4"] = 102] = "Numpad4";
    KeyCode[KeyCode["Numpad5"] = 103] = "Numpad5";
    KeyCode[KeyCode["Numpad6"] = 104] = "Numpad6";
    KeyCode[KeyCode["Numpad7"] = 105] = "Numpad7";
    KeyCode[KeyCode["Numpad8"] = 106] = "Numpad8";
    KeyCode[KeyCode["Numpad9"] = 107] = "Numpad9";
    KeyCode[KeyCode["NumpadMultiply"] = 108] = "NumpadMultiply";
    KeyCode[KeyCode["NumpadAdd"] = 109] = "NumpadAdd";
    KeyCode[KeyCode["NUMPAD_SEPARATOR"] = 110] = "NUMPAD_SEPARATOR";
    KeyCode[KeyCode["NumpadSubtract"] = 111] = "NumpadSubtract";
    KeyCode[KeyCode["NumpadDecimal"] = 112] = "NumpadDecimal";
    KeyCode[KeyCode["NumpadDivide"] = 113] = "NumpadDivide";
    /**
     * Cover all key codes when IME is processing input.
     */ KeyCode[KeyCode["KEY_IN_COMPOSITION"] = 114] = "KEY_IN_COMPOSITION";
    KeyCode[KeyCode["ABNT_C1"] = 115] = "ABNT_C1";
    KeyCode[KeyCode["ABNT_C2"] = 116] = "ABNT_C2";
    KeyCode[KeyCode["AudioVolumeMute"] = 117] = "AudioVolumeMute";
    KeyCode[KeyCode["AudioVolumeUp"] = 118] = "AudioVolumeUp";
    KeyCode[KeyCode["AudioVolumeDown"] = 119] = "AudioVolumeDown";
    KeyCode[KeyCode["BrowserSearch"] = 120] = "BrowserSearch";
    KeyCode[KeyCode["BrowserHome"] = 121] = "BrowserHome";
    KeyCode[KeyCode["BrowserBack"] = 122] = "BrowserBack";
    KeyCode[KeyCode["BrowserForward"] = 123] = "BrowserForward";
    KeyCode[KeyCode["MediaTrackNext"] = 124] = "MediaTrackNext";
    KeyCode[KeyCode["MediaTrackPrevious"] = 125] = "MediaTrackPrevious";
    KeyCode[KeyCode["MediaStop"] = 126] = "MediaStop";
    KeyCode[KeyCode["MediaPlayPause"] = 127] = "MediaPlayPause";
    KeyCode[KeyCode["LaunchMediaPlayer"] = 128] = "LaunchMediaPlayer";
    KeyCode[KeyCode["LaunchMail"] = 129] = "LaunchMail";
    KeyCode[KeyCode["LaunchApp2"] = 130] = "LaunchApp2";
    /**
     * VK_CLEAR, 0x0C, CLEAR key
     */ KeyCode[KeyCode["Clear"] = 131] = "Clear";
    /**
     * Placed last to cover the length of the enum.
     * Please do not depend on this value!
     */ KeyCode[KeyCode["MAX_VALUE"] = 132] = "MAX_VALUE";
})($a0f96218742123a7$export$e9e0d96f49f57c33 || ($a0f96218742123a7$export$e9e0d96f49f57c33 = {}));
var $a0f96218742123a7$export$57cb2d90ccbe022f;
(function(MarkerSeverity) {
    MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
    MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
    MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
    MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})($a0f96218742123a7$export$57cb2d90ccbe022f || ($a0f96218742123a7$export$57cb2d90ccbe022f = {}));
var $a0f96218742123a7$export$db36fa53ecdd165f;
(function(MarkerTag) {
    MarkerTag[MarkerTag["Unnecessary"] = 1] = "Unnecessary";
    MarkerTag[MarkerTag["Deprecated"] = 2] = "Deprecated";
})($a0f96218742123a7$export$db36fa53ecdd165f || ($a0f96218742123a7$export$db36fa53ecdd165f = {}));
var $a0f96218742123a7$export$3b47c70a4c899721;
(function(MinimapPosition) {
    MinimapPosition[MinimapPosition["Inline"] = 1] = "Inline";
    MinimapPosition[MinimapPosition["Gutter"] = 2] = "Gutter";
})($a0f96218742123a7$export$3b47c70a4c899721 || ($a0f96218742123a7$export$3b47c70a4c899721 = {}));
var $a0f96218742123a7$export$80a4d54217a8cba2;
(function(MinimapSectionHeaderStyle) {
    MinimapSectionHeaderStyle[MinimapSectionHeaderStyle["Normal"] = 1] = "Normal";
    MinimapSectionHeaderStyle[MinimapSectionHeaderStyle["Underlined"] = 2] = "Underlined";
})($a0f96218742123a7$export$80a4d54217a8cba2 || ($a0f96218742123a7$export$80a4d54217a8cba2 = {}));
var $a0f96218742123a7$export$28a30dc1861d8d84;
(function(MouseTargetType) {
    /**
     * Mouse is on top of an unknown element.
     */ MouseTargetType[MouseTargetType["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * Mouse is on top of the textarea used for input.
     */ MouseTargetType[MouseTargetType["TEXTAREA"] = 1] = "TEXTAREA";
    /**
     * Mouse is on top of the glyph margin
     */ MouseTargetType[MouseTargetType["GUTTER_GLYPH_MARGIN"] = 2] = "GUTTER_GLYPH_MARGIN";
    /**
     * Mouse is on top of the line numbers
     */ MouseTargetType[MouseTargetType["GUTTER_LINE_NUMBERS"] = 3] = "GUTTER_LINE_NUMBERS";
    /**
     * Mouse is on top of the line decorations
     */ MouseTargetType[MouseTargetType["GUTTER_LINE_DECORATIONS"] = 4] = "GUTTER_LINE_DECORATIONS";
    /**
     * Mouse is on top of the whitespace left in the gutter by a view zone.
     */ MouseTargetType[MouseTargetType["GUTTER_VIEW_ZONE"] = 5] = "GUTTER_VIEW_ZONE";
    /**
     * Mouse is on top of text in the content.
     */ MouseTargetType[MouseTargetType["CONTENT_TEXT"] = 6] = "CONTENT_TEXT";
    /**
     * Mouse is on top of empty space in the content (e.g. after line text or below last line)
     */ MouseTargetType[MouseTargetType["CONTENT_EMPTY"] = 7] = "CONTENT_EMPTY";
    /**
     * Mouse is on top of a view zone in the content.
     */ MouseTargetType[MouseTargetType["CONTENT_VIEW_ZONE"] = 8] = "CONTENT_VIEW_ZONE";
    /**
     * Mouse is on top of a content widget.
     */ MouseTargetType[MouseTargetType["CONTENT_WIDGET"] = 9] = "CONTENT_WIDGET";
    /**
     * Mouse is on top of the decorations overview ruler.
     */ MouseTargetType[MouseTargetType["OVERVIEW_RULER"] = 10] = "OVERVIEW_RULER";
    /**
     * Mouse is on top of a scrollbar.
     */ MouseTargetType[MouseTargetType["SCROLLBAR"] = 11] = "SCROLLBAR";
    /**
     * Mouse is on top of an overlay widget.
     */ MouseTargetType[MouseTargetType["OVERLAY_WIDGET"] = 12] = "OVERLAY_WIDGET";
    /**
     * Mouse is outside of the editor.
     */ MouseTargetType[MouseTargetType["OUTSIDE_EDITOR"] = 13] = "OUTSIDE_EDITOR";
})($a0f96218742123a7$export$28a30dc1861d8d84 || ($a0f96218742123a7$export$28a30dc1861d8d84 = {}));
var $a0f96218742123a7$export$bab0b0a8a8ed8748;
(function(NewSymbolNameTag) {
    NewSymbolNameTag[NewSymbolNameTag["AIGenerated"] = 1] = "AIGenerated";
})($a0f96218742123a7$export$bab0b0a8a8ed8748 || ($a0f96218742123a7$export$bab0b0a8a8ed8748 = {}));
var $a0f96218742123a7$export$9cd1d72a90294bb0;
(function(NewSymbolNameTriggerKind) {
    NewSymbolNameTriggerKind[NewSymbolNameTriggerKind["Invoke"] = 0] = "Invoke";
    NewSymbolNameTriggerKind[NewSymbolNameTriggerKind["Automatic"] = 1] = "Automatic";
})($a0f96218742123a7$export$9cd1d72a90294bb0 || ($a0f96218742123a7$export$9cd1d72a90294bb0 = {}));
var $a0f96218742123a7$export$87b04f38b90a7449;
(function(OverlayWidgetPositionPreference) {
    /**
     * Position the overlay widget in the top right corner
     */ OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["TOP_RIGHT_CORNER"] = 0] = "TOP_RIGHT_CORNER";
    /**
     * Position the overlay widget in the bottom right corner
     */ OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["BOTTOM_RIGHT_CORNER"] = 1] = "BOTTOM_RIGHT_CORNER";
    /**
     * Position the overlay widget in the top center
     */ OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["TOP_CENTER"] = 2] = "TOP_CENTER";
})($a0f96218742123a7$export$87b04f38b90a7449 || ($a0f96218742123a7$export$87b04f38b90a7449 = {}));
var $a0f96218742123a7$export$676624b54f6b43c;
(function(OverviewRulerLane) {
    OverviewRulerLane[OverviewRulerLane["Left"] = 1] = "Left";
    OverviewRulerLane[OverviewRulerLane["Center"] = 2] = "Center";
    OverviewRulerLane[OverviewRulerLane["Right"] = 4] = "Right";
    OverviewRulerLane[OverviewRulerLane["Full"] = 7] = "Full";
})($a0f96218742123a7$export$676624b54f6b43c || ($a0f96218742123a7$export$676624b54f6b43c = {}));
var $a0f96218742123a7$export$ea1cec7d334e3094;
(function(PartialAcceptTriggerKind) {
    PartialAcceptTriggerKind[PartialAcceptTriggerKind["Word"] = 0] = "Word";
    PartialAcceptTriggerKind[PartialAcceptTriggerKind["Line"] = 1] = "Line";
    PartialAcceptTriggerKind[PartialAcceptTriggerKind["Suggest"] = 2] = "Suggest";
})($a0f96218742123a7$export$ea1cec7d334e3094 || ($a0f96218742123a7$export$ea1cec7d334e3094 = {}));
var $a0f96218742123a7$export$6c1eb4bb5f08d257;
(function(PositionAffinity) {
    /**
     * Prefers the left most position.
    */ PositionAffinity[PositionAffinity["Left"] = 0] = "Left";
    /**
     * Prefers the right most position.
    */ PositionAffinity[PositionAffinity["Right"] = 1] = "Right";
    /**
     * No preference.
    */ PositionAffinity[PositionAffinity["None"] = 2] = "None";
    /**
     * If the given position is on injected text, prefers the position left of it.
    */ PositionAffinity[PositionAffinity["LeftOfInjectedText"] = 3] = "LeftOfInjectedText";
    /**
     * If the given position is on injected text, prefers the position right of it.
    */ PositionAffinity[PositionAffinity["RightOfInjectedText"] = 4] = "RightOfInjectedText";
})($a0f96218742123a7$export$6c1eb4bb5f08d257 || ($a0f96218742123a7$export$6c1eb4bb5f08d257 = {}));
var $a0f96218742123a7$export$c227770c98cfc283;
(function(RenderLineNumbersType) {
    RenderLineNumbersType[RenderLineNumbersType["Off"] = 0] = "Off";
    RenderLineNumbersType[RenderLineNumbersType["On"] = 1] = "On";
    RenderLineNumbersType[RenderLineNumbersType["Relative"] = 2] = "Relative";
    RenderLineNumbersType[RenderLineNumbersType["Interval"] = 3] = "Interval";
    RenderLineNumbersType[RenderLineNumbersType["Custom"] = 4] = "Custom";
})($a0f96218742123a7$export$c227770c98cfc283 || ($a0f96218742123a7$export$c227770c98cfc283 = {}));
var $a0f96218742123a7$export$a8aa236eeea7c837;
(function(RenderMinimap) {
    RenderMinimap[RenderMinimap["None"] = 0] = "None";
    RenderMinimap[RenderMinimap["Text"] = 1] = "Text";
    RenderMinimap[RenderMinimap["Blocks"] = 2] = "Blocks";
})($a0f96218742123a7$export$a8aa236eeea7c837 || ($a0f96218742123a7$export$a8aa236eeea7c837 = {}));
var $a0f96218742123a7$export$d4ea5b93c0a7ec19;
(function(ScrollType) {
    ScrollType[ScrollType["Smooth"] = 0] = "Smooth";
    ScrollType[ScrollType["Immediate"] = 1] = "Immediate";
})($a0f96218742123a7$export$d4ea5b93c0a7ec19 || ($a0f96218742123a7$export$d4ea5b93c0a7ec19 = {}));
var $a0f96218742123a7$export$35b27ee1b892d791;
(function(ScrollbarVisibility) {
    ScrollbarVisibility[ScrollbarVisibility["Auto"] = 1] = "Auto";
    ScrollbarVisibility[ScrollbarVisibility["Hidden"] = 2] = "Hidden";
    ScrollbarVisibility[ScrollbarVisibility["Visible"] = 3] = "Visible";
})($a0f96218742123a7$export$35b27ee1b892d791 || ($a0f96218742123a7$export$35b27ee1b892d791 = {}));
var $a0f96218742123a7$export$5c80dd1df5708938;
(function(SelectionDirection) {
    /**
     * The selection starts above where it ends.
     */ SelectionDirection[SelectionDirection["LTR"] = 0] = "LTR";
    /**
     * The selection starts below where it ends.
     */ SelectionDirection[SelectionDirection["RTL"] = 1] = "RTL";
})($a0f96218742123a7$export$5c80dd1df5708938 || ($a0f96218742123a7$export$5c80dd1df5708938 = {}));
var $a0f96218742123a7$export$e83a5440469cb522;
(function(ShowLightbulbIconMode) {
    ShowLightbulbIconMode["Off"] = "off";
    ShowLightbulbIconMode["OnCode"] = "onCode";
    ShowLightbulbIconMode["On"] = "on";
})($a0f96218742123a7$export$e83a5440469cb522 || ($a0f96218742123a7$export$e83a5440469cb522 = {}));
var $a0f96218742123a7$export$9ae4890115b84f4c;
(function(SignatureHelpTriggerKind) {
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})($a0f96218742123a7$export$9ae4890115b84f4c || ($a0f96218742123a7$export$9ae4890115b84f4c = {}));
var $a0f96218742123a7$export$dd78311fae125aca;
(function(SymbolKind) {
    SymbolKind[SymbolKind["File"] = 0] = "File";
    SymbolKind[SymbolKind["Module"] = 1] = "Module";
    SymbolKind[SymbolKind["Namespace"] = 2] = "Namespace";
    SymbolKind[SymbolKind["Package"] = 3] = "Package";
    SymbolKind[SymbolKind["Class"] = 4] = "Class";
    SymbolKind[SymbolKind["Method"] = 5] = "Method";
    SymbolKind[SymbolKind["Property"] = 6] = "Property";
    SymbolKind[SymbolKind["Field"] = 7] = "Field";
    SymbolKind[SymbolKind["Constructor"] = 8] = "Constructor";
    SymbolKind[SymbolKind["Enum"] = 9] = "Enum";
    SymbolKind[SymbolKind["Interface"] = 10] = "Interface";
    SymbolKind[SymbolKind["Function"] = 11] = "Function";
    SymbolKind[SymbolKind["Variable"] = 12] = "Variable";
    SymbolKind[SymbolKind["Constant"] = 13] = "Constant";
    SymbolKind[SymbolKind["String"] = 14] = "String";
    SymbolKind[SymbolKind["Number"] = 15] = "Number";
    SymbolKind[SymbolKind["Boolean"] = 16] = "Boolean";
    SymbolKind[SymbolKind["Array"] = 17] = "Array";
    SymbolKind[SymbolKind["Object"] = 18] = "Object";
    SymbolKind[SymbolKind["Key"] = 19] = "Key";
    SymbolKind[SymbolKind["Null"] = 20] = "Null";
    SymbolKind[SymbolKind["EnumMember"] = 21] = "EnumMember";
    SymbolKind[SymbolKind["Struct"] = 22] = "Struct";
    SymbolKind[SymbolKind["Event"] = 23] = "Event";
    SymbolKind[SymbolKind["Operator"] = 24] = "Operator";
    SymbolKind[SymbolKind["TypeParameter"] = 25] = "TypeParameter";
})($a0f96218742123a7$export$dd78311fae125aca || ($a0f96218742123a7$export$dd78311fae125aca = {}));
var $a0f96218742123a7$export$9541034c58176ba6;
(function(SymbolTag) {
    SymbolTag[SymbolTag["Deprecated"] = 1] = "Deprecated";
})($a0f96218742123a7$export$9541034c58176ba6 || ($a0f96218742123a7$export$9541034c58176ba6 = {}));
var $a0f96218742123a7$export$bd40573fd152789d;
(function(TextEditorCursorBlinkingStyle) {
    /**
     * Hidden
     */ TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Hidden"] = 0] = "Hidden";
    /**
     * Blinking
     */ TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Blink"] = 1] = "Blink";
    /**
     * Blinking with smooth fading
     */ TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Smooth"] = 2] = "Smooth";
    /**
     * Blinking with prolonged filled state and smooth fading
     */ TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Phase"] = 3] = "Phase";
    /**
     * Expand collapse animation on the y axis
     */ TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Expand"] = 4] = "Expand";
    /**
     * No-Blinking
     */ TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Solid"] = 5] = "Solid";
})($a0f96218742123a7$export$bd40573fd152789d || ($a0f96218742123a7$export$bd40573fd152789d = {}));
var $a0f96218742123a7$export$6e8a064d0a9f769f;
(function(TextEditorCursorStyle) {
    /**
     * As a vertical line (sitting between two characters).
     */ TextEditorCursorStyle[TextEditorCursorStyle["Line"] = 1] = "Line";
    /**
     * As a block (sitting on top of a character).
     */ TextEditorCursorStyle[TextEditorCursorStyle["Block"] = 2] = "Block";
    /**
     * As a horizontal line (sitting under a character).
     */ TextEditorCursorStyle[TextEditorCursorStyle["Underline"] = 3] = "Underline";
    /**
     * As a thin vertical line (sitting between two characters).
     */ TextEditorCursorStyle[TextEditorCursorStyle["LineThin"] = 4] = "LineThin";
    /**
     * As an outlined block (sitting on top of a character).
     */ TextEditorCursorStyle[TextEditorCursorStyle["BlockOutline"] = 5] = "BlockOutline";
    /**
     * As a thin horizontal line (sitting under a character).
     */ TextEditorCursorStyle[TextEditorCursorStyle["UnderlineThin"] = 6] = "UnderlineThin";
})($a0f96218742123a7$export$6e8a064d0a9f769f || ($a0f96218742123a7$export$6e8a064d0a9f769f = {}));
var $a0f96218742123a7$export$dce4d2a323a3f261;
(function(TrackedRangeStickiness) {
    TrackedRangeStickiness[TrackedRangeStickiness["AlwaysGrowsWhenTypingAtEdges"] = 0] = "AlwaysGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["NeverGrowsWhenTypingAtEdges"] = 1] = "NeverGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingBefore"] = 2] = "GrowsOnlyWhenTypingBefore";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingAfter"] = 3] = "GrowsOnlyWhenTypingAfter";
})($a0f96218742123a7$export$dce4d2a323a3f261 || ($a0f96218742123a7$export$dce4d2a323a3f261 = {}));
var $a0f96218742123a7$export$f3852ab95f8d6fd0;
(function(WrappingIndent) {
    /**
     * No indentation => wrapped lines begin at column 1.
     */ WrappingIndent[WrappingIndent["None"] = 0] = "None";
    /**
     * Same => wrapped lines get the same indentation as the parent.
     */ WrappingIndent[WrappingIndent["Same"] = 1] = "Same";
    /**
     * Indent => wrapped lines get +1 indentation toward the parent.
     */ WrappingIndent[WrappingIndent["Indent"] = 2] = "Indent";
    /**
     * DeepIndent => wrapped lines get +2 indentation toward the parent.
     */ WrappingIndent[WrappingIndent["DeepIndent"] = 3] = "DeepIndent";
})($a0f96218742123a7$export$f3852ab95f8d6fd0 || ($a0f96218742123a7$export$f3852ab95f8d6fd0 = {}));


class $ed13337b613772ef$export$99d9bd61fa1bcb7a {
    static{
        this.CtrlCmd = 2048 /* ConstKeyMod.CtrlCmd */ ;
    }
    static{
        this.Shift = 1024 /* ConstKeyMod.Shift */ ;
    }
    static{
        this.Alt = 512 /* ConstKeyMod.Alt */ ;
    }
    static{
        this.WinCtrl = 256 /* ConstKeyMod.WinCtrl */ ;
    }
    static chord(firstPart, secondPart) {
        return (0, $4b635897f09d6339$export$a5e557d68abc4534)(firstPart, secondPart);
    }
}
function $ed13337b613772ef$export$560b8701da04ced() {
    return {
        editor: undefined,
        languages: undefined,
        CancellationTokenSource: (0, $783cd511690f9862$export$80fbc6d68230dbd3),
        Emitter: (0, $d7b8088681a716ec$export$4293555f241ae35a),
        KeyCode: $a0f96218742123a7$export$e9e0d96f49f57c33,
        KeyMod: $ed13337b613772ef$export$99d9bd61fa1bcb7a,
        Position: (0, $52194de676ded133$export$13807d9ee5a34a42),
        Range: (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c),
        Selection: (0, $fabed10600aed0e4$export$52baac22726c72bf),
        SelectionDirection: $a0f96218742123a7$export$5c80dd1df5708938,
        MarkerSeverity: $a0f96218742123a7$export$57cb2d90ccbe022f,
        MarkerTag: $a0f96218742123a7$export$db36fa53ecdd165f,
        Uri: (0, $35ec765602f96f4b$export$9156e739aa33e19f),
        Token: (0, $5e3486e25f60d1fa$export$50792b0e93539fde)
    };
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $6aa97be6c88ef0a3$export$965ed12d2e4ce9f1 {
    static{
        this.CHANNEL_NAME = 'editorWorkerHost';
    }
    static getChannel(workerServer) {
        return workerServer.getChannel($6aa97be6c88ef0a3$export$965ed12d2e4ce9f1.CHANNEL_NAME);
    }
    static setChannel(workerClient, obj) {
        workerClient.setChannel($6aa97be6c88ef0a3$export$965ed12d2e4ce9f1.CHANNEL_NAME, obj);
    }
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ var $b2f5c59fe68166f5$var$_a, $b2f5c59fe68166f5$var$_b;
class $b2f5c59fe68166f5$var$ResourceMapEntry {
    constructor(uri, value){
        this.uri = uri;
        this.value = value;
    }
}
function $b2f5c59fe68166f5$var$isEntries(arg) {
    return Array.isArray(arg);
}
class $b2f5c59fe68166f5$export$a0f0cdb366c5e51 {
    static{
        this.defaultToKey = (resource)=>resource.toString();
    }
    constructor(arg, toKey){
        this[$b2f5c59fe68166f5$var$_a] = 'ResourceMap';
        if (arg instanceof $b2f5c59fe68166f5$export$a0f0cdb366c5e51) {
            this.map = new Map(arg.map);
            this.toKey = toKey ?? $b2f5c59fe68166f5$export$a0f0cdb366c5e51.defaultToKey;
        } else if ($b2f5c59fe68166f5$var$isEntries(arg)) {
            this.map = new Map();
            this.toKey = toKey ?? $b2f5c59fe68166f5$export$a0f0cdb366c5e51.defaultToKey;
            for (const [resource, value] of arg)this.set(resource, value);
        } else {
            this.map = new Map();
            this.toKey = arg ?? $b2f5c59fe68166f5$export$a0f0cdb366c5e51.defaultToKey;
        }
    }
    set(resource, value) {
        this.map.set(this.toKey(resource), new $b2f5c59fe68166f5$var$ResourceMapEntry(resource, value));
        return this;
    }
    get(resource) {
        return this.map.get(this.toKey(resource))?.value;
    }
    has(resource) {
        return this.map.has(this.toKey(resource));
    }
    get size() {
        return this.map.size;
    }
    clear() {
        this.map.clear();
    }
    delete(resource) {
        return this.map.delete(this.toKey(resource));
    }
    forEach(clb, thisArg) {
        if (typeof thisArg !== 'undefined') clb = clb.bind(thisArg);
        for (const [_, entry] of this.map)clb(entry.value, entry.uri, this);
    }
    *values() {
        for (const entry of this.map.values())yield entry.value;
    }
    *keys() {
        for (const entry of this.map.values())yield entry.uri;
    }
    *entries() {
        for (const entry of this.map.values())yield [
            entry.uri,
            entry.value
        ];
    }
    *[($b2f5c59fe68166f5$var$_a = Symbol.toStringTag, Symbol.iterator)]() {
        for (const [, entry] of this.map)yield [
            entry.uri,
            entry.value
        ];
    }
}
class $b2f5c59fe68166f5$export$507ba9ddcc5c45ee {
    constructor(){
        this[$b2f5c59fe68166f5$var$_b] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    get first() {
        return this._head?.value;
    }
    get last() {
        return this._tail?.value;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key, touch = 0 /* Touch.None */ ) {
        const item = this._map.get(key);
        if (!item) return undefined;
        if (touch !== 0 /* Touch.None */ ) this.touch(item, touch);
        return item.value;
    }
    set(key, value, touch = 0 /* Touch.None */ ) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== 0 /* Touch.None */ ) this.touch(item, touch);
        } else {
            item = {
                key: key,
                value: value,
                next: undefined,
                previous: undefined
            };
            switch(touch){
                case 0 /* Touch.None */ :
                    this.addItemLast(item);
                    break;
                case 1 /* Touch.AsOld */ :
                    this.addItemFirst(item);
                    break;
                case 2 /* Touch.AsNew */ :
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
        return this;
    }
    delete(key) {
        return !!this.remove(key);
    }
    remove(key) {
        const item = this._map.get(key);
        if (!item) return undefined;
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    shift() {
        if (!this._head && !this._tail) return undefined;
        if (!this._head || !this._tail) throw new Error('Invalid list');
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while(current){
            if (thisArg) callbackfn.bind(thisArg)(current.value, current.key, this);
            else callbackfn(current.value, current.key, this);
            if (this._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
            current = current.next;
        }
    }
    keys() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator] () {
                return iterator;
            },
            next () {
                if (map._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
                if (current) {
                    const result = {
                        value: current.key,
                        done: false
                    };
                    current = current.next;
                    return result;
                } else return {
                    value: undefined,
                    done: true
                };
            }
        };
        return iterator;
    }
    values() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator] () {
                return iterator;
            },
            next () {
                if (map._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
                if (current) {
                    const result = {
                        value: current.value,
                        done: false
                    };
                    current = current.next;
                    return result;
                } else return {
                    value: undefined,
                    done: true
                };
            }
        };
        return iterator;
    }
    entries() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator] () {
                return iterator;
            },
            next () {
                if (map._state !== state) throw new Error(`LinkedMap got modified during iteration.`);
                if (current) {
                    const result = {
                        value: [
                            current.key,
                            current.value
                        ],
                        done: false
                    };
                    current = current.next;
                    return result;
                } else return {
                    value: undefined,
                    done: true
                };
            }
        };
        return iterator;
    }
    [($b2f5c59fe68166f5$var$_b = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
    }
    trimOld(newSize) {
        if (newSize >= this.size) return;
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._head;
        let currentSize = this.size;
        while(current && currentSize > newSize){
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) current.previous = undefined;
        this._state++;
    }
    trimNew(newSize) {
        if (newSize >= this.size) return;
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._tail;
        let currentSize = this.size;
        while(current && currentSize > newSize){
            this._map.delete(current.key);
            current = current.previous;
            currentSize--;
        }
        this._tail = current;
        this._size = currentSize;
        if (current) current.next = undefined;
        this._state++;
    }
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) this._tail = item;
        else if (!this._head) throw new Error('Invalid list');
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) this._head = item;
        else if (!this._tail) throw new Error('Invalid list');
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        } else if (item === this._head) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.next) throw new Error('Invalid list');
            item.next.previous = undefined;
            this._head = item.next;
        } else if (item === this._tail) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.previous) throw new Error('Invalid list');
            item.previous.next = undefined;
            this._tail = item.previous;
        } else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) throw new Error('Invalid list');
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    touch(item, touch) {
        if (!this._head || !this._tail) throw new Error('Invalid list');
        if (touch !== 1 /* Touch.AsOld */  && touch !== 2 /* Touch.AsNew */ ) return;
        if (touch === 1 /* Touch.AsOld */ ) {
            if (item === this._head) return;
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            } else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        } else if (touch === 2 /* Touch.AsNew */ ) {
            if (item === this._tail) return;
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            } else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    toJSON() {
        const data = [];
        this.forEach((value, key)=>{
            data.push([
                key,
                value
            ]);
        });
        return data;
    }
    fromJSON(data) {
        this.clear();
        for (const [key, value] of data)this.set(key, value);
    }
}
class $b2f5c59fe68166f5$var$Cache extends $b2f5c59fe68166f5$export$507ba9ddcc5c45ee {
    constructor(limit, ratio = 1){
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    get(key, touch = 2 /* Touch.AsNew */ ) {
        return super.get(key, touch);
    }
    peek(key) {
        return super.get(key, 0 /* Touch.None */ );
    }
    set(key, value) {
        super.set(key, value, 2 /* Touch.AsNew */ );
        return this;
    }
    checkTrim() {
        if (this.size > this._limit) this.trim(Math.round(this._limit * this._ratio));
    }
}
class $b2f5c59fe68166f5$export$182500e6725aad9a extends $b2f5c59fe68166f5$var$Cache {
    constructor(limit, ratio = 1){
        super(limit, ratio);
    }
    trim(newSize) {
        this.trimOld(newSize);
    }
    set(key, value) {
        super.set(key, value);
        this.checkTrim();
        return this;
    }
}
class $b2f5c59fe68166f5$export$34474d1c5c98c014 {
    constructor(entries){
        this._m1 = new Map();
        this._m2 = new Map();
        if (entries) for (const [key, value] of entries)this.set(key, value);
    }
    clear() {
        this._m1.clear();
        this._m2.clear();
    }
    set(key, value) {
        this._m1.set(key, value);
        this._m2.set(value, key);
    }
    get(key) {
        return this._m1.get(key);
    }
    getKey(value) {
        return this._m2.get(value);
    }
    delete(key) {
        const value = this._m1.get(key);
        if (value === undefined) return false;
        this._m1.delete(key);
        this._m2.delete(value);
        return true;
    }
    keys() {
        return this._m1.keys();
    }
    values() {
        return this._m1.values();
    }
}
class $b2f5c59fe68166f5$export$b4de80a1ffeb076c {
    constructor(){
        this.map = new Map();
    }
    add(key, value) {
        let values = this.map.get(key);
        if (!values) {
            values = new Set();
            this.map.set(key, values);
        }
        values.add(value);
    }
    delete(key, value) {
        const values = this.map.get(key);
        if (!values) return;
        values.delete(value);
        if (values.size === 0) this.map.delete(key);
    }
    forEach(key, fn) {
        const values = this.map.get(key);
        if (!values) return;
        values.forEach(fn);
    }
    get(key) {
        const values = this.map.get(key);
        if (!values) return new Set();
        return values;
    }
}



class $0938af51ed44434f$export$3e3bddc34b0dfcd8 extends (0, $ea9d6fc8c109dc3b$export$b6ac4c7493566675) {
    constructor(wordSeparators, intlSegmenterLocales){
        super(0 /* WordCharacterClass.Regular */ );
        this._segmenter = null;
        this._cachedLine = null;
        this._cachedSegments = [];
        this.intlSegmenterLocales = intlSegmenterLocales;
        if (this.intlSegmenterLocales.length > 0) this._segmenter = new Intl.Segmenter(this.intlSegmenterLocales, {
            granularity: 'word'
        });
        else this._segmenter = null;
        for(let i = 0, len = wordSeparators.length; i < len; i++)this.set(wordSeparators.charCodeAt(i), 2 /* WordCharacterClass.WordSeparator */ );
        this.set(32 /* CharCode.Space */ , 1 /* WordCharacterClass.Whitespace */ );
        this.set(9 /* CharCode.Tab */ , 1 /* WordCharacterClass.Whitespace */ );
    }
    findPrevIntlWordBeforeOrAtOffset(line, offset) {
        let candidate = null;
        for (const segment of this._getIntlSegmenterWordsOnLine(line)){
            if (segment.index > offset) break;
            candidate = segment;
        }
        return candidate;
    }
    findNextIntlWordAtOrAfterOffset(lineContent, offset) {
        for (const segment of this._getIntlSegmenterWordsOnLine(lineContent)){
            if (segment.index < offset) continue;
            return segment;
        }
        return null;
    }
    _getIntlSegmenterWordsOnLine(line) {
        if (!this._segmenter) return [];
        // Check if the line has changed from the previous call
        if (this._cachedLine === line) return this._cachedSegments;
        // Update the cache with the new line
        this._cachedLine = line;
        this._cachedSegments = this._filterWordSegments(this._segmenter.segment(line));
        return this._cachedSegments;
    }
    _filterWordSegments(segments) {
        const result = [];
        for (const segment of segments)if (this._isWordLike(segment)) result.push(segment);
        return result;
    }
    _isWordLike(segment) {
        if (segment.isWordLike) return true;
        return false;
    }
}
const $0938af51ed44434f$var$wordClassifierCache = new (0, $b2f5c59fe68166f5$export$182500e6725aad9a)(10);
function $0938af51ed44434f$export$41b0fa1fd5e9b2d8(wordSeparators, intlSegmenterLocales) {
    const key = `${wordSeparators}/${intlSegmenterLocales.join(',')}`;
    let result = $0938af51ed44434f$var$wordClassifierCache.get(key);
    if (!result) {
        result = new $0938af51ed44434f$export$3e3bddc34b0dfcd8(wordSeparators, intlSegmenterLocales);
        $0938af51ed44434f$var$wordClassifierCache.set(key, result);
    }
    return result;
}




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
function $828a7683e85b36fa$export$b7d58db314e0ac27(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (obj instanceof RegExp) return obj;
    const result = Array.isArray(obj) ? [] : {};
    Object.entries(obj).forEach(([key, value])=>{
        result[key] = value && typeof value === 'object' ? $828a7683e85b36fa$export$b7d58db314e0ac27(value) : value;
    });
    return result;
}
function $828a7683e85b36fa$export$7e32b29e1cb162e1(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    const stack = [
        obj
    ];
    while(stack.length > 0){
        const obj = stack.shift();
        Object.freeze(obj);
        for(const key in obj)if ($828a7683e85b36fa$var$_hasOwnProperty.call(obj, key)) {
            const prop = obj[key];
            if (typeof prop === 'object' && !Object.isFrozen(prop) && !(0, $2581ede4232235dc$export$b119cc7e1840e59c)(prop)) stack.push(prop);
        }
    }
    return obj;
}
const $828a7683e85b36fa$var$_hasOwnProperty = Object.prototype.hasOwnProperty;
function $828a7683e85b36fa$export$12224807ee4ac817(obj, changer) {
    return $828a7683e85b36fa$var$_cloneAndChange(obj, changer, new Set());
}
function $828a7683e85b36fa$var$_cloneAndChange(obj, changer, seen) {
    if ((0, $2581ede4232235dc$export$ae45edb09e2fe7c2)(obj)) return obj;
    const changed = changer(obj);
    if (typeof changed !== 'undefined') return changed;
    if (Array.isArray(obj)) {
        const r1 = [];
        for (const e of obj)r1.push($828a7683e85b36fa$var$_cloneAndChange(e, changer, seen));
        return r1;
    }
    if ((0, $2581ede4232235dc$export$a6cdc56e425d0d0a)(obj)) {
        if (seen.has(obj)) throw new Error('Cannot clone recursive data-structure');
        seen.add(obj);
        const r2 = {};
        for(const i2 in obj)if ($828a7683e85b36fa$var$_hasOwnProperty.call(obj, i2)) r2[i2] = $828a7683e85b36fa$var$_cloneAndChange(obj[i2], changer, seen);
        seen.delete(obj);
        return r2;
    }
    return obj;
}
function $828a7683e85b36fa$export$e36fc9d62a853069(destination, source, overwrite = true) {
    if (!(0, $2581ede4232235dc$export$a6cdc56e425d0d0a)(destination)) return source;
    if ((0, $2581ede4232235dc$export$a6cdc56e425d0d0a)(source)) Object.keys(source).forEach((key)=>{
        if (key in destination) {
            if (overwrite) {
                if ((0, $2581ede4232235dc$export$a6cdc56e425d0d0a)(destination[key]) && (0, $2581ede4232235dc$export$a6cdc56e425d0d0a)(source[key])) $828a7683e85b36fa$export$e36fc9d62a853069(destination[key], source[key], overwrite);
                else destination[key] = source[key];
            }
        } else destination[key] = source[key];
    });
    return destination;
}
function $828a7683e85b36fa$export$e9bab7fafb253603(one, other) {
    if (one === other) return true;
    if (one === null || one === undefined || other === null || other === undefined) return false;
    if (typeof one !== typeof other) return false;
    if (typeof one !== 'object') return false;
    if (Array.isArray(one) !== Array.isArray(other)) return false;
    let i;
    let key;
    if (Array.isArray(one)) {
        if (one.length !== other.length) return false;
        for(i = 0; i < one.length; i++){
            if (!$828a7683e85b36fa$export$e9bab7fafb253603(one[i], other[i])) return false;
        }
    } else {
        const oneKeys = [];
        for(key in one)oneKeys.push(key);
        oneKeys.sort();
        const otherKeys = [];
        for(key in other)otherKeys.push(key);
        otherKeys.sort();
        if (!$828a7683e85b36fa$export$e9bab7fafb253603(oneKeys, otherKeys)) return false;
        for(i = 0; i < oneKeys.length; i++){
            if (!$828a7683e85b36fa$export$e9bab7fafb253603(one[oneKeys[i]], other[oneKeys[i]])) return false;
        }
    }
    return true;
}
function $828a7683e85b36fa$export$3c3be4acc83b213f(obj) {
    let res = [];
    while(Object.prototype !== obj){
        res = res.concat(Object.getOwnPropertyNames(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return res;
}
function $828a7683e85b36fa$export$12b7705ad1c6975(obj) {
    const methods = [];
    for (const prop of $828a7683e85b36fa$export$3c3be4acc83b213f(obj))if (typeof obj[prop] === 'function') methods.push(prop);
    return methods;
}
function $828a7683e85b36fa$export$74026ccda580cde9(methodNames, invoke) {
    const createProxyMethod = (method)=>{
        return function() {
            const args = Array.prototype.slice.call(arguments, 0);
            return invoke(method, args);
        };
    };
    const result = {};
    for (const methodName of methodNames)result[methodName] = createProxyMethod(methodName);
    return result;
}


var $fbe9b24d72fe07e4$export$676624b54f6b43c;
(function(OverviewRulerLane) {
    OverviewRulerLane[OverviewRulerLane["Left"] = 1] = "Left";
    OverviewRulerLane[OverviewRulerLane["Center"] = 2] = "Center";
    OverviewRulerLane[OverviewRulerLane["Right"] = 4] = "Right";
    OverviewRulerLane[OverviewRulerLane["Full"] = 7] = "Full";
})($fbe9b24d72fe07e4$export$676624b54f6b43c || ($fbe9b24d72fe07e4$export$676624b54f6b43c = {}));
var $fbe9b24d72fe07e4$export$bb2acf536073323a;
(function(GlyphMarginLane) {
    GlyphMarginLane[GlyphMarginLane["Left"] = 1] = "Left";
    GlyphMarginLane[GlyphMarginLane["Center"] = 2] = "Center";
    GlyphMarginLane[GlyphMarginLane["Right"] = 3] = "Right";
})($fbe9b24d72fe07e4$export$bb2acf536073323a || ($fbe9b24d72fe07e4$export$bb2acf536073323a = {}));
var $fbe9b24d72fe07e4$export$f5c5d924e2002c2f;
(function(InjectedTextCursorStops) {
    InjectedTextCursorStops[InjectedTextCursorStops["Both"] = 0] = "Both";
    InjectedTextCursorStops[InjectedTextCursorStops["Right"] = 1] = "Right";
    InjectedTextCursorStops[InjectedTextCursorStops["Left"] = 2] = "Left";
    InjectedTextCursorStops[InjectedTextCursorStops["None"] = 3] = "None";
})($fbe9b24d72fe07e4$export$f5c5d924e2002c2f || ($fbe9b24d72fe07e4$export$f5c5d924e2002c2f = {}));
class $fbe9b24d72fe07e4$export$d352d86c9973ccbd {
    get originalIndentSize() {
        return this._indentSizeIsTabSize ? 'tabSize' : this.indentSize;
    }
    /**
     * @internal
     */ constructor(src){
        this._textModelResolvedOptionsBrand = undefined;
        this.tabSize = Math.max(1, src.tabSize | 0);
        if (src.indentSize === 'tabSize') {
            this.indentSize = this.tabSize;
            this._indentSizeIsTabSize = true;
        } else {
            this.indentSize = Math.max(1, src.indentSize | 0);
            this._indentSizeIsTabSize = false;
        }
        this.insertSpaces = Boolean(src.insertSpaces);
        this.defaultEOL = src.defaultEOL | 0;
        this.trimAutoWhitespace = Boolean(src.trimAutoWhitespace);
        this.bracketPairColorizationOptions = src.bracketPairColorizationOptions;
    }
    /**
     * @internal
     */ equals(other) {
        return this.tabSize === other.tabSize && this._indentSizeIsTabSize === other._indentSizeIsTabSize && this.indentSize === other.indentSize && this.insertSpaces === other.insertSpaces && this.defaultEOL === other.defaultEOL && this.trimAutoWhitespace === other.trimAutoWhitespace && (0, $828a7683e85b36fa$export$e9bab7fafb253603)(this.bracketPairColorizationOptions, other.bracketPairColorizationOptions);
    }
    /**
     * @internal
     */ createChangeEvent(newOpts) {
        return {
            tabSize: this.tabSize !== newOpts.tabSize,
            indentSize: this.indentSize !== newOpts.indentSize,
            insertSpaces: this.insertSpaces !== newOpts.insertSpaces,
            trimAutoWhitespace: this.trimAutoWhitespace !== newOpts.trimAutoWhitespace
        };
    }
}
class $fbe9b24d72fe07e4$export$35b6b3d674108eec {
    /**
     * @internal
     */ constructor(range, matches){
        this._findMatchBrand = undefined;
        this.range = range;
        this.matches = matches;
    }
}
function $fbe9b24d72fe07e4$export$97672c998a51a518(obj) {
    return obj && typeof obj.read === 'function';
}
class $fbe9b24d72fe07e4$export$c101e4f5b88c8584 {
    constructor(identifier, range, text, forceMoveMarkers, isAutoWhitespaceEdit, _isTracked){
        this.identifier = identifier;
        this.range = range;
        this.text = text;
        this.forceMoveMarkers = forceMoveMarkers;
        this.isAutoWhitespaceEdit = isAutoWhitespaceEdit;
        this._isTracked = _isTracked;
    }
}
class $fbe9b24d72fe07e4$export$4296dd3a4456c4ee {
    constructor(regex, wordSeparators, simpleSearch){
        this.regex = regex;
        this.wordSeparators = wordSeparators;
        this.simpleSearch = simpleSearch;
    }
}
class $fbe9b24d72fe07e4$export$d81043e724992a9c {
    constructor(reverseEdits, changes, trimAutoWhitespaceLineNumbers){
        this.reverseEdits = reverseEdits;
        this.changes = changes;
        this.trimAutoWhitespaceLineNumbers = trimAutoWhitespaceLineNumbers;
    }
}
function $fbe9b24d72fe07e4$export$e0dfbc3db2cad249(model) {
    return !model.isTooLargeForSyncing() && !model.isForSimpleWidget;
}


const $7225a3ed70468b0c$var$LIMIT_FIND_COUNT = 999;
class $7225a3ed70468b0c$export$1e1d235314148489 {
    constructor(searchString, isRegex, matchCase, wordSeparators){
        this.searchString = searchString;
        this.isRegex = isRegex;
        this.matchCase = matchCase;
        this.wordSeparators = wordSeparators;
    }
    parseSearchRequest() {
        if (this.searchString === '') return null;
        // Try to create a RegExp out of the params
        let multiline;
        if (this.isRegex) multiline = $7225a3ed70468b0c$export$f5e3e321ca73f582(this.searchString);
        else multiline = this.searchString.indexOf('\n') >= 0;
        let regex = null;
        try {
            regex = $88789e6252368c20$export$d898a7a1ede8c92(this.searchString, this.isRegex, {
                matchCase: this.matchCase,
                wholeWord: false,
                multiline: multiline,
                global: true,
                unicode: true
            });
        } catch (err) {
            return null;
        }
        if (!regex) return null;
        let canUseSimpleSearch = !this.isRegex && !multiline;
        if (canUseSimpleSearch && this.searchString.toLowerCase() !== this.searchString.toUpperCase()) // casing might make a difference
        canUseSimpleSearch = this.matchCase;
        return new (0, $fbe9b24d72fe07e4$export$4296dd3a4456c4ee)(regex, this.wordSeparators ? (0, $0938af51ed44434f$export$41b0fa1fd5e9b2d8)(this.wordSeparators, []) : null, canUseSimpleSearch ? this.searchString : null);
    }
}
function $7225a3ed70468b0c$export$f5e3e321ca73f582(searchString) {
    if (!searchString || searchString.length === 0) return false;
    for(let i = 0, len = searchString.length; i < len; i++){
        const chCode = searchString.charCodeAt(i);
        if (chCode === 10 /* CharCode.LineFeed */ ) return true;
        if (chCode === 92 /* CharCode.Backslash */ ) {
            // move to next char
            i++;
            if (i >= len) break;
            const nextChCode = searchString.charCodeAt(i);
            if (nextChCode === 110 /* CharCode.n */  || nextChCode === 114 /* CharCode.r */  || nextChCode === 87 /* CharCode.W */ ) return true;
        }
    }
    return false;
}
function $7225a3ed70468b0c$export$91a82feee09fd1c4(range, rawMatches, captureMatches) {
    if (!captureMatches) return new (0, $fbe9b24d72fe07e4$export$35b6b3d674108eec)(range, null);
    const matches = [];
    for(let i = 0, len = rawMatches.length; i < len; i++)matches[i] = rawMatches[i];
    return new (0, $fbe9b24d72fe07e4$export$35b6b3d674108eec)(range, matches);
}
class $7225a3ed70468b0c$var$LineFeedCounter {
    constructor(text){
        const lineFeedsOffsets = [];
        let lineFeedsOffsetsLen = 0;
        for(let i = 0, textLen = text.length; i < textLen; i++)if (text.charCodeAt(i) === 10 /* CharCode.LineFeed */ ) lineFeedsOffsets[lineFeedsOffsetsLen++] = i;
        this._lineFeedsOffsets = lineFeedsOffsets;
    }
    findLineFeedCountBeforeOffset(offset) {
        const lineFeedsOffsets = this._lineFeedsOffsets;
        let min = 0;
        let max = lineFeedsOffsets.length - 1;
        if (max === -1) // no line feeds
        return 0;
        if (offset <= lineFeedsOffsets[0]) // before first line feed
        return 0;
        while(min < max){
            const mid = min + ((max - min) / 2 >> 0);
            if (lineFeedsOffsets[mid] >= offset) max = mid - 1;
            else if (lineFeedsOffsets[mid + 1] >= offset) {
                // bingo!
                min = mid;
                max = mid;
            } else min = mid + 1;
        }
        return min + 1;
    }
}
class $7225a3ed70468b0c$export$3c2e4c9510bd31d4 {
    static findMatches(model, searchParams, searchRange, captureMatches, limitResultCount) {
        const searchData = searchParams.parseSearchRequest();
        if (!searchData) return [];
        if (searchData.regex.multiline) return this._doFindMatchesMultiline(model, searchRange, new $7225a3ed70468b0c$export$25746e77c1b1a497(searchData.wordSeparators, searchData.regex), captureMatches, limitResultCount);
        return this._doFindMatchesLineByLine(model, searchRange, searchData, captureMatches, limitResultCount);
    }
    /**
     * Multiline search always executes on the lines concatenated with \n.
     * We must therefore compensate for the count of \n in case the model is CRLF
     */ static _getMultilineMatchRange(model, deltaOffset, text, lfCounter, matchIndex, match0) {
        let startOffset;
        let lineFeedCountBeforeMatch = 0;
        if (lfCounter) {
            lineFeedCountBeforeMatch = lfCounter.findLineFeedCountBeforeOffset(matchIndex);
            startOffset = deltaOffset + matchIndex + lineFeedCountBeforeMatch /* add as many \r as there were \n */ ;
        } else startOffset = deltaOffset + matchIndex;
        let endOffset;
        if (lfCounter) {
            const lineFeedCountBeforeEndOfMatch = lfCounter.findLineFeedCountBeforeOffset(matchIndex + match0.length);
            const lineFeedCountInMatch = lineFeedCountBeforeEndOfMatch - lineFeedCountBeforeMatch;
            endOffset = startOffset + match0.length + lineFeedCountInMatch /* add as many \r as there were \n */ ;
        } else endOffset = startOffset + match0.length;
        const startPosition = model.getPositionAt(startOffset);
        const endPosition = model.getPositionAt(endOffset);
        return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(startPosition.lineNumber, startPosition.column, endPosition.lineNumber, endPosition.column);
    }
    static _doFindMatchesMultiline(model, searchRange, searcher, captureMatches, limitResultCount) {
        const deltaOffset = model.getOffsetAt(searchRange.getStartPosition());
        // We always execute multiline search over the lines joined with \n
        // This makes it that \n will match the EOL for both CRLF and LF models
        // We compensate for offset errors in `_getMultilineMatchRange`
        const text = model.getValueInRange(searchRange, 1 /* EndOfLinePreference.LF */ );
        const lfCounter = model.getEOL() === '\r\n' ? new $7225a3ed70468b0c$var$LineFeedCounter(text) : null;
        const result = [];
        let counter = 0;
        let m;
        searcher.reset(0);
        while(m = searcher.next(text)){
            result[counter++] = $7225a3ed70468b0c$export$91a82feee09fd1c4(this._getMultilineMatchRange(model, deltaOffset, text, lfCounter, m.index, m[0]), m, captureMatches);
            if (counter >= limitResultCount) return result;
        }
        return result;
    }
    static _doFindMatchesLineByLine(model, searchRange, searchData, captureMatches, limitResultCount) {
        const result = [];
        let resultLen = 0;
        // Early case for a search range that starts & stops on the same line number
        if (searchRange.startLineNumber === searchRange.endLineNumber) {
            const text = model.getLineContent(searchRange.startLineNumber).substring(searchRange.startColumn - 1, searchRange.endColumn - 1);
            resultLen = this._findMatchesInLine(searchData, text, searchRange.startLineNumber, searchRange.startColumn - 1, resultLen, result, captureMatches, limitResultCount);
            return result;
        }
        // Collect results from first line
        const text = model.getLineContent(searchRange.startLineNumber).substring(searchRange.startColumn - 1);
        resultLen = this._findMatchesInLine(searchData, text, searchRange.startLineNumber, searchRange.startColumn - 1, resultLen, result, captureMatches, limitResultCount);
        // Collect results from middle lines
        for(let lineNumber = searchRange.startLineNumber + 1; lineNumber < searchRange.endLineNumber && resultLen < limitResultCount; lineNumber++)resultLen = this._findMatchesInLine(searchData, model.getLineContent(lineNumber), lineNumber, 0, resultLen, result, captureMatches, limitResultCount);
        // Collect results from last line
        if (resultLen < limitResultCount) {
            const text = model.getLineContent(searchRange.endLineNumber).substring(0, searchRange.endColumn - 1);
            resultLen = this._findMatchesInLine(searchData, text, searchRange.endLineNumber, 0, resultLen, result, captureMatches, limitResultCount);
        }
        return result;
    }
    static _findMatchesInLine(searchData, text, lineNumber, deltaOffset, resultLen, result, captureMatches, limitResultCount) {
        const wordSeparators = searchData.wordSeparators;
        if (!captureMatches && searchData.simpleSearch) {
            const searchString = searchData.simpleSearch;
            const searchStringLen = searchString.length;
            const textLength = text.length;
            let lastMatchIndex = -searchStringLen;
            while((lastMatchIndex = text.indexOf(searchString, lastMatchIndex + searchStringLen)) !== -1)if (!wordSeparators || $7225a3ed70468b0c$export$e13aa1cfb5056614(wordSeparators, text, textLength, lastMatchIndex, searchStringLen)) {
                result[resultLen++] = new (0, $fbe9b24d72fe07e4$export$35b6b3d674108eec)(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(lineNumber, lastMatchIndex + 1 + deltaOffset, lineNumber, lastMatchIndex + 1 + searchStringLen + deltaOffset), null);
                if (resultLen >= limitResultCount) return resultLen;
            }
            return resultLen;
        }
        const searcher = new $7225a3ed70468b0c$export$25746e77c1b1a497(searchData.wordSeparators, searchData.regex);
        let m;
        // Reset regex to search from the beginning
        searcher.reset(0);
        do {
            m = searcher.next(text);
            if (m) {
                result[resultLen++] = $7225a3ed70468b0c$export$91a82feee09fd1c4(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(lineNumber, m.index + 1 + deltaOffset, lineNumber, m.index + 1 + m[0].length + deltaOffset), m, captureMatches);
                if (resultLen >= limitResultCount) return resultLen;
            }
        }while (m);
        return resultLen;
    }
    static findNextMatch(model, searchParams, searchStart, captureMatches) {
        const searchData = searchParams.parseSearchRequest();
        if (!searchData) return null;
        const searcher = new $7225a3ed70468b0c$export$25746e77c1b1a497(searchData.wordSeparators, searchData.regex);
        if (searchData.regex.multiline) return this._doFindNextMatchMultiline(model, searchStart, searcher, captureMatches);
        return this._doFindNextMatchLineByLine(model, searchStart, searcher, captureMatches);
    }
    static _doFindNextMatchMultiline(model, searchStart, searcher, captureMatches) {
        const searchTextStart = new (0, $52194de676ded133$export$13807d9ee5a34a42)(searchStart.lineNumber, 1);
        const deltaOffset = model.getOffsetAt(searchTextStart);
        const lineCount = model.getLineCount();
        // We always execute multiline search over the lines joined with \n
        // This makes it that \n will match the EOL for both CRLF and LF models
        // We compensate for offset errors in `_getMultilineMatchRange`
        const text = model.getValueInRange(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(searchTextStart.lineNumber, searchTextStart.column, lineCount, model.getLineMaxColumn(lineCount)), 1 /* EndOfLinePreference.LF */ );
        const lfCounter = model.getEOL() === '\r\n' ? new $7225a3ed70468b0c$var$LineFeedCounter(text) : null;
        searcher.reset(searchStart.column - 1);
        const m = searcher.next(text);
        if (m) return $7225a3ed70468b0c$export$91a82feee09fd1c4(this._getMultilineMatchRange(model, deltaOffset, text, lfCounter, m.index, m[0]), m, captureMatches);
        if (searchStart.lineNumber !== 1 || searchStart.column !== 1) // Try again from the top
        return this._doFindNextMatchMultiline(model, new (0, $52194de676ded133$export$13807d9ee5a34a42)(1, 1), searcher, captureMatches);
        return null;
    }
    static _doFindNextMatchLineByLine(model, searchStart, searcher, captureMatches) {
        const lineCount = model.getLineCount();
        const startLineNumber = searchStart.lineNumber;
        // Look in first line
        const text = model.getLineContent(startLineNumber);
        const r = this._findFirstMatchInLine(searcher, text, startLineNumber, searchStart.column, captureMatches);
        if (r) return r;
        for(let i = 1; i <= lineCount; i++){
            const lineIndex = (startLineNumber + i - 1) % lineCount;
            const text = model.getLineContent(lineIndex + 1);
            const r = this._findFirstMatchInLine(searcher, text, lineIndex + 1, 1, captureMatches);
            if (r) return r;
        }
        return null;
    }
    static _findFirstMatchInLine(searcher, text, lineNumber, fromColumn, captureMatches) {
        // Set regex to search from column
        searcher.reset(fromColumn - 1);
        const m = searcher.next(text);
        if (m) return $7225a3ed70468b0c$export$91a82feee09fd1c4(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(lineNumber, m.index + 1, lineNumber, m.index + 1 + m[0].length), m, captureMatches);
        return null;
    }
    static findPreviousMatch(model, searchParams, searchStart, captureMatches) {
        const searchData = searchParams.parseSearchRequest();
        if (!searchData) return null;
        const searcher = new $7225a3ed70468b0c$export$25746e77c1b1a497(searchData.wordSeparators, searchData.regex);
        if (searchData.regex.multiline) return this._doFindPreviousMatchMultiline(model, searchStart, searcher, captureMatches);
        return this._doFindPreviousMatchLineByLine(model, searchStart, searcher, captureMatches);
    }
    static _doFindPreviousMatchMultiline(model, searchStart, searcher, captureMatches) {
        const matches = this._doFindMatchesMultiline(model, new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(1, 1, searchStart.lineNumber, searchStart.column), searcher, captureMatches, 10 * $7225a3ed70468b0c$var$LIMIT_FIND_COUNT);
        if (matches.length > 0) return matches[matches.length - 1];
        const lineCount = model.getLineCount();
        if (searchStart.lineNumber !== lineCount || searchStart.column !== model.getLineMaxColumn(lineCount)) // Try again with all content
        return this._doFindPreviousMatchMultiline(model, new (0, $52194de676ded133$export$13807d9ee5a34a42)(lineCount, model.getLineMaxColumn(lineCount)), searcher, captureMatches);
        return null;
    }
    static _doFindPreviousMatchLineByLine(model, searchStart, searcher, captureMatches) {
        const lineCount = model.getLineCount();
        const startLineNumber = searchStart.lineNumber;
        // Look in first line
        const text = model.getLineContent(startLineNumber).substring(0, searchStart.column - 1);
        const r = this._findLastMatchInLine(searcher, text, startLineNumber, captureMatches);
        if (r) return r;
        for(let i = 1; i <= lineCount; i++){
            const lineIndex = (lineCount + startLineNumber - i - 1) % lineCount;
            const text = model.getLineContent(lineIndex + 1);
            const r = this._findLastMatchInLine(searcher, text, lineIndex + 1, captureMatches);
            if (r) return r;
        }
        return null;
    }
    static _findLastMatchInLine(searcher, text, lineNumber, captureMatches) {
        let bestResult = null;
        let m;
        searcher.reset(0);
        while(m = searcher.next(text))bestResult = $7225a3ed70468b0c$export$91a82feee09fd1c4(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(lineNumber, m.index + 1, lineNumber, m.index + 1 + m[0].length), m, captureMatches);
        return bestResult;
    }
}
function $7225a3ed70468b0c$var$leftIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength) {
    if (matchStartIndex === 0) // Match starts at start of string
    return true;
    const charBefore = text.charCodeAt(matchStartIndex - 1);
    if (wordSeparators.get(charBefore) !== 0 /* WordCharacterClass.Regular */ ) // The character before the match is a word separator
    return true;
    if (charBefore === 13 /* CharCode.CarriageReturn */  || charBefore === 10 /* CharCode.LineFeed */ ) // The character before the match is line break or carriage return.
    return true;
    if (matchLength > 0) {
        const firstCharInMatch = text.charCodeAt(matchStartIndex);
        if (wordSeparators.get(firstCharInMatch) !== 0 /* WordCharacterClass.Regular */ ) // The first character inside the match is a word separator
        return true;
    }
    return false;
}
function $7225a3ed70468b0c$var$rightIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength) {
    if (matchStartIndex + matchLength === textLength) // Match ends at end of string
    return true;
    const charAfter = text.charCodeAt(matchStartIndex + matchLength);
    if (wordSeparators.get(charAfter) !== 0 /* WordCharacterClass.Regular */ ) // The character after the match is a word separator
    return true;
    if (charAfter === 13 /* CharCode.CarriageReturn */  || charAfter === 10 /* CharCode.LineFeed */ ) // The character after the match is line break or carriage return.
    return true;
    if (matchLength > 0) {
        const lastCharInMatch = text.charCodeAt(matchStartIndex + matchLength - 1);
        if (wordSeparators.get(lastCharInMatch) !== 0 /* WordCharacterClass.Regular */ ) // The last character in the match is a word separator
        return true;
    }
    return false;
}
function $7225a3ed70468b0c$export$e13aa1cfb5056614(wordSeparators, text, textLength, matchStartIndex, matchLength) {
    return $7225a3ed70468b0c$var$leftIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength) && $7225a3ed70468b0c$var$rightIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength);
}
class $7225a3ed70468b0c$export$25746e77c1b1a497 {
    constructor(wordSeparators, searchRegex){
        this._wordSeparators = wordSeparators;
        this._searchRegex = searchRegex;
        this._prevMatchStartIndex = -1;
        this._prevMatchLength = 0;
    }
    reset(lastIndex) {
        this._searchRegex.lastIndex = lastIndex;
        this._prevMatchStartIndex = -1;
        this._prevMatchLength = 0;
    }
    next(text) {
        const textLength = text.length;
        let m;
        do {
            if (this._prevMatchStartIndex + this._prevMatchLength === textLength) // Reached the end of the line
            return null;
            m = this._searchRegex.exec(text);
            if (!m) return null;
            const matchStartIndex = m.index;
            const matchLength = m[0].length;
            if (matchStartIndex === this._prevMatchStartIndex && matchLength === this._prevMatchLength) {
                if (matchLength === 0) {
                    // the search result is an empty string and won't advance `regex.lastIndex`, so `regex.exec` will stuck here
                    // we attempt to recover from that by advancing by two if surrogate pair found and by one otherwise
                    if ($88789e6252368c20$export$12f0b64547f341eb(text, textLength, this._searchRegex.lastIndex) > 0xFFFF) this._searchRegex.lastIndex += 2;
                    else this._searchRegex.lastIndex += 1;
                    continue;
                }
                // Exit early if the regex matches the same range twice
                return null;
            }
            this._prevMatchStartIndex = matchStartIndex;
            this._prevMatchLength = matchLength;
            if (!this._wordSeparators || $7225a3ed70468b0c$export$e13aa1cfb5056614(this._wordSeparators, text, textLength, matchStartIndex, matchLength)) return m;
        }while (m);
        return null;
    }
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
function $0457b9d1b5576d87$export$dcb8b3f0e2de7e49(value, message) {
    if (!value) throw new Error(message ? `Assertion failed (${message})` : 'Assertion Failed');
}
function $0457b9d1b5576d87$export$cbadc5a7223772a8(value, message = 'Unreachable') {
    throw new Error(message);
}
function $0457b9d1b5576d87$export$557890c7f345c53e(condition) {
    if (!condition) (0, $da7a53421655f39f$export$fbc590487568d5a6)(new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('Soft Assertion Failed'));
}
function $0457b9d1b5576d87$export$471f926058ed234c(condition) {
    if (!condition()) {
        // eslint-disable-next-line no-debugger
        debugger;
        // Reevaluate `condition` again to make debugging easier
        condition();
        (0, $da7a53421655f39f$export$fbc590487568d5a6)(new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('Assertion Failed'));
    }
}
function $0457b9d1b5576d87$export$9c0bd4a186c34372(items, predicate) {
    let i = 0;
    while(i < items.length - 1){
        const a = items[i];
        const b = items[i + 1];
        if (!predicate(a, b)) return false;
        i++;
    }
    return true;
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

const $f48496f3a13f626f$export$b3b880ee12c35c05 = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?';
/**
 * Create a word definition regular expression based on default word separators.
 * Optionally provide allowed separators that should be included in words.
 *
 * The default would look like this:
 * /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
 */ function $f48496f3a13f626f$var$createWordRegExp(allowInWords = '') {
    let source = '(-?\\d*\\.\\d\\w*)|([^';
    for (const sep of $f48496f3a13f626f$export$b3b880ee12c35c05){
        if (allowInWords.indexOf(sep) >= 0) continue;
        source += '\\' + sep;
    }
    source += '\\s]+)';
    return new RegExp(source, 'g');
}
const $f48496f3a13f626f$export$9ed56029ead24fb7 = $f48496f3a13f626f$var$createWordRegExp();
function $f48496f3a13f626f$export$c037188f544f512f(wordDefinition) {
    let result = $f48496f3a13f626f$export$9ed56029ead24fb7;
    if (wordDefinition && wordDefinition instanceof RegExp) {
        if (!wordDefinition.global) {
            let flags = 'g';
            if (wordDefinition.ignoreCase) flags += 'i';
            if (wordDefinition.multiline) flags += 'm';
            if (wordDefinition.unicode) flags += 'u';
            result = new RegExp(wordDefinition.source, flags);
        } else result = wordDefinition;
    }
    result.lastIndex = 0;
    return result;
}
const $f48496f3a13f626f$var$_defaultConfig = new (0, $c3771893894cd9dc$export$f0ef28713f767754)();
$f48496f3a13f626f$var$_defaultConfig.unshift({
    maxLen: 1000,
    windowSize: 15,
    timeBudget: 150
});
function $f48496f3a13f626f$export$c540f46dd0d97e0f(column, wordDefinition, text, textOffset, config) {
    // Ensure the regex has the 'g' flag, otherwise this will loop forever
    wordDefinition = $f48496f3a13f626f$export$c037188f544f512f(wordDefinition);
    if (!config) config = (0, $a97ac34a660813f6$export$6936595027d5d5e8).first($f48496f3a13f626f$var$_defaultConfig);
    if (text.length > config.maxLen) {
        // don't throw strings that long at the regexp
        // but use a sub-string in which a word must occur
        let start = column - config.maxLen / 2;
        if (start < 0) start = 0;
        else textOffset += start;
        text = text.substring(start, column + config.maxLen / 2);
        return $f48496f3a13f626f$export$c540f46dd0d97e0f(column, wordDefinition, text, textOffset, config);
    }
    const t1 = Date.now();
    const pos = column - 1 - textOffset;
    let prevRegexIndex = -1;
    let match = null;
    for(let i = 1;; i++){
        // check time budget
        if (Date.now() - t1 >= config.timeBudget) break;
        // reset the index at which the regexp should start matching, also know where it
        // should stop so that subsequent search don't repeat previous searches
        const regexIndex = pos - config.windowSize * i;
        wordDefinition.lastIndex = Math.max(0, regexIndex);
        const thisMatch = $f48496f3a13f626f$var$_findRegexMatchEnclosingPosition(wordDefinition, text, pos, prevRegexIndex);
        if (!thisMatch && match) break;
        match = thisMatch;
        // stop: searched at start
        if (regexIndex <= 0) break;
        prevRegexIndex = regexIndex;
    }
    if (match) {
        const result = {
            word: match[0],
            startColumn: textOffset + 1 + match.index,
            endColumn: textOffset + 1 + match.index + match[0].length
        };
        wordDefinition.lastIndex = 0;
        return result;
    }
    return null;
}
function $f48496f3a13f626f$var$_findRegexMatchEnclosingPosition(wordDefinition, text, pos, stopPos) {
    let match;
    while(match = wordDefinition.exec(text)){
        const matchIndex = match.index || 0;
        if (matchIndex <= pos && wordDefinition.lastIndex >= pos) return match;
        else if (stopPos > 0 && matchIndex > stopPos) return null;
    }
    return null;
}


class $c91d7eeb099468c6$export$aa7912c6b411d321 {
    static computeUnicodeHighlights(model, options, range) {
        const startLine = range ? range.startLineNumber : 1;
        const endLine = range ? range.endLineNumber : model.getLineCount();
        const codePointHighlighter = new $c91d7eeb099468c6$var$CodePointHighlighter(options);
        const candidates = codePointHighlighter.getCandidateCodePoints();
        let regex;
        if (candidates === 'allNonBasicAscii') regex = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g');
        else regex = new RegExp(`${$c91d7eeb099468c6$var$buildRegExpCharClassExpr(Array.from(candidates))}`, 'g');
        const searcher = new (0, $7225a3ed70468b0c$export$25746e77c1b1a497)(null, regex);
        const ranges = [];
        let hasMore = false;
        let m;
        let ambiguousCharacterCount = 0;
        let invisibleCharacterCount = 0;
        let nonBasicAsciiCharacterCount = 0;
        forLoop: for(let lineNumber = startLine, lineCount = endLine; lineNumber <= lineCount; lineNumber++){
            const lineContent = model.getLineContent(lineNumber);
            const lineLength = lineContent.length;
            // Reset regex to search from the beginning
            searcher.reset(0);
            do {
                m = searcher.next(lineContent);
                if (m) {
                    let startIndex = m.index;
                    let endIndex = m.index + m[0].length;
                    // Extend range to entire code point
                    if (startIndex > 0) {
                        const charCodeBefore = lineContent.charCodeAt(startIndex - 1);
                        if ($88789e6252368c20$export$9be78f542969c681(charCodeBefore)) startIndex--;
                    }
                    if (endIndex + 1 < lineLength) {
                        const charCodeBefore = lineContent.charCodeAt(endIndex - 1);
                        if ($88789e6252368c20$export$9be78f542969c681(charCodeBefore)) endIndex++;
                    }
                    const str = lineContent.substring(startIndex, endIndex);
                    let word = (0, $f48496f3a13f626f$export$c540f46dd0d97e0f)(startIndex + 1, (0, $f48496f3a13f626f$export$9ed56029ead24fb7), lineContent, 0);
                    if (word && word.endColumn <= startIndex + 1) // The word does not include the problematic character, ignore the word
                    word = null;
                    const highlightReason = codePointHighlighter.shouldHighlightNonBasicASCII(str, word ? word.word : null);
                    if (highlightReason !== 0 /* SimpleHighlightReason.None */ ) {
                        if (highlightReason === 3 /* SimpleHighlightReason.Ambiguous */ ) ambiguousCharacterCount++;
                        else if (highlightReason === 2 /* SimpleHighlightReason.Invisible */ ) invisibleCharacterCount++;
                        else if (highlightReason === 1 /* SimpleHighlightReason.NonBasicASCII */ ) nonBasicAsciiCharacterCount++;
                        else (0, $0457b9d1b5576d87$export$cbadc5a7223772a8)(highlightReason);
                        const MAX_RESULT_LENGTH = 1000;
                        if (ranges.length >= MAX_RESULT_LENGTH) {
                            hasMore = true;
                            break forLoop;
                        }
                        ranges.push(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(lineNumber, startIndex + 1, lineNumber, endIndex + 1));
                    }
                }
            }while (m);
        }
        return {
            ranges: ranges,
            hasMore: hasMore,
            ambiguousCharacterCount: ambiguousCharacterCount,
            invisibleCharacterCount: invisibleCharacterCount,
            nonBasicAsciiCharacterCount: nonBasicAsciiCharacterCount
        };
    }
    static computeUnicodeHighlightReason(char, options) {
        const codePointHighlighter = new $c91d7eeb099468c6$var$CodePointHighlighter(options);
        const reason = codePointHighlighter.shouldHighlightNonBasicASCII(char, null);
        switch(reason){
            case 0 /* SimpleHighlightReason.None */ :
                return null;
            case 2 /* SimpleHighlightReason.Invisible */ :
                return {
                    kind: 1 /* UnicodeHighlighterReasonKind.Invisible */ 
                };
            case 3 /* SimpleHighlightReason.Ambiguous */ :
                {
                    const codePoint = char.codePointAt(0);
                    const primaryConfusable = codePointHighlighter.ambiguousCharacters.getPrimaryConfusable(codePoint);
                    const notAmbiguousInLocales = $88789e6252368c20$export$e31bad1c158baf54.getLocales().filter((l)=>!$88789e6252368c20$export$e31bad1c158baf54.getInstance(new Set([
                            ...options.allowedLocales,
                            l
                        ])).isAmbiguous(codePoint));
                    return {
                        kind: 0 /* UnicodeHighlighterReasonKind.Ambiguous */ ,
                        confusableWith: String.fromCodePoint(primaryConfusable),
                        notAmbiguousInLocales: notAmbiguousInLocales
                    };
                }
            case 1 /* SimpleHighlightReason.NonBasicASCII */ :
                return {
                    kind: 2 /* UnicodeHighlighterReasonKind.NonBasicAscii */ 
                };
        }
    }
}
function $c91d7eeb099468c6$var$buildRegExpCharClassExpr(codePoints, flags) {
    const src = `[${$88789e6252368c20$export$a218487c9626e4be(codePoints.map((i)=>String.fromCodePoint(i)).join(''))}]`;
    return src;
}
class $c91d7eeb099468c6$var$CodePointHighlighter {
    constructor(options){
        this.options = options;
        this.allowedCodePoints = new Set(options.allowedCodePoints);
        this.ambiguousCharacters = $88789e6252368c20$export$e31bad1c158baf54.getInstance(new Set(options.allowedLocales));
    }
    getCandidateCodePoints() {
        if (this.options.nonBasicASCII) return 'allNonBasicAscii';
        const set = new Set();
        if (this.options.invisibleCharacters) {
            for (const cp of $88789e6252368c20$export$f5602f83e5c5c07.codePoints)if (!$c91d7eeb099468c6$var$isAllowedInvisibleCharacter(String.fromCodePoint(cp))) set.add(cp);
        }
        if (this.options.ambiguousCharacters) for (const cp of this.ambiguousCharacters.getConfusableCodePoints())set.add(cp);
        for (const cp of this.allowedCodePoints)set.delete(cp);
        return set;
    }
    shouldHighlightNonBasicASCII(character, wordContext) {
        const codePoint = character.codePointAt(0);
        if (this.allowedCodePoints.has(codePoint)) return 0 /* SimpleHighlightReason.None */ ;
        if (this.options.nonBasicASCII) return 1 /* SimpleHighlightReason.NonBasicASCII */ ;
        let hasBasicASCIICharacters = false;
        let hasNonConfusableNonBasicAsciiCharacter = false;
        if (wordContext) for (const char of wordContext){
            const codePoint = char.codePointAt(0);
            const isBasicASCII = $88789e6252368c20$export$81d0b64a0f99c2e8(char);
            hasBasicASCIICharacters = hasBasicASCIICharacters || isBasicASCII;
            if (!isBasicASCII && !this.ambiguousCharacters.isAmbiguous(codePoint) && !$88789e6252368c20$export$f5602f83e5c5c07.isInvisibleCharacter(codePoint)) hasNonConfusableNonBasicAsciiCharacter = true;
        }
        if (/* Don't allow mixing weird looking characters with ASCII */ !hasBasicASCIICharacters && /* Is there an obviously weird looking character? */ hasNonConfusableNonBasicAsciiCharacter) return 0 /* SimpleHighlightReason.None */ ;
        if (this.options.invisibleCharacters) {
            // TODO check for emojis
            if (!$c91d7eeb099468c6$var$isAllowedInvisibleCharacter(character) && $88789e6252368c20$export$f5602f83e5c5c07.isInvisibleCharacter(codePoint)) return 2 /* SimpleHighlightReason.Invisible */ ;
        }
        if (this.options.ambiguousCharacters) {
            if (this.ambiguousCharacters.isAmbiguous(codePoint)) return 3 /* SimpleHighlightReason.Ambiguous */ ;
        }
        return 0 /* SimpleHighlightReason.None */ ;
    }
}
function $c91d7eeb099468c6$var$isAllowedInvisibleCharacter(character) {
    return character === ' ' || character === '\n' || character === '\t';
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $3453bbcb9507299f$export$6cac6ec541da4902 {
    constructor(changes, /**
     * Sorted by original line ranges.
     * The original line ranges and the modified line ranges must be disjoint (but can be touching).
     */ moves, /**
     * Indicates if the time out was reached.
     * In that case, the diffs might be an approximation and the user should be asked to rerun the diff with more time.
     */ hitTimeout){
        this.changes = changes;
        this.moves = moves;
        this.hitTimeout = hitTimeout;
    }
}
class $3453bbcb9507299f$export$cd186cedd5483e9d {
    constructor(lineRangeMapping, changes){
        this.lineRangeMapping = lineRangeMapping;
        this.changes = changes;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 
class $3097b8c062a0b336$export$b61f39a967a7f5e5 {
    static addRange(range, sortedRanges) {
        let i = 0;
        while(i < sortedRanges.length && sortedRanges[i].endExclusive < range.start)i++;
        let j = i;
        while(j < sortedRanges.length && sortedRanges[j].start <= range.endExclusive)j++;
        if (i === j) sortedRanges.splice(i, 0, range);
        else {
            const start = Math.min(range.start, sortedRanges[i].start);
            const end = Math.max(range.endExclusive, sortedRanges[j - 1].endExclusive);
            sortedRanges.splice(i, j - i, new $3097b8c062a0b336$export$b61f39a967a7f5e5(start, end));
        }
    }
    static tryCreate(start, endExclusive) {
        if (start > endExclusive) return undefined;
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(start, endExclusive);
    }
    static ofLength(length) {
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(0, length);
    }
    static ofStartAndLength(start, length) {
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(start, start + length);
    }
    constructor(start, endExclusive){
        this.start = start;
        this.endExclusive = endExclusive;
        if (start > endExclusive) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`Invalid range: ${this.toString()}`);
    }
    get isEmpty() {
        return this.start === this.endExclusive;
    }
    delta(offset) {
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(this.start + offset, this.endExclusive + offset);
    }
    deltaStart(offset) {
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(this.start + offset, this.endExclusive);
    }
    deltaEnd(offset) {
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(this.start, this.endExclusive + offset);
    }
    get length() {
        return this.endExclusive - this.start;
    }
    toString() {
        return `[${this.start}, ${this.endExclusive})`;
    }
    contains(offset) {
        return this.start <= offset && offset < this.endExclusive;
    }
    /**
     * for all numbers n: range1.contains(n) or range2.contains(n) => range1.join(range2).contains(n)
     * The joined range is the smallest range that contains both ranges.
     */ join(other) {
        return new $3097b8c062a0b336$export$b61f39a967a7f5e5(Math.min(this.start, other.start), Math.max(this.endExclusive, other.endExclusive));
    }
    /**
     * for all numbers n: range1.contains(n) and range2.contains(n) <=> range1.intersect(range2).contains(n)
     *
     * The resulting range is empty if the ranges do not intersect, but touch.
     * If the ranges don't even touch, the result is undefined.
     */ intersect(other) {
        const start = Math.max(this.start, other.start);
        const end = Math.min(this.endExclusive, other.endExclusive);
        if (start <= end) return new $3097b8c062a0b336$export$b61f39a967a7f5e5(start, end);
        return undefined;
    }
    intersects(other) {
        const start = Math.max(this.start, other.start);
        const end = Math.min(this.endExclusive, other.endExclusive);
        return start < end;
    }
    isBefore(other) {
        return this.endExclusive <= other.start;
    }
    isAfter(other) {
        return this.start >= other.endExclusive;
    }
    slice(arr) {
        return arr.slice(this.start, this.endExclusive);
    }
    substring(str) {
        return str.substring(this.start, this.endExclusive);
    }
    /**
     * Returns the given value if it is contained in this instance, otherwise the closest value that is contained.
     * The range must not be empty.
     */ clip(value) {
        if (this.isEmpty) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`Invalid clipping range: ${this.toString()}`);
        return Math.max(this.start, Math.min(this.endExclusive - 1, value));
    }
    /**
     * Returns `r := value + k * length` such that `r` is contained in this range.
     * The range must not be empty.
     *
     * E.g. `[5, 10).clipCyclic(10) === 5`, `[5, 10).clipCyclic(11) === 6` and `[5, 10).clipCyclic(4) === 9`.
     */ clipCyclic(value) {
        if (this.isEmpty) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`Invalid clipping range: ${this.toString()}`);
        if (value < this.start) return this.endExclusive - (this.start - value) % this.length;
        if (value >= this.endExclusive) return this.start + (value - this.start) % this.length;
        return value;
    }
    forEach(f) {
        for(let i = this.start; i < this.endExclusive; i++)f(i);
    }
}
class $3097b8c062a0b336$export$6d87eae7da4347f2 {
    constructor(){
        this._sortedRanges = [];
    }
    addRange(range) {
        let i = 0;
        while(i < this._sortedRanges.length && this._sortedRanges[i].endExclusive < range.start)i++;
        let j = i;
        while(j < this._sortedRanges.length && this._sortedRanges[j].start <= range.endExclusive)j++;
        if (i === j) this._sortedRanges.splice(i, 0, range);
        else {
            const start = Math.min(range.start, this._sortedRanges[i].start);
            const end = Math.max(range.endExclusive, this._sortedRanges[j - 1].endExclusive);
            this._sortedRanges.splice(i, j - i, new $3097b8c062a0b336$export$b61f39a967a7f5e5(start, end));
        }
    }
    toString() {
        return this._sortedRanges.map((r)=>r.toString()).join(', ');
    }
    /**
     * Returns of there is a value that is contained in this instance and the given range.
     */ intersectsStrict(other) {
        // TODO use binary search
        let i = 0;
        while(i < this._sortedRanges.length && this._sortedRanges[i].endExclusive <= other.start)i++;
        return i < this._sortedRanges.length && this._sortedRanges[i].start < other.endExclusive;
    }
    intersectWithRange(other) {
        // TODO use binary search + slice
        const result = new $3097b8c062a0b336$export$6d87eae7da4347f2();
        for (const range of this._sortedRanges){
            const intersection = range.intersect(other);
            if (intersection) result.addRange(intersection);
        }
        return result;
    }
    intersectWithRangeLength(other) {
        return this.intersectWithRange(other).length;
    }
    get length() {
        return this._sortedRanges.reduce((prev, cur)=>prev + cur.length, 0);
    }
}



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function $f5b534443e350bf3$export$296de88ccac4bedb(array, predicate) {
    const idx = $f5b534443e350bf3$export$63bef55b695c4e33(array, predicate);
    if (idx === -1) return undefined;
    return array[idx];
}
function $f5b534443e350bf3$export$63bef55b695c4e33(array, predicate, fromIndex = array.length - 1) {
    for(let i = fromIndex; i >= 0; i--){
        const element = array[i];
        if (predicate(element)) return i;
    }
    return -1;
}
function $f5b534443e350bf3$export$56750b8133ea2d31(array, predicate) {
    const idx = $f5b534443e350bf3$export$255928f2510923a3(array, predicate);
    return idx === -1 ? undefined : array[idx];
}
function $f5b534443e350bf3$export$255928f2510923a3(array, predicate, startIdx = 0, endIdxEx = array.length) {
    let i = startIdx;
    let j = endIdxEx;
    while(i < j){
        const k = Math.floor((i + j) / 2);
        if (predicate(array[k])) i = k + 1;
        else j = k;
    }
    return i - 1;
}
function $f5b534443e350bf3$export$c50ed8c1b4d46e4e(array, predicate) {
    const idx = $f5b534443e350bf3$export$a878e8cfc20d464a(array, predicate);
    return idx === array.length ? undefined : array[idx];
}
function $f5b534443e350bf3$export$a878e8cfc20d464a(array, predicate, startIdx = 0, endIdxEx = array.length) {
    let i = startIdx;
    let j = endIdxEx;
    while(i < j){
        const k = Math.floor((i + j) / 2);
        if (predicate(array[k])) j = k;
        else i = k + 1;
    }
    return i;
}
class $f5b534443e350bf3$export$1ad227ebbe41996c {
    static{
        this.assertInvariants = false;
    }
    constructor(_array){
        this._array = _array;
        this._findLastMonotonousLastIdx = 0;
    }
    /**
     * The predicate must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
     * For subsequent calls, current predicate must be weaker than (or equal to) the previous predicate, i.e. more entries must be `true`.
     */ findLastMonotonous(predicate) {
        if ($f5b534443e350bf3$export$1ad227ebbe41996c.assertInvariants) {
            if (this._prevFindLastPredicate) for (const item of this._array){
                if (this._prevFindLastPredicate(item) && !predicate(item)) throw new Error('MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.');
            }
            this._prevFindLastPredicate = predicate;
        }
        const idx = $f5b534443e350bf3$export$255928f2510923a3(this._array, predicate, this._findLastMonotonousLastIdx);
        this._findLastMonotonousLastIdx = idx + 1;
        return idx === -1 ? undefined : this._array[idx];
    }
}
function $f5b534443e350bf3$export$28b7a24d8fe644fc(array, comparator) {
    if (array.length === 0) return undefined;
    let max = array[0];
    for(let i = 1; i < array.length; i++){
        const item = array[i];
        if (comparator(item, max) > 0) max = item;
    }
    return max;
}
function $f5b534443e350bf3$export$24035c280e7212ff(array, comparator) {
    if (array.length === 0) return undefined;
    let max = array[0];
    for(let i = 1; i < array.length; i++){
        const item = array[i];
        if (comparator(item, max) >= 0) max = item;
    }
    return max;
}
function $f5b534443e350bf3$export$a33d8803e6927a52(array, comparator) {
    return $f5b534443e350bf3$export$28b7a24d8fe644fc(array, (a, b)=>-comparator(a, b));
}
function $f5b534443e350bf3$export$c4d8a93a88795e91(array, comparator) {
    if (array.length === 0) return -1;
    let maxIdx = 0;
    for(let i = 1; i < array.length; i++){
        const item = array[i];
        if (comparator(item, array[maxIdx]) > 0) maxIdx = i;
    }
    return maxIdx;
}
function $f5b534443e350bf3$export$b5240f9646a0faee(items, mapFn) {
    for (const value of items){
        const mapped = mapFn(value);
        if (mapped !== undefined) return mapped;
    }
    return undefined;
}


class $44954bcdb7a27c0a$export$939b1ec5cb8ac90d {
    static fromRangeInclusive(range) {
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(range.startLineNumber, range.endLineNumber + 1);
    }
    /**
     * @param lineRanges An array of sorted line ranges.
     */ static joinMany(lineRanges) {
        if (lineRanges.length === 0) return [];
        let result = new $44954bcdb7a27c0a$export$4eb4e534c6fc202f(lineRanges[0].slice());
        for(let i = 1; i < lineRanges.length; i++)result = result.getUnion(new $44954bcdb7a27c0a$export$4eb4e534c6fc202f(lineRanges[i].slice()));
        return result.ranges;
    }
    static join(lineRanges) {
        if (lineRanges.length === 0) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('lineRanges cannot be empty');
        let startLineNumber = lineRanges[0].startLineNumber;
        let endLineNumberExclusive = lineRanges[0].endLineNumberExclusive;
        for(let i = 1; i < lineRanges.length; i++){
            startLineNumber = Math.min(startLineNumber, lineRanges[i].startLineNumber);
            endLineNumberExclusive = Math.max(endLineNumberExclusive, lineRanges[i].endLineNumberExclusive);
        }
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(startLineNumber, endLineNumberExclusive);
    }
    static ofLength(startLineNumber, length) {
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(startLineNumber, startLineNumber + length);
    }
    /**
     * @internal
     */ static deserialize(lineRange) {
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(lineRange[0], lineRange[1]);
    }
    constructor(startLineNumber, endLineNumberExclusive){
        if (startLineNumber > endLineNumberExclusive) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`startLineNumber ${startLineNumber} cannot be after endLineNumberExclusive ${endLineNumberExclusive}`);
        this.startLineNumber = startLineNumber;
        this.endLineNumberExclusive = endLineNumberExclusive;
    }
    /**
     * Indicates if this line range contains the given line number.
     */ contains(lineNumber) {
        return this.startLineNumber <= lineNumber && lineNumber < this.endLineNumberExclusive;
    }
    /**
     * Indicates if this line range is empty.
     */ get isEmpty() {
        return this.startLineNumber === this.endLineNumberExclusive;
    }
    /**
     * Moves this line range by the given offset of line numbers.
     */ delta(offset) {
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(this.startLineNumber + offset, this.endLineNumberExclusive + offset);
    }
    deltaLength(offset) {
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(this.startLineNumber, this.endLineNumberExclusive + offset);
    }
    /**
     * The number of lines this line range spans.
     */ get length() {
        return this.endLineNumberExclusive - this.startLineNumber;
    }
    /**
     * Creates a line range that combines this and the given line range.
     */ join(other) {
        return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(Math.min(this.startLineNumber, other.startLineNumber), Math.max(this.endLineNumberExclusive, other.endLineNumberExclusive));
    }
    toString() {
        return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
    }
    /**
     * The resulting range is empty if the ranges do not intersect, but touch.
     * If the ranges don't even touch, the result is undefined.
     */ intersect(other) {
        const startLineNumber = Math.max(this.startLineNumber, other.startLineNumber);
        const endLineNumberExclusive = Math.min(this.endLineNumberExclusive, other.endLineNumberExclusive);
        if (startLineNumber <= endLineNumberExclusive) return new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(startLineNumber, endLineNumberExclusive);
        return undefined;
    }
    intersectsStrict(other) {
        return this.startLineNumber < other.endLineNumberExclusive && other.startLineNumber < this.endLineNumberExclusive;
    }
    overlapOrTouch(other) {
        return this.startLineNumber <= other.endLineNumberExclusive && other.startLineNumber <= this.endLineNumberExclusive;
    }
    equals(b) {
        return this.startLineNumber === b.startLineNumber && this.endLineNumberExclusive === b.endLineNumberExclusive;
    }
    toInclusiveRange() {
        if (this.isEmpty) return null;
        return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
    }
    /**
     * @deprecated Using this function is discouraged because it might lead to bugs: The end position is not guaranteed to be a valid position!
    */ toExclusiveRange() {
        return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
    }
    mapToLineArray(f) {
        const result = [];
        for(let lineNumber = this.startLineNumber; lineNumber < this.endLineNumberExclusive; lineNumber++)result.push(f(lineNumber));
        return result;
    }
    forEach(f) {
        for(let lineNumber = this.startLineNumber; lineNumber < this.endLineNumberExclusive; lineNumber++)f(lineNumber);
    }
    /**
     * @internal
     */ serialize() {
        return [
            this.startLineNumber,
            this.endLineNumberExclusive
        ];
    }
    includes(lineNumber) {
        return this.startLineNumber <= lineNumber && lineNumber < this.endLineNumberExclusive;
    }
    /**
     * Converts this 1-based line range to a 0-based offset range (subtracts 1!).
     * @internal
     */ toOffsetRange() {
        return new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
    }
}
class $44954bcdb7a27c0a$export$4eb4e534c6fc202f {
    constructor(/**
     * Sorted by start line number.
     * No two line ranges are touching or intersecting.
     */ _normalizedRanges = []){
        this._normalizedRanges = _normalizedRanges;
    }
    get ranges() {
        return this._normalizedRanges;
    }
    addRange(range) {
        if (range.length === 0) return;
        // Idea: Find joinRange such that:
        // replaceRange = _normalizedRanges.replaceRange(joinRange, range.joinAll(joinRange.map(idx => this._normalizedRanges[idx])))
        // idx of first element that touches range or that is after range
        const joinRangeStartIdx = (0, $f5b534443e350bf3$export$a878e8cfc20d464a)(this._normalizedRanges, (r)=>r.endLineNumberExclusive >= range.startLineNumber);
        // idx of element after { last element that touches range or that is before range }
        const joinRangeEndIdxExclusive = (0, $f5b534443e350bf3$export$255928f2510923a3)(this._normalizedRanges, (r)=>r.startLineNumber <= range.endLineNumberExclusive) + 1;
        if (joinRangeStartIdx === joinRangeEndIdxExclusive) // If there is no element that touches range, then joinRangeStartIdx === joinRangeEndIdxExclusive and that value is the index of the element after range
        this._normalizedRanges.splice(joinRangeStartIdx, 0, range);
        else if (joinRangeStartIdx === joinRangeEndIdxExclusive - 1) {
            // Else, there is an element that touches range and in this case it is both the first and last element. Thus we can replace it
            const joinRange = this._normalizedRanges[joinRangeStartIdx];
            this._normalizedRanges[joinRangeStartIdx] = joinRange.join(range);
        } else {
            // First and last element are different - we need to replace the entire range
            const joinRange = this._normalizedRanges[joinRangeStartIdx].join(this._normalizedRanges[joinRangeEndIdxExclusive - 1]).join(range);
            this._normalizedRanges.splice(joinRangeStartIdx, joinRangeEndIdxExclusive - joinRangeStartIdx, joinRange);
        }
    }
    contains(lineNumber) {
        const rangeThatStartsBeforeEnd = (0, $f5b534443e350bf3$export$56750b8133ea2d31)(this._normalizedRanges, (r)=>r.startLineNumber <= lineNumber);
        return !!rangeThatStartsBeforeEnd && rangeThatStartsBeforeEnd.endLineNumberExclusive > lineNumber;
    }
    intersects(range) {
        const rangeThatStartsBeforeEnd = (0, $f5b534443e350bf3$export$56750b8133ea2d31)(this._normalizedRanges, (r)=>r.startLineNumber < range.endLineNumberExclusive);
        return !!rangeThatStartsBeforeEnd && rangeThatStartsBeforeEnd.endLineNumberExclusive > range.startLineNumber;
    }
    getUnion(other) {
        if (this._normalizedRanges.length === 0) return other;
        if (other._normalizedRanges.length === 0) return this;
        const result = [];
        let i1 = 0;
        let i2 = 0;
        let current = null;
        while(i1 < this._normalizedRanges.length || i2 < other._normalizedRanges.length){
            let next = null;
            if (i1 < this._normalizedRanges.length && i2 < other._normalizedRanges.length) {
                const lineRange1 = this._normalizedRanges[i1];
                const lineRange2 = other._normalizedRanges[i2];
                if (lineRange1.startLineNumber < lineRange2.startLineNumber) {
                    next = lineRange1;
                    i1++;
                } else {
                    next = lineRange2;
                    i2++;
                }
            } else if (i1 < this._normalizedRanges.length) {
                next = this._normalizedRanges[i1];
                i1++;
            } else {
                next = other._normalizedRanges[i2];
                i2++;
            }
            if (current === null) current = next;
            else if (current.endLineNumberExclusive >= next.startLineNumber) // merge
            current = new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(current.startLineNumber, Math.max(current.endLineNumberExclusive, next.endLineNumberExclusive));
            else {
                // push
                result.push(current);
                current = next;
            }
        }
        if (current !== null) result.push(current);
        return new $44954bcdb7a27c0a$export$4eb4e534c6fc202f(result);
    }
    /**
     * Subtracts all ranges in this set from `range` and returns the result.
     */ subtractFrom(range) {
        // idx of first element that touches range or that is after range
        const joinRangeStartIdx = (0, $f5b534443e350bf3$export$a878e8cfc20d464a)(this._normalizedRanges, (r)=>r.endLineNumberExclusive >= range.startLineNumber);
        // idx of element after { last element that touches range or that is before range }
        const joinRangeEndIdxExclusive = (0, $f5b534443e350bf3$export$255928f2510923a3)(this._normalizedRanges, (r)=>r.startLineNumber <= range.endLineNumberExclusive) + 1;
        if (joinRangeStartIdx === joinRangeEndIdxExclusive) return new $44954bcdb7a27c0a$export$4eb4e534c6fc202f([
            range
        ]);
        const result = [];
        let startLineNumber = range.startLineNumber;
        for(let i = joinRangeStartIdx; i < joinRangeEndIdxExclusive; i++){
            const r = this._normalizedRanges[i];
            if (r.startLineNumber > startLineNumber) result.push(new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(startLineNumber, r.startLineNumber));
            startLineNumber = r.endLineNumberExclusive;
        }
        if (startLineNumber < range.endLineNumberExclusive) result.push(new $44954bcdb7a27c0a$export$939b1ec5cb8ac90d(startLineNumber, range.endLineNumberExclusive));
        return new $44954bcdb7a27c0a$export$4eb4e534c6fc202f(result);
    }
    toString() {
        return this._normalizedRanges.map((r)=>r.toString()).join(', ');
    }
    getIntersection(other) {
        const result = [];
        let i1 = 0;
        let i2 = 0;
        while(i1 < this._normalizedRanges.length && i2 < other._normalizedRanges.length){
            const r1 = this._normalizedRanges[i1];
            const r2 = other._normalizedRanges[i2];
            const i = r1.intersect(r2);
            if (i && !i.isEmpty) result.push(i);
            if (r1.endLineNumberExclusive < r2.endLineNumberExclusive) i1++;
            else i2++;
        }
        return new $44954bcdb7a27c0a$export$4eb4e534c6fc202f(result);
    }
    getWithDelta(value) {
        return new $44954bcdb7a27c0a$export$4eb4e534c6fc202f(this._normalizedRanges.map((r)=>r.delta(value)));
    }
}




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 



/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

class $b26ed88f34f13a91$export$611c5affb6036600 {
    static{
        this.zero = new $b26ed88f34f13a91$export$611c5affb6036600(0, 0);
    }
    static betweenPositions(position1, position2) {
        if (position1.lineNumber === position2.lineNumber) return new $b26ed88f34f13a91$export$611c5affb6036600(0, position2.column - position1.column);
        else return new $b26ed88f34f13a91$export$611c5affb6036600(position2.lineNumber - position1.lineNumber, position2.column - 1);
    }
    static ofRange(range) {
        return $b26ed88f34f13a91$export$611c5affb6036600.betweenPositions(range.getStartPosition(), range.getEndPosition());
    }
    static ofText(text) {
        let line = 0;
        let column = 0;
        for (const c of text)if (c === '\n') {
            line++;
            column = 0;
        } else column++;
        return new $b26ed88f34f13a91$export$611c5affb6036600(line, column);
    }
    constructor(lineCount, columnCount){
        this.lineCount = lineCount;
        this.columnCount = columnCount;
    }
    isGreaterThanOrEqualTo(other) {
        if (this.lineCount !== other.lineCount) return this.lineCount > other.lineCount;
        return this.columnCount >= other.columnCount;
    }
    createRange(startPosition) {
        if (this.lineCount === 0) return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(startPosition.lineNumber, startPosition.column, startPosition.lineNumber, startPosition.column + this.columnCount);
        else return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(startPosition.lineNumber, startPosition.column, startPosition.lineNumber + this.lineCount, this.columnCount + 1);
    }
    addToPosition(position) {
        if (this.lineCount === 0) return new (0, $52194de676ded133$export$13807d9ee5a34a42)(position.lineNumber, position.column + this.columnCount);
        else return new (0, $52194de676ded133$export$13807d9ee5a34a42)(position.lineNumber + this.lineCount, this.columnCount + 1);
    }
    toString() {
        return `${this.lineCount},${this.columnCount}`;
    }
}


class $d7d74cc93b672b4d$export$ac391fd2540a8436 {
    constructor(text){
        this.text = text;
        this.lineStartOffsetByLineIdx = [];
        this.lineStartOffsetByLineIdx.push(0);
        for(let i = 0; i < text.length; i++)if (text.charAt(i) === '\n') this.lineStartOffsetByLineIdx.push(i + 1);
    }
    getOffset(position) {
        return this.lineStartOffsetByLineIdx[position.lineNumber - 1] + position.column - 1;
    }
    getOffsetRange(range) {
        return new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(this.getOffset(range.getStartPosition()), this.getOffset(range.getEndPosition()));
    }
    get textLength() {
        const lineIdx = this.lineStartOffsetByLineIdx.length - 1;
        return new (0, $b26ed88f34f13a91$export$611c5affb6036600)(lineIdx, this.text.length - this.lineStartOffsetByLineIdx[lineIdx]);
    }
}




class $c272873a96278fd5$export$c5db55acc87904b6 {
    constructor(edits){
        this.edits = edits;
        (0, $0457b9d1b5576d87$export$471f926058ed234c)(()=>(0, $0457b9d1b5576d87$export$9c0bd4a186c34372)(edits, (a, b)=>a.range.getEndPosition().isBeforeOrEqual(b.range.getStartPosition())));
    }
    apply(text) {
        let result = '';
        let lastEditEnd = new (0, $52194de676ded133$export$13807d9ee5a34a42)(1, 1);
        for (const edit of this.edits){
            const editRange = edit.range;
            const editStart = editRange.getStartPosition();
            const editEnd = editRange.getEndPosition();
            const r = $c272873a96278fd5$var$rangeFromPositions(lastEditEnd, editStart);
            if (!r.isEmpty()) result += text.getValueOfRange(r);
            result += edit.text;
            lastEditEnd = editEnd;
        }
        const r = $c272873a96278fd5$var$rangeFromPositions(lastEditEnd, text.endPositionExclusive);
        if (!r.isEmpty()) result += text.getValueOfRange(r);
        return result;
    }
    applyToString(str) {
        const strText = new $c272873a96278fd5$export$8c8db1bcd10ec036(str);
        return this.apply(strText);
    }
    getNewRanges() {
        const newRanges = [];
        let previousEditEndLineNumber = 0;
        let lineOffset = 0;
        let columnOffset = 0;
        for (const edit of this.edits){
            const textLength = (0, $b26ed88f34f13a91$export$611c5affb6036600).ofText(edit.text);
            const newRangeStart = (0, $52194de676ded133$export$13807d9ee5a34a42).lift({
                lineNumber: edit.range.startLineNumber + lineOffset,
                column: edit.range.startColumn + (edit.range.startLineNumber === previousEditEndLineNumber ? columnOffset : 0)
            });
            const newRange = textLength.createRange(newRangeStart);
            newRanges.push(newRange);
            lineOffset = newRange.endLineNumber - edit.range.endLineNumber;
            columnOffset = newRange.endColumn - edit.range.endColumn;
            previousEditEndLineNumber = edit.range.endLineNumber;
        }
        return newRanges;
    }
}
class $c272873a96278fd5$export$3c8c90de7f16f9b6 {
    constructor(range, text){
        this.range = range;
        this.text = text;
    }
    toSingleEditOperation() {
        return {
            range: this.range,
            text: this.text
        };
    }
}
function $c272873a96278fd5$var$rangeFromPositions(start, end) {
    if (start.lineNumber === end.lineNumber && start.column === Number.MAX_SAFE_INTEGER) return (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions(end, end);
    else if (!start.isBeforeOrEqual(end)) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('start must be before end');
    return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(start.lineNumber, start.column, end.lineNumber, end.column);
}
class $c272873a96278fd5$export$daf74670712de91 {
    get endPositionExclusive() {
        return this.length.addToPosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(1, 1));
    }
}
class $c272873a96278fd5$export$8c8db1bcd10ec036 extends $c272873a96278fd5$export$daf74670712de91 {
    constructor(value){
        super();
        this.value = value;
        this._t = new (0, $d7d74cc93b672b4d$export$ac391fd2540a8436)(this.value);
    }
    getValueOfRange(range) {
        return this._t.getOffsetRange(range).substring(this.value);
    }
    get length() {
        return this._t.textLength;
    }
}


class $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df {
    static inverse(mapping, originalLineCount, modifiedLineCount) {
        const result = [];
        let lastOriginalEndLineNumber = 1;
        let lastModifiedEndLineNumber = 1;
        for (const m of mapping){
            const r = new $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(lastOriginalEndLineNumber, m.original.startLineNumber), new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(lastModifiedEndLineNumber, m.modified.startLineNumber));
            if (!r.modified.isEmpty) result.push(r);
            lastOriginalEndLineNumber = m.original.endLineNumberExclusive;
            lastModifiedEndLineNumber = m.modified.endLineNumberExclusive;
        }
        const r = new $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(lastOriginalEndLineNumber, originalLineCount + 1), new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(lastModifiedEndLineNumber, modifiedLineCount + 1));
        if (!r.modified.isEmpty) result.push(r);
        return result;
    }
    static clip(mapping, originalRange, modifiedRange) {
        const result = [];
        for (const m of mapping){
            const original = m.original.intersect(originalRange);
            const modified = m.modified.intersect(modifiedRange);
            if (original && !original.isEmpty && modified && !modified.isEmpty) result.push(new $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df(original, modified));
        }
        return result;
    }
    constructor(originalRange, modifiedRange){
        this.original = originalRange;
        this.modified = modifiedRange;
    }
    toString() {
        return `{${this.original.toString()}->${this.modified.toString()}}`;
    }
    flip() {
        return new $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df(this.modified, this.original);
    }
    join(other) {
        return new $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df(this.original.join(other.original), this.modified.join(other.modified));
    }
    /**
     * This method assumes that the LineRangeMapping describes a valid diff!
     * I.e. if one range is empty, the other range cannot be the entire document.
     * It avoids various problems when the line range points to non-existing line-numbers.
    */ toRangeMapping() {
        const origInclusiveRange = this.original.toInclusiveRange();
        const modInclusiveRange = this.modified.toInclusiveRange();
        if (origInclusiveRange && modInclusiveRange) return new $9ce0ff57ebfcdc82$export$de3a96556f42983e(origInclusiveRange, modInclusiveRange);
        else if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
            if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) // If one line range starts at 1, the other one must start at 1 as well.
            throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('not a valid diff');
            // Because one range is empty and both ranges start at line 1, none of the ranges can cover all lines.
            // Thus, `endLineNumberExclusive` is a valid line number.
            return new $9ce0ff57ebfcdc82$export$de3a96556f42983e(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
        } else // We can assume here that both startLineNumbers are greater than 1.
        return new $9ce0ff57ebfcdc82$export$de3a96556f42983e(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
    }
    /**
     * This method assumes that the LineRangeMapping describes a valid diff!
     * I.e. if one range is empty, the other range cannot be the entire document.
     * It avoids various problems when the line range points to non-existing line-numbers.
    */ toRangeMapping2(original, modified) {
        if ($9ce0ff57ebfcdc82$var$isValidLineNumber(this.original.endLineNumberExclusive, original) && $9ce0ff57ebfcdc82$var$isValidLineNumber(this.modified.endLineNumberExclusive, modified)) return new $9ce0ff57ebfcdc82$export$de3a96556f42983e(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
        if (!this.original.isEmpty && !this.modified.isEmpty) return new $9ce0ff57ebfcdc82$export$de3a96556f42983e((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.original.startLineNumber, 1), $9ce0ff57ebfcdc82$var$normalizePosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), original)), (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.modified.startLineNumber, 1), $9ce0ff57ebfcdc82$var$normalizePosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), modified)));
        if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new $9ce0ff57ebfcdc82$export$de3a96556f42983e((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions($9ce0ff57ebfcdc82$var$normalizePosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), original), $9ce0ff57ebfcdc82$var$normalizePosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), original)), (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions($9ce0ff57ebfcdc82$var$normalizePosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), modified), $9ce0ff57ebfcdc82$var$normalizePosition(new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), modified)));
        // Situation now: one range is empty and one range touches the last line and one range starts at line 1.
        // I don't think this can happen.
        throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)();
    }
}
function $9ce0ff57ebfcdc82$var$normalizePosition(position, content) {
    if (position.lineNumber < 1) return new (0, $52194de676ded133$export$13807d9ee5a34a42)(1, 1);
    if (position.lineNumber > content.length) return new (0, $52194de676ded133$export$13807d9ee5a34a42)(content.length, content[content.length - 1].length + 1);
    const line = content[position.lineNumber - 1];
    if (position.column > line.length + 1) return new (0, $52194de676ded133$export$13807d9ee5a34a42)(position.lineNumber, line.length + 1);
    return position;
}
function $9ce0ff57ebfcdc82$var$isValidLineNumber(lineNumber, lines) {
    return lineNumber >= 1 && lineNumber <= lines.length;
}
class $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3 extends $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df {
    static fromRangeMappings(rangeMappings) {
        const originalRange = (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d).join(rangeMappings.map((r)=>(0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d).fromRangeInclusive(r.originalRange)));
        const modifiedRange = (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d).join(rangeMappings.map((r)=>(0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d).fromRangeInclusive(r.modifiedRange)));
        return new $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3(originalRange, modifiedRange, rangeMappings);
    }
    constructor(originalRange, modifiedRange, innerChanges){
        super(originalRange, modifiedRange);
        this.innerChanges = innerChanges;
    }
    flip() {
        return new $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3(this.modified, this.original, this.innerChanges?.map((c)=>c.flip()));
    }
    withInnerChangesFromLineRanges() {
        return new $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3(this.original, this.modified, [
            this.toRangeMapping()
        ]);
    }
}
class $9ce0ff57ebfcdc82$export$de3a96556f42983e {
    static assertSorted(rangeMappings) {
        for(let i = 1; i < rangeMappings.length; i++){
            const previous = rangeMappings[i - 1];
            const current = rangeMappings[i];
            if (!(previous.originalRange.getEndPosition().isBeforeOrEqual(current.originalRange.getStartPosition()) && previous.modifiedRange.getEndPosition().isBeforeOrEqual(current.modifiedRange.getStartPosition()))) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('Range mappings must be sorted');
        }
    }
    constructor(originalRange, modifiedRange){
        this.originalRange = originalRange;
        this.modifiedRange = modifiedRange;
    }
    toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
    }
    flip() {
        return new $9ce0ff57ebfcdc82$export$de3a96556f42983e(this.modifiedRange, this.originalRange);
    }
    /**
     * Creates a single text edit that describes the change from the original to the modified text.
    */ toTextEdit(modified) {
        const newText = modified.getValueOfRange(this.modifiedRange);
        return new (0, $c272873a96278fd5$export$3c8c90de7f16f9b6)(this.originalRange, newText);
    }
}






const $094f97fda98ab3e7$var$MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
class $094f97fda98ab3e7$export$d36b4effd3105016 {
    computeDiff(originalLines, modifiedLines, options) {
        const diffComputer = new $094f97fda98ab3e7$export$36204afeddae8ed4(originalLines, modifiedLines, {
            maxComputationTime: options.maxComputationTimeMs,
            shouldIgnoreTrimWhitespace: options.ignoreTrimWhitespace,
            shouldComputeCharChanges: true,
            shouldMakePrettyDiff: true,
            shouldPostProcessCharChanges: true
        });
        const result = diffComputer.computeDiff();
        const changes = [];
        let lastChange = null;
        for (const c of result.changes){
            let originalRange;
            if (c.originalEndLineNumber === 0) // Insertion
            originalRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(c.originalStartLineNumber + 1, c.originalStartLineNumber + 1);
            else originalRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(c.originalStartLineNumber, c.originalEndLineNumber + 1);
            let modifiedRange;
            if (c.modifiedEndLineNumber === 0) // Deletion
            modifiedRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(c.modifiedStartLineNumber + 1, c.modifiedStartLineNumber + 1);
            else modifiedRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(c.modifiedStartLineNumber, c.modifiedEndLineNumber + 1);
            let change = new (0, $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3)(originalRange, modifiedRange, c.charChanges?.map((c)=>new (0, $9ce0ff57ebfcdc82$export$de3a96556f42983e)(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(c.originalStartLineNumber, c.originalStartColumn, c.originalEndLineNumber, c.originalEndColumn), new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(c.modifiedStartLineNumber, c.modifiedStartColumn, c.modifiedEndLineNumber, c.modifiedEndColumn))));
            if (lastChange) {
                if (lastChange.modified.endLineNumberExclusive === change.modified.startLineNumber || lastChange.original.endLineNumberExclusive === change.original.startLineNumber) {
                    // join touching diffs. Probably moving diffs up/down in the algorithm causes touching diffs.
                    change = new (0, $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3)(lastChange.original.join(change.original), lastChange.modified.join(change.modified), lastChange.innerChanges && change.innerChanges ? lastChange.innerChanges.concat(change.innerChanges) : undefined);
                    changes.pop();
                }
            }
            changes.push(change);
            lastChange = change;
        }
        (0, $0457b9d1b5576d87$export$471f926058ed234c)(()=>{
            return (0, $0457b9d1b5576d87$export$9c0bd4a186c34372)(changes, (m1, m2)=>m2.original.startLineNumber - m1.original.endLineNumberExclusive === m2.modified.startLineNumber - m1.modified.endLineNumberExclusive && // There has to be an unchanged line in between (otherwise both diffs should have been joined)
                m1.original.endLineNumberExclusive < m2.original.startLineNumber && m1.modified.endLineNumberExclusive < m2.modified.startLineNumber);
        });
        return new (0, $3453bbcb9507299f$export$6cac6ec541da4902)(changes, [], result.quitEarly);
    }
}
function $094f97fda98ab3e7$var$computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
    const diffAlgo = new (0, $1ea388bf6703bdba$export$3bc348b9a4e4a6f5)(originalSequence, modifiedSequence, continueProcessingPredicate);
    return diffAlgo.ComputeDiff(pretty);
}
class $094f97fda98ab3e7$var$LineSequence {
    constructor(lines){
        const startColumns = [];
        const endColumns = [];
        for(let i = 0, length = lines.length; i < length; i++){
            startColumns[i] = $094f97fda98ab3e7$var$getFirstNonBlankColumn(lines[i], 1);
            endColumns[i] = $094f97fda98ab3e7$var$getLastNonBlankColumn(lines[i], 1);
        }
        this.lines = lines;
        this._startColumns = startColumns;
        this._endColumns = endColumns;
    }
    getElements() {
        const elements = [];
        for(let i = 0, len = this.lines.length; i < len; i++)elements[i] = this.lines[i].substring(this._startColumns[i] - 1, this._endColumns[i] - 1);
        return elements;
    }
    getStrictElement(index) {
        return this.lines[index];
    }
    getStartLineNumber(i) {
        return i + 1;
    }
    getEndLineNumber(i) {
        return i + 1;
    }
    createCharSequence(shouldIgnoreTrimWhitespace, startIndex, endIndex) {
        const charCodes = [];
        const lineNumbers = [];
        const columns = [];
        let len = 0;
        for(let index = startIndex; index <= endIndex; index++){
            const lineContent = this.lines[index];
            const startColumn = shouldIgnoreTrimWhitespace ? this._startColumns[index] : 1;
            const endColumn = shouldIgnoreTrimWhitespace ? this._endColumns[index] : lineContent.length + 1;
            for(let col = startColumn; col < endColumn; col++){
                charCodes[len] = lineContent.charCodeAt(col - 1);
                lineNumbers[len] = index + 1;
                columns[len] = col;
                len++;
            }
            if (!shouldIgnoreTrimWhitespace && index < endIndex) {
                // Add \n if trim whitespace is not ignored
                charCodes[len] = 10 /* CharCode.LineFeed */ ;
                lineNumbers[len] = index + 1;
                columns[len] = lineContent.length + 1;
                len++;
            }
        }
        return new $094f97fda98ab3e7$var$CharSequence(charCodes, lineNumbers, columns);
    }
}
class $094f97fda98ab3e7$var$CharSequence {
    constructor(charCodes, lineNumbers, columns){
        this._charCodes = charCodes;
        this._lineNumbers = lineNumbers;
        this._columns = columns;
    }
    toString() {
        return '[' + this._charCodes.map((s, idx)=>(s === 10 /* CharCode.LineFeed */  ? '\\n' : String.fromCharCode(s)) + `-(${this._lineNumbers[idx]},${this._columns[idx]})`).join(', ') + ']';
    }
    _assertIndex(index, arr) {
        if (index < 0 || index >= arr.length) throw new Error(`Illegal index`);
    }
    getElements() {
        return this._charCodes;
    }
    getStartLineNumber(i) {
        if (i > 0 && i === this._lineNumbers.length) // the start line number of the element after the last element
        // is the end line number of the last element
        return this.getEndLineNumber(i - 1);
        this._assertIndex(i, this._lineNumbers);
        return this._lineNumbers[i];
    }
    getEndLineNumber(i) {
        if (i === -1) // the end line number of the element before the first element
        // is the start line number of the first element
        return this.getStartLineNumber(i + 1);
        this._assertIndex(i, this._lineNumbers);
        if (this._charCodes[i] === 10 /* CharCode.LineFeed */ ) return this._lineNumbers[i] + 1;
        return this._lineNumbers[i];
    }
    getStartColumn(i) {
        if (i > 0 && i === this._columns.length) // the start column of the element after the last element
        // is the end column of the last element
        return this.getEndColumn(i - 1);
        this._assertIndex(i, this._columns);
        return this._columns[i];
    }
    getEndColumn(i) {
        if (i === -1) // the end column of the element before the first element
        // is the start column of the first element
        return this.getStartColumn(i + 1);
        this._assertIndex(i, this._columns);
        if (this._charCodes[i] === 10 /* CharCode.LineFeed */ ) return 1;
        return this._columns[i] + 1;
    }
}
class $094f97fda98ab3e7$var$CharChange {
    constructor(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn){
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalStartColumn = originalStartColumn;
        this.originalEndLineNumber = originalEndLineNumber;
        this.originalEndColumn = originalEndColumn;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedStartColumn = modifiedStartColumn;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.modifiedEndColumn = modifiedEndColumn;
    }
    static createFromDiffChange(diffChange, originalCharSequence, modifiedCharSequence) {
        const originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
        const originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
        const originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        const originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
        const modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
        const modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
        const modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        const modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        return new $094f97fda98ab3e7$var$CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
    }
}
function $094f97fda98ab3e7$var$postProcessCharChanges(rawChanges) {
    if (rawChanges.length <= 1) return rawChanges;
    const result = [
        rawChanges[0]
    ];
    let prevChange = result[0];
    for(let i = 1, len = rawChanges.length; i < len; i++){
        const currChange = rawChanges[i];
        const originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
        const modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
        // Both of the above should be equal, but the continueProcessingPredicate may prevent this from being true
        const matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
        if (matchingLength < $094f97fda98ab3e7$var$MINIMUM_MATCHING_CHARACTER_LENGTH) {
            // Merge the current change into the previous one
            prevChange.originalLength = currChange.originalStart + currChange.originalLength - prevChange.originalStart;
            prevChange.modifiedLength = currChange.modifiedStart + currChange.modifiedLength - prevChange.modifiedStart;
        } else {
            // Add the current change
            result.push(currChange);
            prevChange = currChange;
        }
    }
    return result;
}
class $094f97fda98ab3e7$var$LineChange {
    constructor(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges){
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalEndLineNumber = originalEndLineNumber;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.charChanges = charChanges;
    }
    static createFromDiffResult(shouldIgnoreTrimWhitespace, diffChange, originalLineSequence, modifiedLineSequence, continueCharDiff, shouldComputeCharChanges, shouldPostProcessCharChanges) {
        let originalStartLineNumber;
        let originalEndLineNumber;
        let modifiedStartLineNumber;
        let modifiedEndLineNumber;
        let charChanges = undefined;
        if (diffChange.originalLength === 0) {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
            originalEndLineNumber = 0;
        } else {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
            originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
            modifiedEndLineNumber = 0;
        } else {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
            modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        if (shouldComputeCharChanges && diffChange.originalLength > 0 && diffChange.originalLength < 20 && diffChange.modifiedLength > 0 && diffChange.modifiedLength < 20 && continueCharDiff()) {
            // Compute character changes for diff chunks of at most 20 lines...
            const originalCharSequence = originalLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
            const modifiedCharSequence = modifiedLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
            if (originalCharSequence.getElements().length > 0 && modifiedCharSequence.getElements().length > 0) {
                let rawChanges = $094f97fda98ab3e7$var$computeDiff(originalCharSequence, modifiedCharSequence, continueCharDiff, true).changes;
                if (shouldPostProcessCharChanges) rawChanges = $094f97fda98ab3e7$var$postProcessCharChanges(rawChanges);
                charChanges = [];
                for(let i = 0, length = rawChanges.length; i < length; i++)charChanges.push($094f97fda98ab3e7$var$CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
            }
        }
        return new $094f97fda98ab3e7$var$LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
    }
}
class $094f97fda98ab3e7$export$36204afeddae8ed4 {
    constructor(originalLines, modifiedLines, opts){
        this.shouldComputeCharChanges = opts.shouldComputeCharChanges;
        this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
        this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
        this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
        this.originalLines = originalLines;
        this.modifiedLines = modifiedLines;
        this.original = new $094f97fda98ab3e7$var$LineSequence(originalLines);
        this.modified = new $094f97fda98ab3e7$var$LineSequence(modifiedLines);
        this.continueLineDiff = $094f97fda98ab3e7$var$createContinueProcessingPredicate(opts.maxComputationTime);
        this.continueCharDiff = $094f97fda98ab3e7$var$createContinueProcessingPredicate(opts.maxComputationTime === 0 ? 0 : Math.min(opts.maxComputationTime, 5000)); // never run after 5s for character changes...
    }
    computeDiff() {
        if (this.original.lines.length === 1 && this.original.lines[0].length === 0) {
            // empty original => fast path
            if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) return {
                quitEarly: false,
                changes: []
            };
            return {
                quitEarly: false,
                changes: [
                    {
                        originalStartLineNumber: 1,
                        originalEndLineNumber: 1,
                        modifiedStartLineNumber: 1,
                        modifiedEndLineNumber: this.modified.lines.length,
                        charChanges: undefined
                    }
                ]
            };
        }
        if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) // empty modified => fast path
        return {
            quitEarly: false,
            changes: [
                {
                    originalStartLineNumber: 1,
                    originalEndLineNumber: this.original.lines.length,
                    modifiedStartLineNumber: 1,
                    modifiedEndLineNumber: 1,
                    charChanges: undefined
                }
            ]
        };
        const diffResult = $094f97fda98ab3e7$var$computeDiff(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff);
        const rawChanges = diffResult.changes;
        const quitEarly = diffResult.quitEarly;
        // The diff is always computed with ignoring trim whitespace
        // This ensures we get the prettiest diff
        if (this.shouldIgnoreTrimWhitespace) {
            const lineChanges = [];
            for(let i = 0, length = rawChanges.length; i < length; i++)lineChanges.push($094f97fda98ab3e7$var$LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, rawChanges[i], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
            return {
                quitEarly: quitEarly,
                changes: lineChanges
            };
        }
        // Need to post-process and introduce changes where the trim whitespace is different
        // Note that we are looping starting at -1 to also cover the lines before the first change
        const result = [];
        let originalLineIndex = 0;
        let modifiedLineIndex = 0;
        for(let i = -1 /* !!!! */ , len = rawChanges.length; i < len; i++){
            const nextChange = i + 1 < len ? rawChanges[i + 1] : null;
            const originalStop = nextChange ? nextChange.originalStart : this.originalLines.length;
            const modifiedStop = nextChange ? nextChange.modifiedStart : this.modifiedLines.length;
            while(originalLineIndex < originalStop && modifiedLineIndex < modifiedStop){
                const originalLine = this.originalLines[originalLineIndex];
                const modifiedLine = this.modifiedLines[modifiedLineIndex];
                if (originalLine !== modifiedLine) {
                    // These lines differ only in trim whitespace
                    // Check the leading whitespace
                    {
                        let originalStartColumn = $094f97fda98ab3e7$var$getFirstNonBlankColumn(originalLine, 1);
                        let modifiedStartColumn = $094f97fda98ab3e7$var$getFirstNonBlankColumn(modifiedLine, 1);
                        while(originalStartColumn > 1 && modifiedStartColumn > 1){
                            const originalChar = originalLine.charCodeAt(originalStartColumn - 2);
                            const modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
                            if (originalChar !== modifiedChar) break;
                            originalStartColumn--;
                            modifiedStartColumn--;
                        }
                        if (originalStartColumn > 1 || modifiedStartColumn > 1) this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
                    }
                    // Check the trailing whitespace
                    {
                        let originalEndColumn = $094f97fda98ab3e7$var$getLastNonBlankColumn(originalLine, 1);
                        let modifiedEndColumn = $094f97fda98ab3e7$var$getLastNonBlankColumn(modifiedLine, 1);
                        const originalMaxColumn = originalLine.length + 1;
                        const modifiedMaxColumn = modifiedLine.length + 1;
                        while(originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn){
                            const originalChar = originalLine.charCodeAt(originalEndColumn - 1);
                            const modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
                            if (originalChar !== modifiedChar) break;
                            originalEndColumn++;
                            modifiedEndColumn++;
                        }
                        if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
                    }
                }
                originalLineIndex++;
                modifiedLineIndex++;
            }
            if (nextChange) {
                // Emit the actual change
                result.push($094f97fda98ab3e7$var$LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, nextChange, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
                originalLineIndex += nextChange.originalLength;
                modifiedLineIndex += nextChange.modifiedLength;
            }
        }
        return {
            quitEarly: quitEarly,
            changes: result
        };
    }
    _pushTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) // Merged into previous
        return;
        let charChanges = undefined;
        if (this.shouldComputeCharChanges) charChanges = [
            new $094f97fda98ab3e7$var$CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)
        ];
        result.push(new $094f97fda98ab3e7$var$LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, charChanges));
    }
    _mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        const len = result.length;
        if (len === 0) return false;
        const prevChange = result[len - 1];
        if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) // Don't merge with inserts/deletes
        return false;
        if (prevChange.originalEndLineNumber === originalLineNumber && prevChange.modifiedEndLineNumber === modifiedLineNumber) {
            if (this.shouldComputeCharChanges && prevChange.charChanges) prevChange.charChanges.push(new $094f97fda98ab3e7$var$CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
            return true;
        }
        if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
            prevChange.originalEndLineNumber = originalLineNumber;
            prevChange.modifiedEndLineNumber = modifiedLineNumber;
            if (this.shouldComputeCharChanges && prevChange.charChanges) prevChange.charChanges.push(new $094f97fda98ab3e7$var$CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
            return true;
        }
        return false;
    }
}
function $094f97fda98ab3e7$var$getFirstNonBlankColumn(txt, defaultValue) {
    const r = $88789e6252368c20$export$fa2e414c5029cd1e(txt);
    if (r === -1) return defaultValue;
    return r + 1;
}
function $094f97fda98ab3e7$var$getLastNonBlankColumn(txt, defaultValue) {
    const r = $88789e6252368c20$export$fc26fd43ab190642(txt);
    if (r === -1) return defaultValue;
    return r + 2;
}
function $094f97fda98ab3e7$var$createContinueProcessingPredicate(maximumRuntime) {
    if (maximumRuntime === 0) return ()=>true;
    const startTime = Date.now();
    return ()=>{
        return Date.now() - startTime < maximumRuntime;
    };
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default is zero).
 */ function $970e3d0cfdef18c6$export$c01875f616615628(array, n = 0) {
    return array[array.length - (1 + n)];
}
function $970e3d0cfdef18c6$export$89138bbc36459ae8(arr) {
    if (arr.length === 0) throw new Error('Invalid tail call');
    return [
        arr.slice(0, arr.length - 1),
        arr[arr.length - 1]
    ];
}
function $970e3d0cfdef18c6$export$e9bab7fafb253603(one, other, itemEquals = (a, b)=>a === b) {
    if (one === other) return true;
    if (!one || !other) return false;
    if (one.length !== other.length) return false;
    for(let i = 0, len = one.length; i < len; i++){
        if (!itemEquals(one[i], other[i])) return false;
    }
    return true;
}
function $970e3d0cfdef18c6$export$59a625ede9f67132(array, index) {
    const last = array.length - 1;
    if (index < last) array[index] = array[last];
    array.pop();
}
function $970e3d0cfdef18c6$export$2e0ae67339d5f1ac(array, key, comparator) {
    return $970e3d0cfdef18c6$export$2b190ff4a3280ffb(array.length, (i)=>comparator(array[i], key));
}
function $970e3d0cfdef18c6$export$2b190ff4a3280ffb(length, compareToKey) {
    let low = 0, high = length - 1;
    while(low <= high){
        const mid = (low + high) / 2 | 0;
        const comp = compareToKey(mid);
        if (comp < 0) low = mid + 1;
        else if (comp > 0) high = mid - 1;
        else return mid;
    }
    return -(low + 1);
}
function $970e3d0cfdef18c6$export$5b3e5f8e19a10dce(nth, data, compare) {
    nth = nth | 0;
    if (nth >= data.length) throw new TypeError('invalid index');
    const pivotValue = data[Math.floor(data.length * Math.random())];
    const lower = [];
    const higher = [];
    const pivots = [];
    for (const value of data){
        const val = compare(value, pivotValue);
        if (val < 0) lower.push(value);
        else if (val > 0) higher.push(value);
        else pivots.push(value);
    }
    if (nth < lower.length) return $970e3d0cfdef18c6$export$5b3e5f8e19a10dce(nth, lower, compare);
    else if (nth < lower.length + pivots.length) return pivots[0];
    else return $970e3d0cfdef18c6$export$5b3e5f8e19a10dce(nth - (lower.length + pivots.length), higher, compare);
}
function $970e3d0cfdef18c6$export$3f063810d7bf01bd(data, compare) {
    const result = [];
    let currentGroup = undefined;
    for (const element of data.slice(0).sort(compare))if (!currentGroup || compare(currentGroup[0], element) !== 0) {
        currentGroup = [
            element
        ];
        result.push(currentGroup);
    } else currentGroup.push(element);
    return result;
}
function* $970e3d0cfdef18c6$export$fd000893a9b1a926(items, shouldBeGrouped) {
    let currentGroup;
    let last;
    for (const item of items){
        if (last !== undefined && shouldBeGrouped(last, item)) currentGroup.push(item);
        else {
            if (currentGroup) yield currentGroup;
            currentGroup = [
                item
            ];
        }
        last = item;
    }
    if (currentGroup) yield currentGroup;
}
function $970e3d0cfdef18c6$export$7a0d73945223bd92(arr, f) {
    for(let i = 0; i <= arr.length; i++)f(i === 0 ? undefined : arr[i - 1], i === arr.length ? undefined : arr[i]);
}
function $970e3d0cfdef18c6$export$c6ccfaf96e897b7b(arr, f) {
    for(let i = 0; i < arr.length; i++)f(i === 0 ? undefined : arr[i - 1], arr[i], i + 1 === arr.length ? undefined : arr[i + 1]);
}
function $970e3d0cfdef18c6$export$6e5538615c060df7(array) {
    return array.filter((e)=>!!e);
}
function $970e3d0cfdef18c6$export$e33448dc79d404ce(array) {
    let to = 0;
    for(let i = 0; i < array.length; i++)if (!!array[i]) {
        array[to] = array[i];
        to += 1;
    }
    array.length = to;
}
function $970e3d0cfdef18c6$export$477ea510c6fc5a0f(obj) {
    return !Array.isArray(obj) || obj.length === 0;
}
function $970e3d0cfdef18c6$export$d307f5934e447d0e(obj) {
    return Array.isArray(obj) && obj.length > 0;
}
function $970e3d0cfdef18c6$export$983a3b5fb2f7202e(array, keyFn = (value)=>value) {
    const seen = new Set();
    return array.filter((element)=>{
        const key = keyFn(element);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
function $970e3d0cfdef18c6$export$e2148b83f25f439e(array, notFoundValue) {
    return array.length > 0 ? array[0] : notFoundValue;
}
function $970e3d0cfdef18c6$export$d02631cccf789723(arg, to) {
    let from = typeof to === 'number' ? arg : 0;
    if (typeof to === 'number') from = arg;
    else {
        from = 0;
        to = arg;
    }
    const result = [];
    if (from <= to) for(let i = from; i < to; i++)result.push(i);
    else for(let i = from; i > to; i--)result.push(i);
    return result;
}
function $970e3d0cfdef18c6$export$214afe3ea4014a58(target, insertIndex, insertArr) {
    const before = target.slice(0, insertIndex);
    const after = target.slice(insertIndex);
    return before.concat(insertArr, after);
}
function $970e3d0cfdef18c6$export$d764bd226a285a8d(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.unshift(value);
    }
}
function $970e3d0cfdef18c6$export$762822b6151d0acb(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.push(value);
    }
}
function $970e3d0cfdef18c6$export$9b635950ada85578(arr, items) {
    for (const item of items)arr.push(item);
}
function $970e3d0cfdef18c6$export$75093a47a9fa838d(x) {
    return Array.isArray(x) ? x : [
        x
    ];
}
function $970e3d0cfdef18c6$export$90e1d9a081d5d47b(array, start, newItems) {
    const startIdx = $970e3d0cfdef18c6$var$getActualStartIndex(array, start);
    const originalLength = array.length;
    const newItemsLength = newItems.length;
    array.length = originalLength + newItemsLength;
    // Move the items after the start index, start from the end so that we don't overwrite any value.
    for(let i = originalLength - 1; i >= startIdx; i--)array[i + newItemsLength] = array[i];
    for(let i = 0; i < newItemsLength; i++)array[i + startIdx] = newItems[i];
}
function $970e3d0cfdef18c6$export$869882364835d202(array, start, deleteCount, newItems) {
    const index = $970e3d0cfdef18c6$var$getActualStartIndex(array, start);
    let result = array.splice(index, deleteCount);
    if (result === undefined) // see https://bugs.webkit.org/show_bug.cgi?id=261140
    result = [];
    $970e3d0cfdef18c6$export$90e1d9a081d5d47b(array, index, newItems);
    return result;
}
/**
 * Determine the actual start index (same logic as the native splice() or slice())
 * If greater than the length of the array, start will be set to the length of the array. In this case, no element will be deleted but the method will behave as an adding function, adding as many element as item[n*] provided.
 * If negative, it will begin that many elements from the end of the array. (In this case, the origin -1, meaning -n is the index of the nth last element, and is therefore equivalent to the index of array.length - n.) If array.length + start is less than 0, it will begin from index 0.
 * @param array The target array.
 * @param start The operation index.
 */ function $970e3d0cfdef18c6$var$getActualStartIndex(array, start) {
    return start < 0 ? Math.max(start + array.length, 0) : Math.min(start, array.length);
}
var $970e3d0cfdef18c6$export$2bd7a107d4ad4ca4;
(function(CompareResult) {
    function isLessThan(result) {
        return result < 0;
    }
    CompareResult.isLessThan = isLessThan;
    function isLessThanOrEqual(result) {
        return result <= 0;
    }
    CompareResult.isLessThanOrEqual = isLessThanOrEqual;
    function isGreaterThan(result) {
        return result > 0;
    }
    CompareResult.isGreaterThan = isGreaterThan;
    function isNeitherLessOrGreaterThan(result) {
        return result === 0;
    }
    CompareResult.isNeitherLessOrGreaterThan = isNeitherLessOrGreaterThan;
    CompareResult.greaterThan = 1;
    CompareResult.lessThan = -1;
    CompareResult.neitherLessOrGreaterThan = 0;
})($970e3d0cfdef18c6$export$2bd7a107d4ad4ca4 || ($970e3d0cfdef18c6$export$2bd7a107d4ad4ca4 = {}));
function $970e3d0cfdef18c6$export$53e1d82c551f6242(selector, comparator) {
    return (a, b)=>comparator(selector(a), selector(b));
}
function $970e3d0cfdef18c6$export$b7655d72c920d4b9(...comparators) {
    return (item1, item2)=>{
        for (const comparator of comparators){
            const result = comparator(item1, item2);
            if (!$970e3d0cfdef18c6$export$2bd7a107d4ad4ca4.isNeitherLessOrGreaterThan(result)) return result;
        }
        return $970e3d0cfdef18c6$export$2bd7a107d4ad4ca4.neitherLessOrGreaterThan;
    };
}
const $970e3d0cfdef18c6$export$a990c01b949a832a = (a, b)=>a - b;
const $970e3d0cfdef18c6$export$965ad78554bb00b5 = (a, b)=>$970e3d0cfdef18c6$export$a990c01b949a832a(a ? 1 : 0, b ? 1 : 0);
function $970e3d0cfdef18c6$export$aaf9000ec50ecda3(comparator) {
    return (a, b)=>-comparator(a, b);
}
class $970e3d0cfdef18c6$export$be3a9a0612b96373 {
    /**
     * Constructs a queue that is backed by the given array. Runtime is O(1).
    */ constructor(items){
        this.items = items;
        this.firstIdx = 0;
        this.lastIdx = this.items.length - 1;
    }
    get length() {
        return this.lastIdx - this.firstIdx + 1;
    }
    /**
     * Consumes elements from the beginning of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned. Has a runtime of O(result.length).
    */ takeWhile(predicate) {
        // P(k) := k <= this.lastIdx && predicate(this.items[k])
        // Find s := min { k | k >= this.firstIdx && !P(k) } and return this.data[this.firstIdx...s)
        let startIdx = this.firstIdx;
        while(startIdx < this.items.length && predicate(this.items[startIdx]))startIdx++;
        const result = startIdx === this.firstIdx ? null : this.items.slice(this.firstIdx, startIdx);
        this.firstIdx = startIdx;
        return result;
    }
    /**
     * Consumes elements from the end of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned.
     * The result has the same order as the underlying array!
    */ takeFromEndWhile(predicate) {
        // P(k) := this.firstIdx >= k && predicate(this.items[k])
        // Find s := max { k | k <= this.lastIdx && !P(k) } and return this.data(s...this.lastIdx]
        let endIdx = this.lastIdx;
        while(endIdx >= 0 && predicate(this.items[endIdx]))endIdx--;
        const result = endIdx === this.lastIdx ? null : this.items.slice(endIdx + 1, this.lastIdx + 1);
        this.lastIdx = endIdx;
        return result;
    }
    peek() {
        if (this.length === 0) return undefined;
        return this.items[this.firstIdx];
    }
    dequeue() {
        const result = this.items[this.firstIdx];
        this.firstIdx++;
        return result;
    }
    takeCount(count) {
        const result = this.items.slice(this.firstIdx, this.firstIdx + count);
        this.firstIdx += count;
        return result;
    }
}
class $970e3d0cfdef18c6$export$beb1761606559d43 {
    static{
        this.empty = new $970e3d0cfdef18c6$export$beb1761606559d43((_callback)=>{});
    }
    constructor(/**
     * Calls the callback for every item.
     * Stops when the callback returns false.
    */ iterate){
        this.iterate = iterate;
    }
    toArray() {
        const result = [];
        this.iterate((item)=>{
            result.push(item);
            return true;
        });
        return result;
    }
    filter(predicate) {
        return new $970e3d0cfdef18c6$export$beb1761606559d43((cb)=>this.iterate((item)=>predicate(item) ? cb(item) : true));
    }
    map(mapFn) {
        return new $970e3d0cfdef18c6$export$beb1761606559d43((cb)=>this.iterate((item)=>cb(mapFn(item))));
    }
    findLast(predicate) {
        let result;
        this.iterate((item)=>{
            if (predicate(item)) result = item;
            return true;
        });
        return result;
    }
    findLastMaxBy(comparator) {
        let result;
        let first = true;
        this.iterate((item)=>{
            if (first || $970e3d0cfdef18c6$export$2bd7a107d4ad4ca4.isGreaterThan(comparator(item, result))) {
                first = false;
                result = item;
            }
            return true;
        });
        return result;
    }
}
class $970e3d0cfdef18c6$export$e149aee3cdae3b91 {
    constructor(_indexMap){
        this._indexMap = _indexMap;
    }
    /**
     * Returns a permutation that sorts the given array according to the given compare function.
     */ static createSortPermutation(arr, compareFn) {
        const sortIndices = Array.from(arr.keys()).sort((index1, index2)=>compareFn(arr[index1], arr[index2]));
        return new $970e3d0cfdef18c6$export$e149aee3cdae3b91(sortIndices);
    }
    /**
     * Returns a new array with the elements of the given array re-arranged according to this permutation.
     */ apply(arr) {
        return arr.map((_, index)=>arr[this._indexMap[index]]);
    }
    /**
     * Returns a new permutation that undoes the re-arrangement of this permutation.
    */ inverse() {
        const inverseIndexMap = this._indexMap.slice();
        for(let i = 0; i < this._indexMap.length; i++)inverseIndexMap[this._indexMap[i]] = i;
        return new $970e3d0cfdef18c6$export$e149aee3cdae3b91(inverseIndexMap);
    }
}






/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 


class $724d63bba95b0094$export$5a9eeb5fc52ca50b {
    static trivial(seq1, seq2) {
        return new $724d63bba95b0094$export$5a9eeb5fc52ca50b([
            new $724d63bba95b0094$export$68279245b876ef87((0, $3097b8c062a0b336$export$b61f39a967a7f5e5).ofLength(seq1.length), (0, $3097b8c062a0b336$export$b61f39a967a7f5e5).ofLength(seq2.length))
        ], false);
    }
    static trivialTimedOut(seq1, seq2) {
        return new $724d63bba95b0094$export$5a9eeb5fc52ca50b([
            new $724d63bba95b0094$export$68279245b876ef87((0, $3097b8c062a0b336$export$b61f39a967a7f5e5).ofLength(seq1.length), (0, $3097b8c062a0b336$export$b61f39a967a7f5e5).ofLength(seq2.length))
        ], true);
    }
    constructor(diffs, /**
     * Indicates if the time out was reached.
     * In that case, the diffs might be an approximation and the user should be asked to rerun the diff with more time.
     */ hitTimeout){
        this.diffs = diffs;
        this.hitTimeout = hitTimeout;
    }
}
class $724d63bba95b0094$export$68279245b876ef87 {
    static invert(sequenceDiffs, doc1Length) {
        const result = [];
        (0, $970e3d0cfdef18c6$export$7a0d73945223bd92)(sequenceDiffs, (a, b)=>{
            result.push($724d63bba95b0094$export$68279245b876ef87.fromOffsetPairs(a ? a.getEndExclusives() : $724d63bba95b0094$export$a44f631cf845c9c6.zero, b ? b.getStarts() : new $724d63bba95b0094$export$a44f631cf845c9c6(doc1Length, (a ? a.seq2Range.endExclusive - a.seq1Range.endExclusive : 0) + doc1Length)));
        });
        return result;
    }
    static fromOffsetPairs(start, endExclusive) {
        return new $724d63bba95b0094$export$68279245b876ef87(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(start.offset1, endExclusive.offset1), new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(start.offset2, endExclusive.offset2));
    }
    static assertSorted(sequenceDiffs) {
        let last = undefined;
        for (const cur of sequenceDiffs){
            if (last) {
                if (!(last.seq1Range.endExclusive <= cur.seq1Range.start && last.seq2Range.endExclusive <= cur.seq2Range.start)) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('Sequence diffs must be sorted');
            }
            last = cur;
        }
    }
    constructor(seq1Range, seq2Range){
        this.seq1Range = seq1Range;
        this.seq2Range = seq2Range;
    }
    swap() {
        return new $724d63bba95b0094$export$68279245b876ef87(this.seq2Range, this.seq1Range);
    }
    toString() {
        return `${this.seq1Range} <-> ${this.seq2Range}`;
    }
    join(other) {
        return new $724d63bba95b0094$export$68279245b876ef87(this.seq1Range.join(other.seq1Range), this.seq2Range.join(other.seq2Range));
    }
    delta(offset) {
        if (offset === 0) return this;
        return new $724d63bba95b0094$export$68279245b876ef87(this.seq1Range.delta(offset), this.seq2Range.delta(offset));
    }
    deltaStart(offset) {
        if (offset === 0) return this;
        return new $724d63bba95b0094$export$68279245b876ef87(this.seq1Range.deltaStart(offset), this.seq2Range.deltaStart(offset));
    }
    deltaEnd(offset) {
        if (offset === 0) return this;
        return new $724d63bba95b0094$export$68279245b876ef87(this.seq1Range.deltaEnd(offset), this.seq2Range.deltaEnd(offset));
    }
    intersect(other) {
        const i1 = this.seq1Range.intersect(other.seq1Range);
        const i2 = this.seq2Range.intersect(other.seq2Range);
        if (!i1 || !i2) return undefined;
        return new $724d63bba95b0094$export$68279245b876ef87(i1, i2);
    }
    getStarts() {
        return new $724d63bba95b0094$export$a44f631cf845c9c6(this.seq1Range.start, this.seq2Range.start);
    }
    getEndExclusives() {
        return new $724d63bba95b0094$export$a44f631cf845c9c6(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
    }
}
class $724d63bba95b0094$export$a44f631cf845c9c6 {
    static{
        this.zero = new $724d63bba95b0094$export$a44f631cf845c9c6(0, 0);
    }
    static{
        this.max = new $724d63bba95b0094$export$a44f631cf845c9c6(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    }
    constructor(offset1, offset2){
        this.offset1 = offset1;
        this.offset2 = offset2;
    }
    toString() {
        return `${this.offset1} <-> ${this.offset2}`;
    }
    delta(offset) {
        if (offset === 0) return this;
        return new $724d63bba95b0094$export$a44f631cf845c9c6(this.offset1 + offset, this.offset2 + offset);
    }
    equals(other) {
        return this.offset1 === other.offset1 && this.offset2 === other.offset2;
    }
}
class $724d63bba95b0094$export$afef188e3939b274 {
    static{
        this.instance = new $724d63bba95b0094$export$afef188e3939b274();
    }
    isValid() {
        return true;
    }
}
class $724d63bba95b0094$export$11431054471ec5b {
    constructor(timeout){
        this.timeout = timeout;
        this.startTime = Date.now();
        this.valid = true;
        if (timeout <= 0) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)('timeout must be positive');
    }
    // Recommendation: Set a log-point `{this.disable()}` in the body
    isValid() {
        const valid = Date.now() - this.startTime < this.timeout;
        if (!valid && this.valid) {
            this.valid = false; // timeout reached
            // eslint-disable-next-line no-debugger
            debugger; // WARNING: Most likely debugging caused the timeout. Call `this.disable()` to continue without timing out.
        }
        return this.valid;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $94952126a2800a51$export$422d21c3f9c5afdf {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.array = [];
        this.array = new Array(width * height);
    }
    get(x, y) {
        return this.array[x + y * this.width];
    }
    set(x, y, value) {
        this.array[x + y * this.width] = value;
    }
}
function $94952126a2800a51$export$1d5ccafae59b4926(charCode) {
    return charCode === 32 /* CharCode.Space */  || charCode === 9 /* CharCode.Tab */ ;
}
class $94952126a2800a51$export$efb978917a95c4ca {
    static{
        this.chrKeys = new Map();
    }
    static getKey(chr) {
        let key = this.chrKeys.get(chr);
        if (key === undefined) {
            key = this.chrKeys.size;
            this.chrKeys.set(chr, key);
        }
        return key;
    }
    constructor(range, lines, source){
        this.range = range;
        this.lines = lines;
        this.source = source;
        this.histogram = [];
        let counter = 0;
        for(let i = range.startLineNumber - 1; i < range.endLineNumberExclusive - 1; i++){
            const line = lines[i];
            for(let j = 0; j < line.length; j++){
                counter++;
                const chr = line[j];
                const key = $94952126a2800a51$export$efb978917a95c4ca.getKey(chr);
                this.histogram[key] = (this.histogram[key] || 0) + 1;
            }
            counter++;
            const key = $94952126a2800a51$export$efb978917a95c4ca.getKey('\n');
            this.histogram[key] = (this.histogram[key] || 0) + 1;
        }
        this.totalCount = counter;
    }
    computeSimilarity(other) {
        let sumDifferences = 0;
        const maxLength = Math.max(this.histogram.length, other.histogram.length);
        for(let i = 0; i < maxLength; i++)sumDifferences += Math.abs((this.histogram[i] ?? 0) - (other.histogram[i] ?? 0));
        return 1 - sumDifferences / (this.totalCount + other.totalCount);
    }
}


class $65eb0b6e3d19742d$export$eac8ba44e2c19509 {
    compute(sequence1, sequence2, timeout = (0, $724d63bba95b0094$export$afef188e3939b274).instance, equalityScore) {
        if (sequence1.length === 0 || sequence2.length === 0) return (0, $724d63bba95b0094$export$5a9eeb5fc52ca50b).trivial(sequence1, sequence2);
        /**
         * lcsLengths.get(i, j): Length of the longest common subsequence of sequence1.substring(0, i + 1) and sequence2.substring(0, j + 1).
         */ const lcsLengths = new (0, $94952126a2800a51$export$422d21c3f9c5afdf)(sequence1.length, sequence2.length);
        const directions = new (0, $94952126a2800a51$export$422d21c3f9c5afdf)(sequence1.length, sequence2.length);
        const lengths = new (0, $94952126a2800a51$export$422d21c3f9c5afdf)(sequence1.length, sequence2.length);
        // ==== Initializing lcsLengths ====
        for(let s1 = 0; s1 < sequence1.length; s1++)for(let s2 = 0; s2 < sequence2.length; s2++){
            if (!timeout.isValid()) return (0, $724d63bba95b0094$export$5a9eeb5fc52ca50b).trivialTimedOut(sequence1, sequence2);
            const horizontalLen = s1 === 0 ? 0 : lcsLengths.get(s1 - 1, s2);
            const verticalLen = s2 === 0 ? 0 : lcsLengths.get(s1, s2 - 1);
            let extendedSeqScore;
            if (sequence1.getElement(s1) === sequence2.getElement(s2)) {
                if (s1 === 0 || s2 === 0) extendedSeqScore = 0;
                else extendedSeqScore = lcsLengths.get(s1 - 1, s2 - 1);
                if (s1 > 0 && s2 > 0 && directions.get(s1 - 1, s2 - 1) === 3) // Prefer consecutive diagonals
                extendedSeqScore += lengths.get(s1 - 1, s2 - 1);
                extendedSeqScore += equalityScore ? equalityScore(s1, s2) : 1;
            } else extendedSeqScore = -1;
            const newValue = Math.max(horizontalLen, verticalLen, extendedSeqScore);
            if (newValue === extendedSeqScore) {
                // Prefer diagonals
                const prevLen = s1 > 0 && s2 > 0 ? lengths.get(s1 - 1, s2 - 1) : 0;
                lengths.set(s1, s2, prevLen + 1);
                directions.set(s1, s2, 3);
            } else if (newValue === horizontalLen) {
                lengths.set(s1, s2, 0);
                directions.set(s1, s2, 1);
            } else if (newValue === verticalLen) {
                lengths.set(s1, s2, 0);
                directions.set(s1, s2, 2);
            }
            lcsLengths.set(s1, s2, newValue);
        }
        // ==== Backtracking ====
        const result = [];
        let lastAligningPosS1 = sequence1.length;
        let lastAligningPosS2 = sequence2.length;
        function reportDecreasingAligningPositions(s1, s2) {
            if (s1 + 1 !== lastAligningPosS1 || s2 + 1 !== lastAligningPosS2) result.push(new (0, $724d63bba95b0094$export$68279245b876ef87)(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(s1 + 1, lastAligningPosS1), new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(s2 + 1, lastAligningPosS2)));
            lastAligningPosS1 = s1;
            lastAligningPosS2 = s2;
        }
        let s1 = sequence1.length - 1;
        let s2 = sequence2.length - 1;
        while(s1 >= 0 && s2 >= 0){
            if (directions.get(s1, s2) === 3) {
                reportDecreasingAligningPositions(s1, s2);
                s1--;
                s2--;
            } else if (directions.get(s1, s2) === 1) s1--;
            else s2--;
        }
        reportDecreasingAligningPositions(-1, -1);
        result.reverse();
        return new (0, $724d63bba95b0094$export$5a9eeb5fc52ca50b)(result, false);
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

class $205a0021c4e8e603$export$60e9a69d9b3ba91c {
    compute(seq1, seq2, timeout = (0, $724d63bba95b0094$export$afef188e3939b274).instance) {
        // These are common special cases.
        // The early return improves performance dramatically.
        if (seq1.length === 0 || seq2.length === 0) return (0, $724d63bba95b0094$export$5a9eeb5fc52ca50b).trivial(seq1, seq2);
        const seqX = seq1; // Text on the x axis
        const seqY = seq2; // Text on the y axis
        function getXAfterSnake(x, y) {
            while(x < seqX.length && y < seqY.length && seqX.getElement(x) === seqY.getElement(y)){
                x++;
                y++;
            }
            return x;
        }
        let d = 0;
        // V[k]: X value of longest d-line that ends in diagonal k.
        // d-line: path from (0,0) to (x,y) that uses exactly d non-diagonals.
        // diagonal k: Set of points (x,y) with x-y = k.
        // k=1 -> (1,0),(2,1)
        const V = new $205a0021c4e8e603$var$FastInt32Array();
        V.set(0, getXAfterSnake(0, 0));
        const paths = new $205a0021c4e8e603$var$FastArrayNegativeIndices();
        paths.set(0, V.get(0) === 0 ? null : new $205a0021c4e8e603$var$SnakePath(null, 0, 0, V.get(0)));
        let k = 0;
        loop: while(true){
            d++;
            if (!timeout.isValid()) return (0, $724d63bba95b0094$export$5a9eeb5fc52ca50b).trivialTimedOut(seqX, seqY);
            // The paper has `for (k = -d; k <= d; k += 2)`, but we can ignore diagonals that cannot influence the result.
            const lowerBound = -Math.min(d, seqY.length + d % 2);
            const upperBound = Math.min(d, seqX.length + d % 2);
            for(k = lowerBound; k <= upperBound; k += 2){
                let step = 0;
                // We can use the X values of (d-1)-lines to compute X value of the longest d-lines.
                const maxXofDLineTop = k === upperBound ? -1 : V.get(k + 1); // We take a vertical non-diagonal (add a symbol in seqX)
                const maxXofDLineLeft = k === lowerBound ? -1 : V.get(k - 1) + 1; // We take a horizontal non-diagonal (+1 x) (delete a symbol in seqX)
                step++;
                const x = Math.min(Math.max(maxXofDLineTop, maxXofDLineLeft), seqX.length);
                const y = x - k;
                step++;
                if (x > seqX.length || y > seqY.length) continue;
                const newMaxX = getXAfterSnake(x, y);
                V.set(k, newMaxX);
                const lastPath = x === maxXofDLineTop ? paths.get(k + 1) : paths.get(k - 1);
                paths.set(k, newMaxX !== x ? new $205a0021c4e8e603$var$SnakePath(lastPath, x, y, newMaxX - x) : lastPath);
                if (V.get(k) === seqX.length && V.get(k) - k === seqY.length) break loop;
            }
        }
        let path = paths.get(k);
        const result = [];
        let lastAligningPosS1 = seqX.length;
        let lastAligningPosS2 = seqY.length;
        while(true){
            const endX = path ? path.x + path.length : 0;
            const endY = path ? path.y + path.length : 0;
            if (endX !== lastAligningPosS1 || endY !== lastAligningPosS2) result.push(new (0, $724d63bba95b0094$export$68279245b876ef87)(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(endX, lastAligningPosS1), new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(endY, lastAligningPosS2)));
            if (!path) break;
            lastAligningPosS1 = path.x;
            lastAligningPosS2 = path.y;
            path = path.prev;
        }
        result.reverse();
        return new (0, $724d63bba95b0094$export$5a9eeb5fc52ca50b)(result, false);
    }
}
class $205a0021c4e8e603$var$SnakePath {
    constructor(prev, x, y, length){
        this.prev = prev;
        this.x = x;
        this.y = y;
        this.length = length;
    }
}
/**
 * An array that supports fast negative indices.
*/ class $205a0021c4e8e603$var$FastInt32Array {
    constructor(){
        this.positiveArr = new Int32Array(10);
        this.negativeArr = new Int32Array(10);
    }
    get(idx) {
        if (idx < 0) {
            idx = -idx - 1;
            return this.negativeArr[idx];
        } else return this.positiveArr[idx];
    }
    set(idx, value) {
        if (idx < 0) {
            idx = -idx - 1;
            if (idx >= this.negativeArr.length) {
                const arr = this.negativeArr;
                this.negativeArr = new Int32Array(arr.length * 2);
                this.negativeArr.set(arr);
            }
            this.negativeArr[idx] = value;
        } else {
            if (idx >= this.positiveArr.length) {
                const arr = this.positiveArr;
                this.positiveArr = new Int32Array(arr.length * 2);
                this.positiveArr.set(arr);
            }
            this.positiveArr[idx] = value;
        }
    }
}
/**
 * An array that supports fast negative indices.
*/ class $205a0021c4e8e603$var$FastArrayNegativeIndices {
    constructor(){
        this.positiveArr = [];
        this.negativeArr = [];
    }
    get(idx) {
        if (idx < 0) {
            idx = -idx - 1;
            return this.negativeArr[idx];
        } else return this.positiveArr[idx];
    }
    set(idx, value) {
        if (idx < 0) {
            idx = -idx - 1;
            this.negativeArr[idx] = value;
        } else this.positiveArr[idx] = value;
    }
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 





/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 




class $f9a611cf4a5a841f$export$aa004d33ce08fcf6 {
    constructor(lines, range, considerWhitespaceChanges){
        this.lines = lines;
        this.range = range;
        this.considerWhitespaceChanges = considerWhitespaceChanges;
        this.elements = [];
        this.firstElementOffsetByLineIdx = [];
        this.lineStartOffsets = [];
        this.trimmedWsLengthsByLineIdx = [];
        this.firstElementOffsetByLineIdx.push(0);
        for(let lineNumber = this.range.startLineNumber; lineNumber <= this.range.endLineNumber; lineNumber++){
            let line = lines[lineNumber - 1];
            let lineStartOffset = 0;
            if (lineNumber === this.range.startLineNumber && this.range.startColumn > 1) {
                lineStartOffset = this.range.startColumn - 1;
                line = line.substring(lineStartOffset);
            }
            this.lineStartOffsets.push(lineStartOffset);
            let trimmedWsLength = 0;
            if (!considerWhitespaceChanges) {
                const trimmedStartLine = line.trimStart();
                trimmedWsLength = line.length - trimmedStartLine.length;
                line = trimmedStartLine.trimEnd();
            }
            this.trimmedWsLengthsByLineIdx.push(trimmedWsLength);
            const lineLength = lineNumber === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - lineStartOffset - trimmedWsLength, line.length) : line.length;
            for(let i = 0; i < lineLength; i++)this.elements.push(line.charCodeAt(i));
            if (lineNumber < this.range.endLineNumber) {
                this.elements.push('\n'.charCodeAt(0));
                this.firstElementOffsetByLineIdx.push(this.elements.length);
            }
        }
    }
    toString() {
        return `Slice: "${this.text}"`;
    }
    get text() {
        return this.getText(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(0, this.length));
    }
    getText(range) {
        return this.elements.slice(range.start, range.endExclusive).map((e)=>String.fromCharCode(e)).join('');
    }
    getElement(offset) {
        return this.elements[offset];
    }
    get length() {
        return this.elements.length;
    }
    getBoundaryScore(length) {
        //   a   b   c   ,           d   e   f
        // 11  0   0   12  15  6   13  0   0   11
        const prevCategory = $f9a611cf4a5a841f$var$getCategory(length > 0 ? this.elements[length - 1] : -1);
        const nextCategory = $f9a611cf4a5a841f$var$getCategory(length < this.elements.length ? this.elements[length] : -1);
        if (prevCategory === 7 /* CharBoundaryCategory.LineBreakCR */  && nextCategory === 8 /* CharBoundaryCategory.LineBreakLF */ ) // don't break between \r and \n
        return 0;
        if (prevCategory === 8 /* CharBoundaryCategory.LineBreakLF */ ) // prefer the linebreak before the change
        return 150;
        let score = 0;
        if (prevCategory !== nextCategory) {
            score += 10;
            if (prevCategory === 0 /* CharBoundaryCategory.WordLower */  && nextCategory === 1 /* CharBoundaryCategory.WordUpper */ ) score += 1;
        }
        score += $f9a611cf4a5a841f$var$getCategoryBoundaryScore(prevCategory);
        score += $f9a611cf4a5a841f$var$getCategoryBoundaryScore(nextCategory);
        return score;
    }
    translateOffset(offset, preference = 'right') {
        // find smallest i, so that lineBreakOffsets[i] <= offset using binary search
        const i = (0, $f5b534443e350bf3$export$255928f2510923a3)(this.firstElementOffsetByLineIdx, (value)=>value <= offset);
        const lineOffset = offset - this.firstElementOffsetByLineIdx[i];
        return new (0, $52194de676ded133$export$13807d9ee5a34a42)(this.range.startLineNumber + i, 1 + this.lineStartOffsets[i] + lineOffset + (lineOffset === 0 && preference === 'left' ? 0 : this.trimmedWsLengthsByLineIdx[i]));
    }
    translateRange(range) {
        const pos1 = this.translateOffset(range.start, 'right');
        const pos2 = this.translateOffset(range.endExclusive, 'left');
        if (pos2.isBefore(pos1)) return (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions(pos2, pos2);
        return (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions(pos1, pos2);
    }
    /**
     * Finds the word that contains the character at the given offset
     */ findWordContaining(offset) {
        if (offset < 0 || offset >= this.elements.length) return undefined;
        if (!$f9a611cf4a5a841f$var$isWordChar(this.elements[offset])) return undefined;
        // find start
        let start = offset;
        while(start > 0 && $f9a611cf4a5a841f$var$isWordChar(this.elements[start - 1]))start--;
        // find end
        let end = offset;
        while(end < this.elements.length && $f9a611cf4a5a841f$var$isWordChar(this.elements[end]))end++;
        return new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(start, end);
    }
    countLinesIn(range) {
        return this.translateOffset(range.endExclusive).lineNumber - this.translateOffset(range.start).lineNumber;
    }
    isStronglyEqual(offset1, offset2) {
        return this.elements[offset1] === this.elements[offset2];
    }
    extendToFullLines(range) {
        const start = (0, $f5b534443e350bf3$export$56750b8133ea2d31)(this.firstElementOffsetByLineIdx, (x)=>x <= range.start) ?? 0;
        const end = (0, $f5b534443e350bf3$export$c50ed8c1b4d46e4e)(this.firstElementOffsetByLineIdx, (x)=>range.endExclusive <= x) ?? this.elements.length;
        return new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(start, end);
    }
}
function $f9a611cf4a5a841f$var$isWordChar(charCode) {
    return charCode >= 97 /* CharCode.a */  && charCode <= 122 /* CharCode.z */  || charCode >= 65 /* CharCode.A */  && charCode <= 90 /* CharCode.Z */  || charCode >= 48 /* CharCode.Digit0 */  && charCode <= 57 /* CharCode.Digit9 */ ;
}
const $f9a611cf4a5a841f$var$score = {
    [0 /* CharBoundaryCategory.WordLower */ ]: 0,
    [1 /* CharBoundaryCategory.WordUpper */ ]: 0,
    [2 /* CharBoundaryCategory.WordNumber */ ]: 0,
    [3 /* CharBoundaryCategory.End */ ]: 10,
    [4 /* CharBoundaryCategory.Other */ ]: 2,
    [5 /* CharBoundaryCategory.Separator */ ]: 30,
    [6 /* CharBoundaryCategory.Space */ ]: 3,
    [7 /* CharBoundaryCategory.LineBreakCR */ ]: 10,
    [8 /* CharBoundaryCategory.LineBreakLF */ ]: 10
};
function $f9a611cf4a5a841f$var$getCategoryBoundaryScore(category) {
    return $f9a611cf4a5a841f$var$score[category];
}
function $f9a611cf4a5a841f$var$getCategory(charCode) {
    if (charCode === 10 /* CharCode.LineFeed */ ) return 8 /* CharBoundaryCategory.LineBreakLF */ ;
    else if (charCode === 13 /* CharCode.CarriageReturn */ ) return 7 /* CharBoundaryCategory.LineBreakCR */ ;
    else if ((0, $94952126a2800a51$export$1d5ccafae59b4926)(charCode)) return 6 /* CharBoundaryCategory.Space */ ;
    else if (charCode >= 97 /* CharCode.a */  && charCode <= 122 /* CharCode.z */ ) return 0 /* CharBoundaryCategory.WordLower */ ;
    else if (charCode >= 65 /* CharCode.A */  && charCode <= 90 /* CharCode.Z */ ) return 1 /* CharBoundaryCategory.WordUpper */ ;
    else if (charCode >= 48 /* CharCode.Digit0 */  && charCode <= 57 /* CharCode.Digit9 */ ) return 2 /* CharBoundaryCategory.WordNumber */ ;
    else if (charCode === -1) return 3 /* CharBoundaryCategory.End */ ;
    else if (charCode === 44 /* CharCode.Comma */  || charCode === 59 /* CharCode.Semicolon */ ) return 5 /* CharBoundaryCategory.Separator */ ;
    else return 4 /* CharBoundaryCategory.Other */ ;
}





function $10d564b108177138$export$3a81ccd887c4901a(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout) {
    let { moves: moves, excludedChanges: excludedChanges } = $10d564b108177138$var$computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout);
    if (!timeout.isValid()) return [];
    const filteredChanges = changes.filter((c)=>!excludedChanges.has(c));
    const unchangedMoves = $10d564b108177138$var$computeUnchangedMoves(filteredChanges, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout);
    (0, $970e3d0cfdef18c6$export$9b635950ada85578)(moves, unchangedMoves);
    moves = $10d564b108177138$var$joinCloseConsecutiveMoves(moves);
    // Ignore too short moves
    moves = moves.filter((current)=>{
        const lines = current.original.toOffsetRange().slice(originalLines).map((l)=>l.trim());
        const originalText = lines.join('\n');
        return originalText.length >= 15 && $10d564b108177138$var$countWhere(lines, (l)=>l.length >= 2) >= 2;
    });
    moves = $10d564b108177138$var$removeMovesInSameDiff(changes, moves);
    return moves;
}
function $10d564b108177138$var$countWhere(arr, predicate) {
    let count = 0;
    for (const t of arr)if (predicate(t)) count++;
    return count;
}
function $10d564b108177138$var$computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout) {
    const moves = [];
    const deletions = changes.filter((c)=>c.modified.isEmpty && c.original.length >= 3).map((d)=>new (0, $94952126a2800a51$export$efb978917a95c4ca)(d.original, originalLines, d));
    const insertions = new Set(changes.filter((c)=>c.original.isEmpty && c.modified.length >= 3).map((d)=>new (0, $94952126a2800a51$export$efb978917a95c4ca)(d.modified, modifiedLines, d)));
    const excludedChanges = new Set();
    for (const deletion of deletions){
        let highestSimilarity = -1;
        let best;
        for (const insertion of insertions){
            const similarity = deletion.computeSimilarity(insertion);
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                best = insertion;
            }
        }
        if (highestSimilarity > 0.90 && best) {
            insertions.delete(best);
            moves.push(new (0, $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df)(deletion.range, best.range));
            excludedChanges.add(deletion.source);
            excludedChanges.add(best.source);
        }
        if (!timeout.isValid()) return {
            moves: moves,
            excludedChanges: excludedChanges
        };
    }
    return {
        moves: moves,
        excludedChanges: excludedChanges
    };
}
function $10d564b108177138$var$computeUnchangedMoves(changes, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout) {
    const moves = [];
    const original3LineHashes = new (0, $b2f5c59fe68166f5$export$b4de80a1ffeb076c)();
    for (const change of changes)for(let i = change.original.startLineNumber; i < change.original.endLineNumberExclusive - 2; i++){
        const key = `${hashedOriginalLines[i - 1]}:${hashedOriginalLines[i + 1 - 1]}:${hashedOriginalLines[i + 2 - 1]}`;
        original3LineHashes.add(key, {
            range: new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(i, i + 3)
        });
    }
    const possibleMappings = [];
    changes.sort((0, $970e3d0cfdef18c6$export$53e1d82c551f6242)((c)=>c.modified.startLineNumber, (0, $970e3d0cfdef18c6$export$a990c01b949a832a)));
    for (const change of changes){
        let lastMappings = [];
        for(let i = change.modified.startLineNumber; i < change.modified.endLineNumberExclusive - 2; i++){
            const key = `${hashedModifiedLines[i - 1]}:${hashedModifiedLines[i + 1 - 1]}:${hashedModifiedLines[i + 2 - 1]}`;
            const currentModifiedRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(i, i + 3);
            const nextMappings = [];
            original3LineHashes.forEach(key, ({ range: range })=>{
                for (const lastMapping of lastMappings)// does this match extend some last match?
                if (lastMapping.originalLineRange.endLineNumberExclusive + 1 === range.endLineNumberExclusive && lastMapping.modifiedLineRange.endLineNumberExclusive + 1 === currentModifiedRange.endLineNumberExclusive) {
                    lastMapping.originalLineRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(lastMapping.originalLineRange.startLineNumber, range.endLineNumberExclusive);
                    lastMapping.modifiedLineRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(lastMapping.modifiedLineRange.startLineNumber, currentModifiedRange.endLineNumberExclusive);
                    nextMappings.push(lastMapping);
                    return;
                }
                const mapping = {
                    modifiedLineRange: currentModifiedRange,
                    originalLineRange: range
                };
                possibleMappings.push(mapping);
                nextMappings.push(mapping);
            });
            lastMappings = nextMappings;
        }
        if (!timeout.isValid()) return [];
    }
    possibleMappings.sort((0, $970e3d0cfdef18c6$export$aaf9000ec50ecda3)((0, $970e3d0cfdef18c6$export$53e1d82c551f6242)((m)=>m.modifiedLineRange.length, (0, $970e3d0cfdef18c6$export$a990c01b949a832a))));
    const modifiedSet = new (0, $44954bcdb7a27c0a$export$4eb4e534c6fc202f)();
    const originalSet = new (0, $44954bcdb7a27c0a$export$4eb4e534c6fc202f)();
    for (const mapping of possibleMappings){
        const diffOrigToMod = mapping.modifiedLineRange.startLineNumber - mapping.originalLineRange.startLineNumber;
        const modifiedSections = modifiedSet.subtractFrom(mapping.modifiedLineRange);
        const originalTranslatedSections = originalSet.subtractFrom(mapping.originalLineRange).getWithDelta(diffOrigToMod);
        const modifiedIntersectedSections = modifiedSections.getIntersection(originalTranslatedSections);
        for (const s of modifiedIntersectedSections.ranges){
            if (s.length < 3) continue;
            const modifiedLineRange = s;
            const originalLineRange = s.delta(-diffOrigToMod);
            moves.push(new (0, $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df)(originalLineRange, modifiedLineRange));
            modifiedSet.addRange(modifiedLineRange);
            originalSet.addRange(originalLineRange);
        }
    }
    moves.sort((0, $970e3d0cfdef18c6$export$53e1d82c551f6242)((m)=>m.original.startLineNumber, (0, $970e3d0cfdef18c6$export$a990c01b949a832a)));
    const monotonousChanges = new (0, $f5b534443e350bf3$export$1ad227ebbe41996c)(changes);
    for(let i = 0; i < moves.length; i++){
        const move = moves[i];
        const firstTouchingChangeOrig = monotonousChanges.findLastMonotonous((c)=>c.original.startLineNumber <= move.original.startLineNumber);
        const firstTouchingChangeMod = (0, $f5b534443e350bf3$export$56750b8133ea2d31)(changes, (c)=>c.modified.startLineNumber <= move.modified.startLineNumber);
        const linesAbove = Math.max(move.original.startLineNumber - firstTouchingChangeOrig.original.startLineNumber, move.modified.startLineNumber - firstTouchingChangeMod.modified.startLineNumber);
        const lastTouchingChangeOrig = monotonousChanges.findLastMonotonous((c)=>c.original.startLineNumber < move.original.endLineNumberExclusive);
        const lastTouchingChangeMod = (0, $f5b534443e350bf3$export$56750b8133ea2d31)(changes, (c)=>c.modified.startLineNumber < move.modified.endLineNumberExclusive);
        const linesBelow = Math.max(lastTouchingChangeOrig.original.endLineNumberExclusive - move.original.endLineNumberExclusive, lastTouchingChangeMod.modified.endLineNumberExclusive - move.modified.endLineNumberExclusive);
        let extendToTop;
        for(extendToTop = 0; extendToTop < linesAbove; extendToTop++){
            const origLine = move.original.startLineNumber - extendToTop - 1;
            const modLine = move.modified.startLineNumber - extendToTop - 1;
            if (origLine > originalLines.length || modLine > modifiedLines.length) break;
            if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) break;
            if (!$10d564b108177138$var$areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) break;
        }
        if (extendToTop > 0) {
            originalSet.addRange(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(move.original.startLineNumber - extendToTop, move.original.startLineNumber));
            modifiedSet.addRange(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(move.modified.startLineNumber - extendToTop, move.modified.startLineNumber));
        }
        let extendToBottom;
        for(extendToBottom = 0; extendToBottom < linesBelow; extendToBottom++){
            const origLine = move.original.endLineNumberExclusive + extendToBottom;
            const modLine = move.modified.endLineNumberExclusive + extendToBottom;
            if (origLine > originalLines.length || modLine > modifiedLines.length) break;
            if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) break;
            if (!$10d564b108177138$var$areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) break;
        }
        if (extendToBottom > 0) {
            originalSet.addRange(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(move.original.endLineNumberExclusive, move.original.endLineNumberExclusive + extendToBottom));
            modifiedSet.addRange(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(move.modified.endLineNumberExclusive, move.modified.endLineNumberExclusive + extendToBottom));
        }
        if (extendToTop > 0 || extendToBottom > 0) moves[i] = new (0, $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df)(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(move.original.startLineNumber - extendToTop, move.original.endLineNumberExclusive + extendToBottom), new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(move.modified.startLineNumber - extendToTop, move.modified.endLineNumberExclusive + extendToBottom));
    }
    return moves;
}
function $10d564b108177138$var$areLinesSimilar(line1, line2, timeout) {
    if (line1.trim() === line2.trim()) return true;
    if (line1.length > 300 && line2.length > 300) return false;
    const myersDiffingAlgorithm = new (0, $205a0021c4e8e603$export$60e9a69d9b3ba91c)();
    const result = myersDiffingAlgorithm.compute(new (0, $f9a611cf4a5a841f$export$aa004d33ce08fcf6)([
        line1
    ], new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(1, 1, 1, line1.length), false), new (0, $f9a611cf4a5a841f$export$aa004d33ce08fcf6)([
        line2
    ], new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(1, 1, 1, line2.length), false), timeout);
    let commonNonSpaceCharCount = 0;
    const inverted = (0, $724d63bba95b0094$export$68279245b876ef87).invert(result.diffs, line1.length);
    for (const seq of inverted)seq.seq1Range.forEach((idx)=>{
        if (!(0, $94952126a2800a51$export$1d5ccafae59b4926)(line1.charCodeAt(idx))) commonNonSpaceCharCount++;
    });
    function countNonWsChars(str) {
        let count = 0;
        for(let i = 0; i < line1.length; i++)if (!(0, $94952126a2800a51$export$1d5ccafae59b4926)(str.charCodeAt(i))) count++;
        return count;
    }
    const longerLineLength = countNonWsChars(line1.length > line2.length ? line1 : line2);
    const r = commonNonSpaceCharCount / longerLineLength > 0.6 && longerLineLength > 10;
    return r;
}
function $10d564b108177138$var$joinCloseConsecutiveMoves(moves) {
    if (moves.length === 0) return moves;
    moves.sort((0, $970e3d0cfdef18c6$export$53e1d82c551f6242)((m)=>m.original.startLineNumber, (0, $970e3d0cfdef18c6$export$a990c01b949a832a)));
    const result = [
        moves[0]
    ];
    for(let i = 1; i < moves.length; i++){
        const last = result[result.length - 1];
        const current = moves[i];
        const originalDist = current.original.startLineNumber - last.original.endLineNumberExclusive;
        const modifiedDist = current.modified.startLineNumber - last.modified.endLineNumberExclusive;
        const currentMoveAfterLast = originalDist >= 0 && modifiedDist >= 0;
        if (currentMoveAfterLast && originalDist + modifiedDist <= 2) {
            result[result.length - 1] = last.join(current);
            continue;
        }
        result.push(current);
    }
    return result;
}
function $10d564b108177138$var$removeMovesInSameDiff(changes, moves) {
    const changesMonotonous = new (0, $f5b534443e350bf3$export$1ad227ebbe41996c)(changes);
    moves = moves.filter((m)=>{
        const diffBeforeEndOfMoveOriginal = changesMonotonous.findLastMonotonous((c)=>c.original.startLineNumber < m.original.endLineNumberExclusive) || new (0, $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df)(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(1, 1), new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(1, 1));
        const diffBeforeEndOfMoveModified = (0, $f5b534443e350bf3$export$56750b8133ea2d31)(changes, (c)=>c.modified.startLineNumber < m.modified.endLineNumberExclusive);
        const differentDiffs = diffBeforeEndOfMoveOriginal !== diffBeforeEndOfMoveModified;
        return differentDiffs;
    });
    return moves;
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 


function $0353e3ae29de17ac$export$fd45ad8a4ef672b6(sequence1, sequence2, sequenceDiffs) {
    let result = sequenceDiffs;
    result = $0353e3ae29de17ac$var$joinSequenceDiffsByShifting(sequence1, sequence2, result);
    // Sometimes, calling this function twice improves the result.
    // Uncomment the second invocation and run the tests to see the difference.
    result = $0353e3ae29de17ac$var$joinSequenceDiffsByShifting(sequence1, sequence2, result);
    result = $0353e3ae29de17ac$var$shiftSequenceDiffs(sequence1, sequence2, result);
    return result;
}
/**
 * This function fixes issues like this:
 * ```
 * import { Baz, Bar } from "foo";
 * ```
 * <->
 * ```
 * import { Baz, Bar, Foo } from "foo";
 * ```
 * Computed diff: [ {Add "," after Bar}, {Add "Foo " after space} }
 * Improved diff: [{Add ", Foo" after Bar}]
 */ function $0353e3ae29de17ac$var$joinSequenceDiffsByShifting(sequence1, sequence2, sequenceDiffs) {
    if (sequenceDiffs.length === 0) return sequenceDiffs;
    const result = [];
    result.push(sequenceDiffs[0]);
    // First move them all to the left as much as possible and join them if possible
    for(let i = 1; i < sequenceDiffs.length; i++){
        const prevResult = result[result.length - 1];
        let cur = sequenceDiffs[i];
        if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
            const length = cur.seq1Range.start - prevResult.seq1Range.endExclusive;
            let d;
            for(d = 1; d <= length; d++){
                if (sequence1.getElement(cur.seq1Range.start - d) !== sequence1.getElement(cur.seq1Range.endExclusive - d) || sequence2.getElement(cur.seq2Range.start - d) !== sequence2.getElement(cur.seq2Range.endExclusive - d)) break;
            }
            d--;
            if (d === length) {
                // Merge previous and current diff
                result[result.length - 1] = new (0, $724d63bba95b0094$export$68279245b876ef87)(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(prevResult.seq1Range.start, cur.seq1Range.endExclusive - length), new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(prevResult.seq2Range.start, cur.seq2Range.endExclusive - length));
                continue;
            }
            cur = cur.delta(-d);
        }
        result.push(cur);
    }
    const result2 = [];
    // Then move them all to the right and join them again if possible
    for(let i = 0; i < result.length - 1; i++){
        const nextResult = result[i + 1];
        let cur = result[i];
        if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
            const length = nextResult.seq1Range.start - cur.seq1Range.endExclusive;
            let d;
            for(d = 0; d < length; d++){
                if (!sequence1.isStronglyEqual(cur.seq1Range.start + d, cur.seq1Range.endExclusive + d) || !sequence2.isStronglyEqual(cur.seq2Range.start + d, cur.seq2Range.endExclusive + d)) break;
            }
            if (d === length) {
                // Merge previous and current diff, write to result!
                result[i + 1] = new (0, $724d63bba95b0094$export$68279245b876ef87)(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(cur.seq1Range.start + length, nextResult.seq1Range.endExclusive), new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(cur.seq2Range.start + length, nextResult.seq2Range.endExclusive));
                continue;
            }
            if (d > 0) cur = cur.delta(d);
        }
        result2.push(cur);
    }
    if (result.length > 0) result2.push(result[result.length - 1]);
    return result2;
}
// align character level diffs at whitespace characters
// import { IBar } from "foo";
// import { I[Arr, I]Bar } from "foo";
// ->
// import { [IArr, ]IBar } from "foo";
// import { ITransaction, observableValue, transaction } from 'vs/base/common/observable';
// import { ITransaction, observable[FromEvent, observable]Value, transaction } from 'vs/base/common/observable';
// ->
// import { ITransaction, [observableFromEvent, ]observableValue, transaction } from 'vs/base/common/observable';
// collectBrackets(level + 1, levelPerBracketType);
// collectBrackets(level + 1, levelPerBracket[ + 1, levelPerBracket]Type);
// ->
// collectBrackets(level + 1, [levelPerBracket + 1, ]levelPerBracketType);
function $0353e3ae29de17ac$var$shiftSequenceDiffs(sequence1, sequence2, sequenceDiffs) {
    if (!sequence1.getBoundaryScore || !sequence2.getBoundaryScore) return sequenceDiffs;
    for(let i = 0; i < sequenceDiffs.length; i++){
        const prevDiff = i > 0 ? sequenceDiffs[i - 1] : undefined;
        const diff = sequenceDiffs[i];
        const nextDiff = i + 1 < sequenceDiffs.length ? sequenceDiffs[i + 1] : undefined;
        const seq1ValidRange = new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(prevDiff ? prevDiff.seq1Range.endExclusive + 1 : 0, nextDiff ? nextDiff.seq1Range.start - 1 : sequence1.length);
        const seq2ValidRange = new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(prevDiff ? prevDiff.seq2Range.endExclusive + 1 : 0, nextDiff ? nextDiff.seq2Range.start - 1 : sequence2.length);
        if (diff.seq1Range.isEmpty) sequenceDiffs[i] = $0353e3ae29de17ac$var$shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange);
        else if (diff.seq2Range.isEmpty) sequenceDiffs[i] = $0353e3ae29de17ac$var$shiftDiffToBetterPosition(diff.swap(), sequence2, sequence1, seq2ValidRange, seq1ValidRange).swap();
    }
    return sequenceDiffs;
}
function $0353e3ae29de17ac$var$shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange) {
    const maxShiftLimit = 100; // To prevent performance issues
    // don't touch previous or next!
    let deltaBefore = 1;
    while(diff.seq1Range.start - deltaBefore >= seq1ValidRange.start && diff.seq2Range.start - deltaBefore >= seq2ValidRange.start && sequence2.isStronglyEqual(diff.seq2Range.start - deltaBefore, diff.seq2Range.endExclusive - deltaBefore) && deltaBefore < maxShiftLimit)deltaBefore++;
    deltaBefore--;
    let deltaAfter = 0;
    while(diff.seq1Range.start + deltaAfter < seq1ValidRange.endExclusive && diff.seq2Range.endExclusive + deltaAfter < seq2ValidRange.endExclusive && sequence2.isStronglyEqual(diff.seq2Range.start + deltaAfter, diff.seq2Range.endExclusive + deltaAfter) && deltaAfter < maxShiftLimit)deltaAfter++;
    if (deltaBefore === 0 && deltaAfter === 0) return diff;
    // Visualize `[sequence1.text, diff.seq1Range.start + deltaAfter]`
    // and `[sequence2.text, diff.seq2Range.start + deltaAfter, diff.seq2Range.endExclusive + deltaAfter]`
    let bestDelta = 0;
    let bestScore = -1;
    // find best scored delta
    for(let delta = -deltaBefore; delta <= deltaAfter; delta++){
        const seq2OffsetStart = diff.seq2Range.start + delta;
        const seq2OffsetEndExclusive = diff.seq2Range.endExclusive + delta;
        const seq1Offset = diff.seq1Range.start + delta;
        const score = sequence1.getBoundaryScore(seq1Offset) + sequence2.getBoundaryScore(seq2OffsetStart) + sequence2.getBoundaryScore(seq2OffsetEndExclusive);
        if (score > bestScore) {
            bestScore = score;
            bestDelta = delta;
        }
    }
    return diff.delta(bestDelta);
}
function $0353e3ae29de17ac$export$dd29a4102241c8b3(sequence1, sequence2, sequenceDiffs) {
    const result = [];
    for (const s of sequenceDiffs){
        const last = result[result.length - 1];
        if (!last) {
            result.push(s);
            continue;
        }
        if (s.seq1Range.start - last.seq1Range.endExclusive <= 2 || s.seq2Range.start - last.seq2Range.endExclusive <= 2) result[result.length - 1] = new (0, $724d63bba95b0094$export$68279245b876ef87)(last.seq1Range.join(s.seq1Range), last.seq2Range.join(s.seq2Range));
        else result.push(s);
    }
    return result;
}
function $0353e3ae29de17ac$export$44319780ef1d68f5(sequence1, sequence2, sequenceDiffs) {
    const equalMappings = (0, $724d63bba95b0094$export$68279245b876ef87).invert(sequenceDiffs, sequence1.length);
    const additional = [];
    let lastPoint = new (0, $724d63bba95b0094$export$a44f631cf845c9c6)(0, 0);
    function scanWord(pair, equalMapping) {
        if (pair.offset1 < lastPoint.offset1 || pair.offset2 < lastPoint.offset2) return;
        const w1 = sequence1.findWordContaining(pair.offset1);
        const w2 = sequence2.findWordContaining(pair.offset2);
        if (!w1 || !w2) return;
        let w = new (0, $724d63bba95b0094$export$68279245b876ef87)(w1, w2);
        const equalPart = w.intersect(equalMapping);
        let equalChars1 = equalPart.seq1Range.length;
        let equalChars2 = equalPart.seq2Range.length;
        // The words do not touch previous equals mappings, as we would have processed them already.
        // But they might touch the next ones.
        while(equalMappings.length > 0){
            const next = equalMappings[0];
            const intersects = next.seq1Range.intersects(w.seq1Range) || next.seq2Range.intersects(w.seq2Range);
            if (!intersects) break;
            const v1 = sequence1.findWordContaining(next.seq1Range.start);
            const v2 = sequence2.findWordContaining(next.seq2Range.start);
            // Because there is an intersection, we know that the words are not empty.
            const v = new (0, $724d63bba95b0094$export$68279245b876ef87)(v1, v2);
            const equalPart = v.intersect(next);
            equalChars1 += equalPart.seq1Range.length;
            equalChars2 += equalPart.seq2Range.length;
            w = w.join(v);
            if (w.seq1Range.endExclusive >= next.seq1Range.endExclusive) // The word extends beyond the next equal mapping.
            equalMappings.shift();
            else break;
        }
        if (equalChars1 + equalChars2 < (w.seq1Range.length + w.seq2Range.length) * 2 / 3) additional.push(w);
        lastPoint = w.getEndExclusives();
    }
    while(equalMappings.length > 0){
        const next = equalMappings.shift();
        if (next.seq1Range.isEmpty) continue;
        scanWord(next.getStarts(), next);
        // The equal parts are not empty, so -1 gives us a character that is equal in both parts.
        scanWord(next.getEndExclusives().delta(-1), next);
    }
    const merged = $0353e3ae29de17ac$var$mergeSequenceDiffs(sequenceDiffs, additional);
    return merged;
}
function $0353e3ae29de17ac$var$mergeSequenceDiffs(sequenceDiffs1, sequenceDiffs2) {
    const result = [];
    while(sequenceDiffs1.length > 0 || sequenceDiffs2.length > 0){
        const sd1 = sequenceDiffs1[0];
        const sd2 = sequenceDiffs2[0];
        let next;
        if (sd1 && (!sd2 || sd1.seq1Range.start < sd2.seq1Range.start)) next = sequenceDiffs1.shift();
        else next = sequenceDiffs2.shift();
        if (result.length > 0 && result[result.length - 1].seq1Range.endExclusive >= next.seq1Range.start) result[result.length - 1] = result[result.length - 1].join(next);
        else result.push(next);
    }
    return result;
}
function $0353e3ae29de17ac$export$eaf28d0af8be1c6d(sequence1, _sequence2, sequenceDiffs) {
    let diffs = sequenceDiffs;
    if (diffs.length === 0) return diffs;
    let counter = 0;
    let shouldRepeat;
    do {
        shouldRepeat = false;
        const result = [
            diffs[0]
        ];
        for(let i = 1; i < diffs.length; i++){
            const cur = diffs[i];
            const lastResult = result[result.length - 1];
            function shouldJoinDiffs(before, after) {
                const unchangedRange = new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
                const unchangedText = sequence1.getText(unchangedRange);
                const unchangedTextWithoutWs = unchangedText.replace(/\s/g, '');
                if (unchangedTextWithoutWs.length <= 4 && (before.seq1Range.length + before.seq2Range.length > 5 || after.seq1Range.length + after.seq2Range.length > 5)) return true;
                return false;
            }
            const shouldJoin = shouldJoinDiffs(lastResult, cur);
            if (shouldJoin) {
                shouldRepeat = true;
                result[result.length - 1] = result[result.length - 1].join(cur);
            } else result.push(cur);
        }
        diffs = result;
    }while (counter++ < 10 && shouldRepeat);
    return diffs;
}
function $0353e3ae29de17ac$export$cd04316e2b16b16d(sequence1, sequence2, sequenceDiffs) {
    let diffs = sequenceDiffs;
    if (diffs.length === 0) return diffs;
    let counter = 0;
    let shouldRepeat;
    do {
        shouldRepeat = false;
        const result = [
            diffs[0]
        ];
        for(let i = 1; i < diffs.length; i++){
            const cur = diffs[i];
            const lastResult = result[result.length - 1];
            function shouldJoinDiffs(before, after) {
                const unchangedRange = new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
                const unchangedLineCount = sequence1.countLinesIn(unchangedRange);
                if (unchangedLineCount > 5 || unchangedRange.length > 500) return false;
                const unchangedText = sequence1.getText(unchangedRange).trim();
                if (unchangedText.length > 20 || unchangedText.split(/\r\n|\r|\n/).length > 1) return false;
                const beforeLineCount1 = sequence1.countLinesIn(before.seq1Range);
                const beforeSeq1Length = before.seq1Range.length;
                const beforeLineCount2 = sequence2.countLinesIn(before.seq2Range);
                const beforeSeq2Length = before.seq2Range.length;
                const afterLineCount1 = sequence1.countLinesIn(after.seq1Range);
                const afterSeq1Length = after.seq1Range.length;
                const afterLineCount2 = sequence2.countLinesIn(after.seq2Range);
                const afterSeq2Length = after.seq2Range.length;
                // TODO: Maybe a neural net can be used to derive the result from these numbers
                const max = 130;
                function cap(v) {
                    return Math.min(v, max);
                }
                if (Math.pow(Math.pow(cap(beforeLineCount1 * 40 + beforeSeq1Length), 1.5) + Math.pow(cap(beforeLineCount2 * 40 + beforeSeq2Length), 1.5), 1.5) + Math.pow(Math.pow(cap(afterLineCount1 * 40 + afterSeq1Length), 1.5) + Math.pow(cap(afterLineCount2 * 40 + afterSeq2Length), 1.5), 1.5) > (max ** 1.5) ** 1.5 * 1.3) return true;
                return false;
            }
            const shouldJoin = shouldJoinDiffs(lastResult, cur);
            if (shouldJoin) {
                shouldRepeat = true;
                result[result.length - 1] = result[result.length - 1].join(cur);
            } else result.push(cur);
        }
        diffs = result;
    }while (counter++ < 10 && shouldRepeat);
    const newDiffs = [];
    // Remove short suffixes/prefixes
    (0, $970e3d0cfdef18c6$export$c6ccfaf96e897b7b)(diffs, (prev, cur, next)=>{
        let newDiff = cur;
        function shouldMarkAsChanged(text) {
            return text.length > 0 && text.trim().length <= 3 && cur.seq1Range.length + cur.seq2Range.length > 100;
        }
        const fullRange1 = sequence1.extendToFullLines(cur.seq1Range);
        const prefix = sequence1.getText(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(fullRange1.start, cur.seq1Range.start));
        if (shouldMarkAsChanged(prefix)) newDiff = newDiff.deltaStart(-prefix.length);
        const suffix = sequence1.getText(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(cur.seq1Range.endExclusive, fullRange1.endExclusive));
        if (shouldMarkAsChanged(suffix)) newDiff = newDiff.deltaEnd(suffix.length);
        const availableSpace = (0, $724d63bba95b0094$export$68279245b876ef87).fromOffsetPairs(prev ? prev.getEndExclusives() : (0, $724d63bba95b0094$export$a44f631cf845c9c6).zero, next ? next.getStarts() : (0, $724d63bba95b0094$export$a44f631cf845c9c6).max);
        const result = newDiff.intersect(availableSpace);
        if (newDiffs.length > 0 && result.getStarts().equals(newDiffs[newDiffs.length - 1].getEndExclusives())) newDiffs[newDiffs.length - 1] = newDiffs[newDiffs.length - 1].join(result);
        else newDiffs.push(result);
    });
    return newDiffs;
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ class $4081851afe699597$export$72ff389f6a1d35aa {
    constructor(trimmedHash, lines){
        this.trimmedHash = trimmedHash;
        this.lines = lines;
    }
    getElement(offset) {
        return this.trimmedHash[offset];
    }
    get length() {
        return this.trimmedHash.length;
    }
    getBoundaryScore(length) {
        const indentationBefore = length === 0 ? 0 : $4081851afe699597$var$getIndentation(this.lines[length - 1]);
        const indentationAfter = length === this.lines.length ? 0 : $4081851afe699597$var$getIndentation(this.lines[length]);
        return 1000 - (indentationBefore + indentationAfter);
    }
    getText(range) {
        return this.lines.slice(range.start, range.endExclusive).join('\n');
    }
    isStronglyEqual(offset1, offset2) {
        return this.lines[offset1] === this.lines[offset2];
    }
}
function $4081851afe699597$var$getIndentation(str) {
    let i = 0;
    while(i < str.length && (str.charCodeAt(i) === 32 /* CharCode.Space */  || str.charCodeAt(i) === 9 /* CharCode.Tab */ ))i++;
    return i;
}





class $8efca20663ab73ec$export$feecebe63bc0dbeb {
    constructor(){
        this.dynamicProgrammingDiffing = new (0, $65eb0b6e3d19742d$export$eac8ba44e2c19509)();
        this.myersDiffingAlgorithm = new (0, $205a0021c4e8e603$export$60e9a69d9b3ba91c)();
    }
    computeDiff(originalLines, modifiedLines, options) {
        if (originalLines.length <= 1 && (0, $970e3d0cfdef18c6$export$e9bab7fafb253603)(originalLines, modifiedLines, (a, b)=>a === b)) return new (0, $3453bbcb9507299f$export$6cac6ec541da4902)([], [], false);
        if (originalLines.length === 1 && originalLines[0].length === 0 || modifiedLines.length === 1 && modifiedLines[0].length === 0) return new (0, $3453bbcb9507299f$export$6cac6ec541da4902)([
            new (0, $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3)(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(1, originalLines.length + 1), new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(1, modifiedLines.length + 1), [
                new (0, $9ce0ff57ebfcdc82$export$de3a96556f42983e)(new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(1, 1, originalLines.length, originalLines[originalLines.length - 1].length + 1), new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(1, 1, modifiedLines.length, modifiedLines[modifiedLines.length - 1].length + 1))
            ])
        ], [], false);
        const timeout = options.maxComputationTimeMs === 0 ? (0, $724d63bba95b0094$export$afef188e3939b274).instance : new (0, $724d63bba95b0094$export$11431054471ec5b)(options.maxComputationTimeMs);
        const considerWhitespaceChanges = !options.ignoreTrimWhitespace;
        const perfectHashes = new Map();
        function getOrCreateHash(text) {
            let hash = perfectHashes.get(text);
            if (hash === undefined) {
                hash = perfectHashes.size;
                perfectHashes.set(text, hash);
            }
            return hash;
        }
        const originalLinesHashes = originalLines.map((l)=>getOrCreateHash(l.trim()));
        const modifiedLinesHashes = modifiedLines.map((l)=>getOrCreateHash(l.trim()));
        const sequence1 = new (0, $4081851afe699597$export$72ff389f6a1d35aa)(originalLinesHashes, originalLines);
        const sequence2 = new (0, $4081851afe699597$export$72ff389f6a1d35aa)(modifiedLinesHashes, modifiedLines);
        const lineAlignmentResult = (()=>{
            if (sequence1.length + sequence2.length < 1700) // Use the improved algorithm for small files
            return this.dynamicProgrammingDiffing.compute(sequence1, sequence2, timeout, (offset1, offset2)=>originalLines[offset1] === modifiedLines[offset2] ? modifiedLines[offset2].length === 0 ? 0.1 : 1 + Math.log(1 + modifiedLines[offset2].length) : 0.99);
            return this.myersDiffingAlgorithm.compute(sequence1, sequence2, timeout);
        })();
        let lineAlignments = lineAlignmentResult.diffs;
        let hitTimeout = lineAlignmentResult.hitTimeout;
        lineAlignments = (0, $0353e3ae29de17ac$export$fd45ad8a4ef672b6)(sequence1, sequence2, lineAlignments);
        lineAlignments = (0, $0353e3ae29de17ac$export$eaf28d0af8be1c6d)(sequence1, sequence2, lineAlignments);
        const alignments = [];
        const scanForWhitespaceChanges = (equalLinesCount)=>{
            if (!considerWhitespaceChanges) return;
            for(let i = 0; i < equalLinesCount; i++){
                const seq1Offset = seq1LastStart + i;
                const seq2Offset = seq2LastStart + i;
                if (originalLines[seq1Offset] !== modifiedLines[seq2Offset]) {
                    // This is because of whitespace changes, diff these lines
                    const characterDiffs = this.refineDiff(originalLines, modifiedLines, new (0, $724d63bba95b0094$export$68279245b876ef87)(new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(seq1Offset, seq1Offset + 1), new (0, $3097b8c062a0b336$export$b61f39a967a7f5e5)(seq2Offset, seq2Offset + 1)), timeout, considerWhitespaceChanges);
                    for (const a of characterDiffs.mappings)alignments.push(a);
                    if (characterDiffs.hitTimeout) hitTimeout = true;
                }
            }
        };
        let seq1LastStart = 0;
        let seq2LastStart = 0;
        for (const diff of lineAlignments){
            (0, $0457b9d1b5576d87$export$471f926058ed234c)(()=>diff.seq1Range.start - seq1LastStart === diff.seq2Range.start - seq2LastStart);
            const equalLinesCount = diff.seq1Range.start - seq1LastStart;
            scanForWhitespaceChanges(equalLinesCount);
            seq1LastStart = diff.seq1Range.endExclusive;
            seq2LastStart = diff.seq2Range.endExclusive;
            const characterDiffs = this.refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges);
            if (characterDiffs.hitTimeout) hitTimeout = true;
            for (const a of characterDiffs.mappings)alignments.push(a);
        }
        scanForWhitespaceChanges(originalLines.length - seq1LastStart);
        const changes = $8efca20663ab73ec$export$7e513d766707d911(alignments, originalLines, modifiedLines);
        let moves = [];
        if (options.computeMoves) moves = this.computeMoves(changes, originalLines, modifiedLines, originalLinesHashes, modifiedLinesHashes, timeout, considerWhitespaceChanges);
        // Make sure all ranges are valid
        (0, $0457b9d1b5576d87$export$471f926058ed234c)(()=>{
            function validatePosition(pos, lines) {
                if (pos.lineNumber < 1 || pos.lineNumber > lines.length) return false;
                const line = lines[pos.lineNumber - 1];
                if (pos.column < 1 || pos.column > line.length + 1) return false;
                return true;
            }
            function validateRange(range, lines) {
                if (range.startLineNumber < 1 || range.startLineNumber > lines.length + 1) return false;
                if (range.endLineNumberExclusive < 1 || range.endLineNumberExclusive > lines.length + 1) return false;
                return true;
            }
            for (const c of changes){
                if (!c.innerChanges) return false;
                for (const ic of c.innerChanges){
                    const valid = validatePosition(ic.modifiedRange.getStartPosition(), modifiedLines) && validatePosition(ic.modifiedRange.getEndPosition(), modifiedLines) && validatePosition(ic.originalRange.getStartPosition(), originalLines) && validatePosition(ic.originalRange.getEndPosition(), originalLines);
                    if (!valid) return false;
                }
                if (!validateRange(c.modified, modifiedLines) || !validateRange(c.original, originalLines)) return false;
            }
            return true;
        });
        return new (0, $3453bbcb9507299f$export$6cac6ec541da4902)(changes, moves, hitTimeout);
    }
    computeMoves(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout, considerWhitespaceChanges) {
        const moves = (0, $10d564b108177138$export$3a81ccd887c4901a)(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout);
        const movesWithDiffs = moves.map((m)=>{
            const moveChanges = this.refineDiff(originalLines, modifiedLines, new (0, $724d63bba95b0094$export$68279245b876ef87)(m.original.toOffsetRange(), m.modified.toOffsetRange()), timeout, considerWhitespaceChanges);
            const mappings = $8efca20663ab73ec$export$7e513d766707d911(moveChanges.mappings, originalLines, modifiedLines, true);
            return new (0, $3453bbcb9507299f$export$cd186cedd5483e9d)(m, mappings);
        });
        return movesWithDiffs;
    }
    refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges) {
        const lineRangeMapping = $8efca20663ab73ec$var$toLineRangeMapping(diff);
        const rangeMapping = lineRangeMapping.toRangeMapping2(originalLines, modifiedLines);
        const slice1 = new (0, $f9a611cf4a5a841f$export$aa004d33ce08fcf6)(originalLines, rangeMapping.originalRange, considerWhitespaceChanges);
        const slice2 = new (0, $f9a611cf4a5a841f$export$aa004d33ce08fcf6)(modifiedLines, rangeMapping.modifiedRange, considerWhitespaceChanges);
        const diffResult = slice1.length + slice2.length < 500 ? this.dynamicProgrammingDiffing.compute(slice1, slice2, timeout) : this.myersDiffingAlgorithm.compute(slice1, slice2, timeout);
        const check = false;
        let diffs = diffResult.diffs;
        if (check) (0, $724d63bba95b0094$export$68279245b876ef87).assertSorted(diffs);
        diffs = (0, $0353e3ae29de17ac$export$fd45ad8a4ef672b6)(slice1, slice2, diffs);
        if (check) (0, $724d63bba95b0094$export$68279245b876ef87).assertSorted(diffs);
        diffs = (0, $0353e3ae29de17ac$export$44319780ef1d68f5)(slice1, slice2, diffs);
        if (check) (0, $724d63bba95b0094$export$68279245b876ef87).assertSorted(diffs);
        diffs = (0, $0353e3ae29de17ac$export$dd29a4102241c8b3)(slice1, slice2, diffs);
        if (check) (0, $724d63bba95b0094$export$68279245b876ef87).assertSorted(diffs);
        diffs = (0, $0353e3ae29de17ac$export$cd04316e2b16b16d)(slice1, slice2, diffs);
        if (check) (0, $724d63bba95b0094$export$68279245b876ef87).assertSorted(diffs);
        const result = diffs.map((d)=>new (0, $9ce0ff57ebfcdc82$export$de3a96556f42983e)(slice1.translateRange(d.seq1Range), slice2.translateRange(d.seq2Range)));
        if (check) (0, $9ce0ff57ebfcdc82$export$de3a96556f42983e).assertSorted(result);
        // Assert: result applied on original should be the same as diff applied to original
        return {
            mappings: result,
            hitTimeout: diffResult.hitTimeout
        };
    }
}
function $8efca20663ab73ec$export$7e513d766707d911(alignments, originalLines, modifiedLines, dontAssertStartLine = false) {
    const changes = [];
    for (const g of (0, $970e3d0cfdef18c6$export$fd000893a9b1a926)(alignments.map((a)=>$8efca20663ab73ec$export$a2f823ec6f1c83d9(a, originalLines, modifiedLines)), (a1, a2)=>a1.original.overlapOrTouch(a2.original) || a1.modified.overlapOrTouch(a2.modified))){
        const first = g[0];
        const last = g[g.length - 1];
        changes.push(new (0, $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3)(first.original.join(last.original), first.modified.join(last.modified), g.map((a)=>a.innerChanges[0])));
    }
    (0, $0457b9d1b5576d87$export$471f926058ed234c)(()=>{
        if (!dontAssertStartLine && changes.length > 0) {
            if (changes[0].modified.startLineNumber !== changes[0].original.startLineNumber) return false;
            if (modifiedLines.length - changes[changes.length - 1].modified.endLineNumberExclusive !== originalLines.length - changes[changes.length - 1].original.endLineNumberExclusive) return false;
        }
        return (0, $0457b9d1b5576d87$export$9c0bd4a186c34372)(changes, (m1, m2)=>m2.original.startLineNumber - m1.original.endLineNumberExclusive === m2.modified.startLineNumber - m1.modified.endLineNumberExclusive && // There has to be an unchanged line in between (otherwise both diffs should have been joined)
            m1.original.endLineNumberExclusive < m2.original.startLineNumber && m1.modified.endLineNumberExclusive < m2.modified.startLineNumber);
    });
    return changes;
}
function $8efca20663ab73ec$export$a2f823ec6f1c83d9(rangeMapping, originalLines, modifiedLines) {
    let lineStartDelta = 0;
    let lineEndDelta = 0;
    // rangeMapping describes the edit that replaces `rangeMapping.originalRange` with `newText := getText(modifiedLines, rangeMapping.modifiedRange)`.
    // original: ]xxx \n <- this line is not modified
    // modified: ]xx  \n
    if (rangeMapping.modifiedRange.endColumn === 1 && rangeMapping.originalRange.endColumn === 1 && rangeMapping.originalRange.startLineNumber + lineStartDelta <= rangeMapping.originalRange.endLineNumber && rangeMapping.modifiedRange.startLineNumber + lineStartDelta <= rangeMapping.modifiedRange.endLineNumber) // We can only do this if the range is not empty yet
    lineEndDelta = -1;
    // original: xxx[ \n <- this line is not modified
    // modified: xxx[ \n
    if (rangeMapping.modifiedRange.startColumn - 1 >= modifiedLines[rangeMapping.modifiedRange.startLineNumber - 1].length && rangeMapping.originalRange.startColumn - 1 >= originalLines[rangeMapping.originalRange.startLineNumber - 1].length && rangeMapping.originalRange.startLineNumber <= rangeMapping.originalRange.endLineNumber + lineEndDelta && rangeMapping.modifiedRange.startLineNumber <= rangeMapping.modifiedRange.endLineNumber + lineEndDelta) // We can only do this if the range is not empty yet
    lineStartDelta = 1;
    const originalLineRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(rangeMapping.originalRange.startLineNumber + lineStartDelta, rangeMapping.originalRange.endLineNumber + 1 + lineEndDelta);
    const modifiedLineRange = new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(rangeMapping.modifiedRange.startLineNumber + lineStartDelta, rangeMapping.modifiedRange.endLineNumber + 1 + lineEndDelta);
    return new (0, $9ce0ff57ebfcdc82$export$6ec522a6b097a5c3)(originalLineRange, modifiedLineRange, [
        rangeMapping
    ]);
}
function $8efca20663ab73ec$var$toLineRangeMapping(sequenceDiff) {
    return new (0, $9ce0ff57ebfcdc82$export$dd991aa6cb81a1df)(new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(sequenceDiff.seq1Range.start + 1, sequenceDiff.seq1Range.endExclusive + 1), new (0, $44954bcdb7a27c0a$export$939b1ec5cb8ac90d)(sequenceDiff.seq2Range.start + 1, sequenceDiff.seq2Range.endExclusive + 1));
}


const $c9f74792a15b95d6$export$4afac00bc918a16a = {
    getLegacy: ()=>new (0, $094f97fda98ab3e7$export$d36b4effd3105016)(),
    getDefault: ()=>new (0, $8efca20663ab73ec$export$feecebe63bc0dbeb)()
};




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ function $3657b9d6b342e300$var$roundFloat(number, decimalPoints) {
    const decimal = Math.pow(10, decimalPoints);
    return Math.round(number * decimal) / decimal;
}
class $3657b9d6b342e300$export$f50470518fe8f14a {
    constructor(r, g, b, a = 1){
        this._rgbaBrand = undefined;
        this.r = Math.min(255, Math.max(0, r)) | 0;
        this.g = Math.min(255, Math.max(0, g)) | 0;
        this.b = Math.min(255, Math.max(0, b)) | 0;
        this.a = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, a), 0), 3);
    }
    static equals(a, b) {
        return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
    }
}
class $3657b9d6b342e300$export$711b9f9ecfb65343 {
    constructor(h, s, l, a){
        this._hslaBrand = undefined;
        this.h = Math.max(Math.min(360, h), 0) | 0;
        this.s = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, s), 0), 3);
        this.l = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, l), 0), 3);
        this.a = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, a), 0), 3);
    }
    static equals(a, b) {
        return a.h === b.h && a.s === b.s && a.l === b.l && a.a === b.a;
    }
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h in the set [0, 360], s, and l in the set [0, 1].
     */ static fromRGBA(rgba) {
        const r = rgba.r / 255;
        const g = rgba.g / 255;
        const b = rgba.b / 255;
        const a = rgba.a;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (min + max) / 2;
        const chroma = max - min;
        if (chroma > 0) {
            s = Math.min(l <= 0.5 ? chroma / (2 * l) : chroma / (2 - 2 * l), 1);
            switch(max){
                case r:
                    h = (g - b) / chroma + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / chroma + 2;
                    break;
                case b:
                    h = (r - g) / chroma + 4;
                    break;
            }
            h *= 60;
            h = Math.round(h);
        }
        return new $3657b9d6b342e300$export$711b9f9ecfb65343(h, s, l, a);
    }
    static _hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 0.5) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h in the set [0, 360] s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     */ static toRGBA(hsla) {
        const h = hsla.h / 360;
        const { s: s, l: l, a: a } = hsla;
        let r, g, b;
        if (s === 0) r = g = b = l; // achromatic
        else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = $3657b9d6b342e300$export$711b9f9ecfb65343._hue2rgb(p, q, h + 1 / 3);
            g = $3657b9d6b342e300$export$711b9f9ecfb65343._hue2rgb(p, q, h);
            b = $3657b9d6b342e300$export$711b9f9ecfb65343._hue2rgb(p, q, h - 1 / 3);
        }
        return new $3657b9d6b342e300$export$f50470518fe8f14a(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
    }
}
class $3657b9d6b342e300$export$e3fd097511cd3eb4 {
    constructor(h, s, v, a){
        this._hsvaBrand = undefined;
        this.h = Math.max(Math.min(360, h), 0) | 0;
        this.s = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, s), 0), 3);
        this.v = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, v), 0), 3);
        this.a = $3657b9d6b342e300$var$roundFloat(Math.max(Math.min(1, a), 0), 3);
    }
    static equals(a, b) {
        return a.h === b.h && a.s === b.s && a.v === b.v && a.a === b.a;
    }
    // from http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
    static fromRGBA(rgba) {
        const r = rgba.r / 255;
        const g = rgba.g / 255;
        const b = rgba.b / 255;
        const cmax = Math.max(r, g, b);
        const cmin = Math.min(r, g, b);
        const delta = cmax - cmin;
        const s = cmax === 0 ? 0 : delta / cmax;
        let m;
        if (delta === 0) m = 0;
        else if (cmax === r) m = ((g - b) / delta % 6 + 6) % 6;
        else if (cmax === g) m = (b - r) / delta + 2;
        else m = (r - g) / delta + 4;
        return new $3657b9d6b342e300$export$e3fd097511cd3eb4(Math.round(m * 60), s, cmax, rgba.a);
    }
    // from http://www.rapidtables.com/convert/color/hsv-to-rgb.htm
    static toRGBA(hsva) {
        const { h: h, s: s, v: v, a: a } = hsva;
        const c = v * s;
        const x = c * (1 - Math.abs(h / 60 % 2 - 1));
        const m = v - c;
        let [r, g, b] = [
            0,
            0,
            0
        ];
        if (h < 60) {
            r = c;
            g = x;
        } else if (h < 120) {
            r = x;
            g = c;
        } else if (h < 180) {
            g = c;
            b = x;
        } else if (h < 240) {
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            b = c;
        } else if (h <= 360) {
            r = c;
            b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return new $3657b9d6b342e300$export$f50470518fe8f14a(r, g, b, a);
    }
}
class $3657b9d6b342e300$export$892596cec99bc70e {
    static fromHex(hex) {
        return $3657b9d6b342e300$export$892596cec99bc70e.Format.CSS.parseHex(hex) || $3657b9d6b342e300$export$892596cec99bc70e.red;
    }
    static equals(a, b) {
        if (!a && !b) return true;
        if (!a || !b) return false;
        return a.equals(b);
    }
    get hsla() {
        if (this._hsla) return this._hsla;
        else return $3657b9d6b342e300$export$711b9f9ecfb65343.fromRGBA(this.rgba);
    }
    get hsva() {
        if (this._hsva) return this._hsva;
        return $3657b9d6b342e300$export$e3fd097511cd3eb4.fromRGBA(this.rgba);
    }
    constructor(arg){
        if (!arg) throw new Error('Color needs a value');
        else if (arg instanceof $3657b9d6b342e300$export$f50470518fe8f14a) this.rgba = arg;
        else if (arg instanceof $3657b9d6b342e300$export$711b9f9ecfb65343) {
            this._hsla = arg;
            this.rgba = $3657b9d6b342e300$export$711b9f9ecfb65343.toRGBA(arg);
        } else if (arg instanceof $3657b9d6b342e300$export$e3fd097511cd3eb4) {
            this._hsva = arg;
            this.rgba = $3657b9d6b342e300$export$e3fd097511cd3eb4.toRGBA(arg);
        } else throw new Error('Invalid color ctor argument');
    }
    equals(other) {
        return !!other && $3657b9d6b342e300$export$f50470518fe8f14a.equals(this.rgba, other.rgba) && $3657b9d6b342e300$export$711b9f9ecfb65343.equals(this.hsla, other.hsla) && $3657b9d6b342e300$export$e3fd097511cd3eb4.equals(this.hsva, other.hsva);
    }
    /**
     * http://www.w3.org/TR/WCAG20/#relativeluminancedef
     * Returns the number in the set [0, 1]. O => Darkest Black. 1 => Lightest white.
     */ getRelativeLuminance() {
        const R = $3657b9d6b342e300$export$892596cec99bc70e._relativeLuminanceForComponent(this.rgba.r);
        const G = $3657b9d6b342e300$export$892596cec99bc70e._relativeLuminanceForComponent(this.rgba.g);
        const B = $3657b9d6b342e300$export$892596cec99bc70e._relativeLuminanceForComponent(this.rgba.b);
        const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
        return $3657b9d6b342e300$var$roundFloat(luminance, 4);
    }
    static _relativeLuminanceForComponent(color) {
        const c = color / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    /**
     *	http://24ways.org/2010/calculating-color-contrast
     *  Return 'true' if lighter color otherwise 'false'
     */ isLighter() {
        const yiq = (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1000;
        return yiq >= 128;
    }
    isLighterThan(another) {
        const lum1 = this.getRelativeLuminance();
        const lum2 = another.getRelativeLuminance();
        return lum1 > lum2;
    }
    isDarkerThan(another) {
        const lum1 = this.getRelativeLuminance();
        const lum2 = another.getRelativeLuminance();
        return lum1 < lum2;
    }
    lighten(factor) {
        return new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$711b9f9ecfb65343(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * factor, this.hsla.a));
    }
    darken(factor) {
        return new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$711b9f9ecfb65343(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * factor, this.hsla.a));
    }
    transparent(factor) {
        const { r: r, g: g, b: b, a: a } = this.rgba;
        return new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(r, g, b, a * factor));
    }
    isTransparent() {
        return this.rgba.a === 0;
    }
    isOpaque() {
        return this.rgba.a === 1;
    }
    opposite() {
        return new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
    }
    makeOpaque(opaqueBackground) {
        if (this.isOpaque() || opaqueBackground.rgba.a !== 1) // only allow to blend onto a non-opaque color onto a opaque color
        return this;
        const { r: r, g: g, b: b, a: a } = this.rgba;
        // https://stackoverflow.com/questions/12228548/finding-equivalent-color-with-opacity
        return new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(opaqueBackground.rgba.r - a * (opaqueBackground.rgba.r - r), opaqueBackground.rgba.g - a * (opaqueBackground.rgba.g - g), opaqueBackground.rgba.b - a * (opaqueBackground.rgba.b - b), 1));
    }
    toString() {
        if (!this._toString) this._toString = $3657b9d6b342e300$export$892596cec99bc70e.Format.CSS.format(this);
        return this._toString;
    }
    static getLighterColor(of, relative, factor) {
        if (of.isLighterThan(relative)) return of;
        factor = factor ? factor : 0.5;
        const lum1 = of.getRelativeLuminance();
        const lum2 = relative.getRelativeLuminance();
        factor = factor * (lum2 - lum1) / lum2;
        return of.lighten(factor);
    }
    static getDarkerColor(of, relative, factor) {
        if (of.isDarkerThan(relative)) return of;
        factor = factor ? factor : 0.5;
        const lum1 = of.getRelativeLuminance();
        const lum2 = relative.getRelativeLuminance();
        factor = factor * (lum1 - lum2) / lum1;
        return of.darken(factor);
    }
    static{
        this.white = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(255, 255, 255, 1));
    }
    static{
        this.black = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(0, 0, 0, 1));
    }
    static{
        this.red = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(255, 0, 0, 1));
    }
    static{
        this.blue = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(0, 0, 255, 1));
    }
    static{
        this.green = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(0, 255, 0, 1));
    }
    static{
        this.cyan = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(0, 255, 255, 1));
    }
    static{
        this.lightgrey = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(211, 211, 211, 1));
    }
    static{
        this.transparent = new $3657b9d6b342e300$export$892596cec99bc70e(new $3657b9d6b342e300$export$f50470518fe8f14a(0, 0, 0, 0));
    }
}
(function(Color) {
    let Format;
    (function(Format) {
        let CSS;
        (function(CSS) {
            function formatRGB(color) {
                if (color.rgba.a === 1) return `rgb(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b})`;
                return Color.Format.CSS.formatRGBA(color);
            }
            CSS.formatRGB = formatRGB;
            function formatRGBA(color) {
                return `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${+color.rgba.a.toFixed(2)})`;
            }
            CSS.formatRGBA = formatRGBA;
            function formatHSL(color) {
                if (color.hsla.a === 1) return `hsl(${color.hsla.h}, ${(color.hsla.s * 100).toFixed(2)}%, ${(color.hsla.l * 100).toFixed(2)}%)`;
                return Color.Format.CSS.formatHSLA(color);
            }
            CSS.formatHSL = formatHSL;
            function formatHSLA(color) {
                return `hsla(${color.hsla.h}, ${(color.hsla.s * 100).toFixed(2)}%, ${(color.hsla.l * 100).toFixed(2)}%, ${color.hsla.a.toFixed(2)})`;
            }
            CSS.formatHSLA = formatHSLA;
            function _toTwoDigitHex(n) {
                const r = n.toString(16);
                return r.length !== 2 ? '0' + r : r;
            }
            /**
             * Formats the color as #RRGGBB
             */ function formatHex(color) {
                return `#${_toTwoDigitHex(color.rgba.r)}${_toTwoDigitHex(color.rgba.g)}${_toTwoDigitHex(color.rgba.b)}`;
            }
            CSS.formatHex = formatHex;
            /**
             * Formats the color as #RRGGBBAA
             * If 'compact' is set, colors without transparancy will be printed as #RRGGBB
             */ function formatHexA(color, compact = false) {
                if (compact && color.rgba.a === 1) return Color.Format.CSS.formatHex(color);
                return `#${_toTwoDigitHex(color.rgba.r)}${_toTwoDigitHex(color.rgba.g)}${_toTwoDigitHex(color.rgba.b)}${_toTwoDigitHex(Math.round(color.rgba.a * 255))}`;
            }
            CSS.formatHexA = formatHexA;
            /**
             * The default format will use HEX if opaque and RGBA otherwise.
             */ function format(color) {
                if (color.isOpaque()) return Color.Format.CSS.formatHex(color);
                return Color.Format.CSS.formatRGBA(color);
            }
            CSS.format = format;
            /**
             * Converts an Hex color value to a Color.
             * returns r, g, and b are contained in the set [0, 255]
             * @param hex string (#RGB, #RGBA, #RRGGBB or #RRGGBBAA).
             */ function parseHex(hex) {
                const length = hex.length;
                if (length === 0) // Invalid color
                return null;
                if (hex.charCodeAt(0) !== 35 /* CharCode.Hash */ ) // Does not begin with a #
                return null;
                if (length === 7) {
                    // #RRGGBB format
                    const r = 16 * _parseHexDigit(hex.charCodeAt(1)) + _parseHexDigit(hex.charCodeAt(2));
                    const g = 16 * _parseHexDigit(hex.charCodeAt(3)) + _parseHexDigit(hex.charCodeAt(4));
                    const b = 16 * _parseHexDigit(hex.charCodeAt(5)) + _parseHexDigit(hex.charCodeAt(6));
                    return new Color(new $3657b9d6b342e300$export$f50470518fe8f14a(r, g, b, 1));
                }
                if (length === 9) {
                    // #RRGGBBAA format
                    const r = 16 * _parseHexDigit(hex.charCodeAt(1)) + _parseHexDigit(hex.charCodeAt(2));
                    const g = 16 * _parseHexDigit(hex.charCodeAt(3)) + _parseHexDigit(hex.charCodeAt(4));
                    const b = 16 * _parseHexDigit(hex.charCodeAt(5)) + _parseHexDigit(hex.charCodeAt(6));
                    const a = 16 * _parseHexDigit(hex.charCodeAt(7)) + _parseHexDigit(hex.charCodeAt(8));
                    return new Color(new $3657b9d6b342e300$export$f50470518fe8f14a(r, g, b, a / 255));
                }
                if (length === 4) {
                    // #RGB format
                    const r = _parseHexDigit(hex.charCodeAt(1));
                    const g = _parseHexDigit(hex.charCodeAt(2));
                    const b = _parseHexDigit(hex.charCodeAt(3));
                    return new Color(new $3657b9d6b342e300$export$f50470518fe8f14a(16 * r + r, 16 * g + g, 16 * b + b));
                }
                if (length === 5) {
                    // #RGBA format
                    const r = _parseHexDigit(hex.charCodeAt(1));
                    const g = _parseHexDigit(hex.charCodeAt(2));
                    const b = _parseHexDigit(hex.charCodeAt(3));
                    const a = _parseHexDigit(hex.charCodeAt(4));
                    return new Color(new $3657b9d6b342e300$export$f50470518fe8f14a(16 * r + r, 16 * g + g, 16 * b + b, (16 * a + a) / 255));
                }
                // Invalid color
                return null;
            }
            CSS.parseHex = parseHex;
            function _parseHexDigit(charCode) {
                switch(charCode){
                    case 48 /* CharCode.Digit0 */ :
                        return 0;
                    case 49 /* CharCode.Digit1 */ :
                        return 1;
                    case 50 /* CharCode.Digit2 */ :
                        return 2;
                    case 51 /* CharCode.Digit3 */ :
                        return 3;
                    case 52 /* CharCode.Digit4 */ :
                        return 4;
                    case 53 /* CharCode.Digit5 */ :
                        return 5;
                    case 54 /* CharCode.Digit6 */ :
                        return 6;
                    case 55 /* CharCode.Digit7 */ :
                        return 7;
                    case 56 /* CharCode.Digit8 */ :
                        return 8;
                    case 57 /* CharCode.Digit9 */ :
                        return 9;
                    case 97 /* CharCode.a */ :
                        return 10;
                    case 65 /* CharCode.A */ :
                        return 10;
                    case 98 /* CharCode.b */ :
                        return 11;
                    case 66 /* CharCode.B */ :
                        return 11;
                    case 99 /* CharCode.c */ :
                        return 12;
                    case 67 /* CharCode.C */ :
                        return 12;
                    case 100 /* CharCode.d */ :
                        return 13;
                    case 68 /* CharCode.D */ :
                        return 13;
                    case 101 /* CharCode.e */ :
                        return 14;
                    case 69 /* CharCode.E */ :
                        return 14;
                    case 102 /* CharCode.f */ :
                        return 15;
                    case 70 /* CharCode.F */ :
                        return 15;
                }
                return 0;
            }
        })(CSS = Format.CSS || (Format.CSS = {}));
    })(Format = Color.Format || (Color.Format = {}));
})($3657b9d6b342e300$export$892596cec99bc70e || ($3657b9d6b342e300$export$892596cec99bc70e = {}));


function $c0890e35fe43bd3b$var$_parseCaptureGroups(captureGroups) {
    const values = [];
    for (const captureGroup of captureGroups){
        const parsedNumber = Number(captureGroup);
        if (parsedNumber || parsedNumber === 0 && captureGroup.replace(/\s/g, '') !== '') values.push(parsedNumber);
    }
    return values;
}
function $c0890e35fe43bd3b$var$_toIColor(r, g, b, a) {
    return {
        red: r / 255,
        blue: b / 255,
        green: g / 255,
        alpha: a
    };
}
function $c0890e35fe43bd3b$var$_findRange(model, match) {
    const index = match.index;
    const length = match[0].length;
    if (!index) return;
    const startPosition = model.positionAt(index);
    const range = {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: startPosition.lineNumber,
        endColumn: startPosition.column + length
    };
    return range;
}
function $c0890e35fe43bd3b$var$_findHexColorInformation(range, hexValue) {
    if (!range) return;
    const parsedHexColor = (0, $3657b9d6b342e300$export$892596cec99bc70e).Format.CSS.parseHex(hexValue);
    if (!parsedHexColor) return;
    return {
        range: range,
        color: $c0890e35fe43bd3b$var$_toIColor(parsedHexColor.rgba.r, parsedHexColor.rgba.g, parsedHexColor.rgba.b, parsedHexColor.rgba.a)
    };
}
function $c0890e35fe43bd3b$var$_findRGBColorInformation(range, matches, isAlpha) {
    if (!range || matches.length !== 1) return;
    const match = matches[0];
    const captureGroups = match.values();
    const parsedRegex = $c0890e35fe43bd3b$var$_parseCaptureGroups(captureGroups);
    return {
        range: range,
        color: $c0890e35fe43bd3b$var$_toIColor(parsedRegex[0], parsedRegex[1], parsedRegex[2], isAlpha ? parsedRegex[3] : 1)
    };
}
function $c0890e35fe43bd3b$var$_findHSLColorInformation(range, matches, isAlpha) {
    if (!range || matches.length !== 1) return;
    const match = matches[0];
    const captureGroups = match.values();
    const parsedRegex = $c0890e35fe43bd3b$var$_parseCaptureGroups(captureGroups);
    const colorEquivalent = new (0, $3657b9d6b342e300$export$892596cec99bc70e)(new (0, $3657b9d6b342e300$export$711b9f9ecfb65343)(parsedRegex[0], parsedRegex[1] / 100, parsedRegex[2] / 100, isAlpha ? parsedRegex[3] : 1));
    return {
        range: range,
        color: $c0890e35fe43bd3b$var$_toIColor(colorEquivalent.rgba.r, colorEquivalent.rgba.g, colorEquivalent.rgba.b, colorEquivalent.rgba.a)
    };
}
function $c0890e35fe43bd3b$var$_findMatches(model, regex) {
    if (typeof model === 'string') return [
        ...model.matchAll(regex)
    ];
    else return model.findMatches(regex);
}
function $c0890e35fe43bd3b$var$computeColors(model) {
    const result = [];
    // Early validation for RGB and HSL
    const initialValidationRegex = /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm;
    const initialValidationMatches = $c0890e35fe43bd3b$var$_findMatches(model, initialValidationRegex);
    // Potential colors have been found, validate the parameters
    if (initialValidationMatches.length > 0) for (const initialMatch of initialValidationMatches){
        const initialCaptureGroups = initialMatch.filter((captureGroup)=>captureGroup !== undefined);
        const colorScheme = initialCaptureGroups[1];
        const colorParameters = initialCaptureGroups[2];
        if (!colorParameters) continue;
        let colorInformation;
        if (colorScheme === 'rgb') {
            const regexParameters = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
            colorInformation = $c0890e35fe43bd3b$var$_findRGBColorInformation($c0890e35fe43bd3b$var$_findRange(model, initialMatch), $c0890e35fe43bd3b$var$_findMatches(colorParameters, regexParameters), false);
        } else if (colorScheme === 'rgba') {
            const regexParameters = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
            colorInformation = $c0890e35fe43bd3b$var$_findRGBColorInformation($c0890e35fe43bd3b$var$_findRange(model, initialMatch), $c0890e35fe43bd3b$var$_findMatches(colorParameters, regexParameters), true);
        } else if (colorScheme === 'hsl') {
            const regexParameters = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
            colorInformation = $c0890e35fe43bd3b$var$_findHSLColorInformation($c0890e35fe43bd3b$var$_findRange(model, initialMatch), $c0890e35fe43bd3b$var$_findMatches(colorParameters, regexParameters), false);
        } else if (colorScheme === 'hsla') {
            const regexParameters = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
            colorInformation = $c0890e35fe43bd3b$var$_findHSLColorInformation($c0890e35fe43bd3b$var$_findRange(model, initialMatch), $c0890e35fe43bd3b$var$_findMatches(colorParameters, regexParameters), true);
        } else if (colorScheme === '#') colorInformation = $c0890e35fe43bd3b$var$_findHexColorInformation($c0890e35fe43bd3b$var$_findRange(model, initialMatch), colorScheme + colorParameters);
        if (colorInformation) result.push(colorInformation);
    }
    return result;
}
function $c0890e35fe43bd3b$export$e19599ac12bd41fe(model) {
    if (!model || typeof model.getValue !== 'function' || typeof model.positionAt !== 'function') // Unknown caller!
    return [];
    return $c0890e35fe43bd3b$var$computeColors(model);
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ const $ad7ab4131584cdc0$var$markRegex = new RegExp('\\bMARK:\\s*(.*)$', 'd');
const $ad7ab4131584cdc0$var$trimDashesRegex = /^-+|-+$/g;
function $ad7ab4131584cdc0$export$42059dc50874a7a3(model, options) {
    let headers = [];
    if (options.findRegionSectionHeaders && options.foldingRules?.markers) {
        const regionHeaders = $ad7ab4131584cdc0$var$collectRegionHeaders(model, options);
        headers = headers.concat(regionHeaders);
    }
    if (options.findMarkSectionHeaders) {
        const markHeaders = $ad7ab4131584cdc0$var$collectMarkHeaders(model);
        headers = headers.concat(markHeaders);
    }
    return headers;
}
function $ad7ab4131584cdc0$var$collectRegionHeaders(model, options) {
    const regionHeaders = [];
    const endLineNumber = model.getLineCount();
    for(let lineNumber = 1; lineNumber <= endLineNumber; lineNumber++){
        const lineContent = model.getLineContent(lineNumber);
        const match = lineContent.match(options.foldingRules.markers.start);
        if (match) {
            const range = {
                startLineNumber: lineNumber,
                startColumn: match[0].length + 1,
                endLineNumber: lineNumber,
                endColumn: lineContent.length + 1
            };
            if (range.endColumn > range.startColumn) {
                const sectionHeader = {
                    range: range,
                    ...$ad7ab4131584cdc0$var$getHeaderText(lineContent.substring(match[0].length)),
                    shouldBeInComments: false
                };
                if (sectionHeader.text || sectionHeader.hasSeparatorLine) regionHeaders.push(sectionHeader);
            }
        }
    }
    return regionHeaders;
}
function $ad7ab4131584cdc0$var$collectMarkHeaders(model) {
    const markHeaders = [];
    const endLineNumber = model.getLineCount();
    for(let lineNumber = 1; lineNumber <= endLineNumber; lineNumber++){
        const lineContent = model.getLineContent(lineNumber);
        $ad7ab4131584cdc0$var$addMarkHeaderIfFound(lineContent, lineNumber, markHeaders);
    }
    return markHeaders;
}
function $ad7ab4131584cdc0$var$addMarkHeaderIfFound(lineContent, lineNumber, sectionHeaders) {
    $ad7ab4131584cdc0$var$markRegex.lastIndex = 0;
    const match = $ad7ab4131584cdc0$var$markRegex.exec(lineContent);
    if (match) {
        const column = match.indices[1][0] + 1;
        const endColumn = match.indices[1][1] + 1;
        const range = {
            startLineNumber: lineNumber,
            startColumn: column,
            endLineNumber: lineNumber,
            endColumn: endColumn
        };
        if (range.endColumn > range.startColumn) {
            const sectionHeader = {
                range: range,
                ...$ad7ab4131584cdc0$var$getHeaderText(match[1]),
                shouldBeInComments: true
            };
            if (sectionHeader.text || sectionHeader.hasSeparatorLine) sectionHeaders.push(sectionHeader);
        }
    }
}
function $ad7ab4131584cdc0$var$getHeaderText(text) {
    text = text.trim();
    const hasSeparatorLine = text.startsWith('-');
    text = text.replace($ad7ab4131584cdc0$var$trimDashesRegex, '');
    return {
        text: text,
        hasSeparatorLine: hasSeparatorLine
    };
}


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 




/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ /**
 * Can be passed into the Delayed to defer using a microtask
 * */ const $1d65e4189a86f316$export$3086c2d84582e083 = Symbol('MicrotaskDelay');


function $fbb04bd33f70d429$export$f5b060c2914b97c8(obj) {
    return !!obj && typeof obj.then === 'function';
}
function $fbb04bd33f70d429$export$72af18a8b033265c(callback) {
    const source = new (0, $783cd511690f9862$export$80fbc6d68230dbd3)();
    const thenable = callback(source.token);
    const promise = new Promise((resolve, reject)=>{
        const subscription = source.token.onCancellationRequested(()=>{
            subscription.dispose();
            reject(new (0, $da7a53421655f39f$export$63884d8ee23c8f42)());
        });
        Promise.resolve(thenable).then((value)=>{
            subscription.dispose();
            source.dispose();
            resolve(value);
        }, (err)=>{
            subscription.dispose();
            source.dispose();
            reject(err);
        });
    });
    return new class {
        cancel() {
            source.cancel();
            source.dispose();
        }
        then(resolve, reject) {
            return promise.then(resolve, reject);
        }
        catch(reject) {
            return this.then(undefined, reject);
        }
        finally(onfinally) {
            return promise.finally(onfinally);
        }
    };
}
function $fbb04bd33f70d429$export$552bf299aa935d60(promise, token, defaultValue) {
    return new Promise((resolve, reject)=>{
        const ref = token.onCancellationRequested(()=>{
            ref.dispose();
            resolve(defaultValue);
        });
        promise.then(resolve, reject).finally(()=>ref.dispose());
    });
}
class $fbb04bd33f70d429$export$1a6b7111629cfd6e {
    constructor(){
        this.isDisposed = false;
        this.activePromise = null;
        this.queuedPromise = null;
        this.queuedPromiseFactory = null;
    }
    queue(promiseFactory) {
        if (this.isDisposed) return Promise.reject(new Error('Throttler is disposed'));
        if (this.activePromise) {
            this.queuedPromiseFactory = promiseFactory;
            if (!this.queuedPromise) {
                const onComplete = ()=>{
                    this.queuedPromise = null;
                    if (this.isDisposed) return;
                    const result = this.queue(this.queuedPromiseFactory);
                    this.queuedPromiseFactory = null;
                    return result;
                };
                this.queuedPromise = new Promise((resolve)=>{
                    this.activePromise.then(onComplete, onComplete).then(resolve);
                });
            }
            return new Promise((resolve, reject)=>{
                this.queuedPromise.then(resolve, reject);
            });
        }
        this.activePromise = promiseFactory();
        return new Promise((resolve, reject)=>{
            this.activePromise.then((result)=>{
                this.activePromise = null;
                resolve(result);
            }, (err)=>{
                this.activePromise = null;
                reject(err);
            });
        });
    }
    dispose() {
        this.isDisposed = true;
    }
}
const $fbb04bd33f70d429$var$timeoutDeferred = (timeout, fn)=>{
    let scheduled = true;
    const handle = setTimeout(()=>{
        scheduled = false;
        fn();
    }, timeout);
    return {
        isTriggered: ()=>scheduled,
        dispose: ()=>{
            clearTimeout(handle);
            scheduled = false;
        }
    };
};
const $fbb04bd33f70d429$var$microtaskDeferred = (fn)=>{
    let scheduled = true;
    queueMicrotask(()=>{
        if (scheduled) {
            scheduled = false;
            fn();
        }
    });
    return {
        isTriggered: ()=>scheduled,
        dispose: ()=>{
            scheduled = false;
        }
    };
};
class $fbb04bd33f70d429$export$b0fab8fb2fc9b2ce {
    constructor(defaultDelay){
        this.defaultDelay = defaultDelay;
        this.deferred = null;
        this.completionPromise = null;
        this.doResolve = null;
        this.doReject = null;
        this.task = null;
    }
    trigger(task, delay = this.defaultDelay) {
        this.task = task;
        this.cancelTimeout();
        if (!this.completionPromise) this.completionPromise = new Promise((resolve, reject)=>{
            this.doResolve = resolve;
            this.doReject = reject;
        }).then(()=>{
            this.completionPromise = null;
            this.doResolve = null;
            if (this.task) {
                const task = this.task;
                this.task = null;
                return task();
            }
            return undefined;
        });
        const fn = ()=>{
            this.deferred = null;
            this.doResolve?.(null);
        };
        this.deferred = delay === (0, $1d65e4189a86f316$export$3086c2d84582e083) ? $fbb04bd33f70d429$var$microtaskDeferred(fn) : $fbb04bd33f70d429$var$timeoutDeferred(delay, fn);
        return this.completionPromise;
    }
    isTriggered() {
        return !!this.deferred?.isTriggered();
    }
    cancel() {
        this.cancelTimeout();
        if (this.completionPromise) {
            this.doReject?.(new (0, $da7a53421655f39f$export$63884d8ee23c8f42)());
            this.completionPromise = null;
        }
    }
    cancelTimeout() {
        this.deferred?.dispose();
        this.deferred = null;
    }
    dispose() {
        this.cancel();
    }
}
class $fbb04bd33f70d429$export$32aa556f84912683 {
    constructor(defaultDelay){
        this.delayer = new $fbb04bd33f70d429$export$b0fab8fb2fc9b2ce(defaultDelay);
        this.throttler = new $fbb04bd33f70d429$export$1a6b7111629cfd6e();
    }
    trigger(promiseFactory, delay) {
        return this.delayer.trigger(()=>this.throttler.queue(promiseFactory), delay);
    }
    cancel() {
        this.delayer.cancel();
    }
    dispose() {
        this.delayer.dispose();
        this.throttler.dispose();
    }
}
function $fbb04bd33f70d429$export$83e74882c5df8fe1(millis, token) {
    if (!token) return $fbb04bd33f70d429$export$72af18a8b033265c((token)=>$fbb04bd33f70d429$export$83e74882c5df8fe1(millis, token));
    return new Promise((resolve, reject)=>{
        const handle = setTimeout(()=>{
            disposable.dispose();
            resolve();
        }, millis);
        const disposable = token.onCancellationRequested(()=>{
            clearTimeout(handle);
            disposable.dispose();
            reject(new (0, $da7a53421655f39f$export$63884d8ee23c8f42)());
        });
    });
}
function $fbb04bd33f70d429$export$453ea6aa40819154(handler, timeout = 0, store) {
    const timer = setTimeout(()=>{
        handler();
        if (store) disposable.dispose();
    }, timeout);
    const disposable = (0, $c817ee4fd79558e8$export$aef110c64ebd5f30)(()=>{
        clearTimeout(timer);
        store?.deleteAndLeak(disposable);
    });
    store?.add(disposable);
    return disposable;
}
function $fbb04bd33f70d429$export$43128fadae87b74a(promiseFactories, shouldStop = (t)=>!!t, defaultValue = null) {
    let index = 0;
    const len = promiseFactories.length;
    const loop = ()=>{
        if (index >= len) return Promise.resolve(defaultValue);
        const factory = promiseFactories[index++];
        const promise = Promise.resolve(factory());
        return promise.then((result)=>{
            if (shouldStop(result)) return Promise.resolve(result);
            return loop();
        });
    };
    return loop();
}
class $fbb04bd33f70d429$export$467a00c1a08c1501 {
    constructor(runner, timeout){
        this._isDisposed = false;
        this._token = -1;
        if (typeof runner === 'function' && typeof timeout === 'number') this.setIfNotSet(runner, timeout);
    }
    dispose() {
        this.cancel();
        this._isDisposed = true;
    }
    cancel() {
        if (this._token !== -1) {
            clearTimeout(this._token);
            this._token = -1;
        }
    }
    cancelAndSet(runner, timeout) {
        if (this._isDisposed) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`Calling 'cancelAndSet' on a disposed TimeoutTimer`);
        this.cancel();
        this._token = setTimeout(()=>{
            this._token = -1;
            runner();
        }, timeout);
    }
    setIfNotSet(runner, timeout) {
        if (this._isDisposed) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`Calling 'setIfNotSet' on a disposed TimeoutTimer`);
        if (this._token !== -1) // timer is already set
        return;
        this._token = setTimeout(()=>{
            this._token = -1;
            runner();
        }, timeout);
    }
}
class $fbb04bd33f70d429$export$3caa92e8dbf2f469 {
    constructor(){
        this.disposable = undefined;
        this.isDisposed = false;
    }
    cancel() {
        this.disposable?.dispose();
        this.disposable = undefined;
    }
    cancelAndSet(runner, interval, context = globalThis) {
        if (this.isDisposed) throw new (0, $da7a53421655f39f$export$87f3d76cf9e8c81b)(`Calling 'cancelAndSet' on a disposed IntervalTimer`);
        this.cancel();
        const handle = context.setInterval(()=>{
            runner();
        }, interval);
        this.disposable = (0, $c817ee4fd79558e8$export$aef110c64ebd5f30)(()=>{
            context.clearInterval(handle);
            this.disposable = undefined;
        });
    }
    dispose() {
        this.cancel();
        this.isDisposed = true;
    }
}
class $fbb04bd33f70d429$export$6ab902df9478b031 {
    constructor(runner, delay){
        this.timeoutToken = -1;
        this.runner = runner;
        this.timeout = delay;
        this.timeoutHandler = this.onTimeout.bind(this);
    }
    /**
     * Dispose RunOnceScheduler
     */ dispose() {
        this.cancel();
        this.runner = null;
    }
    /**
     * Cancel current scheduled runner (if any).
     */ cancel() {
        if (this.isScheduled()) {
            clearTimeout(this.timeoutToken);
            this.timeoutToken = -1;
        }
    }
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */ schedule(delay = this.timeout) {
        this.cancel();
        this.timeoutToken = setTimeout(this.timeoutHandler, delay);
    }
    get delay() {
        return this.timeout;
    }
    set delay(value) {
        this.timeout = value;
    }
    /**
     * Returns true if scheduled.
     */ isScheduled() {
        return this.timeoutToken !== -1;
    }
    onTimeout() {
        this.timeoutToken = -1;
        if (this.runner) this.doRun();
    }
    doRun() {
        this.runner?.();
    }
}
let $fbb04bd33f70d429$export$a026aee5326e9d7b;
let $fbb04bd33f70d429$export$b35f05c0b60560a;
(function() {
    if (typeof globalThis.requestIdleCallback !== 'function' || typeof globalThis.cancelIdleCallback !== 'function') $fbb04bd33f70d429$export$b35f05c0b60560a = (_targetWindow, runner)=>{
        (0, $9e1677203ec6aef4$export$64a561ae64a9738c)(()=>{
            if (disposed) return;
            const end = Date.now() + 15; // one frame at 64fps
            const deadline = {
                didTimeout: true,
                timeRemaining () {
                    return Math.max(0, end - Date.now());
                }
            };
            runner(Object.freeze(deadline));
        });
        let disposed = false;
        return {
            dispose () {
                if (disposed) return;
                disposed = true;
            }
        };
    };
    else $fbb04bd33f70d429$export$b35f05c0b60560a = (targetWindow, runner, timeout)=>{
        const handle = targetWindow.requestIdleCallback(runner, typeof timeout === 'number' ? {
            timeout: timeout
        } : undefined);
        let disposed = false;
        return {
            dispose () {
                if (disposed) return;
                disposed = true;
                targetWindow.cancelIdleCallback(handle);
            }
        };
    };
    $fbb04bd33f70d429$export$a026aee5326e9d7b = (runner)=>$fbb04bd33f70d429$export$b35f05c0b60560a(globalThis, runner);
})();
class $fbb04bd33f70d429$export$9e6c806cf310b67d {
    constructor(targetWindow, executor){
        this._didRun = false;
        this._executor = ()=>{
            try {
                this._value = executor();
            } catch (err) {
                this._error = err;
            } finally{
                this._didRun = true;
            }
        };
        this._handle = $fbb04bd33f70d429$export$b35f05c0b60560a(targetWindow, ()=>this._executor());
    }
    dispose() {
        this._handle.dispose();
    }
    get value() {
        if (!this._didRun) {
            this._handle.dispose();
            this._executor();
        }
        if (this._error) throw this._error;
        return this._value;
    }
    get isInitialized() {
        return this._didRun;
    }
}
class $fbb04bd33f70d429$export$c60d4bcc9416cad2 extends $fbb04bd33f70d429$export$9e6c806cf310b67d {
    constructor(executor){
        super(globalThis, executor);
    }
}
class $fbb04bd33f70d429$export$8ffc91703f10692b {
    get isRejected() {
        return this.outcome?.outcome === 1 /* DeferredOutcome.Rejected */ ;
    }
    get isSettled() {
        return !!this.outcome;
    }
    constructor(){
        this.p = new Promise((c, e)=>{
            this.completeCallback = c;
            this.errorCallback = e;
        });
    }
    complete(value) {
        return new Promise((resolve)=>{
            this.completeCallback(value);
            this.outcome = {
                outcome: 0 /* DeferredOutcome.Resolved */ ,
                value: value
            };
            resolve();
        });
    }
    error(err) {
        return new Promise((resolve)=>{
            this.errorCallback(err);
            this.outcome = {
                outcome: 1 /* DeferredOutcome.Rejected */ ,
                value: err
            };
            resolve();
        });
    }
    cancel() {
        return this.error(new (0, $da7a53421655f39f$export$63884d8ee23c8f42)());
    }
}
var $fbb04bd33f70d429$export$7ed990dc9f46fb70;
(function(Promises) {
    /**
     * A drop-in replacement for `Promise.all` with the only difference
     * that the method awaits every promise to either fulfill or reject.
     *
     * Similar to `Promise.all`, only the first error will be returned
     * if any.
     */ async function settled(promises) {
        let firstError = undefined;
        const result = await Promise.all(promises.map((promise)=>promise.then((value)=>value, (error)=>{
                if (!firstError) firstError = error;
                return undefined; // do not rethrow so that other promises can settle
            })));
        if (typeof firstError !== 'undefined') throw firstError;
        return result; // cast is needed and protected by the `throw` above
    }
    Promises.settled = settled;
    /**
     * A helper to create a new `Promise<T>` with a body that is a promise
     * itself. By default, an error that raises from the async body will
     * end up as a unhandled rejection, so this utility properly awaits the
     * body and rejects the promise as a normal promise does without async
     * body.
     *
     * This method should only be used in rare cases where otherwise `async`
     * cannot be used (e.g. when callbacks are involved that require this).
     */ function withAsyncBody(bodyFn) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject)=>{
            try {
                await bodyFn(resolve, reject);
            } catch (error) {
                reject(error);
            }
        });
    }
    Promises.withAsyncBody = withAsyncBody;
})($fbb04bd33f70d429$export$7ed990dc9f46fb70 || ($fbb04bd33f70d429$export$7ed990dc9f46fb70 = {}));
class $fbb04bd33f70d429$export$ddaebf938afaf679 {
    static fromArray(items) {
        return new $fbb04bd33f70d429$export$ddaebf938afaf679((writer)=>{
            writer.emitMany(items);
        });
    }
    static fromPromise(promise) {
        return new $fbb04bd33f70d429$export$ddaebf938afaf679(async (emitter)=>{
            emitter.emitMany(await promise);
        });
    }
    static fromPromises(promises) {
        return new $fbb04bd33f70d429$export$ddaebf938afaf679(async (emitter)=>{
            await Promise.all(promises.map(async (p)=>emitter.emitOne(await p)));
        });
    }
    static merge(iterables) {
        return new $fbb04bd33f70d429$export$ddaebf938afaf679(async (emitter)=>{
            await Promise.all(iterables.map(async (iterable)=>{
                for await (const item of iterable)emitter.emitOne(item);
            }));
        });
    }
    static{
        this.EMPTY = $fbb04bd33f70d429$export$ddaebf938afaf679.fromArray([]);
    }
    constructor(executor, onReturn){
        this._state = 0 /* AsyncIterableSourceState.Initial */ ;
        this._results = [];
        this._error = null;
        this._onReturn = onReturn;
        this._onStateChanged = new (0, $d7b8088681a716ec$export$4293555f241ae35a)();
        queueMicrotask(async ()=>{
            const writer = {
                emitOne: (item)=>this.emitOne(item),
                emitMany: (items)=>this.emitMany(items),
                reject: (error)=>this.reject(error)
            };
            try {
                await Promise.resolve(executor(writer));
                this.resolve();
            } catch (err) {
                this.reject(err);
            } finally{
                writer.emitOne = undefined;
                writer.emitMany = undefined;
                writer.reject = undefined;
            }
        });
    }
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next: async ()=>{
                do {
                    if (this._state === 2 /* AsyncIterableSourceState.DoneError */ ) throw this._error;
                    if (i < this._results.length) return {
                        done: false,
                        value: this._results[i++]
                    };
                    if (this._state === 1 /* AsyncIterableSourceState.DoneOK */ ) return {
                        done: true,
                        value: undefined
                    };
                    await (0, $d7b8088681a716ec$export$d61e24a684f9e51).toPromise(this._onStateChanged.event);
                }while (true);
            },
            return: async ()=>{
                this._onReturn?.();
                return {
                    done: true,
                    value: undefined
                };
            }
        };
    }
    static map(iterable, mapFn) {
        return new $fbb04bd33f70d429$export$ddaebf938afaf679(async (emitter)=>{
            for await (const item of iterable)emitter.emitOne(mapFn(item));
        });
    }
    map(mapFn) {
        return $fbb04bd33f70d429$export$ddaebf938afaf679.map(this, mapFn);
    }
    static filter(iterable, filterFn) {
        return new $fbb04bd33f70d429$export$ddaebf938afaf679(async (emitter)=>{
            for await (const item of iterable)if (filterFn(item)) emitter.emitOne(item);
        });
    }
    filter(filterFn) {
        return $fbb04bd33f70d429$export$ddaebf938afaf679.filter(this, filterFn);
    }
    static coalesce(iterable) {
        return $fbb04bd33f70d429$export$ddaebf938afaf679.filter(iterable, (item)=>!!item);
    }
    coalesce() {
        return $fbb04bd33f70d429$export$ddaebf938afaf679.coalesce(this);
    }
    static async toPromise(iterable) {
        const result = [];
        for await (const item of iterable)result.push(item);
        return result;
    }
    toPromise() {
        return $fbb04bd33f70d429$export$ddaebf938afaf679.toPromise(this);
    }
    /**
     * The value will be appended at the end.
     *
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */ emitOne(value) {
        if (this._state !== 0 /* AsyncIterableSourceState.Initial */ ) return;
        // it is important to add new values at the end,
        // as we may have iterators already running on the array
        this._results.push(value);
        this._onStateChanged.fire();
    }
    /**
     * The values will be appended at the end.
     *
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */ emitMany(values) {
        if (this._state !== 0 /* AsyncIterableSourceState.Initial */ ) return;
        // it is important to add new values at the end,
        // as we may have iterators already running on the array
        this._results = this._results.concat(values);
        this._onStateChanged.fire();
    }
    /**
     * Calling `resolve()` will mark the result array as complete.
     *
     * **NOTE** `resolve()` must be called, otherwise all consumers of this iterable will hang indefinitely, similar to a non-resolved promise.
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */ resolve() {
        if (this._state !== 0 /* AsyncIterableSourceState.Initial */ ) return;
        this._state = 1 /* AsyncIterableSourceState.DoneOK */ ;
        this._onStateChanged.fire();
    }
    /**
     * Writing an error will permanently invalidate this iterable.
     * The current users will receive an error thrown, as will all future users.
     *
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */ reject(error) {
        if (this._state !== 0 /* AsyncIterableSourceState.Initial */ ) return;
        this._state = 2 /* AsyncIterableSourceState.DoneError */ ;
        this._error = error;
        this._onStateChanged.fire();
    }
}
class $fbb04bd33f70d429$export$b9cbe9486c81a3ed extends $fbb04bd33f70d429$export$ddaebf938afaf679 {
    constructor(_source, executor){
        super(executor);
        this._source = _source;
    }
    cancel() {
        this._source.cancel();
    }
}
function $fbb04bd33f70d429$export$a6e06506e20b0155(callback) {
    const source = new (0, $783cd511690f9862$export$80fbc6d68230dbd3)();
    const innerIterable = callback(source.token);
    return new $fbb04bd33f70d429$export$b9cbe9486c81a3ed(source, async (emitter)=>{
        const subscription = source.token.onCancellationRequested(()=>{
            subscription.dispose();
            source.dispose();
            emitter.reject(new (0, $da7a53421655f39f$export$63884d8ee23c8f42)());
        });
        try {
            for await (const item of innerIterable){
                if (source.token.isCancellationRequested) // canceled in the meantime
                return;
                emitter.emitOne(item);
            }
            subscription.dispose();
            source.dispose();
        } catch (err) {
            subscription.dispose();
            source.dispose();
            emitter.reject(err);
        }
    });
} //#endregion







/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/ 

class $45864e86f4d1f9bf$export$2d08c0c4fc1f0422 {
    constructor(values){
        this.values = values;
        this.prefixSum = new Uint32Array(values.length);
        this.prefixSumValidIndex = new Int32Array(1);
        this.prefixSumValidIndex[0] = -1;
    }
    insertValues(insertIndex, insertValues) {
        insertIndex = (0, $2db288e50eb34b16$export$56cfc59269b52afc)(insertIndex);
        const oldValues = this.values;
        const oldPrefixSum = this.prefixSum;
        const insertValuesLen = insertValues.length;
        if (insertValuesLen === 0) return false;
        this.values = new Uint32Array(oldValues.length + insertValuesLen);
        this.values.set(oldValues.subarray(0, insertIndex), 0);
        this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
        this.values.set(insertValues, insertIndex);
        if (insertIndex - 1 < this.prefixSumValidIndex[0]) this.prefixSumValidIndex[0] = insertIndex - 1;
        this.prefixSum = new Uint32Array(this.values.length);
        if (this.prefixSumValidIndex[0] >= 0) this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        return true;
    }
    setValue(index, value) {
        index = (0, $2db288e50eb34b16$export$56cfc59269b52afc)(index);
        value = (0, $2db288e50eb34b16$export$56cfc59269b52afc)(value);
        if (this.values[index] === value) return false;
        this.values[index] = value;
        if (index - 1 < this.prefixSumValidIndex[0]) this.prefixSumValidIndex[0] = index - 1;
        return true;
    }
    removeValues(startIndex, count) {
        startIndex = (0, $2db288e50eb34b16$export$56cfc59269b52afc)(startIndex);
        count = (0, $2db288e50eb34b16$export$56cfc59269b52afc)(count);
        const oldValues = this.values;
        const oldPrefixSum = this.prefixSum;
        if (startIndex >= oldValues.length) return false;
        const maxCount = oldValues.length - startIndex;
        if (count >= maxCount) count = maxCount;
        if (count === 0) return false;
        this.values = new Uint32Array(oldValues.length - count);
        this.values.set(oldValues.subarray(0, startIndex), 0);
        this.values.set(oldValues.subarray(startIndex + count), startIndex);
        this.prefixSum = new Uint32Array(this.values.length);
        if (startIndex - 1 < this.prefixSumValidIndex[0]) this.prefixSumValidIndex[0] = startIndex - 1;
        if (this.prefixSumValidIndex[0] >= 0) this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        return true;
    }
    getTotalSum() {
        if (this.values.length === 0) return 0;
        return this._getPrefixSum(this.values.length - 1);
    }
    /**
     * Returns the sum of the first `index + 1` many items.
     * @returns `SUM(0 <= j <= index, values[j])`.
     */ getPrefixSum(index) {
        if (index < 0) return 0;
        index = (0, $2db288e50eb34b16$export$56cfc59269b52afc)(index);
        return this._getPrefixSum(index);
    }
    _getPrefixSum(index) {
        if (index <= this.prefixSumValidIndex[0]) return this.prefixSum[index];
        let startIndex = this.prefixSumValidIndex[0] + 1;
        if (startIndex === 0) {
            this.prefixSum[0] = this.values[0];
            startIndex++;
        }
        if (index >= this.values.length) index = this.values.length - 1;
        for(let i = startIndex; i <= index; i++)this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
        this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
        return this.prefixSum[index];
    }
    getIndexOf(sum) {
        sum = Math.floor(sum);
        // Compute all sums (to get a fully valid prefixSum)
        this.getTotalSum();
        let low = 0;
        let high = this.values.length - 1;
        let mid = 0;
        let midStop = 0;
        let midStart = 0;
        while(low <= high){
            mid = low + (high - low) / 2 | 0;
            midStop = this.prefixSum[mid];
            midStart = midStop - this.values[mid];
            if (sum < midStart) high = mid - 1;
            else if (sum >= midStop) low = mid + 1;
            else break;
        }
        return new $45864e86f4d1f9bf$export$3654e72327dfb38f(mid, sum - midStart);
    }
}
class $45864e86f4d1f9bf$export$ffe57a9f5f762217 {
    constructor(values){
        this._values = values;
        this._isValid = false;
        this._validEndIndex = -1;
        this._prefixSum = [];
        this._indexBySum = [];
    }
    /**
     * @returns SUM(0 <= j < values.length, values[j])
     */ getTotalSum() {
        this._ensureValid();
        return this._indexBySum.length;
    }
    /**
     * Returns the sum of the first `count` many items.
     * @returns `SUM(0 <= j < count, values[j])`.
     */ getPrefixSum(count) {
        this._ensureValid();
        if (count === 0) return 0;
        return this._prefixSum[count - 1];
    }
    /**
     * @returns `result`, such that `getPrefixSum(result.index) + result.remainder = sum`
     */ getIndexOf(sum) {
        this._ensureValid();
        const idx = this._indexBySum[sum];
        const viewLinesAbove = idx > 0 ? this._prefixSum[idx - 1] : 0;
        return new $45864e86f4d1f9bf$export$3654e72327dfb38f(idx, sum - viewLinesAbove);
    }
    removeValues(start, deleteCount) {
        this._values.splice(start, deleteCount);
        this._invalidate(start);
    }
    insertValues(insertIndex, insertArr) {
        this._values = (0, $970e3d0cfdef18c6$export$214afe3ea4014a58)(this._values, insertIndex, insertArr);
        this._invalidate(insertIndex);
    }
    _invalidate(index) {
        this._isValid = false;
        this._validEndIndex = Math.min(this._validEndIndex, index - 1);
    }
    _ensureValid() {
        if (this._isValid) return;
        for(let i = this._validEndIndex + 1, len = this._values.length; i < len; i++){
            const value = this._values[i];
            const sumAbove = i > 0 ? this._prefixSum[i - 1] : 0;
            this._prefixSum[i] = sumAbove + value;
            for(let j = 0; j < value; j++)this._indexBySum[sumAbove + j] = i;
        }
        // trim things
        this._prefixSum.length = this._values.length;
        this._indexBySum.length = this._prefixSum[this._prefixSum.length - 1];
        // mark as valid
        this._isValid = true;
        this._validEndIndex = this._values.length - 1;
    }
    setValue(index, value) {
        if (this._values[index] === value) // no change
        return;
        this._values[index] = value;
        this._invalidate(index);
    }
}
class $45864e86f4d1f9bf$export$3654e72327dfb38f {
    constructor(index, remainder){
        this.index = index;
        this.remainder = remainder;
        this._prefixSumIndexOfResultBrand = undefined;
        this.index = index;
        this.remainder = remainder;
    }
}


class $d975601e18e74076$export$8ddcd7a150a0536 {
    constructor(uri, lines, eol, versionId){
        this._uri = uri;
        this._lines = lines;
        this._eol = eol;
        this._versionId = versionId;
        this._lineStarts = null;
        this._cachedTextValue = null;
    }
    dispose() {
        this._lines.length = 0;
    }
    get version() {
        return this._versionId;
    }
    getText() {
        if (this._cachedTextValue === null) this._cachedTextValue = this._lines.join(this._eol);
        return this._cachedTextValue;
    }
    onEvents(e) {
        if (e.eol && e.eol !== this._eol) {
            this._eol = e.eol;
            this._lineStarts = null;
        }
        // Update my lines
        const changes = e.changes;
        for (const change of changes){
            this._acceptDeleteRange(change.range);
            this._acceptInsertText(new (0, $52194de676ded133$export$13807d9ee5a34a42)(change.range.startLineNumber, change.range.startColumn), change.text);
        }
        this._versionId = e.versionId;
        this._cachedTextValue = null;
    }
    _ensureLineStarts() {
        if (!this._lineStarts) {
            const eolLength = this._eol.length;
            const linesLength = this._lines.length;
            const lineStartValues = new Uint32Array(linesLength);
            for(let i = 0; i < linesLength; i++)lineStartValues[i] = this._lines[i].length + eolLength;
            this._lineStarts = new (0, $45864e86f4d1f9bf$export$2d08c0c4fc1f0422)(lineStartValues);
        }
    }
    /**
     * All changes to a line's text go through this method
     */ _setLineText(lineIndex, newValue) {
        this._lines[lineIndex] = newValue;
        if (this._lineStarts) // update prefix sum
        this._lineStarts.setValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
    }
    _acceptDeleteRange(range) {
        if (range.startLineNumber === range.endLineNumber) {
            if (range.startColumn === range.endColumn) // Nothing to delete
            return;
            // Delete text on the affected line
            this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.startLineNumber - 1].substring(range.endColumn - 1));
            return;
        }
        // Take remaining text on last line and append it to remaining text on first line
        this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.endLineNumber - 1].substring(range.endColumn - 1));
        // Delete middle lines
        this._lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        if (this._lineStarts) // update prefix sum
        this._lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
    }
    _acceptInsertText(position, insertText) {
        if (insertText.length === 0) // Nothing to insert
        return;
        const insertLines = (0, $88789e6252368c20$export$88c07fe39db9eaa1)(insertText);
        if (insertLines.length === 1) {
            // Inserting text on one line
            this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0] + this._lines[position.lineNumber - 1].substring(position.column - 1));
            return;
        }
        // Append overflowing text from first line to the end of text to insert
        insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
        // Delete overflowing text from first line and insert text on first line
        this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0]);
        // Insert new lines & store lengths
        const newLengths = new Uint32Array(insertLines.length - 1);
        for(let i = 1; i < insertLines.length; i++){
            this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
            newLengths[i - 1] = insertLines[i].length + this._eol.length;
        }
        if (this._lineStarts) // update prefix sum
        this._lineStarts.insertValues(position.lineNumber, newLengths);
    }
}


const $f43d5588392e1d62$export$580478e4fb23c20e = 60000;
class $f43d5588392e1d62$export$4e9625515472fd7 extends (0, $c817ee4fd79558e8$export$252720412a173de) {
    constructor(proxy, modelService, keepIdleModels = false){
        super();
        this._syncedModels = Object.create(null);
        this._syncedModelsLastUsedTime = Object.create(null);
        this._proxy = proxy;
        this._modelService = modelService;
        if (!keepIdleModels) {
            const timer = new (0, $fbb04bd33f70d429$export$3caa92e8dbf2f469)();
            timer.cancelAndSet(()=>this._checkStopModelSync(), Math.round($f43d5588392e1d62$export$580478e4fb23c20e / 2));
            this._register(timer);
        }
    }
    dispose() {
        for(const modelUrl in this._syncedModels)(0, $c817ee4fd79558e8$export$fcfbbcec2cb820d5)(this._syncedModels[modelUrl]);
        this._syncedModels = Object.create(null);
        this._syncedModelsLastUsedTime = Object.create(null);
        super.dispose();
    }
    ensureSyncedResources(resources, forceLargeModels = false) {
        for (const resource of resources){
            const resourceStr = resource.toString();
            if (!this._syncedModels[resourceStr]) this._beginModelSync(resource, forceLargeModels);
            if (this._syncedModels[resourceStr]) this._syncedModelsLastUsedTime[resourceStr] = new Date().getTime();
        }
    }
    _checkStopModelSync() {
        const currentTime = new Date().getTime();
        const toRemove = [];
        for(const modelUrl in this._syncedModelsLastUsedTime){
            const elapsedTime = currentTime - this._syncedModelsLastUsedTime[modelUrl];
            if (elapsedTime > $f43d5588392e1d62$export$580478e4fb23c20e) toRemove.push(modelUrl);
        }
        for (const e of toRemove)this._stopModelSync(e);
    }
    _beginModelSync(resource, forceLargeModels) {
        const model = this._modelService.getModel(resource);
        if (!model) return;
        if (!forceLargeModels && model.isTooLargeForSyncing()) return;
        const modelUrl = resource.toString();
        this._proxy.$acceptNewModel({
            url: model.uri.toString(),
            lines: model.getLinesContent(),
            EOL: model.getEOL(),
            versionId: model.getVersionId()
        });
        const toDispose = new (0, $c817ee4fd79558e8$export$a4767a0b211c710a)();
        toDispose.add(model.onDidChangeContent((e)=>{
            this._proxy.$acceptModelChanged(modelUrl.toString(), e);
        }));
        toDispose.add(model.onWillDispose(()=>{
            this._stopModelSync(modelUrl);
        }));
        toDispose.add((0, $c817ee4fd79558e8$export$aef110c64ebd5f30)(()=>{
            this._proxy.$acceptRemovedModel(modelUrl);
        }));
        this._syncedModels[modelUrl] = toDispose;
    }
    _stopModelSync(modelUrl) {
        const toDispose = this._syncedModels[modelUrl];
        delete this._syncedModels[modelUrl];
        delete this._syncedModelsLastUsedTime[modelUrl];
        (0, $c817ee4fd79558e8$export$fcfbbcec2cb820d5)(toDispose);
    }
}
class $f43d5588392e1d62$export$47e394df62778c71 {
    constructor(){
        this._models = Object.create(null);
    }
    getModel(uri) {
        return this._models[uri];
    }
    getModels() {
        const all = [];
        Object.keys(this._models).forEach((key)=>all.push(this._models[key]));
        return all;
    }
    $acceptNewModel(data) {
        this._models[data.url] = new $f43d5588392e1d62$export$a01c0a0304bc9952((0, $35ec765602f96f4b$export$9156e739aa33e19f).parse(data.url), data.lines, data.EOL, data.versionId);
    }
    $acceptModelChanged(uri, e) {
        if (!this._models[uri]) return;
        const model = this._models[uri];
        model.onEvents(e);
    }
    $acceptRemovedModel(uri) {
        if (!this._models[uri]) return;
        delete this._models[uri];
    }
}
class $f43d5588392e1d62$export$a01c0a0304bc9952 extends (0, $d975601e18e74076$export$8ddcd7a150a0536) {
    get uri() {
        return this._uri;
    }
    get eol() {
        return this._eol;
    }
    getValue() {
        return this.getText();
    }
    findMatches(regex) {
        const matches = [];
        for(let i = 0; i < this._lines.length; i++){
            const line = this._lines[i];
            const offsetToAdd = this.offsetAt(new (0, $52194de676ded133$export$13807d9ee5a34a42)(i + 1, 1));
            const iteratorOverMatches = line.matchAll(regex);
            for (const match of iteratorOverMatches){
                if (match.index || match.index === 0) match.index = match.index + offsetToAdd;
                matches.push(match);
            }
        }
        return matches;
    }
    getLinesContent() {
        return this._lines.slice(0);
    }
    getLineCount() {
        return this._lines.length;
    }
    getLineContent(lineNumber) {
        return this._lines[lineNumber - 1];
    }
    getWordAtPosition(position, wordDefinition) {
        const wordAtText = (0, $f48496f3a13f626f$export$c540f46dd0d97e0f)(position.column, (0, $f48496f3a13f626f$export$c037188f544f512f)(wordDefinition), this._lines[position.lineNumber - 1], 0);
        if (wordAtText) return new (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c)(position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
        return null;
    }
    words(wordDefinition) {
        const lines = this._lines;
        const wordenize = this._wordenize.bind(this);
        let lineNumber = 0;
        let lineText = '';
        let wordRangesIdx = 0;
        let wordRanges = [];
        return {
            *[Symbol.iterator] () {
                while(true)if (wordRangesIdx < wordRanges.length) {
                    const value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
                    wordRangesIdx += 1;
                    yield value;
                } else {
                    if (lineNumber < lines.length) {
                        lineText = lines[lineNumber];
                        wordRanges = wordenize(lineText, wordDefinition);
                        wordRangesIdx = 0;
                        lineNumber += 1;
                    } else break;
                }
            }
        };
    }
    getLineWords(lineNumber, wordDefinition) {
        const content = this._lines[lineNumber - 1];
        const ranges = this._wordenize(content, wordDefinition);
        const words = [];
        for (const range of ranges)words.push({
            word: content.substring(range.start, range.end),
            startColumn: range.start + 1,
            endColumn: range.end + 1
        });
        return words;
    }
    _wordenize(content, wordDefinition) {
        const result = [];
        let match;
        wordDefinition.lastIndex = 0; // reset lastIndex just to be sure
        while(match = wordDefinition.exec(content)){
            if (match[0].length === 0) break;
            result.push({
                start: match.index,
                end: match.index + match[0].length
            });
        }
        return result;
    }
    getValueInRange(range) {
        range = this._validateRange(range);
        if (range.startLineNumber === range.endLineNumber) return this._lines[range.startLineNumber - 1].substring(range.startColumn - 1, range.endColumn - 1);
        const lineEnding = this._eol;
        const startLineIndex = range.startLineNumber - 1;
        const endLineIndex = range.endLineNumber - 1;
        const resultLines = [];
        resultLines.push(this._lines[startLineIndex].substring(range.startColumn - 1));
        for(let i = startLineIndex + 1; i < endLineIndex; i++)resultLines.push(this._lines[i]);
        resultLines.push(this._lines[endLineIndex].substring(0, range.endColumn - 1));
        return resultLines.join(lineEnding);
    }
    offsetAt(position) {
        position = this._validatePosition(position);
        this._ensureLineStarts();
        return this._lineStarts.getPrefixSum(position.lineNumber - 2) + (position.column - 1);
    }
    positionAt(offset) {
        offset = Math.floor(offset);
        offset = Math.max(0, offset);
        this._ensureLineStarts();
        const out = this._lineStarts.getIndexOf(offset);
        const lineLength = this._lines[out.index].length;
        // Ensure we return a valid position
        return {
            lineNumber: 1 + out.index,
            column: 1 + Math.min(out.remainder, lineLength)
        };
    }
    _validateRange(range) {
        const start = this._validatePosition({
            lineNumber: range.startLineNumber,
            column: range.startColumn
        });
        const end = this._validatePosition({
            lineNumber: range.endLineNumber,
            column: range.endColumn
        });
        if (start.lineNumber !== range.startLineNumber || start.column !== range.startColumn || end.lineNumber !== range.endLineNumber || end.column !== range.endColumn) return {
            startLineNumber: start.lineNumber,
            startColumn: start.column,
            endLineNumber: end.lineNumber,
            endColumn: end.column
        };
        return range;
    }
    _validatePosition(position) {
        if (!(0, $52194de676ded133$export$13807d9ee5a34a42).isIPosition(position)) throw new Error('bad position');
        let { lineNumber: lineNumber, column: column } = position;
        let hasChanged = false;
        if (lineNumber < 1) {
            lineNumber = 1;
            column = 1;
            hasChanged = true;
        } else if (lineNumber > this._lines.length) {
            lineNumber = this._lines.length;
            column = this._lines[lineNumber - 1].length + 1;
            hasChanged = true;
        } else {
            const maxCharacter = this._lines[lineNumber - 1].length + 1;
            if (column < 1) {
                column = 1;
                hasChanged = true;
            } else if (column > maxCharacter) {
                column = maxCharacter;
                hasChanged = true;
            }
        }
        if (!hasChanged) return position;
        else return {
            lineNumber: lineNumber,
            column: column
        };
    }
}


// ESM-comment-begin
// const isESM = false;
// ESM-comment-end
// ESM-uncomment-begin
const $8e6c777b1954670c$var$isESM = true;
class $8e6c777b1954670c$export$6b25f3b7776ecb21 {
    constructor(){
        this._workerTextModelSyncServer = new (0, $f43d5588392e1d62$export$47e394df62778c71)();
    }
    dispose() {}
    _getModel(uri) {
        return this._workerTextModelSyncServer.getModel(uri);
    }
    _getModels() {
        return this._workerTextModelSyncServer.getModels();
    }
    $acceptNewModel(data) {
        this._workerTextModelSyncServer.$acceptNewModel(data);
    }
    $acceptModelChanged(uri, e) {
        this._workerTextModelSyncServer.$acceptModelChanged(uri, e);
    }
    $acceptRemovedModel(uri) {
        this._workerTextModelSyncServer.$acceptRemovedModel(uri);
    }
    async $computeUnicodeHighlights(url, options, range) {
        const model = this._getModel(url);
        if (!model) return {
            ranges: [],
            hasMore: false,
            ambiguousCharacterCount: 0,
            invisibleCharacterCount: 0,
            nonBasicAsciiCharacterCount: 0
        };
        return (0, $c91d7eeb099468c6$export$aa7912c6b411d321).computeUnicodeHighlights(model, options, range);
    }
    async $findSectionHeaders(url, options) {
        const model = this._getModel(url);
        if (!model) return [];
        return (0, $ad7ab4131584cdc0$export$42059dc50874a7a3)(model, options);
    }
    // ---- BEGIN diff --------------------------------------------------------------------------
    async $computeDiff(originalUrl, modifiedUrl, options, algorithm) {
        const original = this._getModel(originalUrl);
        const modified = this._getModel(modifiedUrl);
        if (!original || !modified) return null;
        const result = $8e6c777b1954670c$export$4d209bdea507160e.computeDiff(original, modified, options, algorithm);
        return result;
    }
    static computeDiff(originalTextModel, modifiedTextModel, options, algorithm) {
        const diffAlgorithm = algorithm === 'advanced' ? (0, $c9f74792a15b95d6$export$4afac00bc918a16a).getDefault() : (0, $c9f74792a15b95d6$export$4afac00bc918a16a).getLegacy();
        const originalLines = originalTextModel.getLinesContent();
        const modifiedLines = modifiedTextModel.getLinesContent();
        const result = diffAlgorithm.computeDiff(originalLines, modifiedLines, options);
        const identical = result.changes.length > 0 ? false : this._modelsAreIdentical(originalTextModel, modifiedTextModel);
        function getLineChanges(changes) {
            return changes.map((m)=>[
                    m.original.startLineNumber,
                    m.original.endLineNumberExclusive,
                    m.modified.startLineNumber,
                    m.modified.endLineNumberExclusive,
                    m.innerChanges?.map((m)=>[
                            m.originalRange.startLineNumber,
                            m.originalRange.startColumn,
                            m.originalRange.endLineNumber,
                            m.originalRange.endColumn,
                            m.modifiedRange.startLineNumber,
                            m.modifiedRange.startColumn,
                            m.modifiedRange.endLineNumber,
                            m.modifiedRange.endColumn
                        ])
                ]);
        }
        return {
            identical: identical,
            quitEarly: result.hitTimeout,
            changes: getLineChanges(result.changes),
            moves: result.moves.map((m)=>[
                    m.lineRangeMapping.original.startLineNumber,
                    m.lineRangeMapping.original.endLineNumberExclusive,
                    m.lineRangeMapping.modified.startLineNumber,
                    m.lineRangeMapping.modified.endLineNumberExclusive,
                    getLineChanges(m.changes)
                ])
        };
    }
    static _modelsAreIdentical(original, modified) {
        const originalLineCount = original.getLineCount();
        const modifiedLineCount = modified.getLineCount();
        if (originalLineCount !== modifiedLineCount) return false;
        for(let line = 1; line <= originalLineCount; line++){
            const originalLine = original.getLineContent(line);
            const modifiedLine = modified.getLineContent(line);
            if (originalLine !== modifiedLine) return false;
        }
        return true;
    }
    // ---- END diff --------------------------------------------------------------------------
    // ---- BEGIN minimal edits ---------------------------------------------------------------
    static{
        this._diffLimit = 100000;
    }
    async $computeMoreMinimalEdits(modelUrl, edits, pretty) {
        const model = this._getModel(modelUrl);
        if (!model) return edits;
        const result = [];
        let lastEol = undefined;
        edits = edits.slice(0).sort((a, b)=>{
            if (a.range && b.range) return (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).compareRangesUsingStarts(a.range, b.range);
            // eol only changes should go to the end
            const aRng = a.range ? 0 : 1;
            const bRng = b.range ? 0 : 1;
            return aRng - bRng;
        });
        // merge adjacent edits
        let writeIndex = 0;
        for(let readIndex = 1; readIndex < edits.length; readIndex++)if ((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).getEndPosition(edits[writeIndex].range).equals((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).getStartPosition(edits[readIndex].range))) {
            edits[writeIndex].range = (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).fromPositions((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).getStartPosition(edits[writeIndex].range), (0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).getEndPosition(edits[readIndex].range));
            edits[writeIndex].text += edits[readIndex].text;
        } else {
            writeIndex++;
            edits[writeIndex] = edits[readIndex];
        }
        edits.length = writeIndex + 1;
        for (let { range: range, text: text, eol: eol } of edits){
            if (typeof eol === 'number') lastEol = eol;
            if ((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).isEmpty(range) && !text) continue;
            const original = model.getValueInRange(range);
            text = text.replace(/\r\n|\n|\r/g, model.eol);
            if (original === text) continue;
            // make sure diff won't take too long
            if (Math.max(text.length, original.length) > $8e6c777b1954670c$export$4d209bdea507160e._diffLimit) {
                result.push({
                    range: range,
                    text: text
                });
                continue;
            }
            // compute diff between original and edit.text
            const changes = (0, $1ea388bf6703bdba$export$bd89d8a46320fa8b)(original, text, pretty);
            const editOffset = model.offsetAt((0, $e71303feb34bd76c$export$9a58ef0d7ad3278c).lift(range).getStartPosition());
            for (const change of changes){
                const start = model.positionAt(editOffset + change.originalStart);
                const end = model.positionAt(editOffset + change.originalStart + change.originalLength);
                const newEdit = {
                    text: text.substr(change.modifiedStart, change.modifiedLength),
                    range: {
                        startLineNumber: start.lineNumber,
                        startColumn: start.column,
                        endLineNumber: end.lineNumber,
                        endColumn: end.column
                    }
                };
                if (model.getValueInRange(newEdit.range) !== newEdit.text) result.push(newEdit);
            }
        }
        if (typeof lastEol === 'number') result.push({
            eol: lastEol,
            text: '',
            range: {
                startLineNumber: 0,
                startColumn: 0,
                endLineNumber: 0,
                endColumn: 0
            }
        });
        return result;
    }
    // ---- END minimal edits ---------------------------------------------------------------
    async $computeLinks(modelUrl) {
        const model = this._getModel(modelUrl);
        if (!model) return null;
        return (0, $805d79ebadc747f2$export$a3449ac4162db24e)(model);
    }
    // --- BEGIN default document colors -----------------------------------------------------------
    async $computeDefaultDocumentColors(modelUrl) {
        const model = this._getModel(modelUrl);
        if (!model) return null;
        return (0, $c0890e35fe43bd3b$export$e19599ac12bd41fe)(model);
    }
    // ---- BEGIN suggest --------------------------------------------------------------------------
    static{
        this._suggestionsLimit = 10000;
    }
    async $textualSuggest(modelUrls, leadingWord, wordDef, wordDefFlags) {
        const sw = new (0, $d288f1fc58ade510$export$81ce11201617bceb)();
        const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        const seen = new Set();
        outer: for (const url of modelUrls){
            const model = this._getModel(url);
            if (!model) continue;
            for (const word of model.words(wordDefRegExp)){
                if (word === leadingWord || !isNaN(Number(word))) continue;
                seen.add(word);
                if (seen.size > $8e6c777b1954670c$export$4d209bdea507160e._suggestionsLimit) break outer;
            }
        }
        return {
            words: Array.from(seen),
            duration: sw.elapsed()
        };
    }
    // ---- END suggest --------------------------------------------------------------------------
    //#region -- word ranges --
    async $computeWordRanges(modelUrl, range, wordDef, wordDefFlags) {
        const model = this._getModel(modelUrl);
        if (!model) return Object.create(null);
        const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        const result = Object.create(null);
        for(let line = range.startLineNumber; line < range.endLineNumber; line++){
            const words = model.getLineWords(line, wordDefRegExp);
            for (const word of words){
                if (!isNaN(Number(word.word))) continue;
                let array = result[word.word];
                if (!array) {
                    array = [];
                    result[word.word] = array;
                }
                array.push({
                    startLineNumber: line,
                    startColumn: word.startColumn,
                    endLineNumber: line,
                    endColumn: word.endColumn
                });
            }
        }
        return result;
    }
    //#endregion
    async $navigateValueSet(modelUrl, range, up, wordDef, wordDefFlags) {
        const model = this._getModel(modelUrl);
        if (!model) return null;
        const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        if (range.startColumn === range.endColumn) range = {
            startLineNumber: range.startLineNumber,
            startColumn: range.startColumn,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn + 1
        };
        const selectionText = model.getValueInRange(range);
        const wordRange = model.getWordAtPosition({
            lineNumber: range.startLineNumber,
            column: range.startColumn
        }, wordDefRegExp);
        if (!wordRange) return null;
        const word = model.getValueInRange(wordRange);
        const result = (0, $a72518348cf3c27b$export$ffc1829a39e8ccc0).INSTANCE.navigateValueSet(range, selectionText, wordRange, word, up);
        return result;
    }
}
class $8e6c777b1954670c$export$4d209bdea507160e extends $8e6c777b1954670c$export$6b25f3b7776ecb21 {
    constructor(_host, _foreignModuleFactory){
        super();
        this._host = _host;
        this._foreignModuleFactory = _foreignModuleFactory;
        this._foreignModule = null;
    }
    async $ping() {
        return 'pong';
    }
    // ---- BEGIN foreign module support --------------------------------------------------------------------------
    $loadForeignModule(moduleId, createData, foreignHostMethods) {
        const proxyMethodRequest = (method, args)=>{
            return this._host.$fhr(method, args);
        };
        const foreignHost = (0, $828a7683e85b36fa$export$74026ccda580cde9)(foreignHostMethods, proxyMethodRequest);
        const ctx = {
            host: foreignHost,
            getMirrorModels: ()=>{
                return this._getModels();
            }
        };
        if (this._foreignModuleFactory) {
            this._foreignModule = this._foreignModuleFactory(ctx, createData);
            // static foreing module
            return Promise.resolve((0, $828a7683e85b36fa$export$12b7705ad1c6975)(this._foreignModule));
        }
        return new Promise((resolve, reject)=>{
            const onModuleCallback = (foreignModule)=>{
                this._foreignModule = foreignModule.create(ctx, createData);
                resolve((0, $828a7683e85b36fa$export$12b7705ad1c6975)(this._foreignModule));
            };
            if (!$8e6c777b1954670c$var$isESM) require([
                `${moduleId}`
            ], onModuleCallback, reject);
            else {
                const url = (0, $58fba7516e2bbdb8$export$9d9d3e1f87d32a98).asBrowserUri(`${moduleId}.js`).toString(true);
                import(`${url}`).then(onModuleCallback).catch(reject);
            }
        });
    }
    // foreign method request
    $fmr(method, args) {
        if (!this._foreignModule || typeof this._foreignModule[method] !== 'function') return Promise.reject(new Error('Missing requestHandler or method: ' + method));
        try {
            return Promise.resolve(this._foreignModule[method].apply(this._foreignModule, args));
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
function $8e6c777b1954670c$export$185802fd694ee1f5(workerServer) {
    return new $8e6c777b1954670c$export$4d209bdea507160e((0, $6aa97be6c88ef0a3$export$965ed12d2e4ce9f1).getChannel(workerServer), null);
}
if (typeof importScripts === 'function') // Running in a web worker
globalThis.monaco = (0, $ed13337b613772ef$export$560b8701da04ced)();



let $c1246270ee8d2f99$var$initialized = false;
function $c1246270ee8d2f99$export$2a47f398eeff8b01(foreignModule) {
    if ($c1246270ee8d2f99$var$initialized) return;
    $c1246270ee8d2f99$var$initialized = true;
    const simpleWorker = new (0, $121ec0291bdf5ebd$export$fe78f12d00d1b03d)((msg)=>{
        globalThis.postMessage(msg);
    }, (workerServer)=>new (0, $8e6c777b1954670c$export$4d209bdea507160e)((0, $6aa97be6c88ef0a3$export$965ed12d2e4ce9f1).getChannel(workerServer), foreignModule));
    globalThis.onmessage = (e)=>{
        simpleWorker.onmessage(e.data);
    };
}
globalThis.onmessage = (e)=>{
    // Ignore first message in this case and initialize if not yet initialized
    if (!$c1246270ee8d2f99$var$initialized) $c1246270ee8d2f99$export$2a47f398eeff8b01(null);
};


