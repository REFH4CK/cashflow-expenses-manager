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
      <section className={`bg-[#1F252F] h-screen flex`}>
        <AsideBar log={handleLogout}></AsideBar>
        <section className="flex flex-col gap-6 items-center justify-center w-full">
          <article className="bg-[#28303E] w-[80%] h-[18rem] rounded-3xl shadow shadow-tree-poppy-700/50">
            <ProfileInfo
              id={user.id}
              name={user.name}
              country={user.country}
              username={user.username}
              reputation={user.reputation}
            ></ProfileInfo>
          </article>

          <article className="bg-[#28303E] w-[80%] rounded-3xl shadow shadow-tree-poppy-700/50">
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
