const express = require("express");
const validate = require("express-validation");
const { controllerAdm } = require("../../loaders/administradora/dependencyInjector.administradora");



const router = express.Router();


router
.route("/planes/:idAdm")
.get((req, res,next) => controllerAdm.planesAdministradora(req, res,next) )


module.exports = router;