const Role = require("../../models/role.model.js");


// [GET] /admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  };

  const roles = await Role.find(find);

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    roles: roles
  }); 
};

// [GET] /admin/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền"
  }); 
};

// [POST] /admin/createPost
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();

};

