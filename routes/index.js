var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

var database = require("../database");

/* GET home page. */
router.get("/", indexController.getIndex);

router.post("/login", indexController.login);

router.get("/logout", indexController.logout);

module.exports = router;
