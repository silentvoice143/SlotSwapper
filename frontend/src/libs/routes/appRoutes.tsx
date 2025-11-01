// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import ProtectedRoutes from "./protectedRoutes";
import MarketPlace from "../pages/marketPlace";
import Requests from "../pages/requests";
import Notifications from "../pages/notifications";
import { useSocket } from "../hooks/useSocket";
import MyCalendar from "../pages/myCalendar";

const AppRoutes = () => {
  useSocket();
  return (
    <Routes>
      {/* Protected routes (require login) */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/my-calendar" element={<MyCalendar />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      {/* Public routes */}
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
