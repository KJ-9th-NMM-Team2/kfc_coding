// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// ===== 추가 부분 =====
import { Routes, Route } from 'react-router-dom';

// 보여줄 페이지 컴포넌트
import HomePage from './pages/HomePage'; // 메인 페이지
import FestivalDetailPage from './pages/FestivalDetailPage'; // 상세 페이지
// =====================

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/festivals/:id" element={<FestivalDetailPage />} />
    </Routes>

  )
}

export default App
