import Link from 'next/link';

export interface IHeaderProps {}

export default function Header() {
  return (
    <div className='py-5 container mx-auto flex justify-end px-6'>
      <ul className='flex flex-row space-x-7 font-roboto text-2xl'>
        <li className='hover:bg-gray-800 px-5 py-2 duration-300 cursor-pointer'>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li className='hover:bg-gray-800 px-5 py-2 duration-300 cursor-pointer'>
          <Link href='/about'>
            <a>About Us</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
