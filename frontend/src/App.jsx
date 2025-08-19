import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter"; //AppRouter 임포트
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
      {/* routes/AppRouter에 따라 페이지 라우팅 */}
      <AppRouter />

      <Footer />
    </>
  );
}

export default App;
