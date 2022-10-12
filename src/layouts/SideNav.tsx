import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

export interface ISideNavProps {}

interface INavLinkProps {
  open: boolean;
  children: any;
}

const NavLink = ({ open, children }: INavLinkProps) => {
  return (
    <li
      className={`p-3 rounded-md hover:bg-gray-100 hover:cursor-pointer opacity-0 animate-fadeIn animation-delay-100 animation-duration-500 animation-fill-forwards duration-300 ${
        open ? '' : 'hidden'
      }`}
    >
      {children}
    </li>
  );
};

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
        } absolute w-[70%] sm:w-64 shadow-lg h-full bg-zinc-900 transition-[width] duration-500 sm:relative`}
      >
        <div className={`w-full ${open ? 'flex flex-row' : 'hidden sm:flex sm:flex-row'} sm:flex sm:flex-row justify-end p-3`}>
          <button onClick={toggleSideNav}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        <ul className='w-[80%] mt-5 mx-auto font-roboto font-bold'>
          <NavLink open={open}>Dashboard</NavLink>
          <NavLink open={open}>Logout</NavLink>
        </ul>
      </div>
    </>
  );
}
