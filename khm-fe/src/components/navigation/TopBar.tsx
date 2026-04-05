import { Bars3BottomLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import ToggleSidebar from "../../helpers/ToggleSidebar";
import DashTop from "../profile/TopUserProfile";
import { useNavigate } from "react-router-dom";

const TopBar = ({ isSidebarCollapsed }: {isSidebarCollapsed: boolean }) => {
  const router = useNavigate();

  return (
    <>
      <div className='block items-center flex items-center justify-between px-5 py-2 bg-white sticky top-0 z-20 border-b border-dashed'>
        <div className='flex gap-4 items-center'>
          <span
            className='text-xs flex gap-2 items-center p-2 rounded-md text-gray-700 bg-gray-50 border'
            onClick={() => router(-1)}
          >
            <ChevronLeftIcon className='w-3 ' />
            Back
          </span>
        </div>

        <div className='flex justify-center'>
          <DashTop />
        </div>
      </div>
    </>
  );
};

export default TopBar;
