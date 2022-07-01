import { useField } from 'formik';

import { classNames } from '../../utils/utils';

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className={`mt-6 ${props.classes ? props.classes : undefined}`}>
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
    </div>
  );
}
