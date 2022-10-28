import { useState } from 'react';
import Link from 'next/link';
import useAppStoreTrack from '@/store/app.store';
import { useLogout } from '@/modules/hooks/useLogout.hook';
import FadeIn from '@/components/FadeIn';
import IconComp from '@/components/Icon';

interface NavLinkHouseItem {
  path: string;
  title: string;
}

interface INavLinkHouseProps {
  title: string;
  Icon?: () => JSX.Element;
  links: NavLinkHouseItem[];
}

const NavLinkHouse = ({ title, Icon, links }: INavLinkHouseProps) => {
  const [collapse, setCollapse] = useState(false);

  const LinkItem = ({ children, path }: { children: any; path: string }) => (
    <Link href={path} passHref>
      <div className='text-md p-3 rounded-md hover:bg-gray-100 hover:cursor-pointer'>{children}</div>
    </Link>
  );

  const IconTitle = () => {
    if (Icon)
      return (
        <>
          <Icon />
          <div className='px-1' />
        </>
      );

    return null;
  };

  return (
    <li>
      <FadeIn>
        <div
          className='flex flex-row justify-between p-3 w-full rounded-md hover:bg-gray-100 hover:cursor-pointer'
          onClick={() => setCollapse((curr) => !curr)}
        >
          <div className='flex flex-row items-center'>
            <IconTitle />
            {title}
          </div>
          {collapse ? (
            <IconComp iconName='ChevronUpIcon' iconProps={{}} />
          ) : (
            <IconComp iconName='ChevronDownIcon' iconProps={{}} />
          )}
        </div>
      </FadeIn>

      <div
        className={`ml-4 border-l-2 transition-[max-height] duration-500 ${
          collapse ? 'max-h-56 ease-in' : 'max-h-0'
        } overflow-hidden`}
      >
        {links.map(({ title, path }, index) => (
          <LinkItem key={index} path={path}>
            {title}
          </LinkItem>
        ))}
      </div>
    </li>
  );
};

interface INavLinkProps {
  children: any;
  path: string;
  logout?: boolean;
  houseItems?: boolean;
  Icon?: () => JSX.Element;
}

const NavLink = ({ children, path, logout, Icon }: INavLinkProps) => {
  const { signOutWithMutate } = useLogout();

  const IconComp = () => {
    if (Icon)
      return (
        <>
          <Icon />
          <div className='px-1' />
        </>
      );

    return null;
  };

  if (logout)
    return (
      <li onClick={() => signOutWithMutate()}>
        <FadeIn cssText='p-3 w-full rounded-md hover:bg-gray-100 hover:cursor-pointer flex flex-row items-center'>
          <IconComp />
          {children}
        </FadeIn>
      </li>
    );

  return (
    <li>
      <FadeIn cssText='rounded-md hover:bg-gray-100 hover:cursor-pointer'>
        <Link href={path} passHref>
          <a className='p-3 flex flex-row items-center'>
            <IconComp />
            {children}
          </a>
        </Link>
      </FadeIn>
    </li>
  );
};

export default function SideNav() {
  const { sideNavOpen, setAppState } = useAppStoreTrack();

  const toggleSideNav = () => setAppState('sideNavOpen', !sideNavOpen);

  return (
    <>
      <button onClick={toggleSideNav} className='absolute p-3 sm:hidden'>
        <IconComp iconName='HamburgerIcon' iconProps={{ isButton: true }} />
      </button>
      <div
        className={`${
          sideNavOpen ? 'w-[70%] sm:w-64' : 'w-0 sm:w-12'
        } absolute w-[70%] sm:w-64 shadow-lg h-full bg-zinc-900 transition-[width] duration-500 sm:relative overflow-hidden z-10`}
      >
        {sideNavOpen ? (
          ''
        ) : (
          <div className={`w-full ${sideNavOpen ? 'flex flex-row' : 'hidden'} sm:flex sm:flex-row justify-end p-3`}>
            <FadeIn cssText={`w-full flex flex-row justify-center p-3 ${sideNavOpen ? 'hidden' : ''}`}>
              <button onClick={toggleSideNav}>
                <IconComp iconName='ArrowCircleRightIcon' iconProps={{ isButton: true }} />
              </button>
            </FadeIn>
          </div>
        )}

        <div className={sideNavOpen ? 'divide-y text-gray-200' : ''}>
          <div className={sideNavOpen ? 'text-blue-500 p-5 font-comfortaa font-bold text-3xl' : 'hidden'}>
            Scale<span className='text-gray-300'>Devs</span>
          </div>

          <div className={sideNavOpen ? 'w-full py-3' : 'hidden'}>
            <ul className='w-[90%] mx-auto font-comfortaa font- text-lg'>
              <NavLink path='/' Icon={() => <IconComp iconName='BarChartIcon' iconProps={{}} />}>
                Dashboard
              </NavLink>
              <NavLink path='/user-management' Icon={() => <IconComp iconName='UsersIcon' iconProps={{}} />}>
                Users
              </NavLink>
              <NavLinkHouse
                title='Product'
                Icon={() => <IconComp iconName='BoxIcon' iconProps={{}} />}
                links={[
                  { title: 'Create Product', path: '/product/create' },
                  { title: 'List Product', path: '/product/list' },
                ]}
              />
              <NavLink path='/login' logout Icon={() => <IconComp iconName='LogoutIcon' iconProps={{}} />}>
                Logout
              </NavLink>
            </ul>
          </div>

          <FadeIn cssText={`w-full flex flex-row justify-center px-3 pt-10 ${sideNavOpen ? '' : 'hidden'}`}>
            <button onClick={toggleSideNav}>
              <IconComp iconName='ArrowCircleLeftIcon' iconProps={{ isButton: true }} />
            </button>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
