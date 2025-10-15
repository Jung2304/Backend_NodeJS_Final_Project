const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({ 
  role_id: String,
  title: String, 
  description: String,
  permissions: {
    type: Array,
    default: [""]
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});

const Role = mongoose.model("Role", roleSchema, "roles");     // tên model, schema, collection

module.exports = Role;     // export model