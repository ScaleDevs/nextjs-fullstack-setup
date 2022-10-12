import React from 'react';
import Header from '@/layouts/Header';
import SideNav from './SideNav';

export default function Layout({ children }: any) {
  return (
    <div className='w-full h-screen bg-zinc-800 flex flex-row overflow-y-auto scrollbar'>
      <SideNav />
      <div className='flex flex-col h-full w-full overflow-y-auto scrollbar'>
        <Header />
        <div className='container mx-auto'>{children}</div>
        <br />
      </div>
    </div>
  );
}
