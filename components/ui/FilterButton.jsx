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
        className='flex items-center gap-3 lg:gap-4 cursor-pointer dark:text-white'
      >
        <span className='text-xs font-bold md:hidden'>Filter</span>
        <span className='text-xs lg:text-sm font-bold hidden md:block'>
          Filter By Status
        </span>
        <Image
          src='/assets/icon-arrow-down.svg'
          alt='filter icon'
          width='10px'
          height='6px'
        />
      </div>
      {showFilters && (
        <div
          ref={filterRef}
          className='absolute top-10 -left-10 lg:-left-7 flex flex-col gap-4 bg-white dark:bg-three border border-none rounded-lg w-max p-6 md:w-48 shadow-[0_8px_10px_0px_rgba(124,93,250,0.3)] dark:shadow-[0_8px_10px_0px_rgba(20,22,37,0.9)]'
        >
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
                    width='8px'
                    height='8px'
                  />
                </div>
              ) : (
                <div className='bg-five dark:bg-twelve border border-transparent group-hover:border-one w-4 h-4 rounded-sm'></div>
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
