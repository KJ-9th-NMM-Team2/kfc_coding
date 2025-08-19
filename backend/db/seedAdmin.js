const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
const bcrypt = require('bcrypt');
require("dotenv").config({ path: "../.env" });

const seedAdmin = async () => { 
    const plainPassword = '1234';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const admin = {
        id: 'admin',
        password: hashedPassword,
    }
    return admin;
};

// DB 연결 및 데이터 삽입
console.log(process.env.DB_CONNECT);
mongoose
    .connect(process.env.DB_CONNECT)
    .then(async () => {
        // seedAdmin() 함수를 호출하여 관리자 객체를 가져옵니다.
        const adminData = await seedAdmin(); 

        await Admin.deleteMany({});
        await Admin.create(adminData);
        console.log("Seed Admin 데이터가 성공적으로 삽입되었습니다.");
    })
    .catch((err) => {
        console.error("DB 연결 또는 데이터 삽입 오류:", err);
    })
    .finally(() => {
        mongoose.disconnect();
    });
