var express = require("express");
var router = express.Router();

var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", session: req.session });
});

router.post("/login", function (req, res, next) {
  var user_email_address = req.body.user_email_address;

  var user_password = req.body.user_password;

  if (user_email_address && user_password) {
    query = `
        SELECT * FROM user_login 
        WHERE user_email = "${user_email_address}"
        `;

    database.query(query, function (error, data) {
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          if (data[count].user_password == user_password) {
            req.session.user_id = data[count].user_id;

            res.redirect("/");
          } else {
            res.send("Incorrect Password");
          }
        }
      } else {
        res.send("Incorrect Email Address");
      }
      res.end();
    });
  } else {
    res.send("Please Enter Email Address and Password Details");
    res.end();
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();

  res.redirect("/");
});

module.exports = router;
