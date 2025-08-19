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
    console.log(year, month, day);
    const res = await axios.get(`${API_URL}/festivals/date`, {
      params: { year, month, day },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
