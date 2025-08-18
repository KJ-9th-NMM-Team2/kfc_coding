import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import './index.css'
import App from "./App.jsx";
// import FestivalDetailPage from './pages/FestivalDetailPage.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* <FestivalDetailPage /> */}
    </BrowserRouter>
  </StrictMode>
);

// main.jsx 파일은 <App> 만 렌더링, 페이저 전환은 App.jsx 라우터
