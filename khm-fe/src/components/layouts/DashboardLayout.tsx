import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useAuthHeader } from "react-auth-kit";
import { useEffect } from "react";
import Sidebar from "../navigation/Sidebar";
import TopBar from "../navigation/TopBar";

const DashboardLayout = () => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : null;

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar.opened");
    if (sidebar) {
      sidebar.classList.remove("opened");
    }
  }, [location.pathname]);

  return (
    <main
      id='app_root_cmp'
      className='flex xl:pl-60 min-h-screen'
      accessKey={authHeader()}
    >
        <>
          <aside>
            <Sidebar />
          </aside>
          <aside className='w-full'>
            <div className='flex flex-col space-y-2'>
            {userData && <TopBar user={userData} />}
              <div className='p-2 sm:p-4 border-l border-dashed'>
                <Outlet />
              </div>
            </div>
          </aside>
        </>
    </main>
  );
};

export default DashboardLayout;
