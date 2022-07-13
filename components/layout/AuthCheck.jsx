import Link from 'next/link';

import { useAuth } from '../../context/AuthContext';

export default function AuthCheck(props) {
  const { user } = useAuth();

  return user
    ? props.children
    : props.fallback || (
        <div className='mt-60 lg:m-0 place-self-center'>
          <Link href='/signin'>
            <a className='text-blue-900 border-b border-blue-900 dark:text-blue-400 dark:border-blue-400'>
              You must be signed in to view this page!
            </a>
          </Link>
        </div>
      );
}
