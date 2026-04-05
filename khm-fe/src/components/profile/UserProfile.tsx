export default function UserProfile() {
  const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") as string) : null;


  const names = `${userData.firstName} ${userData.lastName}`;

  return (
    <div>
      <div className='py-6 px-4 sm:p-6 lg:pb-8'>
        <div className='overflow-hidden rounded-lg bg-white'>
          <h2 className='sr-only' id='profile-overview-title'>
            Profile Overview
          </h2>
          <div className='bg-white p-6'>
            <div className='sm:flex sm:items-center sm:justify-between'>
              <div className='sm:flex sm:space-x-5'>
                <div className='flex-shrink-0'>
                  {/* <ProfileAvatar color='#cdbd8e' name='User' size='w-10 h-10' /> */}
                </div>

                <div className='mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left'>
                  <p className='pt-6 text-xl font-bold text-gray-900 sm:text-2xl'>
                    {names}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
