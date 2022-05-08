export default function AddItemButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className='flex justify-center items-center bg-buttonLight hover:bg-five h-12 mt-12 rounded-full cursor-pointer'
    >
      <div className='flex justify-center items-center text-seven text-xs font-bold'>
        + Add New Item
      </div>
    </div>
  );
}
