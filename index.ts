import * as express from 'express'
import { Container } from './container'
import { HttpRequestMethod } from './_http/http'
import { splitCamelCase } from './utils/utils'
export { HttpRequestMethod, Request, Response } from './_http/http'
export { Controller, Get, Post, Put, Delete, Route, RequestBody, ResponseBody } from './decorators/decorators'
export { Service } from './decorators/Service'
export { BackApplication } from './BackApplication'

export class Back {
    static express = express
    static Container = Container
    static configs = { use: [], set: [] }

    static prepare(app) {
        Back.applyConfigs(app)

        for (let controller in Container.controllerHandlers) {
            let controllerHandler = Container.controllerHandlers[controller]
            let router = express.Router()

            for (let method in controllerHandler.methodsHandlers) {
                let methodHandler = controllerHandler.methodsHandlers[method]
                let _httpRequestMethod = methodHandler.httpRequestMethod
                let httpRequestMethod = ''

                if (_httpRequestMethod === HttpRequestMethod.GET) {
                    httpRequestMethod = 'get'
                }
                else if (_httpRequestMethod === HttpRequestMethod.POST) {
                    httpRequestMethod = 'post'
                }
                else if (_httpRequestMethod === HttpRequestMethod.PUT) {
                    httpRequestMethod = 'put'
                }
                else {
                    httpRequestMethod = 'delete'
                }

                router[httpRequestMethod].call(router, methodHandler.route, (req, res, next) => {
                    methodHandler.call(req, res, next)
                })
            }

            app.use(controllerHandler.route, router)
        }
    }
    // for testing
    static reset() {
        Back.Container.instances = []
        Back.Container.controllerHandlers = []
        Back.Container.components = []
    }

    static applyConfigs(app) {
        Back
            .configs
            .use
            .forEach(middleware => {
                app.use(middleware)
            })
        for (let setting in Back.configs.set) {
            let _setting = splitCamelCase(setting).toLocaleLowerCase()
            app.set(_setting, Back.configs.set[setting])
        }
    }
}