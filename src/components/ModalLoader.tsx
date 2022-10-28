import * as React from 'react';
import Loader from './Loader';
import Modal from './Modal';

interface IModalLoaderProps {
  children?: any;
  open: boolean;
}

export default function ModalLoader({ children, open }: IModalLoaderProps) {
  if (open)
    return (
      <Modal w='w-80' rounded='rounded-md'>
        <div className='text-center'>
          <Loader h='h-10' w='w-10' color='fill-yellow-500' />
          {children ? (
            <>
              <br /> {children}
            </>
          ) : (
            ''
          )}
        </div>
      </Modal>
    );
  return null;
}
