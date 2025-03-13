import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { HidePass, ShowPass } from "@/icons/ShowHidePass";
import { toast } from "@pheralb/toast";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth"; // Importa useAuth

export function Login() {
  const [showPassword, setShowPassword] = useState("password");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función login del contexto

  const handleShowPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleLoginData = (e) => {
    e.preventDefault();

    if (loginData.username === "" || loginData.password === "") {
      toast.error({
        text: "All fields are required!",
      });
    } else {
      fetch("http://localhost:3000/cashflow/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error({
              text: data.error,
            });
          } else {
            if (data.user) {
              login(data.user); // Actualiza el estado del usuario en el contexto
              navigate("/dashboard"); // Redirige al dashboard
            }
            toast.success({
              text: data.message,
              description: "Welcome to CashFlow💎",
            });

            // Redirige usando useNavigate
            setTimeout(() => {
              navigate("/dashboard");
            }, 2500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <section
        className="bg-no-repeat bg-cover w-full h-[100dvh] flex justify-center items-center flex-col"
        style={{ backgroundImage: "url('/src/assets/images/loginbg.png')" }}
      >
        <h1 className="absolute top-[1rem] xsm:top-[4rem] md:top-[5rem] lg:text-[4rem] lilita text-5xl text-center">
          <Fade triggerOnce direction="down">
            Welcome to CashFlow!
          </Fade>
        </h1>

        <div className="bg-[#334051] py-8 w-[95%] xsm:w-[80%] sm:w-[65%] md:w-[45%] lg:w-[35%] xl:w-[30%] 2xl:w-[20%]  rounded-lg shadow-lg">
          <h1 className="lilita text-4xl text-center pb-8">Log in</h1>
          <form
            className="mt-4 space-y-4 flex flex-col items-center"
            onSubmit={handleLoginData}
          >
            <input
              type="text"
              id="text"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              name="username"
              autoComplete="off"
              placeholder="Username"
              className="w-[15rem] outline-none bg-white text-black/70 rounded-lg p-2"
            />
            <div className="relative">
              <input
                type={showPassword}
                id="password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                autoComplete="off"
                placeholder="Password"
                className="w-[15rem] outline-none bg-white text-black/70 rounded-lg p-2"
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
              Login
            </button>
            {/* <a href="/forgot" className="text-[#b6c1e4] text-center">
              Forgot password?
            </a> */}
            <a href="/register" className="text-[#acc0ff] text-center">
              Not have account? <br /> Click here to register now
            </a>
          </form>
        </div>
      </section>
    </>
  );
}
