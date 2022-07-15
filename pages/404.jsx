import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className=''>
      <div className='relative w-screen h-screen'>
        <Image
          src='/assets/carina-nebula.webp'
          alt='carina nebula'
          layout='fill'
          objectFit='cover'
          quality={100}
        />
      </div>
      <div className='absolute left-0 right-0 p-6 mx-auto text-white rounded-md bg-slate-900 top-24 lg:top-12 w-80'>
        <h1 className='font-bold text-center text-7xl'>Oops!</h1>
        <div className='mt-4 text-justify'>
          That page wasn&apos;t found. Enjoy this photo of the{' '}
          <a
            href='https://www.nasa.gov/image-feature/goddard/2022/nasa-s-webb-reveals-cosmic-cliffs-glittering-landscape-of-star-birth'
            className='text-blue-400 border-b border-blue-400'
          >
            Carina Nebula
          </a>
          , or had back to the{' '}
          <Link href='/'>
            <a className='text-blue-400 border-b border-blue-400'>home page</a>
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
