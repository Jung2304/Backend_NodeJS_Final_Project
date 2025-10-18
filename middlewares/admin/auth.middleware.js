const systemConfig = require("../../config/system.js");
const Account = require("../../models/account.model.js");
const Role = require("../../models/role.model.js");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);       // nếu kh có cookie thì cho về trang đăng nhập
  } else {
    const user = await Account.findOne({ token: token }).select("-password");

    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);       // nếu cookie kh tồn tại trong DB (kh có user)
    } else {
      const role = await Role.findOne({ 
        role_id: user.role_id,
        deleted: false      
      }).select("title permissions");       // chỉ cần title và permissions

      res.locals.user = user;       // trả user
      res.locals.role = role;       // trả role
      next();
    }
  }
}