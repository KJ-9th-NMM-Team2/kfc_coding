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
