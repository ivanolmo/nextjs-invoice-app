import { useField } from 'formik';

import { classNames } from '../../utils/utils';

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={`mt-6 ${props.classes ? props.classes : ''}`}>
      <label
        htmlFor={props.id || props.name}
        className='text-seven dark:text-six text-xs tracking-tight'
      >
        {label}
      </label>
      <input
        className={classNames(
          meta.touched && meta.error
            ? 'border-nine'
            : 'border-five hover:border-one dark:hover:border-one',
          'text-xs text-black dark:text-white font-bold border dark:border-four p-4 mt-2.5 rounded-md cursor-pointer w-full dark:bg-three'
        )}
        {...field}
        {...props}
      />
    </div>
  );
}
