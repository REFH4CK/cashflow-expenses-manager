import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { HidePass, ShowPass } from "@/icons/ShowHidePass";
import { Arrow } from "@/icons/Arrow";
import { Input } from "@/components/App/Input";
import { Link } from "react-router";

export function Register() {
  const [showPassword, setShowPassword] = useState("password");

  const handleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  return (
    <>
      <section
        className="bg-no-repeat bg-cover w-full h-[100dvh]"
        style={{ backgroundImage: "url('/src/assets/images/loginbg.png')" }}
      >
        <article className="relative mx-auto flex justify-center items-center flex-col h-full max-w-[1440px]">
          <Link
            to="/login"
            className="absolute left-[1rem] top-[1rem] xsm:top-[2rem] md:top-[5rem] lg:text-[4rem]"
          >
            <Arrow />
          </Link>

          <h1 className="absolute top-[4rem] xsm:top-[4rem] md:top-[5rem] lg:text-[4rem] lilita text-center text-4xl">
            <Fade triggerOnce direction="down">
              Register in CashFlow
            </Fade>
          </h1>

          <div className="bg-[#334051] py-8 w-[95%] xsm:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%] xl:w-[30%] 2xl:w-[25rem]  rounded-lg shadow-lg">
            <h1 className="lilita text-4xl text-center pb-8">Sign Up</h1>
            <form className="mt-4 space-y-4 flex flex-col items-center">
              <Input
                type={"text"}
                id={"fullname"}
                placeholder={"Fullname"}
                autoComplete="off"
              />

              <Input
                type={"email"}
                id={"email"}
                placeholder={"Email"}
                autoComplete="off"
              />

              <Input
                type={"text"}
                id={"username"}
                placeholder={"Username"}
                autoComplete="off"
              />

              <div className="relative">
                <Input
                  type={showPassword}
                  id={"password"}
                  placeholder={"Password"}
                  autoComplete="off"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleShowPassword()}
                >
                  {showPassword === "password" ? <ShowPass /> : <HidePass />}
                </span>
              </div>
              <button
                type="submit"
                className="w-[50%] bg-[#50759C] text-white rounded-lg p-2"
              >
                Register
              </button>
            </form>
          </div>
        </article>
      </section>
    </>
  );
}
