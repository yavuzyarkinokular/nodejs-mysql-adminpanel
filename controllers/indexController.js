// database.js dosyasını içe aktarıyoruz. Bu, MySQL veritabanına erişim sağlar.
var database = require("../database");

// Ana sayfayı görüntülemek için kullanılır.
exports.getIndex = (req, res) => {
  res.render("index", { title: "Express", session: req.session });
};

// Kullanıcı girişini işleyen işlev.
exports.login = (req, res) => {
  // İstekten kullanıcı e-posta adresi ve şifresini alıyoruz.
  var user_email_address = req.body.user_email_address;
  var user_password = req.body.user_password;

  // E-posta ve şifre kontrolü.
  if (user_email_address && user_password) {
    // Veritabanından kullanıcıyı sorgulama.
    query = `
      SELECT * FROM user_login 
      WHERE user_email = "${user_email_address}"
    `;

    database.query(query, function (error, data) {
      // Eğer veri bulunursa.
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          // Şifre doğrulama.
          if (data[count].user_password == user_password) {
            // Oturum nesnesine kullanıcı kimliği ekleniyor.
            req.session.user_id = data[count].user_id;

            // Ana sayfaya yönlendiriliyor.
            res.redirect("/");
          } else {
            // Hatalı şifre mesajı gönderiliyor.
            res.send("Incorrect Password");
          }
        }
      } else {
        // Hatalı e-posta adresi mesajı gönderiliyor.
        res.send("Incorrect Email Address");
      }
      res.end();
    });
  } else {
    // Eğer parametreler eksikse mesaj gönderiliyor.
    res.send("Please Enter Email Address and Password Details");
    res.end();
  }
};

// Kullanıcı oturumunu sonlandıran işlev.
exports.logout = (req, res) => {
  // Oturumu sonlandır.
  req.session.destroy();

  // Ana sayfaya yönlendir.
  res.redirect("/");
};
