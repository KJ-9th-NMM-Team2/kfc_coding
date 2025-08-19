const asyncHandler = require('express-async-handler');
const express = require('express');
const Admin = require("../models/Admin.js");
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
require("dotenv").config();


// 이 두 줄을 추가하세요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /api/admin/
// admin의 id, pw 검증
const getAdminLogin = asyncHandler(async (req, res) => {
    const { id, password } = req.body;
    console.log("check id: ", id);
    console.log("check password: ", password);

    if (!id || !password) {
        return res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요." });
    }

    const admin = await Admin.findOne({ id });
    console.log("check admin: ", admin);

    if (!admin) {
        return res.status(401).json({ message: "아이디 혹은 비밀번호가 일치하지 않습니다." });
    }

    // 비밀번호는 bcrypt 같은 해시 알고리즘
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        return res.status(401).json({ message: "아이디 혹은 비밀번호가 일치하지 않습니다." });
    }

    // 3. 로그인 성공 시 JWT 생성
    const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
});

// POST /api/admin/
// admin의 token 검증
const authAdminToken = asyncHandler(async (req, res) => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 이렇게 설정했던 것을 검증
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // 토큰 없음

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // 토큰 유효하지 않음
        res.status(200).json({ message: '인증되었습니다. admin 페이지에 접근할 수 있습니다.', user });
    });
});


module.exports = { 
    getAdminLogin,
    authAdminToken,
}