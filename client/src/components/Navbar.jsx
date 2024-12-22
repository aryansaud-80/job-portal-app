import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import RecruiterLogin from './RecruiterLogin';

const Navbar = () => {
  const navigate = useNavigate();

  const [openPopup, setOpenPopup] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();


  useEffect(() => {
    if (openPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; 
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openPopup]);

  return (
    <div className='py-4 shadow'>
      <div className='container flex justify-between px-6 mx-auto cursor-pointer item-center 2xl:px-20'>
        <img src={assets.logo} alt='' onClick={() => navigate('/')} />
        {user ? (
          <div className='flex items-center gap-4'>
            <Link to={'/applications'} onClick={() => console.log('Hello')}>
              Applied Jobs
            </Link>
            <p className='hidden sm:block'>|</p>
            <p className='hidden sm:block'>Hi, {user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button
              className='text-gray-400'
              onClick={() => setOpenPopup(true)}
            >
              Recruiter Login
            </button>
            <button
              onClick={() => openSignIn()}
              className='px-6 text-white bg-blue-600 rounded-full sm:px-9 sm:py-2'
            >
              Login
            </button>
          </div>
        )}
      </div>

      {openPopup && <RecruiterLogin setOpenPopup={setOpenPopup}/>}
    </div>
  );
};
export default Navbar;
