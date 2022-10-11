import { useState } from 'react';

export interface ISideNavProps {}

export default function SideNav() {
  const [open, setOpen] = useState(true);

  const toggleSideNav = () => setOpen((curr) => !curr);

  return (
    <div className={`${open ? 'w-64' : 'w-0'} shadow-lg h-full bg-gray-900 transition-[width] duration-500`}>
      <button onClick={toggleSideNav}>close</button>
    </div>
  );
}
