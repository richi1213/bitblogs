const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className='flex flex-grow flex-col px-4 py-8'>{children}</main>;
};

export default Main;
