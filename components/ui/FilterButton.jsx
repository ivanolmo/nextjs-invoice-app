import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function FilterButton({ setFilters }) {
  const [checkedStatus, setCheckedStatus] = useState({
    draft: false,
    pending: false,
    paid: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleCheck = (status) => {
    const val = checkedStatus[status];
    const updateCheckedState = { ...checkedStatus, [status]: !val };

    setCheckedStatus(updateCheckedState);
  };

  useEffect(() => {
    setFilters(
      Object.keys(checkedStatus).filter(
        (status) => checkedStatus[status] === true
      )
    );
  }, [setFilters, checkedStatus]);

  return (
    <div className='relative'>
      <div
        className='flex items-center gap-4 cursor-pointer'
        onClick={() => setShowFilters(!showFilters)}
      >
        <span className='text-xs font-bold md:hidden'>Filter</span>
        <span className='text-xs font-bold hidden md:block'>
          Filter By Status
        </span>
        <Image
          src='/assets/icon-arrow-down.svg'
          alt='filter icon'
          width={10}
          height={6}
        />
      </div>
      {showFilters && (
        <div className='absolute top-10 -left-10 flex flex-col gap-4 bg-white border border-none rounded-lg w-max p-6 z-50 shadow-[0_8px_10px_0px_rgba(124,93,250,0.3)] md:w-48'>
          {Object.keys(checkedStatus).map((status, index) => (
            <div
              key={index}
              className='flex items-center gap-3.5 cursor-pointer group'
              onClick={() => handleCheck(status)}
            >
              {checkedStatus[status] ? (
                <div className='bg-one flex justify-center items-center w-4 h-4 rounded-sm'>
                  <Image
                    src='/assets/icon-check.svg'
                    alt='check'
                    width={8}
                    height={8}
                  />
                </div>
              ) : (
                <div className='bg-five border border-transparent group-hover:border-one w-4 h-4 rounded-sm'></div>
              )}
              <span className='text-xs font-bold capitalize'>{status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
