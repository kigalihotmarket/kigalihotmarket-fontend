import PageContent from "@/components/layouts/PageContent";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <PageContent>
      <Outlet />
    </PageContent>
  );
};

export default AdminLayout;
