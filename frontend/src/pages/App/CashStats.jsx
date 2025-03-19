import { AsideBar } from "@/components/App/AsideBar";
import { Input } from "@/components/App/Input";
import { SavingsStats } from "@/components/App/SavingsStats";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import { toast } from "@pheralb/toast";

export function CashStats() {
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
        <section className="flex flex-col gap-8 items-center w-full pt-[6rem]">
          <h2 className="text-4xl font-semibold font-lexend text-oxford-blue-200 text-left w-full pl-16">
            Savings stats
          </h2>
          <article className="bg-[#28303E] rounded-xl w-[65rem] h-[40rem] overflow-hidden">
            <header>
              <form className="flex items-end gap-4 pt-6 pl-12">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-white/50 font-lexend text-[0.90rem] font-light"
                  >
                    Date
                  </label>
                  <Input
                    className={
                      "bg-oxford-blue-700 w-[14rem] text-white/65 rounded-lg p-2 px-3"
                    }
                    type={"date"}
                    id={"date"}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-white/50 font-lexend text-[0.90rem] font-light"
                  >
                    Currency
                  </label>
                  <Input
                    className={
                      "bg-oxford-blue-700 w-[14rem] text-white/65 rounded-lg p-2 px-3"
                    }
                    placeholder={"USD, EUR, VES, ARS, MX"}
                    type={"text"}
                    id={"currency"}
                  />
                </div>
                <button className="bg-[#50759C] p-2 rounded-xl hover:bg-[#507fb1] transition-colors">
                  <img
                    src="https://img.icons8.com/?size=100&id=131&format=png&color=C5D1DE"
                    alt="Search icon"
                    className="size-6"
                  />
                </button>
              </form>
            </header>
            <div className="flex flex-col h-[39rem] p-4">
              <SavingsStats />
            </div>
          </article>
        </section>
      </section>
    </>
  );
}
