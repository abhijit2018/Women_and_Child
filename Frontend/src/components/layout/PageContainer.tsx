import { ReactNode } from "react";


interface PageContainerProps {
  children: ReactNode;
  className?: string;
}


const PageContainer = ({
  children,
  className = "",
}: PageContainerProps) => {

  return (
    <main
      className={`
        container-custom 
        min-h-screen 
        py-6
        ${className}
      `}
    >
      {children}
    </main>
  );
};


export default PageContainer;