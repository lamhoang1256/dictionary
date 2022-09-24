import { HTMLAttributes } from "react";
import classNames from "utils/classNames";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutHomeProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutHome = ({ children, className = "" }: LayoutHomeProps) => {
  return (
    <div className={classNames("flex flex-col min-h-screen", className)}>
      <Header />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutHome;
