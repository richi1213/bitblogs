import { PropsWithChildren } from 'react';

const SideBar: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <aside className='space-y-8 md:col-span-4 lg:col-span-3 xl:col-span-2'>
      {children}
    </aside>
  );
};

export default SideBar;
