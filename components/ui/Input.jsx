import { useField } from 'formik';

import { classNames } from '../../utils';

export default function Input({ label, showError, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div
      className={`mt-6 relative ${props.classes ? props.classes : undefined}`}
    >
      <label
        htmlFor={props.id || props.name}
        className={classNames(
          meta.touched && meta.error
            ? 'text-red-500'
            : 'text-indigo-400 dark:text-indigo-100',
          'flex justify-between text-xs tracking-tight'
        )}
      >
        <span>{label}</span>
        <span>{showError && meta.error}</span>
      </label>
      <input
        className={classNames(
          meta.touched && meta.error
            ? 'border-red-500 dark:border-red-500'
            : 'border-indigo-100 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500',
          'text-xs text-black dark:text-white font-bold border  p-4 mt-2.5 rounded-md cursor-pointer w-full dark:bg-slate-900'
        )}
        {...field}
        {...props}
      />
      {props.icon && (
        <div className='absolute cursor-pointer right-4 top-1/2'>
          {props.icon}
        </div>
      )}
    </div>
  );
}
