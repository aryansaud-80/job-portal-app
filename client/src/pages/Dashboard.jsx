import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='py-5 shadow '>
        <div className='flex flex-wrap justify-between gap-2 px-8 mx-auto'>
          <div className='flex-shrink-0 cursor-pointer min-w-4 min-h-4' onClick={() => navigate('/')}>
            <img src={assets.logo} alt='' className=''/>
          </div>

          <div className='flex items-center gap-5'>
            <p className='text-gray-600 text-md max-sm:hidden'>Welcome, Aryan saud</p>

            <div className='relative flex-shrink-0 cursor-pointer group min-w-2 min-h-2'>
              <img src={assets.microsoft_logo} alt='' className='' />
              <p className='absolute right-0 hidden w-full px-4 py-2 text-center border rounded-lg shadow-lg text-md group-hover:block top-6'>
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full gap-3 mx-auto flex-start max-sm:gap-2'>
        <div className='h-screen border-r-2'>
          <ul className='flex flex-col gap-1'>
            <NavLink
              to='/dashboard/add-job'
              className={({ isActive }) =>
                `flex gap-2 text-lg px-8 py-3 mt-5 max-sm:px-3 ${
                  isActive ? 'bg-blue-100 border-r-4 border-r-blue-600' : ''
                }`
              }
            >
              <img src={assets.add_icon} alt='' className='flex-shrink-0 min-h-5 min-w-5'/>
              <p className='text-gray-600 text-md max-md:hidden'>Add Job</p>
            </NavLink>

            <NavLink
              to='/dashboard/manage-job'
              className={({ isActive }) =>
                `flex gap-2 text-lg px-8 py-3 max-sm:px-3 ${
                  isActive ? 'bg-blue-100 border-r-4 border-r-blue-600' : ''
                }`
              }
            >
              <img src={assets.home_icon} alt='' className='flex-shrink-0 min-w-5 min-h-5'/>
              <p className='text-gray-600 text-md max-md:hidden'>Manage Job</p>
            </NavLink>

            <NavLink
              to='/dashboard/view-application'
              className={({ isActive }) =>
                `flex gap-2 text-lg px-8 py-3 max-sm:px-3 ${
                  isActive ? 'bg-blue-100 border-r-4 border-r-blue-600' : ''
                }`
              }
            >
              <img src={assets.person_tick_icon} alt='' className='flex-shrink-0 min-w-5 min-h-5'/>
              <p className='text-gray-600 text-md max-md:hidden'>View Application</p>
            </NavLink>
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
};
export default Dashboard;
