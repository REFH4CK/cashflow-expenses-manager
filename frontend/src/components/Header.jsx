import logo from "@/assets/logo-cashflow.png";
import { Link } from "react-router";

export function LandingHeader() {
  return (
    <>
      <header className="bg-landing flex justify-between items-center h-72 pl-40 pr-28 relative w-full mx-auto">
        <span className="absolute bg-headerBlob bg-no-repeat bg-right-top top-0 right-0 w-full h-full"></span>
        <img src={logo} alt="Cashflow logo" className="w-auto h-32" />
        <nav className="z-50">
          <ul className="flex text-tree-poppy-500 font-poppins gap-10 text-xl">
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">Try Cashflow</Link>
            </li>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
