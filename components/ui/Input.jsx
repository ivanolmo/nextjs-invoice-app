import { useField } from 'formik';

import { classNames } from '../../lib/formatUtils';

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={`mt-6 ${props.classes ? props.classes : ''}`}>
      <label
        htmlFor={props.id || props.name}
        className='text-seven text-xs tracking-tight'
      >
        {label}
      </label>
      <input
        className={classNames(
          meta.touched && meta.error
            ? 'border-nine'
            : 'border-five hover:border-one',
          'text-xs text-black font-bold border p-4 mt-2 w-full rounded-md'
        )}
        {...field}
        {...props}
      />
    </div>
  );
}
