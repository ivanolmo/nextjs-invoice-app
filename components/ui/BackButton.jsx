import { useRouter } from 'next/router';
import Image from 'next/image';

export default function BackButton() {
  const router = useRouter();

  return (
    <button type='button' onClick={() => router.back()}>
      <Image
        src='/assets/icon-arrow-left.svg'
        alt='left arrow'
        width={6}
        height={8}
      />
      <span className='text-xs tracking-tight font-bold ml-6'>Go Back</span>
    </button>
  );
}
