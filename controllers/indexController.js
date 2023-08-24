// database.js dosyasını içe aktarıyoruz. Bu, MySQL veritabanına erişim sağlar.
var database = require("../database");

// Ana sayfayı görüntülemek için kullanılır.
exports.getIndex = (req, res) => {
  // Oturum bilgisini şablona ileterek "index" sayfasını görüntüler.
  res.render("index", { session: req.session });
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

    // Veritabanı sorgusunu çalıştır.
    database.query(query, function (error, data) {
      // Eğer veri bulunursa.
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          // Şifre doğrulama.
          if (data[count].user_password == user_password) {
            // Oturum nesnesine kullanıcı kimliği ekleniyor.
            req.session.user_id = data[count].user_id;

            // Ana sayfaya yönlendiriliyor.
            res.redirect("/admin"); // Düzeltildi
          } else {
            // Hatalı şifre mesajı gönderiliyor.
            res.send("Yanlış Şifre");
          }
        }
      } else {
        // Hatalı e-posta adresi mesajı gönderiliyor.
        res.send("Hatalı E-posta Adresi");
      }
      res.end();
    });
  } else {
    // Eğer parametreler eksikse mesaj gönderiliyor.
    res.send("Lütfen E-posta Adresi ve Şifre Bilgilerini Girin");
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

// Admin panelini görüntülemek için kullanılır.
exports.getAdminPanel = (req, res) => {
  // Oturum bilgisini şablona ileterek "admin/index" sayfasını görüntüler.
  res.render("admin/index", { session: req.session });
};
