import { AsideBar } from "@/components/App/AsideBar";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import { toast } from "@pheralb/toast";

export function Settings() {
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
        <section className="flex flex-col gap-8 items-center w-full pt-[8rem]"></section>
      </section>
    </>
  );
}
