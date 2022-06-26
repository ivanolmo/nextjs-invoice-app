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
            ? 'text-nine'
            : 'text-seven dark:text-five',
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
            ? 'border-nine dark:border-nine'
            : 'border-five dark:border-four hover:border-one dark:hover:border-one',
          'bg-white dark:bg-three text-black dark:text-white font-bold mt-2.5 border rounded-md h-12 w-full cursor-pointer'
        )}
      >
        <div className='flex justify-between mt-4 mx-5'>
          <span>
            {value ? `Net ${value} Day${value > 1 ? 's' : ''}` : undefined}
          </span>
          <span>
            <Image
              src='/assets/icon-arrow-down.svg'
              alt='arrow down'
              width='11px'
              height='7px'
            />
          </span>
        </div>
        {showOptions && (
          <div
            ref={optionsRef}
            className='absolute top-[84px] flex flex-col bg-white dark:bg-four divide-y divide-five dark:divide-three w-full rounded-lg shadow-[0_8px_10px_0px_rgba(124,93,250,0.3)] dark:shadow-[0_8px_10px_0px_rgba(20,22,37,0.9)]'
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleClick(option.value)}
                className={classNames(
                  value === option.value
                    ? 'text-one'
                    : 'text-black dark:text-white',
                  'hover:text-one dark:hover:text-one py-4 px-6'
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
