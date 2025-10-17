const md5 = require("md5");
const Account = require("../../models/account.model.js");
const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");

// [GET] /admin/auth/login 
module.exports.login = (req, res) => {
  if (req.cookies.token) {        // nếu đã có token rồi thì không cần đăng nhập nữa
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } else {
      res.render("admin/pages/auth/login.pug", {
      pageTitle: "Trang đăng nhập"
    }); 
  }
};

// [POST] /admin/auth/loginPost
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({ 
    email: email,
    deleted: false  
  });

  if (!user) {
    req.flash("error", "Tài khoản không tồn tại!");
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {       // mk mã hóa user gửi mà KHÔNG trùng mk trong db
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if (user.status == "inactive") {        // nếu qua 2 if bên trên mà bị khóa tài khoản (vi phạm)
    req.flash("error", "Tài khoản đã bị khóa!");
    res.redirect("back");
    return;
  }

  res.cookie("token", user.token);        // res.cookie(name, value)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);      // nếu thành công thì về trang tổng quan
};

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`); 
}