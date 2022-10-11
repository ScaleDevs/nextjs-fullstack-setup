import Link from 'next/link';

export interface IHeaderProps {}

export default function Header() {
  return (
    <div className='h-[7%] min-h-min bg-gray-900 py-5 shadow-lg'>
      <div className='container mx-auto flex justify-end px-6'>
        <ul className='flex flex-row space-x-7 font-roboto text-2xl'>
          <li className='hover:bg-gray-800 px-5 duration-300 cursor-pointer'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li className='hover:bg-gray-800 px-5 duration-300 cursor-pointer'>
            <Link href='/about'>
              <a>About Us</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
