const Role = require("../../models/role.model.js");
const systemConfig = require("../../config/system.js");

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

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền"
  }); 
};

// [POST] /admin/roles/createPost
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();

};

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    let find = {
      _id: id,
      deleted: false
    }
    
    const data = await Role.findOne(find);

    res.render("admin/pages/roles/create.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data
    }); 
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);      // cập nhật nguyên cả body
  } catch (error) {
    console.log("Error: " + error);
  }
  res.redirect("back");
};

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false
  }

  const permissions = await Role.find(find);

  res.render("admin/pages/roles/permissions.pug", {
    pageTitle: "Phân quyền",
    permissions: permissions
  });
};

// [PATCH] /admin/roles/permissionsPatch
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);     // FE trả về object, phải vào key permissions
  
    //< for..of lặp qua các object và lưu 
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }

    req.flash("success", "Cập nhật phân quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật phân quyền không thành công!");
  }
  res.redirect("back");
};
