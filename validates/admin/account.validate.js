//! Validate khi admin tạo tài khoản mới 
module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập họ và tên!");
    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }

  next();
}