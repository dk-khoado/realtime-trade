var express = require('express');
var router = express.Router();
const auth = require("../helpers/auth_9586")

const core = require('../controllers/CoreController');

router.get("/:model_name", (req, res,next)=>{
    core.getModelByName(req.params.model_name).core_getData(req, res, next)
});

router.post("/:model_name/:id", (req, res,next)=>{
    core.getModelByName(req.params.model_name).update(req, res, next)
});

router.put("/:model_name", (req, res,next)=>{
    core.getModelByName(req.params.model_name).insert(req, res, next)
});

router.delete("/:model_name/:id", (req, res,next)=>{
    core.getModelByName(req.params.model_name).delete(req, res, next)
});

module.exports = router;