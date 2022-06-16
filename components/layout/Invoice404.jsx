import Image from 'next/image';

export default function Invoice404() {
  return (
    <div className='mt-24 md:mt-52 flex flex-col items-center'>
      <Image
        src='/assets/illustration-empty.svg'
        alt='no invoices found'
        width={193}
        height={160}
      />
      <div className='mt-10'>
        <h2 className='text-xl font-bold tracking-tighter text-center'>
          There is nothing here
        </h2>
        <p className='text-xs text-six tracking-tight text-center mt-5 mx-auto w-52'>
          Create an invoice by clicking the{' '}
          <span className='font-bold'>New</span> button and get started
        </p>
      </div>
    </div>
  );
}
