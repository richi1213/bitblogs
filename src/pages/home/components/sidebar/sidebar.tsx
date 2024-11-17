import { PropsWithChildren } from 'react';

const SideBar: React.FC<PropsWithChildren> = ({ children }) => {
  return <aside className='space-y-8 md:w-1/3'>{children}</aside>;
};

export default SideBar;
