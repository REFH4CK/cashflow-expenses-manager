import { Fade } from "react-awesome-reveal";
import step1pc from "@/assets/images/step1pc.png";
import { useAuth } from "@/context/useAuth";
export function FirstStep() {
  const { user } = useAuth();

  return (
    <>
      <Fade direction="right">
        <h2 className="text-[1.25rem] text-center font-bold font-lexend">
          Ok, @{user.username}. <br /> Let&apos;s set up your account!
        </h2>
        <div className="h-[30rem] flex flex-col items-center gap-12 justify-center">
          <img src={step1pc} alt="PC with shield" className="w-[14rem]" />
          <p className="text-center font-lexend text-[1rem] px-4 text-pretty">
            Don&apos;t worry! It will only be a few small configurations for
            your account to work perfectly, you must establish the currency of
            your preference, select your country and finally establish a monthly
            spending limit
          </p>
        </div>
      </Fade>
    </>
  );
}
