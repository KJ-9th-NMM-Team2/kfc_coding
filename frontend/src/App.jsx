import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// ===== 추가 부분 =====
import { Routes, Route } from 'react-router-dom';

// 보여줄 페이지 컴포넌트
//import HomePage from './pages/HomePage'; // 메인 페이지
import FestivalDetailPage from './pages/FestivalDetailPage'; // 상세 페이지
// =====================

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <Routes>
      <Route path="/" element={<FestivalDetailPage />} />
      <Route path="/festivals/:id" element={<FestivalDetailPage />} />
    </Routes>

  )
}

export default App
