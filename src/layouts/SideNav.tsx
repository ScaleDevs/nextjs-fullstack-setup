import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

export interface ISideNavProps {}

export default function SideNav() {
  const [open, setOpen] = useState(false);

  const toggleSideNav = () => setOpen((curr) => !curr);

  return (
    <>
      <button onClick={toggleSideNav} className='absolute p-3 sm:hidden'>
        <GiHamburgerMenu size={24} />
      </button>
      <div
        className={`${
          open ? 'w-[70%] sm:w-64' : 'w-0 sm:w-12'
        } absolute shadow-lg h-full bg-zinc-900 transition-[width] duration-500 sm:relative`}
      >
        <div className={`w-full ${open ? 'flex flex-row' : 'hidden sm:flex sm:flex-row'} sm:flex sm:flex-row justify-end p-3`}>
          <button onClick={toggleSideNav}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
