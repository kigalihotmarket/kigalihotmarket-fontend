import { useState } from "react";
import AdminSidebar from "@/admin/Sidebar";
import TopBar from "@/components/navigation/TopBar";

const PageContent = ({
  children,
  onSidebarToggle,
}: {
  children: React.ReactNode;
  onSidebarToggle?: (collapsed: boolean) => void;
}) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 750);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    if (onSidebarToggle) {
      onSidebarToggle(collapsed);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar onToggle={handleSidebarToggle} />
      <div
        className={`flex-1 transition-all ${
          isSidebarCollapsed ? "ml-16" : "ml-56"
        }`}
      >
        <TopBar isSidebarCollapsed={isSidebarCollapsed} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default PageContent;
