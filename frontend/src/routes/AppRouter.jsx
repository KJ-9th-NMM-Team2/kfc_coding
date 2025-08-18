import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import FestivalListPage from "../pages/FestivalListPage";
import FestivalDetailPage from "../pages/FestivalDetailPage";

function AppRouter() {
  return (
    <Routes>
      {/* 해당 경로가 입력되면, pages의 해당 페이지 컴포넌트를 렌더링함. */}
      <Route path="/" element={<HomePage />} />
      <Route path="/festivals" element={<FestivalListPage />} />
      <Route path="/festivals/:id" element={<FestivalDetailPage />} />
      {/* 경로가 없는 경우 홈페이지로 이동*/}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
