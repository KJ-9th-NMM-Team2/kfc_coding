import axios from "axios";
const API_URL = "/api";

// GET /api/festivals/top5 요청을 보냄.
export async function getFiveFestivals() {
  try {
    const res = await axios.get(`${API_URL}/festivals/top5`);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function authAdminToken(token) {
  try {
    // 2. 요청 시 Authorization 헤더에 토큰을 수동으로 추가합니다.
    await axios.post(
      "/api/admin/authToken",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("admin 환영합니다.");
    return true;
  } catch (error) {
    // 인증 실패 (401 또는 403) 시 로그인 페이지로 리디렉션
    alert("인증에 실패했습니다. 다시 로그인해주세요.");
    return false;
  }
}

// GET /api/festivals/month 요청을 보냄.
export async function getMonthFestivals(year, month) {
  try {
    const res = await axios.get(`${API_URL}/festivals/month`, {
      params: { year, month },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// GET /api/festivals/date 요청을 보냄.
export async function getDateFestivals(date) {
  try {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const res = await axios.get(`${API_URL}/festivals/date`, {
      params: { year, month, day },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
