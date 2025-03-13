import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";

import { User } from "@/icons/Dashboard/User";
import { Add } from "@/icons/Dashboard/Add.jsx";
import { Logout } from "@/icons/Dashboard/Logout.jsx";
import { Report } from "@/icons/Dashboard/Report.jsx";
import { Stats } from "@/icons/Dashboard/Stats.jsx";
import { Wallet } from "@/icons/Dashboard/Wallet.jsx";
import { Settings } from "@/icons/Dashboard/Settings.jsx";
import logo from "@/assets/cashflow-logo.svg";

export function AsideBar({ log }) {
  const location = useLocation(); // Obtiene la ruta actual
  const currentPath = location.pathname; // Extrae el pathname de la ruta

  const iconList = [
    { icon: Wallet, text: "Dashboard", path: "/dashboard" },
    { icon: User, text: "Profile", path: "/profile" },
    { icon: Add, text: "Register entry/exit", path: "/register_flow" },
    { icon: Stats, text: "Cash stats", path: "/stats" },
    { icon: Report, text: "Generate report", path: "/gen_report" },
  ];

  return (
    <>
      <aside
        className={`relative bg-[#28303E] w-[20rem] h-screen transition-all duration-300`}
      >
        <ul className="flex flex-col h-screen items-center justify-between p-6 overflow-hidden relative">
          <article className="flex flex-col gap-8 w-full mt-[8rem]">
            <li className="flex items-center justify-between absolute top-0 left-0 bg-[#6c86a870] w-full pt-4 pl-4">
              <img src={logo} alt="CashFlow Logo" className="w-[6rem]" />
              <h3></h3>
            </li>
            {iconList.map((icon, i) => {
              const IconComponent = icon.icon;
              const isActive = currentPath === icon.path;

              return (
                <li key={i} className={`flex gap-5 relative`}>
                  <IconComponent fill={isActive ? "#DE7101" : undefined} />
                  <Link
                    className={`cursor-pointer ${
                      isActive ? "text-[#e98e2f]" : "text-[#6C86A8]"
                    } flex gap-5 items-center font-semibold font-lexend text-[.9rem] absolute left-[3.5rem] top-1/2 transform -translate-y-1/2 w-[10rem] whitespace-nowrap`}
                    to={icon.path}
                  >
                    {icon.text}
                  </Link>
                </li>
              );
            })}
          </article>
          <article className="flex flex-col gap-8 w-full">
            <span className="text-[#6C86A8] flex gap-5 items-center font-semibold font-lexend text-[.9rem] relative">
              <Settings
                fill={currentPath === "/settings" ? "#DE7101" : undefined}
              />{" "}
              {/* Aplica el color solo si está activo */}
              <Link
                className={`transition-all absolute left-[3.5rem] top-1/2 transform -translate-y-1/2 whitespace-nowrap ${
                  currentPath === "/settings"
                    ? "text-[#e98e2f]"
                    : "text-[#6C86A8]"
                }`}
                to={"/settings"}
              >
                Settings
              </Link>
            </span>
            <span
              onClick={log}
              className="cursor-pointer text-[#6C86A8] flex gap-5 items-center font-semibold font-lexend text-[.9rem] relative"
            >
              <Logout /> {/* No se pasa la propiedad fill */}
              <span
                className={`transition-all absolute left-[3.5rem] top-1/2 transform -translate-y-1/2 whitespace-nowrap`}
              >
                Log out
              </span>
            </span>
          </article>
        </ul>
      </aside>
    </>
  );
}

AsideBar.propTypes = {
  log: PropTypes.func.isRequired,
};
