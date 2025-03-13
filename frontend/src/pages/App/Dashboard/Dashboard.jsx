import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router";
import { toast } from "@pheralb/toast";
import { AsideBar } from "@/components/App/AsideBar";
import { Saluting } from "@/icons/Dashboard/Saluting.jsx";
import { Balance } from "@/components/App/Balance";

export function Dashboard() {
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

  if (user.country === "" || user.reputation === 0 || user.spend_limit === 0) {
    return navigate("/complete_profile");
  }

  return (
    <section className={`bg-[#1F252F] h-screen flex`}>
      <AsideBar log={handleLogout} />
      
      <article className="flex flex-col items-center justify-center h-screen w-full px-32 py-16">
        <h1 className="flex items-center gap-4 w-full h-fit text-oxford-blue-200 font-lexend font-bold text-[30px]">
          Hey, @{user.username}! <Saluting fill={"#D3DAE4"} />
        </h1>

        <Balance UID={user.id}></Balance>

        <h3 className="w-full text-oxford-blue-200 font-lexend font-bold text-[25px]">
          Last movements
        </h3>
        <div className="w-full h-[0.4rem] bg-[#DE7101]/30 rounded-full mb-4"></div>
        <section className="max-w-[1440px] h-[65%] w-full bg-[#334051] rounded-3xl"></section>
      </article>
    </section>
  );
}
