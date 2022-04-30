import Image from 'next/image';

export default function FilterButton() {
  return (
    <button>
      <span className='mr-3'>Filter</span>
      <Image
        src='/assets/icon-arrow-down.svg'
        alt='filter icon'
        width={10}
        height={6}
      />
    </button>
  );
}
