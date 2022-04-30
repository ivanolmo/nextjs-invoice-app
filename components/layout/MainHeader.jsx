import Image from 'next/image';

export default function MainHeader() {
  return (
    <header className='flex justify-between items-center bg-[#373b53]'>
      <div className='bg-one p-6 leading-zero  rounded-r-3xl'>
        {/* TODO this should be link back to / */}
        <Image src='/assets/logo.svg' alt='main logo' width={28} height={26} />
      </div>
      <div className=' flex items-center leading-zero'>
        <div className='pr-6 cursor-pointer'>
          <Image
            src='/assets/icon-moon.svg'
            alt='theme switcher'
            width={20}
            height={20}
          />
        </div>
        <div className='px-6 py-5 border-l border-[#494e6e]'>
          <div className='rounded-full overflow-hidden'>
            <Image
              src='/assets/image-avatar.jpg'
              alt='user avatar'
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </header>
  );
}