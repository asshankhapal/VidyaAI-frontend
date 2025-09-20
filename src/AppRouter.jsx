import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import LoginPage from "./components/Login/login";  
import AdminDashboard from "./components/Admin/AdminDashboard";
import TeacherDashboard from "./components/Teacher/TeacherDashboard";
import SignupPage from "./components/Signup/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import InstantKBmode from "./components/InstantKnowledgeMode/InstantKBmode";
import ProfileDetails from "./components/ShowProfile/ProfileDetails";
import EduVisualAidGenerator from "./components/VisualAid/VisualAid";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={ <ProtectedRoute> <TeacherDashboard /></ProtectedRoute>}/>
        <Route path="/instantkb" element={ <ProtectedRoute> <InstantKBmode /></ProtectedRoute>}/>
        <Route path="/profile" element={ <ProtectedRoute> <ProfileDetails /></ProtectedRoute>}/>
        <Route path="/visual-aid" element={ <ProtectedRoute> <EduVisualAidGenerator /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
