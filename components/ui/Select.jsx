import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import Image from 'next/image';

import { classNames } from '../../utils/utils';

export default function Select({ label, ...props }) {
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef();
  const fieldRef = useRef();

  const [{ value }, meta, { setTouched, setValue }] = useField(props);

  const options = [
    { label: 'Net 1 Day', value: 1 },
    { label: 'Net 7 Days', value: 7 },
    { label: 'Net 14 Days', value: 14 },
    { label: 'Net 30 Days', value: 30 },
  ];

  const handleClick = (value) => {
    setValue(value);
  };

  const handleToggle = () => {
    setShowOptions(!showOptions);
  };

  // handles closing the dropdown menu if touch/click occurs outside...
  // ...dropdown, and also sets formik touched -> true
  // adapted from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component/42234988#42234988
  useEffect(() => {
    const clickOutside = (e) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target) &&
        !fieldRef.current.contains(e.target)
      ) {
        setShowOptions(false);
        setTouched(props.name);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showOptions, props.name, setTouched]);

  return (
    <div className='relative'>
      <label
        htmlFor={props.id || props.name}
        className={classNames(
          meta.touched && meta.error
            ? 'text-red-500'
            : 'text-indigo-400 dark:text-indigo-100',
          'text-xs tracking-tight'
        )}
      >
        {label}
      </label>
      <div
        id={props.name}
        name={props.name}
        ref={fieldRef}
        onClick={handleToggle}
        className={classNames(
          meta.touched && meta.error
            ? 'border-red-500 dark:border-red-500'
            : 'border-indigo-100 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500',
          'bg-white dark:bg-slate-900 text-black dark:text-white font-bold mt-2.5 border rounded-md h-12 w-full cursor-pointer'
        )}
      >
        <div className='flex justify-between items-center mt-4 mx-5'>
          <div>
            {value ? `Net ${value} Day${value > 1 ? 's' : ''}` : undefined}
          </div>
          <div>
            <Image
              src='/assets/icon-arrow-down.svg'
              alt='arrow down'
              width='11px'
              height='7px'
              className={showOptions ? 'rotate-180' : undefined}
            />
          </div>
        </div>
        {showOptions && (
          <div
            ref={optionsRef}
            className='absolute top-[84px] flex flex-col bg-white dark:bg-slate-800 divide-y divide-indigo-100 dark:divide-slate-900 w-full rounded-lg shadow-[0_8px_10px_0px_rgba(124,93,250,0.3)] dark:shadow-[0_8px_10px_0px_rgba(20,22,37,0.9)]'
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleClick(option.value)}
                className={classNames(
                  value === option.value
                    ? 'text-violet-500'
                    : 'text-black dark:text-white',
                  'hover:text-violet-500 dark:hover:text-violet-500 py-4 px-6'
                )}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
