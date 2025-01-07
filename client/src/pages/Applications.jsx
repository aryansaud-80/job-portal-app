import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import moment from 'moment';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [resume, setResume] = useState(null);
  const [jobsApplied, setJobsApplied] = useState([]);

  const { BACKEND_URL, isLoading, setIsLoading } = useContext(AppContext);

  const getUserApplications = async () => {
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.get(
        `${BACKEND_URL}/api/v1/user/get-userApplications`
      );

      console.log(data);

      if (data.success) {
        setJobsApplied(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserApplications();
  }, []);

  // console.log(resume);

  return (
    <div className='container h-full px-10 py-10 mx-auto'>
      <div>
        <h1 className='mb-2 text-xl font-medium'>Your Resume</h1>
        <div>
          {isEdit ? (
            <div className='flex items-center gap-2'>
              <label
                htmlFor='resumeUpload'
                className='flex items-center gap-2 '
              >
                <p className='px-4 py-2 text-blue-600 bg-blue-200 border border-blue-300 rounded'>
                  Select Resume
                </p>
                <input
                  type='file'
                  hidden
                  id='resumeUpload'
                  accept='application/pdf'
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <img src={assets.profile_upload_icon} alt='' />
              </label>

              <button
                className='px-4 py-2 bg-green-200 border border-green-400 rounded'
                onClick={() => setIsEdit(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <p className='px-6 py-2 text-lg text-blue-600 bg-blue-200 border border-blue-300 rounded-lg'>
                Resume
              </p>
              <button
                className='px-4 py-2 text-lg text-gray-500 bg-gray-200 border border-gray-300 rounded-lg'
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl '>Job Applied</h1>
        </div>

        <table className='w-full mt-5 border border-t border-l border-r'>
          <thead className='bg-white'>
            <tr className='text-left border-b'>
              <th className='px-3 py-2 text-xl border-l '>Company</th>
              <th className='px-3 py-2 text-xl border-l '>Job Title</th>
              <th className='px-3 py-2 text-xl border-l max-md:hidden'>
                Location
              </th>
              <th className='px-3 py-2 text-xl border-l max-md:hidden'>Date</th>
              <th className='px-3 py-2 text-xl border-l '>Status</th>
            </tr>
          </thead>

          <tbody className='bg-white'>
            {jobsApplied.map((job, index) => {
              return (
                <tr key={index} className='border-b'>
                  <td className='flex items-center gap-5 px-3 py-2'>
                    <img src={job.logo} alt='' />
                    <p>{job.company}</p>
                  </td>
                  <td className='px-3 py-2 border-l'>{job.title}</td>
                  <td className='px-3 py-2 border-l max-md:hidden '>
                    {job.location}
                  </td>
                  <td className='px-3 py-2 border-l max-md:hidden'>
                    {moment(job.date).format('DD MMM YYYY')}
                  </td>
                  <td className={`px-3 py-2 border-l`}>
                    <p
                      className={`px-3 py-2 text-sm rounded-full text-center ${
                        job.status.toLowerCase() === 'rejected'
                          ? 'bg-red-200 border-red-300 '
                          : job.status.toLowerCase() === 'accepted'
                          ? 'bg-green-200 border-green-300'
                          : job.status.toLowerCase() === 'pending'
                          ? 'bg-gray-200 border-gray-300'
                          : ''
                      }`}
                    >
                      {job.status}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Applications;
