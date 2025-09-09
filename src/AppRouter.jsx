import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Login/login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;