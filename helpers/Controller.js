var express = require('express');
const jwt = require('jsonwebtoken')
const ServiceBase = require("../helpers/ServicesBase").ServiceBase
const autoBind = require('auto-bind');
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

    async getAll(req, res, next) {
        try {
            const response = await this.service.getAll(req.query);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.get(id);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }

    async insert(req, res, next) {
        try {
            const response = await this.service.insert(req.body);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.update(id, req.body);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const response = await this.service.delete(id);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
}