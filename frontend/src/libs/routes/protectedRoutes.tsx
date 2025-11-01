import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
import PageWithHeader from "../components/layout/pageWithHeader";

const ProtectedRoutes = () => {
  const { token } = useAppSelector((state) => state.auth);

  return token ? (
    <PageWithHeader>
      <Outlet />
    </PageWithHeader>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
