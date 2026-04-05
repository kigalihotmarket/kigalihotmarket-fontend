import { Dispatch, FC, SetStateAction } from "react";
import { IUser } from "../../types/common";

interface IUserForm {
  user?: IUser;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isView?: boolean;
}

const UserDetails: FC<IUserForm> = ({ user }) => {

  return (
    <form  className='p-1 bg-white'>
      <div className='w-full bg-white p-8 rounded-md'>
        <div className='grid gap-3'>
          <div className={`grid gap-4`}>
            <div className={``}>
              <div className='grid gap-3'>
                <div className='py-2'>
                  <div className='font-bold'>Info </div>
                </div>
                <List
                  label='First Name'
                  value={user?.firstName ?? null}
                />
                <List
                  label='Last Name'
                  value={user?.lastName ?? null}
                />
                <List
                  label='Email'
                  value={user?.email ?? null}
                />
                <List
                  label='Phone number'
                  value={user?.phoneNumber ?? null}
                />
                <List
                  label='Role'
                  value={user?.roles[0].role ?? null}
                />
                <List
                  label='Photo'
                  value={user?.photo ?? null}
                />
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const List = ({ label, value }: { label: string; value: string | null }) => {
  return (
    <div className='grid sm:grid-cols-2 gap-2'>
      <div className='text-gray-500'>{label}</div>
      <div className='text-gray-900'>
        {label === 'Photo' && value ? (
          <img src={value} alt={`${label}`} className='w-16 h-16 rounded-full' />
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default UserDetails;
