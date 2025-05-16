import { AsideBar } from "@/components/App/AsideBar";
import { toast } from "@pheralb/toast";
import { useNavigate } from "react-router";
import { ProfileInfo } from "@/components/App/ProfileInfo";
import { ProfileConfig } from "@/components/App/ProfileConfig";
import { useAuth } from "@/context/useAuth";

export function Profile() {
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
      <section className={`bg-[#1F252F] h-screen w-full flex`}>
        <AsideBar log={handleLogout}></AsideBar>
        <section
          className={`
            flex flex-col gap-6 items-center overflow-x-hidden w-full overflow-y-auto pt-[1rem] p-2 
            sm:overflow-y-auto sm:pt-[2rem] sm:pb-[1rem] sm:p-4
            md:justify-center md:pt-0 md:p-0 md:pb-0 `}
        >
          <article
            className={`
              bg-[#28303E] rounded-3xl shadow shadow-tree-poppy-700/50 w-[15.75rem]
              sm:w-full 
              md:w-[80%] md:h-[18rem]`}
          >
            <ProfileInfo
              id={user.id}
              name={user.name}
              country={user.country}
              username={user.username}
              reputation={user.reputation}
            ></ProfileInfo>
          </article>

          <article
            className={`
            bg-[#28303E] rounded-3xl shadow shadow-tree-poppy-700/50 w-[15.75rem] h-fit
              sm:w-full
              md:w-[80%]`}
          >
            <ProfileConfig
              id={user.id}
              name={user.name}
              country={user.country}
              username={user.username}
            ></ProfileConfig>
          </article>
        </section>
      </section>
    </>
  );
}
