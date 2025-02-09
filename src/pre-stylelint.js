if (!Array.prototype.findLastIndex) {
    Array.prototype.findLastIndex = function (predicate, thisArg) {
        if (this == null) {
            throw new TypeError('Array.prototype.findLastIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        const list = Object(this);
        const length = list.length >>> 0;
        for (let i = length - 1; i >= 0; i--) {
            if (predicate.call(thisArg, list[i], i, list)) {
                return i;
            }
        }
        return -1;
    };
}