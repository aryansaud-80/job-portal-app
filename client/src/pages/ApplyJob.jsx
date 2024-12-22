import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment/moment';
import JobCards from '../components/JobCards';

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);


  const [relatedJobs, setRelatedJobs] = useState([]);

  const fetchedJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchedJob();
    }
  }, [id, jobs]);

  useEffect(() => {
    if (jobData) {
      const related = jobs.filter(
        (job) =>
          job.companyId.name === jobData.companyId.name &&
          job._id !== jobData._id
      );
      setRelatedJobs(related);
    }
  }, [jobData]);

  return jobData ? (
    <div className='flex flex-col w-full h-full px-2 py-3 border'>
      <div className='container flex justify-center px-16 py-24 mx-auto mt-4 border border-blue-300 rounded bg-gradient-to-t from-blue-100 to-blue-50 lg:block max-sm:py-10'>
        <div className='flex flex-col items-start justify-between lg:flex-row lg:items-center'>
          <div className='flex flex-col items-center gap-5'>
            <div className='flex flex-col items-start gap-3 lg:flex-row lg:items-center'>
              <div className='p-10 bg-white '>
                <img src={jobData.companyId.image} alt='' />
              </div>

              <div className='flex flex-col items-start justify-center gap-2'>
                <h1 className='text-2xl font-medium sm:text-4xl'>
                  {jobData.title}
                </h1>
                <div className='flex flex-wrap items-center gap-4'>
                  <span className='flex items-center gap-2'>
                    <img src={assets.suitcase_icon} alt='' />
                    <p className='text-gray-500 text-md'>
                      {jobData.companyId.name}
                    </p>
                  </span>

                  <span className='flex items-center gap-2'>
                    <img src={assets.location_icon} alt='' />
                    <p className='text-gray-500 text-md'>{jobData.location}</p>
                  </span>

                  <span className='flex items-center gap-2'>
                    <img src={assets.person_icon} alt='' />
                    <p className='text-gray-500 text-md'>{jobData.level}</p>
                  </span>

                  <span className='flex items-center gap-2'>
                    <img src={assets.money_icon} alt='' />
                    <p className='text-gray-500 text-md'>
                      CTC: {kconvert.convertTo(jobData.salary)}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-2 mt-10 lg:mt-0'>
            <button className='px-10 py-2 text-sm text-white bg-blue-600 rounded '>
              Apply Now
            </button>
            <p className='text-gray-500 text-md'>
              Posted {moment(jobData.date).fromNow()}
            </p>
          </div>
        </div>
      </div>

      <div className='container flex flex-col items-start h-full gap-10 py-8 mx-auto mt-10 rounded md:flex-row'>
        <div className='flex flex-col items-start w-full gap-5 lg:w-3/4'>
          <h2 className='text-2xl font-[700] sm:text-[22px]'>
            Job Description
          </h2>

          <div
            className='rich-text'
            dangerouslySetInnerHTML={{ __html: jobData.description }}
          ></div>

          <button className='px-4 py-1.5 bg-blue-500 rounded text-white'>
            Apply Now
          </button>
        </div>

        <div className='flex flex-col items-start w-full gap-5 lg:w-2/5'>
          <h1 className='mb-3 text-2xl font-medium'>More jobs from google</h1>

          <div className='grid gap-3 gird-col-1'>
            {relatedJobs.slice(0, 4).map((job, index) => {
              return <JobCards key={index} job={job} />;
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default ApplyJob;
