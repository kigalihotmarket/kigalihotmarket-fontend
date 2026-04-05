import {
  // BeakerIcon,
  // BuildingOffice2Icon,
  // ChartBarIcon,
  // CurrencyDollarIcon,
  // DocumentCheckIcon,
  // EyeDropperIcon,
  // FolderPlusIcon,
  // ShieldCheckIcon,
  // ShoppingCartIcon,
  // Square3Stack3DIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import SidebarLink from "./SidebarLink";
import ToggleSidebar from "../../helpers/ToggleSidebar";
import { HasPermissionGroup } from "../../helpers/HasPermissionGroup";
// import { IDropdownLink } from "./SidebarDropdownLink";
// import Protected from "../auth/Protected";
// import { HasPermission } from "../../helpers/HasPermission";
import { companyDetails } from "../../assets/Assets";

const Sidebar = () => {
  return (
    <div className='min-h-screen'>
      <div className='sidebar w-60 flex overflow-x-clip flex-col h-full justify-between  duration-300 z-50 sidebar fixed top-0 bottom-0 left-[-300px] xl:left-0 bg-white'>
        <div className='flex min-h-screen flex-col justify-between items-center pt-2 pb-6 w-full h-full'>
          <div className='px-4 flex items-center justify-between mb-8 w-full'>
            <div className='flex gap-4 text-gray-900 pt-4'>
              <img src={companyDetails.logo} alt='Eja Real Estate Ltd' className='w-12 h-auto' />
              <div className=' flex flex-col'>
                <div className='font-bold text-md text-darkblue truncate w-28'>
                  EJA REAL ESTATE LTD
                </div>
              </div>
            </div>
            <button onClick={() => ToggleSidebar()} className='xl:hidden'>
              <XCircleIcon className='w-6 text-gray-600' />
            </button>
          </div>

          <div className='py-2 h-full overflow-y-auto w-full px-4 flex flex-col gap-1'>
            {/* <div className='border border-gray-100 mb-6'> </div> */}

            {/* <SidebarLink
              text='Dashboard'
              to='/'
              Icon={<ChartBarIcon className='w-5 stroke-2' />}
            /> */}

            {/* {HasPermissionGroup("ADMIN") && ( */}
              <SidebarLink
                text='Users'
                to='/admin/users'
                Icon={<UsersIcon className='w-5 stroke-2' />}
              />
            {/* )}  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
