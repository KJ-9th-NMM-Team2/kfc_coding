import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
// import FestivalDetailPage from './pages/FestivalDetailPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <FestivalDetailPage /> */}
  </StrictMode>,
)