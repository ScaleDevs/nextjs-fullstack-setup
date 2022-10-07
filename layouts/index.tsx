import React from 'react';
import Header from '@/components/Header';

export default function Layout({ children }: any) {
  return (
    <div className='w-full h-screen bg-gray-900'>
      <Header />
      <br />
      <div className='container mx-auto'>{children}</div>
    </div>
  );
}
