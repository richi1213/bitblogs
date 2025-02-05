const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className='flex grow flex-col px-4 py-2'>{children}</main>;
};

export default Main;
