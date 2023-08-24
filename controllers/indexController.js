// Importing the database.js file, which provides access to the MySQL database.
var database = require("../database");

// Used to display the main page.
exports.getIndex = (req, res) => {
  res.render("index", { title: "Express", session: req.session });
};

// Function that handles user login.
exports.login = (req, res) => {
  // Retrieving user email address and password from the request.
  var user_email_address = req.body.user_email_address;
  var user_password = req.body.user_password;

  // Email and password validation.
  if (user_email_address && user_password) {
    // Query the database for the user.
    query = `
      SELECT * FROM user_login 
      WHERE user_email = "${user_email_address}"
    `;

    database.query(query, function (error, data) {
      // If data is found.
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          // Password verification.
          if (data[count].user_password == user_password) {
            // Add the user's ID to the session object.
            req.session.user_id = data[count].user_id;

            // Redirect to the main page.
            res.redirect("/");
          } else {
            // Send an incorrect password message.
            res.send("Incorrect Password");
          }
        }
      } else {
        // Send an incorrect email address message.
        res.send("Incorrect Email Address");
      }
      res.end();
    });
  } else {
    // If parameters are missing, send a message.
    res.send("Please Enter Email Address and Password Details");
    res.end();
  }
};

// Function to end the user session.
exports.logout = (req, res) => {
  // Terminate the session.
  req.session.destroy();

  // Redirect to the main page.
  res.redirect("/");
};
