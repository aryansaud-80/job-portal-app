import { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = ()=>{
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });


    setIsSearched(true);
  }

  return (
    <div className='px-10 py-10 mx-auto max-w-7xl'>
      <div className='flex flex-col flex-wrap items-center justify-center w-full px-4 py-16 text-center text-white bg-purple-900 rounded-lg max-sm:px-0'>
        <h1 className='mb-2 text-2xl font-bold sm:text-4xl'>
          Over 10,000+ jobs to apply
        </h1>
        <p className='max-w-xl px-5 mx-auto mb-8 text-sm font-light text-center'>
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>

        <div className='flex items-center justify-between px-2 py-1 mx-2 bg-white rounded-lg sm:gap-10'>
          <div className='flex items-center w-3/5 gap-2'>
            <img src={assets.search_icon} alt='' />
            <input
              className='w-full px-2 py-2 text-gray-600 bg-transparent rounded outline-none'
              type='text'
              ref={titleRef}
              placeholder='Search for jobs'
            />
          </div>
          <div className='flex items-center w-2/5 gap-2'>
            <img src={assets.location_icon} alt='' />
            <input
              className='w-full px-2 py-2 text-gray-600 bg-transparent rounded outline-none'
              type='text'
              ref={locationRef}
              placeholder='Location'
            />
          </div>

          <button onClick={onSearch} className='px-3 py-2 bg-blue-600 rounded-md sm:py-2 sm:px-10'>
            Search
          </button>
        </div>
      </div>

      <div className='w-full p-5 mt-5 border border-gray-200 rounded shadow'>
        <div className='flex flex-wrap gap-10 text-center bg-white rounded-lg justify-normal lg:gap-16'>
          <p className='text-lg font-light text-gray-900'>Trusted By</p>
          <img className='h-6' src={assets.adobe_logo} alt='' />
          <img className='h-6' src={assets.walmart_logo} alt='' />
          <img className='h-6' src={assets.microsoft_logo} alt='' />
          <img className='h-6' src={assets.accenture_logo} alt='' />
          <img className='h-6' src={assets.samsung_logo} alt='' />
          <img className='h-6' src={assets.amazon_logo} alt='' />
        </div>
      </div>
    </div>
  );
};
export default Hero;
