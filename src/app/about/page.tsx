import Link from 'next/link';
import { Unbounded } from 'next/font/google';
import { IoMdRadio } from 'react-icons/io';

const unbounded = Unbounded({
  weight: '300',
  subsets: ['latin'],
});

const About = () => {
  return (
    <div className='bg-babyPink min-h-screen'>
      <div className='container mx-auto'>
        <div className={`${unbounded.className}`}>About Page</div>
        <Link href={'/'}>
          <button className='bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black  py-2 px-4 rounded-full md:py-5 md:px-10'>
            <div className='mr-1'>{<IoMdRadio />}</div>
            <div className={`${unbounded.className}`}>Back</div>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default About;
