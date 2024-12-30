import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment/moment';
import JobCards from '../components/JobCards';
import { toast } from 'react-toastify';
import axios from 'axios';

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs, setIsLoading, isLoading, BACKEND_URL } = useContext(AppContext);
  const [specificJob, setSpecificJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  const fetchedJobById = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/job/get-job/${id}`
      );

      if (data.success) {
        setSpecificJob(data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.message || 'Failed to fetch job data.');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (id) fetchedJobById();
  }, [id]);

  useEffect(() => {
    if (specificJob && jobs.length > 0) {
      const related = jobs.filter(
        (job) =>
          job.company?.name === specificJob.company?.name &&
          job.id !== specificJob.id
      );
      setRelatedJobs(related);
    }
  }, [specificJob, jobs]);

  if (!specificJob?.company) return <Loader />;

  return (
    <div className='flex flex-col w-full h-full px-2 py-3 border'>
      <div className='container flex justify-center px-16 py-24 mx-auto mt-4 border border-blue-300 rounded bg-gradient-to-t from-blue-100 to-blue-50 lg:block max-sm:py-10'>
        <div className='flex flex-col items-start justify-between lg:flex-row lg:items-center'>
          <div className='flex flex-col items-center gap-5'>
            <div className='flex flex-col items-start gap-3 lg:flex-row lg:items-center'>
              <div className='p-3 bg-white'>
                {specificJob.company?.companyImage && (
                  <img
                    src={specificJob.company.companyImage}
                    alt=''
                    className='object-cover rounded-full size-12'
                  />
                )}
              </div>

              <div className='flex flex-col items-start justify-center gap-2'>
                <h1 className='text-2xl font-medium sm:text-4xl'>
                  {specificJob.title}
                </h1>
                <div className='flex flex-wrap items-center gap-4'>
                  <span className='flex items-center gap-2'>
                    <img src={assets.suitcase_icon} alt='' />
                    <p className='text-gray-500 text-md'>
                      {specificJob.company?.name}
                    </p>
                  </span>

                  <span className='flex items-center gap-2'>
                    <img src={assets.location_icon} alt='' />
                    <p className='text-gray-500 text-md'>
                      {specificJob.location}
                    </p>
                  </span>

                  <span className='flex items-center gap-2'>
                    <img src={assets.person_icon} alt='' />
                    <p className='text-gray-500 text-md'>{specificJob.level}</p>
                  </span>

                  <span className='flex items-center gap-2'>
                    <img src={assets.money_icon} alt='' />
                    <p className='text-gray-500 text-md'>
                      CTC: {kconvert.convertTo(specificJob.salary)}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-2 mt-10 lg:mt-0'>
            <button className='px-10 py-2 text-sm text-white bg-blue-600 rounded'>
              Apply Now
            </button>
            <p className='text-gray-500 text-md'>
              Posted {moment(specificJob.date).fromNow()}
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
            dangerouslySetInnerHTML={{ __html: specificJob.description }}
          ></div>

          <button className='px-4 py-1.5 bg-blue-500 rounded text-white'>
            Apply Now
          </button>
        </div>

        <div className='flex flex-col items-start w-full gap-5 lg:w-2/5'>
          <h1 className='mb-3 text-2xl font-medium'>
            More jobs from {specificJob.company?.name}
          </h1>

          <div className='grid gap-3 gird-col-1'>
            {relatedJobs.slice(0, 4).map((job, index) => (
              <JobCards key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
