import Button from './Button';

export default function DeletePopup(props) {
  const handleOps = (id) => {
    props.handleDelete(id);
    props.handleClosePopup();
  };

  return (
    <>
      <div className='absolute inset-0 z-500 bg-gradient'></div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col p-8 rounded-lg w-80 z-1000'>
        <h3 className='text-xl font-bold tracking-tight'>Confirm Deletion</h3>
        <p className='text-xs text-seven leading-large mt-2'>
          Are you sure you want to delete invoice #{props.id}? This action
          cannot be undone.
        </p>
        <div className='flex justify-end gap-2 mt-6'>
          <Button
            containerClasses='bg-buttonLight hover:bg-five px-6'
            textClasses='text-seven'
            buttonText='Cancel'
            onClick={() => props.handleClosePopup()}
          />
          <Button
            containerClasses='bg-nine hover:bg-ten px-6'
            textClasses='text-white'
            buttonText='Delete'
            onClick={() => handleOps(props.id)}
          />
        </div>
      </div>
    </>
  );
}
