import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';
import AuthCheck from '../components/layout/AuthCheck';
import Button from '../components/ui/Button';
import DeleteUserModal from '../components/ui/DeleteUserModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const router = useRouter();

  const { user, logOut, deleteAuthUser } = useAuth();

  const handleClose = () => {
    router.back();
  };

  const handleCloseModal = () => setShowDeleteUserModal(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAuthUser();
      setLoading(false);
      router.push('/');
    } catch (error) {
      toast.error(
        'There was an error deleting your profile, please try again!'
      );
    }
  };

  return (
    <AuthCheck>
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <LoadingSpinner size={100} />
        </div>
      ) : (
        <div className='grid w-full md:justify-items-center lg:h-screen'>
          <div className='pt-8 md:pt-12 lg:pt-16 px-6 md:px-0 md:w-[688px] lg:w-[730px]'>
            <div
              className='flex items-center cursor-pointer group w-fit'
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
              <span className='ml-6 text-xs font-bold tracking-tight dark:text-white group-hover:text-indigo-400 dark:group-hover:text-slate-400'>
                Go Back
              </span>
            </div>
            <div className='flex flex-col w-full gap-6 p-6 mt-8 text-xs tracking-tight bg-white rounded-md dark:bg-slate-900 md:p-8 md:rounded-lg'>
              <div>
                <span className='text-xl font-bold'>User Profile</span>
              </div>
              <div className='flex flex-col w-full gap-6'>
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
              <div className='grid w-full grid-cols-2 gap-6 mt-6'>
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
      )}
    </AuthCheck>
  );
}
