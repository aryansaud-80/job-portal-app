import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import Loader from './Loader';

const ViewApplication = () => {
  const [applicationStatus, setApplicationStatus] = useState();
  const [viewApplicationsPageData, setViewApplicationsPageData] = useState([]);
  const { BACKEND_URL, setIsLoading, isLoading } = useContext(AppContext);

  // const handleStatus = (index, status) => {
  //   setApplicationStatus((prev) => ({ ...prev, [index]: status }));
  // };

  const fetchViewApplicationsPageData = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/job/getCompanyJobsApplicants`
      );

      // console.log(data.data[0].jobs);

      if (data.success) {
        setViewApplicationsPageData(data.data[0].jobs);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    fetchViewApplicationsPageData();
  }, [applicationStatus]);

  const handleChangeStatus = async (id, status) => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.patch(
        `${BACKEND_URL}/api/v1/job/verifyApplicant`,
        { applicationId: id, applicationStatus: status }
      );

      if (data.success) {
        setApplicationStatus(data.data.status);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='flex items-center justify-center h-full max-sm:w-full'>
      <div className='container flex flex-col h-full gap-5 px-10 max-md:px-2'>
        <div className='mt-10 max-sm:mt-5'>
          <table className='w-full border border-t border-l border-r '>
            <thead className='bg-white'>
              <tr className='text-left border-b border-l'>
                <th className='px-3 py-2 border-l text-md max-md:hidden'>#</th>
                <th className='px-3 py-2 text-md border-l w-[350px]'>
                  Username
                </th>
                <th className='px-3 py-2 text-md border-l w-[250px] max-md:hidden'>
                  Job Title
                </th>
                <th className='px-3 py-2 text-md border-l max-md:hidden w-[150px]'>
                  Location
                </th>
                <th className='px-3 py-2 text-md border-l w-[150px]'>Resume</th>
                <th className='px-3 py-2 border-l text-md'> Action</th>
              </tr>
            </thead>

            <tbody className='bg-white'>
              {viewApplicationsPageData.map((jobs, index) => {
                {
                  /* console.log(jobs);  */
                }
                if (jobs.applications.length === 0) {
                  return null;
                } else {
                  return jobs.applications.map((job, index) => {
                    {
                      /* const status = applicationStatus[index] || ''; */
                    }
                    {
                      /* console.log(job, job.id, job.status); */
                    }
                    return (
                      <tr
                        key={index}
                        className={`border-b border-l ${
                          index % 2 === 0 ? 'bg-gray-100' : ''
                        } `}
                      >
                        <td className='px-3 py-2 border-l max-md:hidden'>
                          {index + 1}
                        </td>
                        <td className='flex items-center gap-2 px-3 py-2 border-l'>
                          <img
                            src={job.user?.image}
                            alt=''
                            className='h-10 rounded-full max-sm:hidden size-10'
                          />
                          <p className='text-lg'>{job.user?.name}</p>
                        </td>
                        <td className='px-3 py-2 border-l max-md:hidden'>
                          {jobs.title}
                        </td>
                        <td className={`px-3 py-2 border-l max-md:hidden`}>
                          {jobs.location}
                        </td>
                        <td
                          className={`px-3 py-2 border-l text-center sm:text-start`}
                        >
                          <button className='flex items-center justify-center gap-2 px-10 py-2 text-sm text-blue-500 bg-blue-200 rounded max-sm:px-2 max-sm:py-1'>
                            <p>Resume</p>
                            <img
                              src={assets.resume_download_icon}
                              alt=''
                              className='w-3'
                            />
                          </button>
                        </td>
                        <td
                          className={`px-3 py-2 border-l text-center max-md:text-start cursor-pointer relative group bg-white`}
                        >
                          <p>{job.status === 'pending' ? '...' : job.status}</p>
                          {job.status === 'pending' && (
                            <div className='absolute z-20 hidden w-24 gap-2 overflow-hidden bg-white border rounded-md shadow-lg right-4 text-md group-hover:flex group-hover:flex-col'>
                              <p
                                className='px-3 py-1 text-blue-500 rounded-t-sm hover:bg-blue-200'
                                onClick={() => {
                                  // handleStatus(index, 'Accepted');
                                  handleChangeStatus(job.id, 'Accepted');
                                }}
                              >
                                Accept
                              </p>
                              <p
                                className='px-3 py-1 text-red-500 rounded-b-sm hover:bg-blue-200'
                                onClick={() => {
                                  // handleStatus(index, 'Rejected');
                                  handleChangeStatus(job.id, 'Rejected');
                                }}
                              >
                                Reject
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  });
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ViewApplication;
