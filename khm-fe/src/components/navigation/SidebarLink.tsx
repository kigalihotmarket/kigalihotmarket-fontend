import { NavLink } from "react-router-dom";
import { SidebarLinkProps } from "../../types/index";

export const SidebarClasses = `w-full flex p-2.5 text-base text-[0.9rem]  hover:text-gray-900 rounded-md space-5 items-center capitalize hover:text-gray-900`;

export const ActiveClass = "text-gray-900 bg-gray-100";
export const InactiveClass = "text-gray-500";

const Sidebar = ({ text, to, Icon }: SidebarLinkProps) => {
  return (
    <div className='flex justify-center mt-2 relative group'>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${SidebarClasses} ${isActive ? ActiveClass : InactiveClass}`
        }
      >
        {Icon}
        <div className='text-md font-base ml-4'>{text}</div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
