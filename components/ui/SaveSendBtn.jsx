export default function SaveSendBtn({ onSubmit }) {
  return (
    <div
      onClick={() => onSubmit()}
      className='flex justify-center items-center flex-shrink-0 bg-one hover:bg-two h-12 px-4 rounded-full cursor-pointer'
    >
      <div className='flex justify-center items-center text-white text-xs font-bold tracking-tight'>
        Save & Send
      </div>
    </div>
  );
}
