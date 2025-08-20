import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FestivalListPage from "../pages/FestivalListPage";
import FestivalDetailPage from "../pages/FestivalDetailPage";
import AdminPage from "../pages/AdminPage";
import AdminCreateFestivalPage from "../pages/AdminCreateFestivalPage";
import CalendarPage from "../pages/CalendarPage";
import AdminMainPage from "../pages/AdminMainPage";
import AdminEditFestivalPage from "../pages/AdminEditFestivalPage";

function AppRouter() {
  return (
    <Routes>
      {/* 해당 경로가 입력되면, pages의 해당 페이지 컴포넌트를 렌더링함. */}
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />}></Route>
      <Route path="/festivals" element={<FestivalListPage />} />
      <Route path="/festivals/:id" element={<FestivalDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/mainpage" element={<AdminMainPage />} />
      <Route path="/admin/createFestival" element={<AdminCreateFestivalPage />} />
      <Route path="/admin/editfestivalpage" element={<AdminEditFestivalPage />} />
      {/* 경로가 없는 경우 홈페이지로 이동*/}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
