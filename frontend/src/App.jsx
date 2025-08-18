import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        {/* routes/AppRouter에 따라 페이지 라우팅 */}
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
