// src/routes/PublicRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import { useAppSelector } from "../hooks/useRedux";

const PublicRoutes = () => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) return <Navigate to="/my-calendar" />;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default PublicRoutes;
