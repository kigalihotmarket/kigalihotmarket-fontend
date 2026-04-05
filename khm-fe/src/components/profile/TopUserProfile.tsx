import { Fragment, ReactNode } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  // BuildingLibraryIcon,
  // Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashTop() {
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : null;

  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <>
      <div>
        <div className='flex items-center'>
          <Menu as='div' className='relative-'>
            <div className='flex items-center gap-2'>

              <MenuButton className='flex gap-5 max-w-xs items-center rounded-full  text-sm focus:outline-none  rounded-md p-2'>
                <div className='flex gap-1.5 items-center hidden md:flex'>
                  <span className=' text-sm font-medium text-gray-700 block'>
                    <span className='sr-only'>Open user menu for </span>
                    <span className=' hidden md:block'>
                      Hi, {userData?.lastName ?? "Admin"}
                    </span>
                  </span>
                  <ChevronDownIcon
                    className='hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block'
                    aria-hidden='true'
                  />
                </div>

                <div className='bg-gray-200 shadow-lg rounded-md p-2 text-darkblue'>
                  <ProfileAvatar color='' name='User' size='w-24 h-24' />{" "}
                </div>
              </MenuButton>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <MenuItems className='absolute right-10 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-2xl  focus:outline-none'>
                <MenuItem>
                  <Link
                    label='Profile'
                    onClick={() => navigate("/dashboard/profile")}
                    icon={<UserCircleIcon className='w-6 text-darkblue stroke-1' />}
                  />
                </MenuItem>

                <MenuItem>
                  <Link
                    label='Logout'
                    onClick={() => logout()}
                    icon={<ArrowRightCircleIcon className='w-6 text-gray-700' />}
                  />
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
}

const Link = ({
  onClick,
  label,
  icon,
}: {
  onClick?: () => void;
  label?: string;
  icon: ReactNode;
}) => {
  return (
    <span
      onClick={() => onClick && onClick()}
      className={classNames(
        "block px-5 md:px-2 py-2.5 text-sm text-gray-700 cursor-pointer",
      )}
    >
      <span className='flex items-center gap-3'>
        {icon}
        {label && <p className=''>{label}</p>}
      </span>
    </span>
  );
};
