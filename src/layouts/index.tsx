import React from 'react';
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';

export default function Layout({ children }: any) {
  return (
    <div className='w-full h-screen bg-gray-800'>
      <Header />
      <div className='flex flex-row h-[93%]'>
        <SideNav />
        <div className='container mx-auto'>{children}</div>
      </div>
    </div>
  );
}
