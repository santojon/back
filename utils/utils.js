"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitCamelCase(target) {
    return target.replace(/([a-z](?=[A-Z]))/g, '$1 ');
}
exports.splitCamelCase = splitCamelCase;
