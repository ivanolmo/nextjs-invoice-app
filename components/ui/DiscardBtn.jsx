export default function DiscardBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      className='flex justify-center items-center bg-buttonLight hover:bg-five h-12 px-4 rounded-full cursor-pointer'
    >
      <div className='flex justify-center items-center text-seven text-xs font-bold tracking-tight'>
        Discard
      </div>
    </div>
  );
}
