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
            ? 'text-nine'
            : 'text-seven dark:text-five',
          'text-xs tracking-tight'
        )}
      >
        {label}
      </label>
      <input
        className={classNames(
          meta.touched && meta.error
            ? 'border-nine dark:border-nine'
            : 'border-five dark:border-four hover:border-one dark:hover:border-one',
          'text-xs text-black dark:text-white font-bold border  p-4 mt-2.5 rounded-md cursor-pointer w-full dark:bg-three'
        )}
        {...field}
        {...props}
      />
    </div>
  );
}
