import moment from 'moment';
import { manageJobsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const ManageJob = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center h-full max-sm:w-full'>
      <div className='container flex flex-col h-full gap-5 px-10 max-md:px-2'>
        <div className='mt-10 max-sm:mt-5'>
          <table className='w-full border border-t border-l border-r '>
            <thead className='bg-white'>
              <tr className='text-left border-b border-l'>
                <th className='px-3 py-2 border-l text-md max-md:hidden'>#</th>
                <th className='px-3 py-2 text-md border-l w-[250px]'>
                  Job Title
                </th>
                <th className='px-3 py-2 text-md border-l w-[150px] max-md:hidden'>
                  Date
                </th>
                <th className='px-3 py-2 text-md border-l max-md:hidden w-[150px]'>
                  Location
                </th>
                <th className='px-3 py-2 text-md border-l w-[150px]'>
                  Applicants
                </th>
                <th className='px-3 py-2 border-l text-md'> Visible</th>
              </tr>
            </thead>

            <tbody className='bg-white'>
              {manageJobsData.map((job, index) => {
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
                    <td className='px-3 py-2 border-l'>{job.title}</td>
                    <td className='px-3 py-2 border-l max-md:hidden'>
                      {moment(job.date).format('DD MMM YYYY')}
                    </td>
                    <td className={`px-3 py-2 border-l max-md:hidden`}>
                      {job.location}
                    </td>
                    <td
                      className={`px-3 py-2 border-l text-center sm:text-start`}
                    >
                      {job.applicants}
                    </td>
                    <td
                      className={`px-3 py-2 border-l text-center max-md:text-start`}
                    >
                      <input type='checkbox' />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button onClick={()=> navigate('/dashboard/add-job')} className='w-32 px-2 py-3 text-white bg-black rounded '>
          Add new job
        </button>
      </div>
    </div>
  );
};
export default ManageJob;
