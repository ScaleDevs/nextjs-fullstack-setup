import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import useAppStoreTrack from '@/store/app.store';

export interface ISideNavProps {}

interface INavLinkProps {
  open: boolean;
  children: any;
  path: string;
}

const NavLink = ({ open, children, path }: INavLinkProps) => {
  return (
    <li className={`${open ? '' : 'hidden'}`}>
      <Link href={path} className='w-full'>
        <div className='p-3 w-full rounded-md hover:bg-gray-100 hover:cursor-pointer opacity-0 animate-fadeIn animation-delay-100 animation-duration-500 animation-fill-forwards duration-300'>
          <a>{children}</a>
        </div>
      </Link>
    </li>
  );
};

export default function SideNav() {
  const { sideNavOpen, setAppState } = useAppStoreTrack();

  const toggleSideNav = () => setAppState('sideNavOpen', !sideNavOpen);

  return (
    <>
      <button onClick={toggleSideNav} className='absolute p-3 sm:hidden'>
        <GiHamburgerMenu size={24} />
      </button>
      <div
        className={`${
          sideNavOpen ? 'w-[70%] sm:w-64' : 'w-0 sm:w-12'
        } absolute w-[70%] sm:w-64 shadow-lg h-full bg-zinc-900 transition-[width] duration-500 sm:relative`}
      >
        <div
          className={`w-full ${sideNavOpen ? 'flex flex-row' : 'hidden sm:flex sm:flex-row'} sm:flex sm:flex-row justify-end p-3`}
        >
          <button onClick={toggleSideNav}>
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        <ul className='w-[80%] mt-5 mx-auto font-roboto font-bold'>
          <NavLink open={sideNavOpen} path='/'>
            Dashboard
          </NavLink>
          <NavLink open={sideNavOpen} path='/login'>
            Logout
          </NavLink>
        </ul>
      </div>
    </>
  );
}