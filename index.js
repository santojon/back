"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var container_1 = require("./container");
var http_1 = require("./_http/http");
var utils_1 = require("./utils/utils");
var http_2 = require("./_http/http");
exports.HttpRequestMethod = http_2.HttpRequestMethod;
exports.Request = http_2.Request;
exports.Response = http_2.Response;
var decorators_1 = require("./decorators/decorators");
exports.Controller = decorators_1.Controller;
exports.Get = decorators_1.Get;
exports.Post = decorators_1.Post;
exports.Put = decorators_1.Put;
exports.Delete = decorators_1.Delete;
exports.Route = decorators_1.Route;
exports.RequestBody = decorators_1.RequestBody;
exports.ResponseBody = decorators_1.ResponseBody;
var Service_1 = require("./decorators/Service");
exports.Service = Service_1.Service;
var BackApplication_1 = require("./BackApplication");
exports.BackApplication = BackApplication_1.BackApplication;
var Back = /** @class */ (function () {
    function Back() {
    }
    Back.prepare = function (app) {
        Back.applyConfigs(app);
        for (var controller in container_1.Container.controllerHandlers) {
            var controllerHandler = container_1.Container.controllerHandlers[controller];
            var router = express.Router();
            var _loop_1 = function (method) {
                var methodHandler = controllerHandler.methodsHandlers[method];
                var _httpRequestMethod = methodHandler.httpRequestMethod;
                var httpRequestMethod = '';
                if (_httpRequestMethod === http_1.HttpRequestMethod.GET) {
                    httpRequestMethod = 'get';
                }
                else if (_httpRequestMethod === http_1.HttpRequestMethod.POST) {
                    httpRequestMethod = 'post';
                }
                else if (_httpRequestMethod === http_1.HttpRequestMethod.PUT) {
                    httpRequestMethod = 'put';
                }
                else {
                    httpRequestMethod = 'delete';
                }
                router[httpRequestMethod].call(router, methodHandler.route, function (req, res, next) {
                    methodHandler.call(req, res, next);
                });
            };
            for (var method in controllerHandler.methodsHandlers) {
                _loop_1(method);
            }
            app.use(controllerHandler.route, router);
        }
    };
    // for testing
    Back.reset = function () {
        Back.Container.instances = [];
        Back.Container.controllerHandlers = [];
        Back.Container.components = [];
    };
    Back.applyConfigs = function (app) {
        Back
            .configs
            .use
            .forEach(function (middleware) {
            app.use(middleware);
        });
        for (var setting in Back.configs.set) {
            var _setting = utils_1.splitCamelCase(setting).toLocaleLowerCase();
            app.set(_setting, Back.configs.set[setting]);
        }
    };
    Back.express = express;
    Back.Container = container_1.Container;
    Back.configs = { use: [], set: [] };
    return Back;
}());
exports.Back = Back;
