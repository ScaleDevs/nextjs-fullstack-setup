import { useState } from 'react';
import Link from 'next/link';
import useAppStoreTrack from '@/store/app.store';
import { useLogout } from '@/modules/hooks/useLogout.hook';
import ChevronDownIcon from '@/components/ChevronDownIcon';
import ChevronUpIcon from '@/components/ChevronUpIcon';
import HamburgerIcon from '@/components/HamburgerIcon';
import ArrowCircleRightIcon from '@/components/ArrowCircleRightIcon';
import ArrowCircleLeftIcon from '@/components/ArrowCircleLeftIcon';
import FadeIn from '@/components/FadeIn';

interface INavLinkHouseProps {
  title: string;
  open: boolean;
}

const NavLinkHouse = ({ title, open }: INavLinkHouseProps) => {
  const [collapse, setCollapse] = useState(false);

  const LinkItem = ({ children }: any) => (
    <div className='ml-4 text-sm p-3 rounded-md hover:bg-gray-100 hover:cursor-pointer'>{children}</div>
  );

  return (
    <li className={`${open ? '' : 'hidden'}`}>
      <FadeIn>
        <div
          className='flex flex-row justify-between p-3 w-full rounded-md hover:bg-gray-100 hover:cursor-pointer'
          onClick={() => setCollapse((curr) => !curr)}
        >
          {title}
          {collapse ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </FadeIn>

      <div className={`transition-[max-height] duration-500 ${collapse ? 'max-h-56 ease-in' : 'max-h-0'} overflow-hidden`}>
        <LinkItem>Link1</LinkItem>
        <LinkItem>Link2</LinkItem>
      </div>
    </li>
  );
};

interface INavLinkProps {
  open: boolean;
  children: any;
  path: string;
  logout?: boolean;
  houseItems?: boolean;
}

const NavLink = ({ open, children, path, logout }: INavLinkProps) => {
  const { signOutWithMutate } = useLogout();

  if (logout)
    return (
      <li className={`${open ? '' : 'hidden'}`} onClick={() => signOutWithMutate()}>
        <FadeIn cssText='p-3 w-full rounded-md hover:bg-gray-100 hover:cursor-pointer'>{children}</FadeIn>
      </li>
    );

  return (
    <li className={`${open ? '' : 'hidden'}`}>
      <Link href={path} className='w-full'>
        <FadeIn cssText='p-3 rounded-md hover:bg-gray-100 hover:cursor-pointer'>
          <a>{children}</a>
        </FadeIn>
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
        <HamburgerIcon />
      </button>
      <div
        className={`${
          sideNavOpen ? 'w-[70%] sm:w-64' : 'w-0 sm:w-12'
        } absolute w-[70%] sm:w-64 shadow-lg h-full bg-zinc-900 transition-[width] duration-500 sm:relative overflow-hidden`}
      >
        <div
          className={`w-full ${sideNavOpen ? 'flex flex-row' : 'hidden sm:flex sm:flex-row'} sm:flex sm:flex-row justify-end p-3`}
        >
          <FadeIn cssText={`w-full flex flex-row justify-center p-3 ${sideNavOpen ? 'hidden' : ''}`}>
            <button onClick={toggleSideNav}>
              <ArrowCircleRightIcon />
            </button>
          </FadeIn>
        </div>

        <ul className='w-[90%] mt-5 mx-auto font-roboto font-bold'>
          <NavLink open={sideNavOpen} path='/'>
            Dashboard
          </NavLink>
          <NavLink open={sideNavOpen} path='/user-management'>
            Users
          </NavLink>
          <NavLinkHouse open={sideNavOpen} title='Product' />
          <NavLink open={sideNavOpen} path='/login' logout>
            Logout
          </NavLink>
        </ul>

        <FadeIn cssText={`w-full flex flex-row justify-center p-3 ${sideNavOpen ? '' : 'hidden'}`}>
          <button onClick={toggleSideNav}>
            <ArrowCircleLeftIcon />
          </button>
        </FadeIn>
      </div>
    </>
  );
}
