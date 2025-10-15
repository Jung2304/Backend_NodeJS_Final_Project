const Account = require("../../models/account.model.js");
const systemConfig = require("../../config/system.js");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };

  const accounts = await Account.find(find);

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