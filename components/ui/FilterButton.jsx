import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function FilterButton({ setFilters }) {
  const [checkedStatus, setCheckedStatus] = useState({
    draft: false,
    pending: false,
    paid: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef();
  const buttonRef = useRef();

  const handleCheck = (status) => {
    const val = checkedStatus[status];
    const updateCheckedState = { ...checkedStatus, [status]: !val };

    setCheckedStatus(updateCheckedState);
  };

  const handleToggle = () => {
    setShowFilters(!showFilters);
  };

  // handles closing the filter menu if touch/click occurs outside menu
  // adapted from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component/42234988#42234988
  useEffect(() => {
    const clickOutside = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

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
        ref={buttonRef}
        onClick={handleToggle}
        className='flex items-center gap-3 cursor-pointer group lg:gap-4 dark:text-white'
      >
        <span className='text-xs font-bold group-hover:text-indigo-400 dark:group-hover:text-slate-400 md:hidden'>
          Filter
        </span>
        <span className='hidden text-xs font-bold group-hover:text-indigo-400 dark:group-hover:text-slate-400 lg:text-sm md:block'>
          Filter By Status
        </span>
        <div className='w-3 h-2'>
          <Image
            src='/assets/icon-arrow-down.svg'
            alt='filter icon'
            width='11px'
            height='7px'
            layout='responsive'
            className={showFilters ? 'rotate-180' : undefined}
          />
        </div>
      </div>
      {showFilters && (
        <div
          ref={filterRef}
          className='absolute top-10 -left-10 lg:-left-7 flex flex-col gap-4 bg-white dark:bg-slate-900 border border-none rounded-lg w-max p-6 md:w-48 shadow-[0_8px_10px_0px_rgba(124,93,250,0.3)] dark:shadow-[0_8px_10px_0px_rgba(20,22,37,0.9)]'
        >
          {Object.keys(checkedStatus).map((status, index) => (
            <div
              key={index}
              className='flex items-center gap-3.5 cursor-pointer group'
              onClick={() => handleCheck(status)}
            >
              {checkedStatus[status] ? (
                <div className='flex items-center justify-center w-4 h-4 rounded-sm bg-violet-500'>
                  <Image
                    src='/assets/icon-check.svg'
                    alt='check'
                    width='10px'
                    height='8px'
                  />
                </div>
              ) : (
                <div className='w-4 h-4 bg-indigo-100 border border-transparent rounded-sm dark:bg-gray-800 group-hover:border-violet-500'></div>
              )}
              <span className='text-xs font-bold capitalize dark:text-white'>
                {status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
