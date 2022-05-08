import { useField } from 'formik';

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className='mt-6'>
      <label
        htmlFor={props.id || props.name}
        className='text-seven text-xs tracking-tight'
      >
        {label}
      </label>
      <input
        className='text-xs text-black font-bold border border-five hover:border-one p-4 mt-2 w-full rounded-md'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className=''>{meta.error}</div> : null}
    </div>
  );
}
