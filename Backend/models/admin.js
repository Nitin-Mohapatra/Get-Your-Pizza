const mongoose = require('mongoose')
const {Schema} = mongoose

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;