import Image from 'next/image';

export default function ButtonOne(props) {
  // TODO extend button reusability with color as props
  return (
    <button className='bg-one hover:bg-two text-eleven flex items-center rounded-full'>
      {props.buttonIcon && (
        <div className='flex ml-1.5 -mr-2 p-3 bg-[white] rounded-full'>
          <Image
            src='/assets/icon-plus.svg'
            alt='plus icon on button'
            width={10}
            height={10}
          />
        </div>
      )}
      <p className='my-3 mx-4 text-sm font-bold leading-tight'>
        {props.buttonText}
      </p>
    </button>
  );
}
