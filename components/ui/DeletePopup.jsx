import Button from './Button';

export default function DeletePopup(props) {
  const handleDelete = (id) => {
    props.handleDelete(id);
    props.handleClosePopup();
  };

  return (
    <>
      <div className='absolute inset-0 z-500 bg-gradient'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-three flex flex-col p-8 rounded-lg w-80 z-1000'>
        <h3 className='text-xl font-bold leading-medium tracking-tight dark:text-white'>
          Confirm Deletion
        </h3>
        <p className='text-xs text-seven dark:text-six leading-large tracking-tight mt-2'>
          Are you sure you want to delete invoice #{props.id}? This action
          cannot be undone.
        </p>
        <div className='flex justify-end gap-2 mt-6'>
          <Button
            containerClasses='bg-buttonLight dark:bg-four hover:bg-five dark:hover:bg-twelve px-6'
            textClasses='text-seven dark:text-five'
            buttonText='Cancel'
            onClick={() => props.handleClosePopup()}
          />
          <Button
            containerClasses='bg-nine hover:bg-ten px-6'
            textClasses='text-white'
            buttonText='Delete'
            onClick={() => handleDelete(props.id)}
          />
        </div>
      </div>
    </>
  );
}
