import logo from "@/assets/cashflow-logo.svg";
import { MenuHamburger } from "@/icons/MenuHamburger";
import { Close } from "@/icons/Close";
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";

import { Fade } from "react-awesome-reveal";

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenu = (val) => {
    if (val === false) {
      setIsOpen(false);
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <header className="max-w-[1440px] mx-auto">
        <article
          className={`
            flex justify-between items-center px-3 py-2 relative
            lg:p-8 xl:px-16

          `}
        >
          <img
            src={logo}
            alt="Cashflow logo"
            className="size-[5rem] lg:size-[7rem]"
          />
          <nav
            ref={menuRef}
            className={`
            text-tree-poppy-500 size-[6rem]
              flex items-center justify-center
              md:w-[fit-content]
          `}
          >
            <span onClick={handleMenu} className="md:hidden">
              <MenuHamburger />
            </span>
            <Fade triggerOnce className="z-50">
              <ul
                className={`${
                  isOpen ? "showMenu" : "hidden"
                } flex-col absolute left-0 top-0 w-full bg-[#363636] text-[1rem] z-10 rounded-b-3xl font-poppins pt-4 
              md:flex md:bg-transparent md:pt-0 
              md:flex-row md:relative
              lg:text-[1.05rem]`}
              >
                <span onClick={handleMenu} className="md:hidden">
                  <Close />
                </span>
                <li className="hover:bg-[#F9970415] md:hover:rounded-lg transition-colors text-center p-4 md:p-2">
                  <Link to="#" className="md:p-2">
                    Home
                  </Link>
                </li>
                <li className="hover:bg-[#F9970415] md:hover:rounded-lg transition-colors text-center p-4 md:p-2">
                  <Link to="#" className="md:p-2">
                    Try Cashflow
                  </Link>
                </li>
                <li className="hover:bg-[#F9970415] md:hover:rounded-lg transition-colors text-center p-4 md:p-2">
                  <Link to="#" className="md:p-2">
                    About Us
                  </Link>
                </li>
                <li className="hover:bg-[#F9970415] md:hover:rounded-lg transition-colors text-center p-4 md:p-2">
                  <Link to="#" className="md:p-2">
                    Contact
                  </Link>
                </li>
              </ul>
            </Fade>
          </nav>
        </article>
      </header>
    </>
  );
}
