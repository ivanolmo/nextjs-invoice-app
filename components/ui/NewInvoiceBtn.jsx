import Image from 'next/image';

export default function NewInvoiceBtn({ setShowInvoiceForm }) {
  return (
    <div
      onClick={() => setShowInvoiceForm(true)}
      className='bg-one hover:bg-two text-eleven flex items-center rounded-full cursor-pointer'
    >
      <div className='flex ml-1.5 -mr-2 p-3 bg-[white] rounded-full'>
        <Image
          src='/assets/icon-plus.svg'
          alt='plus icon on button'
          width={10}
          height={10}
        />
      </div>
      {/* check for window size and change button text on tablet size and up */}
      <span className='my-3 mx-4 text-sm font-bold leading-tight'>New</span>
    </div>
  );
}
