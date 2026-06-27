import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main className={`${className} container mx-auto`}>
      {children}
    </main>
  );
};

export default Container;
