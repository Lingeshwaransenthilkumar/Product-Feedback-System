import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import Home from "./pages/home/Home";
import FeedbackDetail from "./pages/FeedbackDetails/FeedbackDetail";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Home />} />
         <Route path="/feedback/:id" element={<FeedbackDetail />} />
         <Route path="/admin" element={<AdminDashboard />} />
        {/* redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
