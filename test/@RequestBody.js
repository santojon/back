"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var request = require('supertest');
var assert = require('assert');
require("mocha");
var bodyParser = require("body-parser");
describe('@RequestBody', function () {
    var Product = /** @class */ (function () {
        function Product(id, label, price) {
            this.id = id;
            this.label = label;
            this.price = price;
        }
        return Product;
    }());
    it('shoul the product', function (done) {
        index_1.Back.reset();
        var ProductController = /** @class */ (function () {
            function ProductController() {
            }
            ProductController.prototype.addProduct = function (req, res, product) {
                assert.deepEqual({ id: 1, label: 'Bimo', price: 45 }, product);
                return 'done';
            };
            __decorate([
                index_1.Post('/'),
                index_1.ResponseBody,
                __param(2, index_1.RequestBody),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [index_1.Request, index_1.Response, Object]),
                __metadata("design:returntype", String)
            ], ProductController.prototype, "addProduct", null);
            ProductController = __decorate([
                index_1.Controller,
                index_1.Route('/product'),
                __metadata("design:paramtypes", [])
            ], ProductController);
            return ProductController;
        }());
        var app = index_1.Back.express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        index_1.Back.prepare(app);
        request(app)
            .post('/product/')
            .send({ id: 1, label: 'Bimo', price: 45 })
            .expect(JSON.stringify('done'), done);
    });
});
