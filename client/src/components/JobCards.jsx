import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

const JobCards = ({ job }) => {
  const purifiedHtml = DOMPurify.sanitize(job.description);
  const navigate = useNavigate();
  return (
    <div className='p-6 border rounded shadow'>
      <div className='flex items-center justify-between'>
        <img className='h-8 ' src={job.companyId.image} alt='' />
      </div>
      <h4 className='mt-2 text-xl font-medium'>{job.title}</h4>
      <div className='flex gap-3 mt-2 text-xs'>
        <span className='px-2 py-2 bg-blue-200 border border-blue-300 rounded'>
          {job.location}
        </span>
        <span className='px-2 py-2 bg-red-200 border border-red-300 rounded'>
          {job.category}
        </span>
      </div>
      <p className='mt-4 text-sm text-gray-600' dangerouslySetInnerHTML={{ __html: purifiedHtml.slice(0, 150) }}></p>

      <div className='flex gap-4 mt-4 text-sm'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0) }} className='px-6 py-2 text-white bg-blue-600 rounded'>Apply Now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='px-6 py-2 text-gray-400 border border-gray-400 rounded'>Learn More</button>
      </div>
    </div>
  );
};
export default JobCards;
