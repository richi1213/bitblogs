const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className='container mx-auto'>{children}</div>;
};

export default PageContainer;
