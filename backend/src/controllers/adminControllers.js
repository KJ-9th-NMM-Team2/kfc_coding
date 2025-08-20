const asyncHandler = require('express-async-handler');
const express = require('express');
const Admin = require("../models/Admin.js");
const Festival = require("../models/Festival.js");
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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


// POST /api/admin/
// 새로운 축제 생성
const createFestival = asyncHandler(async (req, res) => {
    console.log("createFestival 접근 성공");

    const {
        name, short_description, description, start_date, end_date, location,
        price, owner, contact, website, poster_url, thumbnail_url, images,
        region, category
    } = req.body;

    // category 배열을 쉼표로 구분된 문자열로 변환

    // 2. 필수 필드 유효성 검사
    if (!name || !location || !region || !category.toString()) {
        return res.status(400).json({
            message: "필수 필드(축제명, 개최 장소, 지역, 카테고리)를 모두 입력해주세요."
        });
    }

    // 3. 날짜 데이터를 명시적으로 Date 객체로 변환
    const newStartDate = start_date ? new Date(start_date) : null;
    const newEndDate = end_date ? new Date(end_date) : null;

    try {
        // 4. Mongoose를 사용하여 데이터베이스에 새로운 축제 도큐먼트 생성
        const newFestival = await Festival.create({
            name,
            short_description,
            description,
            start_date: newStartDate,
            end_date: newEndDate,
            location,
            price,
            owner,
            contact,
            website,
            poster_url,
            thumbnail_url,
            images,
            region,
            category: category.toString(),
        });

        res.status(201).json({
            message: "새로운 축제가 성공적으로 등록되었습니다.",
            festival: newFestival,
        });

    } catch (error) {
        console.error("축제 데이터 생성 중 오류 발생:", error);
        res.status(500).json({
            message: "서버 오류: 축제 데이터를 생성하지 못했습니다.",
            error: error.message
        });
    }
});

const deleateFestival = asyncHandler(async (req, res) => {
    const id = req.params?.id || req.body?.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: '유효하지 않은 ID 입니다.' });
    }

    const deleted = await Festival.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(404).json({ message: '해당 축제를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '삭제되었습니다.', id });
});


module.exports = {
    getAdminLogin,
    authAdminToken,
    createFestival,
    deleateFestival,
};