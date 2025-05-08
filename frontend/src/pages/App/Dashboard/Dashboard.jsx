import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router";
import { toast } from "@pheralb/toast";
import { AsideBar } from "@/components/App/AsideBar";
import { Saluting } from "@/icons/Dashboard/Saluting.jsx";
import { Balance } from "@/components/App/Balance";
import { LastMov } from "@/components/App/LastMov";
import { Fade } from "react-awesome-reveal";
import { AppLayout } from "@/pages/AppLayout";

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
    <AppLayout>
      <section className={`bg-[#1F252F] h-screen flex w-full outline outline-[#fff]/10 outline-1`}>
        <AsideBar log={handleLogout} />

        <article className="flex flex-col items-center sm:justify-start md:justify-center h-[100dvh] w-full md:px-32 md:py-16 sm:overflow-x-hidden md:overflow-hidden max-w-[1440px] sm:px-4 sm:py-8">
          <Fade className="w-full" direction="left" triggerOnce>
            <h1 className="flex items-center gap-4 w-full h-fit text-oxford-blue-200 font-lexend font-bold text-[30px] md:mt-0">
              Hey, @{user.username}! <Saluting fill={"#D3DAE4"} />
            </h1>
          </Fade>

          <Balance UID={user.id}></Balance>

          <Fade
            className="w-full h-full mt-8"
            delay={800}
            direction="up"
            triggerOnce
          >
            <LastMov UID={user.id}></LastMov>
          </Fade>
        </article>
      </section>
    </AppLayout>
  );
}
