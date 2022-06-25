import Image from 'next/image';

export default function Invoice404() {
  return (
    <div className='flex flex-col items-center gap-10 md:gap-16 mt-24 md:mt-52 lg:mt-36'>
      <div className='w-48 h-40 md:w-64 md:h-52'>
        <Image
          src='/assets/illustration-empty.svg'
          alt='no invoices found'
          width='242px'
          height='200px'
          layout='responsive'
        />
      </div>
      <div>
        <h2 className='text-xl font-bold tracking-tighter text-center'>
          There is nothing here
        </h2>
        <p className='text-xs text-six tracking-tight text-center mt-5 w-56'>
          Create an invoice by clicking the{' '}
          <span className='font-bold md:hidden'>New</span>
          <span className='font-bold hidden md:inline'>New Invoice</span> button
          and get started
        </p>
      </div>
    </div>
  );
}
