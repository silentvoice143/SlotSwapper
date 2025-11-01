import React from "react";
import Header from "./header";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { logoutUser } from "@/libs/store/reducers/authSlice";

function PageWithHeader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Sticky header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white">
        <Header onLogout={() => dispatch(logoutUser())} />
      </header>

      {/* Page content */}
      <main className="pt-20 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

export default PageWithHeader;
