import { AsideBar } from "@/components/App/AsideBar";
import { FormGroup } from "@/components/App/FormGroup";
import { AllMovements } from "@/components/App/AllMovements";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import { toast } from "@pheralb/toast";

export function GenReport() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success({
      text: "Logout successful!",
      description: "You have been logged out.",
    });
    navigate("/login");
  };

  return (
    <>
      <section className={`bg-[#1F252F] h-screen flex`}>
        <AsideBar log={handleLogout} />
        <section className="flex flex-col gap-8 items-center w-full pt-[4rem]">
          <h2 className="text-4xl font-semibold font-lexend text-oxford-blue-200 text-left w-full pl-16">
            Savings reports
          </h2>
          <article className="bg-[#28303E] rounded-xl w-[67rem] h-[44.8rem] overflow-hidden">
            <header className="pb-6 border-b border-oxford-blue-600/50">
              <form className="pt-8 pl-6">
                <div className="flex items-end gap-4">
                  <FormGroup type={"date"} label={"Date"}></FormGroup>
                  <FormGroup
                    type={"text"}
                    label={"Description"}
                    placeholder={"Search by description"}
                  ></FormGroup>
                  <div className="flex flex-col">
                    <label
                      htmlFor="currency"
                      className="text-white/50 font-lexend text-[0.90rem] font-light"
                      id="currency"
                    >
                      Currency
                    </label>
                    <select
                      name="currency"
                      id="currency"
                      className="bg-oxford-blue-700 w-[14rem] h-[2.5rem] text-white/65 rounded-lg p-2 px-3"
                    >
                      <option value="">Select currency</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="entry"
                      className="text-white/50 font-lexend text-[0.90rem] font-light"
                    >
                      Inflow/Outflow
                    </label>
                    <select
                      name="entry"
                      id="entry"
                      className="bg-oxford-blue-700 w-[14rem] h-[2.5rem] text-white/65 rounded-lg p-2 px-3"
                    >
                      <option value="">Select a option</option>
                      <option value="inflow">Inflow</option>
                      <option value="outflow">Outflow</option>
                    </select>
                  </div>
                  <button className="bg-[#50759C] p-2 rounded-xl hover:bg-[#507fb1] transition-colors">
                    <img
                      src="https://img.icons8.com/?size=100&id=131&format=png&color=C5D1DE"
                      alt="Search icon"
                      className="size-6"
                    />
                  </button>
                </div>
              </form>
            </header>
            <section>
              <AllMovements></AllMovements>
            </section>
          </article>
        </section>
      </section>
    </>
  );
}
