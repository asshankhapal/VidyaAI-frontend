import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Login/login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/teacher" element={<TeacherDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;