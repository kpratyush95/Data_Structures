"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackNode = void 0;
var StackNode = /** @class */ (function () {
    function StackNode(data, next) {
        if (next === void 0) { next = null; }
        this.data = data;
        this.next = next;
    }
    return StackNode;
}());
exports.StackNode = StackNode;
