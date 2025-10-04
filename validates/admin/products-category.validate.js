//! Validate tiêu đề khi tạo danh mục mới 
module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề danh mục!");
    res.redirect("back");
    return;
  }

  next();
}