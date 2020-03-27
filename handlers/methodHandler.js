"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../_http/http");
var container_1 = require("../container");
/**
 * @wahtItDoes holds all information about the method of a controller
 */
var MethodHandler = /** @class */ (function () {
    function MethodHandler() {
        this.hasResponseBodyDecorator = false;
        this.requestBodyParams = [];
    }
    MethodHandler.prototype.call = function (req, res, next) {
        var controller = container_1.Container.get(this.controller);
        var method = controller[this.methodName];
        var paramsValues = this.getparamsValues(req, res);
        var dataToBeSent = method.call.apply(method, __spreadArrays([controller], paramsValues));
        if (this.hasResponseBodyDecorator) {
            this.sendData(res, dataToBeSent);
        }
    };
    MethodHandler.prototype.getparamsValues = function (req, res) {
        var paramsValues = [];
        for (var i = 0; i < this.paramsNames.length; i++) {
            paramsValues[i] = this.getParamValue(this.paramsNames[i], this.paramsTypes[i], req, res);
        }
        return paramsValues;
    };
    MethodHandler.prototype.getParamValue = function (paramName, paramType, req, res) {
        if (this.requestBodyParams[paramName]) {
            return req.body;
        }
        else if (paramType === http_1.Request) {
            return req;
        }
        else if (paramType === http_1.Response) {
            return res;
        }
        else {
            return req.params[paramName] || req.body[paramName] || req.query[paramName];
        }
    };
    MethodHandler.prototype.sendData = function (res, data) {
        if (data instanceof Promise) {
            data.then(function (dataToBeSent) {
                res.json(dataToBeSent);
            });
        }
        else {
            res.json(data);
        }
    };
    MethodHandler.prototype.isRequest = function (param) {
        return param.baseUrl !== undefined && param.method !== undefined;
    };
    MethodHandler.prototype.isResponse = function (param) {
        return param.send !== undefined && param.end !== undefined;
    };
    return MethodHandler;
}());
exports.MethodHandler = MethodHandler;
