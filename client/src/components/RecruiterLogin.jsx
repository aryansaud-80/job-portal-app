import { useState } from 'react';
import { assets } from '../assets/assets';

const RecruiterLogin = ({setOpenPopup}) => {
  const [state, setState] = useState('signup');
  const [recruiterData, setRecruiterData] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [companyImage, setCompanyImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === 'signup') {
      setNextStep(true);
      return;
    }
    console.log(recruiterData);
  };

  return (
    <div className='container absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full px-10 py-10 mx-auto '>

        <div className='absolute z-50 cursor-pointer top-[166px] right-[480px] bg-gray-100 rounded-full size-4 flex items-center justify-center'
        onClick={()=> setOpenPopup(false)}
        >
          <img  className='size-10' src={assets.cross_icon} alt='' />
        </div>
      
      <div className='z-10 flex flex-col items-center gap-4 p-4 bg-white border rounded-lg shadow-2xl'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-medium'>Recruiter {state}</h1>
          <p className='text-gray-500 text-md'>
            Welcome back ! Please {state === 'login' ? 'sign in' : 'sign up'} to
            continue
          </p>
        </div>

        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          {state === 'signup' && nextStep ? (
            <div className='mb-4'>
              <label
                htmlFor='uploadCompanyImg'
                className='flex items-center gap-2'
              >
                <input
                  type='file'
                  accept='image/jpeg, image/png, image/gif'
                  id='uploadCompanyImg'
                  hidden
                  onChange={(e) => setCompanyImage(e.target.files[0])}
                  required
                />

                <img
                  src={
                    companyImage
                      ? URL.createObjectURL(companyImage)
                      : assets.upload_area
                  }
                  alt=''
                  className='rounded-full size-16'
                />
                <p className='text-xl'>Upload Company Logo</p>
              </label>
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {state === 'signup' && (
                <div className='flex items-center gap-4 px-4 py-2 bg-transparent border rounded-full'>
                  <img src={assets.person_icon} alt='' />
                  <input
                    type='text'
                    placeholder='Company Name'
                    className='bg-transparent outline-none'
                    value={recruiterData.name}
                    onChange={(e) =>
                      setRecruiterData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              )}
              <div className='flex items-center gap-4 px-4 py-2 bg-transparent border rounded-full'>
                <img src={assets.email_icon} alt='' />
                <input
                  type='email'
                  placeholder='email'
                  className='bg-transparent outline-none'
                  value={recruiterData.email}
                  onChange={(e) =>
                    setRecruiterData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className='flex items-center gap-4 px-4 py-2 bg-transparent border rounded-full'>
                <img src={assets.lock_icon} alt='' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='password'
                  className='bg-transparent outline-none'
                  value={recruiterData.password}
                  onChange={(e) =>
                    setRecruiterData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
                <img
                  src={showPassword ? assets.open_pass : assets.close_pass}
                  alt=''
                  onClick={() => setShowPassword(!showPassword)}
                  className='bg-gray-300 rounded-full size-5'
                />
              </div>
            </div>
          )}

          {state === 'login' && (
            <p className='text-sm text-blue-600 cursor-pointer'>Forgot password?</p>
          )}

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-600 rounded-full'
          >
            {state === 'login' ? 'Login' : nextStep ? 'create account' : 'Next'}
          </button>
        </form>

        {state === 'signup' && (
          <p className='flex items-center gap-3'>
            Already have an account?
            <span
              className='text-blue-600 cursor-pointer'
              onClick={() => setState('login')}
            >
              Login
            </span>
          </p>
        )}

        {state === 'login' && (
          <p className='flex items-center gap-3 text-gray-600'>
            Don&apos;t have an account?
            <span
              className='text-blue-600 cursor-pointer'
              onClick={() => setState('signup')}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>

  );
};
export default RecruiterLogin;
