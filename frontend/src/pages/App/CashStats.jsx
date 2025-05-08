import { useNavigate } from "react-router";
import { toast } from "@pheralb/toast";
import { useState } from "react";

import { Fade } from "react-awesome-reveal";
import { useAuth } from "@/context/useAuth";
import { AsideBar } from "@/components/App/AsideBar";
import { Input } from "@/components/App/Input";
import { SavingsStats } from "@/components/App/SavingsStats";
import { CurrencySelect } from "@/components/App/CurrencySelect";

export function CashStats() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    UID: user.id,
    id_currency: "",
    from_date: "",
    to_date: "",
  });

  const [labels, setLabels] = useState([]);
  const [entries, setEntries] = useState([]);
  const [exits, setExits] = useState([]);

  const handleLogout = () => {
    logout();
    toast.success({
      text: "Logout successful!",
      description: "You have been logged out.",
    });
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavingFilters = (e) => {
    e.preventDefault();
    if (!filters.id_currency) {
      toast.error({ text: "Please select a currency" });
      return;
    }
    fetchSavingsStats();
  };

  const fetchSavingsStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/cashflow/api/savings_stats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UID: user.id,
            id_currency: filters.id_currency,
            start_date: filters.from_date,
            end_date: filters.to_date,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`No movements found!`);
      }

      const result = await response.json();

      if (!result || !result.data) {
        throw new Error("Invalid response structure");
      }

      const { labels = [], entries = [], exits = [] } = result.data;

      setLabels(labels);
      setEntries(entries);
      setExits(exits.map((exit) => -Math.abs(exit)));
    } catch (error) {
      console.error("Fetch error:", error);
      setLabels([]);
      setEntries([]);
      setExits([]);
      toast.info({
        text: "Don't have movements!",
      });
    }
  };

  return (
    <>
      <section className={`bg-[#1F252F] h-screen flex overflow-hidden`}>
        <AsideBar log={handleLogout} />
        <section className="flex flex-col gap-8 items-center w-full sm:pt-[2rem] md:pt-[3rem] overflow-hidden sm:px-4 md:px-0">
          <Fade className="w-full" triggerOnce direction="left">
            <h2 className="text-4xl font-semibold font-lexend text-oxford-blue-200 text-left w-full sm:pl-0 md:pl-16">
              Savings stats
            </h2>
          </Fade>
          <article className="bg-[#28303E] rounded-xl sm:w-full sm:h-[30rem] md:w-[65rem] md:h-[40rem] overflow-hidden">
            <header className="pb-6 border-b border-oxford-blue-600/50">
              <form
                className="flex w-full sm:items-center sm:flex-wrap md:flex-row md:items-end gap-4 pt-6 sm:pl-4 md:pl-12"
                onSubmit={handleSavingFilters}
              >
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-white/50 font-lexend text-[0.90rem] font-light"
                  >
                    From
                  </label>
                  <Input
                    type="date"
                    id="from_date"
                    onChange={handleInputChange}
                    className="bg-oxford-blue-700  md:w-[14rem] text-white/65 rounded-lg p-2 px-3"
                    name="from_date"
                    value={filters.from_date}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-white/50 font-lexend text-[0.90rem] font-light"
                  >
                    To
                  </label>
                  <Input
                    type="date"
                    id="to_date"
                    onChange={handleInputChange}
                    className="bg-oxford-blue-700 md:w-[14rem] text-white/65 rounded-lg p-2 px-3"
                    name="to_date"
                    value={filters.to_date}
                  />
                </div>
                <div className="flex flex-col">
                  <CurrencySelect
                    id={user.id}
                    value={filters.id_currency}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="bg-[#50759C] p-2 rounded-xl hover:bg-[#507fb1] transition-colors sm:w-fit md:py-2 flex items-center self-end justify-center gap-2">
                  <span className="md:hidden text-[#C5D1DE] font-lexend">
                    Search
                  </span>
                  <img
                    src="https://img.icons8.com/?size=100&id=131&format=png&color=C5D1DE"
                    alt="Search icon"
                    className="size-6"
                  />
                </button>
              </form>
            </header>
            <div className="flex flex-col h-[39rem] p-4">
              <SavingsStats entries={entries} exits={exits} labels={labels} />
            </div>
          </article>
        </section>
      </section>
    </>
  );
}
