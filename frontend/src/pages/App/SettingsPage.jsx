import { AsideBar } from "@/components/App/AsideBar";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import { toast } from "@pheralb/toast";
import { Fade } from "react-awesome-reveal";
import { Settings } from "@/icons/Dashboard/Settings";
import { FormGroup } from "@/components/App/FormGroup";
import cryptoModule from "@/assets/images/cryptoModule.png";

export function SettingsPage() {
  const { user, logout } = useAuth();
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
        <section className="flex flex-col gap-8 items-center w-full pt-[8rem] overflow-hidden">
          <Fade className="w-full" triggerOnce direction="up">
            <article className="bg-[#28303E] w-[80%] h-[40rem] rounded-3xl shadow shadow-tree-poppy-700/50 mx-auto">
              <header className="flex gap-4 p-10 pb-4 items-center">
                <Settings />
                <h1 className="font-lexend text-oxford-blue-200 text-3xl font-bold">
                  Settings
                </h1>
              </header>
              <div className="h-[0.10rem] w-[90%] bg-[#9E5000]/80 mx-auto rounded-full"></div>
              <article className="">
                <form className="flex flex-col p-10 pt-4 items-center">
                  <h2 className="text-center p-8 w-[50%] text-xl mx-auto font-baloo font-semibold text-[#ee9740]">
                    Keep in mind that this will lower your reputation as a
                    CashFlow Saver.
                  </h2>
                  <FormGroup
                    label={"Spend Limit"}
                    name={"limit"}
                    value={""}
                    type={"text"}
                    onChange={""}
                    placeholder={"0.00"}
                  />
                  <button className="px-4 py-2 rounded-xl mt-4 bg-oxford-blue-700 text-[0.9rem] font-k2d font-semibold text-white/80 hover:bg-oxford-blue-600 transition duration-200 ease-in-out">
                    Save Changes
                  </button>
                </form>
              </article>
              <article className="flex items-center justify-center w-full h-[30%] relative">
                <h3 className="text-center text-3xl mb-6 font-baloo font-bold text-tree-poppy-100 z-10">
                  🚧 Coming Soon... 🚧
                </h3>
                <div className="absolute w-full h-full bottom-0 mask-fade-out">
                  <img
                    src={cryptoModule}
                    alt="Crypto images with differents currencies logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </article>
            </article>
          </Fade>
        </section>
      </section>
    </>
  );
}
