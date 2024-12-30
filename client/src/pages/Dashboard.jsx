import { Outlet, useNavigate, NavLink} from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    loginRecruiterData,
    BACKEND_URL,
    setLoginRecruiterData,
    setIsRecruiterLoggedIn,
    setIsLoading,
    isLoading,
  } = useContext(AppContext);

  const logoutRecruiter = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${BACKEND_URL}/api/v1/company/logout`);

      console.log(data);
      if (data.success) {
        navigate('/');
        setLoginRecruiterData({});
        setIsRecruiterLoggedIn(false);
        toast.success(data.message);
        setIsLoading(false);
        localStorage.removeItem('isLogin');
      } else {
        toast.error(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className='py-5 shadow '>
        <div className='flex flex-wrap justify-between gap-2 px-8 mx-auto'>
          <div
            className='flex-shrink-0 cursor-pointer min-w-4 min-h-4'
            onClick={() => navigate('/')}
          >
            <img src={assets.logo} alt='' className='' />
          </div>

          <div className='flex items-center gap-5'>
            <p className='text-gray-600 text-md max-sm:hidden'>
              Welcome, {loginRecruiterData.name}
            </p>

            <div className='relative flex-shrink-0 cursor-pointer group min-w-2 min-h-2'>
              <img
                src={loginRecruiterData.companyImage}
                alt=''
                className='rounded-full size-10'
              />
              <div className='absolute hidden  text-center text-white bg-gray-400 border rounded-lg shadow-lg right-2 text-md group-hover:block top-10 w-[200px]'>
                <p
                  className='px-4 py-2 hover:bg-red-100'
                  onClick={() => logoutRecruiter()}
                  disabled={isLoading}
                >
                  Logout
                </p>
                <p className='px-4 py-2 hover:bg-red-100' disabled={isLoading}>
                  Delete Account
                </p>
              </div>
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
              <img
                src={assets.add_icon}
                alt=''
                className='flex-shrink-0 min-h-5 min-w-5'
              />
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
              <img
                src={assets.home_icon}
                alt=''
                className='flex-shrink-0 min-w-5 min-h-5'
              />
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
              <img
                src={assets.person_tick_icon}
                alt=''
                className='flex-shrink-0 min-w-5 min-h-5'
              />
              <p className='text-gray-600 text-md max-md:hidden'>
                View Application
              </p>
            </NavLink>
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
};
export default Dashboard;
