import { Back, Controller, Get, Route, Request, Response } from '../index'
const request = require('supertest')
const assert = require('assert')
import 'mocha'
import bodyParser = require('body-parser')

describe('@Route', () => {
    it('should return value', done => {
        Back.reset()

        @Controller
        @Route('/product')
        class ProductController {
            constructor() {}

            @Get('/')
            someMethod(req: Request, res: Response) {
                res.end('done')
            }
        }

        let app = Back.express()

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))

        Back.prepare(app)
        request(app)
            .get('/product')
            .expect('done', done)
    })

    it('should return value', done => {
        Back.reset()

        @Controller
        @Route('/product')
        class ProductController {
            constructor() {}

            @Get('/deals/')
            otherMethod(req: Request, res: Response) {
                res.end('done')
            }
        }

        let app = Back.express()

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))

        Back.prepare(app)
        request(app)
            .get('/product/deals')
            .expect('done', done)
    })
})
