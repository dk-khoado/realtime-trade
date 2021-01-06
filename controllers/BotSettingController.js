const Controller = require("../helpers/Controller");


class BotSettingController extends Controller {
    constructor(service) {
        super(service);
    }
    async create_group(req, res, next){
        try {
            let result = await this.service.create_Group(req.body)
            if (!result.isError()) {
                res.send(response(null, true, 201, result.getData(), result.getMessage()))

            } else {
                res.send(response(result.getData(), false, 201, null, result.getMessage()))
            }
        } catch (error) {
            res.send(response(error, false, 200, [], result.getMessage()))
        }
    }
}   

module.exports = { BotSettingController }