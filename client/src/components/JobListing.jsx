import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import FilterCategories from './FilterCategories';
import FilterLocation from './FilterLocation';
import JobCards from './JobCards';
import axios from 'axios';

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs, setJobs } =
    useContext(AppContext);
    // console.log(jobs);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handlePage = (type) => {
    switch (type) {
      case 'prev':
        setPage(Math.max(page - 1, 1));
        break;
      case 'next':
        setPage(Math.min(page + 1, Math.ceil(jobs.length / 6)));
        break;
      default:
        break;
    }
  };

  const [filterData, setFilterData] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByLocation, setFilterByLocation] = useState([]);

  // console.log(filterByCategory, filterByLocation);

  useEffect(() => {
    let matchedCategory = (jobs) =>
      filterByCategory.length === 0 || filterByCategory.includes(jobs.category);

    let matchedLocation = (jobs) =>
      filterByLocation.length === 0 || filterByLocation.includes(jobs.location);

    let matchedSearchTitle = (jobs) =>
      searchFilter.title === '' ||
      jobs.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    let matchedSearchLocation = (jobs) =>
      searchFilter.location === '' ||
      jobs.location.toLowerCase().includes(searchFilter.location.toLowerCase());


    setFilterData(
      jobs.slice().reverse().filter(
        (job) =>
          matchedCategory(job) &&
          matchedLocation(job) &&
          matchedSearchTitle(job) &&
          matchedSearchLocation(job)
      )
    );

    setPage(1);
  },[jobs, filterByCategory, filterByLocation, searchFilter]);

  return (
    <div
      id='job-list'
      className='flex px-10 py-4 mx-auto max-w-7xl max-lg:flex-col'
    >
      <div className='flex flex-col gap-5'>
        {isSearched &&
          (searchFilter.title !== '' || searchFilter.location !== '') && (
            <>
              <h2 className='text-lg font-medium'>Current Search</h2>
              <div className='flex flex-wrap gap-4 max-sm:flex-wrap sm:gap-2'>
                {searchFilter.title !== '' && (
                  <div className='flex items-center justify-between gap-2 px-6 py-1 text-lg text-gray-600 bg-blue-200 border border-blue-300 rounded'>
                    <p className='text-sm'>{searchFilter.title}</p>
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: '' }))
                      }
                      src={assets.cross_icon}
                      alt=''
                    />
                  </div>
                )}

                {searchFilter.location !== '' && (
                  <div className='flex items-center justify-between gap-2 px-6 py-1 text-lg text-gray-600 bg-red-200 border border-red-300 rounded'>
                    <p className='text-sm'>{searchFilter.location}</p>
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: '' }))
                      }
                      src={assets.cross_icon}
                      alt=''
                    />
                  </div>
                )}
              </div>
            </>
          )}

        <button
          className='w-24 px-6 py-2 mb-2 text-xl font-medium border border-gray-400 rounded lg:hidden'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? 'Close' : 'Filters'}
        </button>
        <div
          className={`flex flex-col gap-4  w-60 ${
            isFilterOpen ? 'block' : 'max-lg:hidden'
          }`}
        >
          <div>
            <h1 className='text-lg font-medium sm:mb-2'>
              Search By Categories
            </h1>
            {JobCategories.map((category, index) => (
              <FilterCategories
                category={category}
                key={index}
                filterByCategory={filterByCategory}
                setFilterByCategory={setFilterByCategory}
              />
            ))}
          </div>

          <div>
            <h1 className='text-lg font-medium sm:mb-2'>Search By Location</h1>
            {JobLocations.map((location, index) => (
              <FilterLocation
                location={location}
                key={index}
                filterByLocation={filterByLocation}
                setFilterByLocation={setFilterByLocation}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-medium max-lg:mt-3'>Latest jobs</h1>
          <p className='text-base text-gray-600'>
            Get your desired job from top companies
          </p>
        </div>

        <div className='grid grid-cols-1 gap-5 py-5 md:grid-cols-2 xl:grid-cols-3'>
          {filterData.slice((page - 1) * 6, page * 6).map((job, index) => (
            <JobCards job={job} key={index} />
          ))}
        </div>
        
        {jobs.length > 0 && (
          <div className='flex items-center justify-center gap-5'>
            <a href='#job-list' onClick={() => handlePage('prev')}>
              <img src={assets.left_arrow_icon} alt='' />
            </a>

            {Array.from({ length: Math.ceil(filterData.length / 6) }).map(
              (_, index) => (
                <a
                  href='#job-list'
                  key={index}
                  onClick={() => setPage(index + 1)}
                >
                  <button
                    className={`px-4 py-2 border border-gray-400 rounded ${
                      page === index + 1
                        ? 'bg-blue-200 border-blue-400 text-blue-500'
                        : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}

            <a href='#job-list' onClick={() => handlePage('next')}>
              <img src={assets.right_arrow_icon} alt='' />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default JobListing;
