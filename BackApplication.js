"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
function BackApplication(configs) {
    return function (target) {
        index_1.Back.configs = configs;
    };
}
exports.BackApplication = BackApplication;
