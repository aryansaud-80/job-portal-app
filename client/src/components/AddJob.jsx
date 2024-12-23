import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { JobCategories, JobLevel, JobLocations } from '../assets/assets';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('Programming');
  const [jobLocation, setJobLocation] = useState('Bangalore');
  const [jobLevel, setJobLevel] = useState('Beginner Level');
  const [jobSalary, setJobSalary] = useState();

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Job Description',
      });
    }
  }, []);

  return (
    <form className='px-10 py-5 max-md:w-full max-sm:px-0' onSubmit={(e) => e.preventDefault()}>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <h4 className='text-md'>Job Title</h4>
          <input
            type='text'
            placeholder='Type here'
            value={jobTitle}
            required
            onChange={(e) => setJobTitle(e.target.value)}
            className='p-2 border-2 border-gray-300 rounded-md outline-none max-sm:w-full'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h4 className='text-md'>Job Description</h4>
          <div ref={editorRef}></div>
        </div>

        <div className='flex gap-5 max-sm:flex-col'>
          <div className='flex flex-col gap-2'>
            <h4>Job Category</h4>
            <select className='px-3 py-2 border-2 rounded-sm max-sm:w-full' onChange={(e) => setJobCategory(e.target.value)}>
              {JobCategories.map((category, index) => {
                return (
                  <option value={jobCategory} key={index}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <h4>Job Location</h4>
            <select className='px-3 py-2 border-2 rounded-sm max-sm:w-full' onChange={(e) => setJobLocation(e.target.value)}>
              {JobLocations.map((location, index) => {
                return (
                  <option value={jobLocation} key={index}>
                    {location}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <h4>Job Level</h4>

            <select className='px-3 py-2 border-2 rounded-sm max-sm:w-full' onChange={(e) => setJobLevel(e.target.value)}>
              {JobLevel.map((level, index) => {
                return (
                  <option value={jobLevel} key={index}>
                    {level}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <h4 className='text-md'>Job Salary</h4>
          <input
            type='number'
            placeholder='2500'
            min={0}
            required
            value={jobSalary}
            onChange={(e) => setJobSalary(e.target.value)}
            className='p-2 border-2 border-gray-300 rounded-md outline-none sm:w-1/4 max-sm:w-full'
          />
        </div>

        <button className='self-start w-1/4 px-6 py-2 text-white bg-black rounded-md'
        >Add</button>
      </div>
    </form>
  );
};
export default AddJob;
