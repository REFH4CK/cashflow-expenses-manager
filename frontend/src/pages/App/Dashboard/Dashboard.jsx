import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router";
import { toast } from "@pheralb/toast";
import { AsideBar } from "@/components/App/AsideBar";
import { Saluting } from "@/icons/Dashboard/Saluting.jsx";
import { Balance } from "@/components/App/Balance";
import { LastMov } from "@/components/App/LastMov";

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

  if (
    user.country === null ||
    user.reputation === null ||
    user.spend_limit === null
  ) {
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
        <LastMov UID={user.id}></LastMov>
      </article>
    </section>
  );
}
