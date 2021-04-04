var express = require('express');
const jwt = require('jsonwebtoken')
const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const autoBind = require('auto-bind');
var response = require('../helpers/response');
module.exports = class {
    constructor(service = new ServiceBase()) {
        this.request = express.request
        this.response = express.response
        this.service = service;
        autoBind(this);        
    }
    check_params(fields = [""], body) {
        console.log(fields)
        fields.forEach(element => {
            if (!body[element]) {
                throw `There is no field ${element}`
            }
        });
    }
    static check_params(fields = [""], body) {
        fields.forEach(element => {
            if (!body[element]) {
                throw `There is no field ${element}`
            }
        });
    }
    exist_params(fields = [""], body) {
        fields.forEach(element => {
            if (body[element]) {
                return true
            }
        });
        return false
    }

    check_result_db(result) {
        if (!result.isError()) {
            return response(null, true, 201, result.getData(), result.getMessage())
        } else {
            return response(result.getData(), false, 201, null, result.getMessage())
        }
    }

    async getAll(req, res, next) {
        try {
            let result = await this.service.getAll({})
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async core_getData(req, res, next) {
        try {
            let result = await this.service.core_getData({}, req.body.conditions)
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async get(req, res, next) {
        try {
            const { id } = req.params;

            let result = await this.service.get(id)
            res.send(response(null, true, 200, result.getData(), result.getMessage()))
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async insert(req, res, next) {
        try {            
            let result = await this.service.insert(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;

            let result = await this.service.update(id, req.body)
            if (!result.isError()) {
                res.send(response(null, true, 200, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 200, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            let result = await this.service.delete(id)
            if (!result.isError()) {
                res.send(response(null, true, 200, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 200, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }
}