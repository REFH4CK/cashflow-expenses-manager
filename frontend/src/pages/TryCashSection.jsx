import tryImage from "@/assets/stats-img.png";
import { Link } from "react-router";


export function TryCashSection() {
  return (
    <>
      <section className="h-100dvh relative px-40 max-w-1920 mx-auto">
        <span className="absolute bg-tryBlob bg-no-repeat top-0 left-0 w-full h-full z-10"></span>
        <article className="flex w-full h-full justify-between items-center">
          <img src={tryImage} className="w-auto h-40rem" alt="Board with stats" />
          <div className="z-50">
            <h1 className="text-white baloo-text font-bold text-7xl my-5">
              Try our system totally free
            </h1>
            <p className="baloo-text text-alternative-text text-2xl pr-4">
              Managing your finances is key to reaching your goals. With
              Cashflow, simplify this task and control your income and expenses.
              Plan clearly, build a solid future, and bring your financial
              dreams to life. Discover a new way to handle your money and
              empower yourself!
            </p>
            <div className="w-full flex justify-center pr-24">
            <Link to={'/login'} className="font-k2d text-center font-bold text-tree-poppy-500 bg-oxford-blue-800 w-80 p-4 rounded-full shadow-md shadow-black cursor-pointer hover:bg-oxford-blue-900 mt-8 hover:transition-all">
              Get Started
            </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
