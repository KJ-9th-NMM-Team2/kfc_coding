const asyncHandler = require('express-async-handler');
const express = require('express');
const Admin = require("../models/Admin.js");
const Festival = require("../models/Festival.js");
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require("dotenv").config();


// 이 두 줄을 추가하세요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 모든 업로드 폴더에 대한 정적 파일 서빙을 추가
// app.use('/uploads', express.static('uploads'));

// 통합된 multer 설정
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const folder = '';
            if (file.fieldname === 'poster_url') {
                cb(null, 'uploads/posters/');
            } else if (file.fieldname === 'thumbnail_url') {
                cb(null, 'uploads/thumbnails/');
            } else if (file.fieldname === 'images') {
                cb(null, 'uploads/images/');
            } else {
                return cb(new Error('Unknown field name'), null);
            }

            cb(null, path.join(__dirname, '../../uploads', folder));
        },
        filename: (req, file, cb) => {
            // 파일명 중복 방지를 위해 타임스탬프와 랜덤값 추가
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix, null);
        }
    }),
}).fields([
    { name: 'poster_url', maxCount: 1 },
    { name: 'thumbnail_url', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

// Express 앱 설정 부분에 추가
app.use('/uploads/images', express.static('uploads'));

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
    const {
        name, short_description, description, start_date, end_date, location,
        price, owner, contact, website, region, category
    } = req.body;
    
    // 업로드된 파일들 처리
    let posterPath = null;
    let thumbnailPath = null;
    let imagePaths = [];
    
    console.log(req.body);
    
    if (req.files) {
        // 포스터 이미지 처리
        if (req.files['posterFile'] && req.files['posterFile'][0]) {
            posterPath = `/uploads/posters/${req.files['posterFile'][0].filename}`;
        }
        
        // 썸네일 이미지 처리
        if (req.files['thumbnailFile'] && req.files['thumbnailFile'][0]) {
            thumbnailPath = `/uploads/thumbnails/${req.files['thumbnailFile'][0].filename}`;
        }
        
        // 추가 이미지들 처리
        if (req.files['imageFiles']) {
            imagePaths = req.files['imageFiles'].map(file => 
                `/uploads/images/${file.filename}`
            );
        }
    } else {

    }
    
    // console.log('업로드된 파일들:', {
    //     poster: posterPath,
    //     thumbnail: thumbnailPath,
    //     images: imagePaths
    // });
    if (!posterPath) {
        req.body.poster_url
    }
    
    // 필수 필드 유효성 검사
    if (!name || !location || !region || !category) {
        return res.status(400).json({
            message: "필수 필드(축제명, 개최 장소, 지역, 카테고리)를 모두 입력해주세요."
        });
    }
    
    // 날짜 데이터를 명시적으로 Date 객체로 변환
    const newStartDate = start_date ? new Date(start_date) : null;
    const newEndDate = end_date ? new Date(end_date) : null;
    
    // 날짜 유효성 검사
    if (newStartDate && newEndDate && newStartDate > newEndDate) {
        return res.status(400).json({
            message: "시작 날짜는 종료 날짜보다 이전이어야 합니다."
        });
    }
    console.log("check imagePaths: ",imagePaths);
    
    try {
        // 새로운 축제 도큐먼트 생성
        const newFestival = await Festival.create({
            name,
            short_description,
            description,
            start_date: newStartDate,
            end_date: newEndDate,
            location,
            price: price || 0, // 기본값 설정
            owner,
            contact,
            website,
            poster_url: posterPath ? posterPath : req.body.poster_url, // 업로드된 파일 경로 사용
            thumbnail_url: thumbnailPath ? thumbnailPath : req.body.thumbnail_url, // 업로드된 파일 경로 사용
            images: imagePaths && imagePaths.length > 0 ? imagePaths : typeof req.body.images === 'string' ? req.body.images.split(',') : req.body.images, // 업로드된 이미지 경로들 사용
            region,
            category: Array.isArray(category) ? category.toString() : category, // 배열로 처리
        });
        
        res.status(201).json({
            message: "새로운 축제가 성공적으로 등록되었습니다.",
            festival: newFestival,
        });
    } catch (error) {
        console.error("축제 데이터 생성 중 오류 발생:", error);
        
        // 업로드된 파일들 삭제 (롤백)
        if (req.files) {
            Object.values(req.files).flat().forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error('파일 삭제 실패:', err);
                });
            });
        }
        
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
    upload,
};