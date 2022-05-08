export default function SaveSendBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      className='flex justify-center items-center bg-one hover:bg-two h-12 px-4 rounded-full cursor-pointer'
    >
      <div className='flex justify-center items-center text-white text-xs font-bold tracking-tight'>
        {'Save & Send'}
      </div>
    </div>
  );
}
