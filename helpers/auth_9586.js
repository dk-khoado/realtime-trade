const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const response = require("../helpers/response")
const asios = require("axios").default
module.exports = async function (req, res, next) {
    try {
        if (!req.header('Authorization')) {
            throw "do not have Authorization"
        }
        var token = req.header('Authorization').replace('Bearer ', '')
        if (token == process.env.API_KEY) {
            return next()
        }
        let url = process.env.API_CORE_URL || "https://api.9586team.xyz"
        let result = await asios.get(url + `/api/account/validateTokenLogin?token=${token}`, { method: "GET" })
        if (result.data.is_success == true) {          
            next()
        } else {
            throw result.data.message
        }
    } catch (error) {
        return res.send(response(error, false, 401, null,"you don`t have permission!"))
    }
}