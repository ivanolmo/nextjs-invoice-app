import Button from './Button';

export default function DeleteModal(props) {
  const handleDelete = (id) => {
    props.handleDelete(id);
    props.handleClosePopup();
  };

  return (
    <>
      <div className='absolute inset-0 z-500 bg-gradient'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 flex flex-col p-8 md:p-12 rounded-lg w-80 md:w-[480px] z-1000'>
        <h3 className='text-xl md:text-2xl font-bold leading-medium md:leading-[1.33] tracking-tight dark:text-white'>
          Confirm Deletion
        </h3>
        <p className='text-xs text-indigo-400 dark:text-indigo-100 leading-large tracking-tight mt-2'>
          Are you sure you want to delete invoice #{props.id}? This action
          cannot be undone.
        </p>
        <div className='flex justify-end gap-2 mt-6'>
          <Button
            containerClasses='bg-gray-200 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-gray-800 px-6'
            textClasses='text-indigo-400 dark:text-indigo-100'
            buttonText='Cancel'
            onClick={() => props.handleClosePopup()}
          />
          <Button
            containerClasses='bg-red-500 hover:bg-red-300 px-6'
            textClasses='text-white'
            buttonText='Delete'
            onClick={() => handleDelete(props.id)}
          />
        </div>
      </div>
    </>
  );
}
