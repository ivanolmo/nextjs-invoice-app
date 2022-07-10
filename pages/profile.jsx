import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import DeleteUserModal from '../components/ui/DeleteUserModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const { user, logOut, deleteAuthUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router, user]);

  const handleClose = () => {
    router.back();
  };

  const handleCloseModal = () => setShowDeleteUserModal(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAuthUser();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return !user ? (
    <></>
  ) : loading ? (
    <div className='h-screen flex justify-center items-center'>
      <LoadingSpinner size={100} />
    </div>
  ) : (
    <div className='grid md:justify-items-center lg:h-screen w-full'>
      <div className='pt-8 md:pt-12 lg:pt-16 px-6 md:px-0 md:w-[688px] lg:w-[730px]'>
        <div
          className='group flex items-center w-fit cursor-pointer'
          onClick={() => handleClose()}
        >
          <div className='w-2 h-3'>
            <Image
              src='/assets/icon-arrow-left.svg'
              alt='left arrow'
              width='7px'
              height='10px'
              layout='responsive'
            />
          </div>
          <span className='text-xs dark:text-white group-hover:text-indigo-400 dark:group-hover:text-slate-400 tracking-tight font-bold ml-6'>
            Go Back
          </span>
        </div>
        <div className='flex flex-col gap-6 bg-white dark:bg-slate-900 text-xs tracking-tight mt-8 p-6 md:p-8 rounded-md md:rounded-lg w-full'>
          <div>
            <span className='text-xl font-bold'>User Profile</span>
          </div>
          <div className='flex flex-col gap-6 w-full'>
            <div className='flex justify-between'>
              <span className='font-bold'>Name:</span>
              <span>{user?.displayName ?? 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold'>Email:</span>
              <span>{user?.email ?? 'N/A'}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-bold'>Auth Provider:</span>
              <span>{user?.providerId ?? 'N/A'}</span>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6 mt-6 w-full'>
            <Button
              onClick={() => {
                logOut();
                router.push('/');
              }}
              containerClasses='col-span-2 md:col-span-1 bg-violet-500 hover:bg-violet-400'
              textClasses='text-white'
              buttonText='Sign Out'
            />
            <Button
              onClick={() => setShowDeleteUserModal(true)}
              containerClasses='col-span-2 md:col-span-1 bg-red-500 hover:bg-red-300'
              textClasses='text-white'
              buttonText='Delete Account'
            />
          </div>
        </div>
      </div>
      {showDeleteUserModal && (
        <DeleteUserModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
