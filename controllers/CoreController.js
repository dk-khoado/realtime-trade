const Controller = require("../helpers/Controller");
var response = require('../helpers/response');
var Service = require('../services/CoreService').CoreService
const mongoose = require('mongoose')

class Core extends Controller {
    constructor(service) {
        super(service);
    }
}
module.exports = {
    getModelByName: (model_name) => {
        return new Core(new Service(mongoose.model(model_name)))
    }
}