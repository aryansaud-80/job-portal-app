import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className='px-10 py-10 mx-auto max-w-7xl'>
      <div className='relative w-full rounded-lg bg-gradient-to-tr from-blue-50 to-blue-100'>
        <div className='flex flex-col p-20'>
          <h1 className='max-w-md mb-8 text-2xl font-bold sm:text-4xl'>Download Mobile App For Better Experience</h1>

          <div className='flex flex-wrap gap-4 mt-5'>
            <img onClick={()=> scrollTo(top)} src={assets.play_store} alt='' />
            <img onClick={()=> scrollTo(top)} src={assets.app_store} alt='' />
          </div>
        </div>
      <img className='absolute bottom-0 hidden right-20 lg:block' src={assets.app_main_img} alt="" />
      </div>
    </div>
  );
};
export default AppDownload;
