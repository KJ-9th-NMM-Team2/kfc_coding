const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        description: '관리자 아이디',
    },
    password: {
        type: String,
        required: true,
        description: '관리자 비밀번호',
    },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;