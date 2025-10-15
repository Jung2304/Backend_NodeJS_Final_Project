const md5 = require("md5");
const Account = require("../../models/account.model.js");
const systemConfig = require("../../config/system.js");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };

  const accounts = await Account.find(find).select("-password -token");

  for (const record of accounts) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false 
    });
    record.role = role;       // tạo thêm key role lưu trữ nhóm quyền tương ứng (qtv, ...)
  }

  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    accouts: accounts
  }); 
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo mới tài khoản",
  }); 
};

// [POST] /admin/accounts/createPost
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false
  });

  if (emailExist) {
    req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};