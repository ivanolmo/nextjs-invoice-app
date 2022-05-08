export default function DraftBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      className='flex justify-center items-center bg-[#373b53] hover:bg-eight h-12 px-4 rounded-full cursor-pointer'
    >
      <div className='flex justify-center items-center text-six text-xs font-bold tracking-tight'>
        Save As Draft
      </div>
    </div>
  );
}
