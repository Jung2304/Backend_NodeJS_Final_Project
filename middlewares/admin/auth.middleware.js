const systemConfig = require("../../config/system.js");
const Account = require("../../models/account.model.js");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);       // nếu kh có cookie thì cho về trang đăng nhập
  } else {
    const user = await Account.findOne({ token: token });

    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);       // nếu cookie kh tồn tại (kh có user)
    } else {
      next();
    }
  }
}