import { useState } from "react";
import { useNavigate } from "react-router";
import { Fade } from "react-awesome-reveal";

import { useAuth } from "@/context/useAuth";
import { AsideBar } from "@/components/App/AsideBar";
import { FormGroup } from "@/components/App/FormGroup";
import { CurrencySelect } from "@/components/App/CurrencySelect";
import { toast } from "@pheralb/toast";

export function RegisterFlow() {
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

  const [label, setLabel] = useState("inflow");
  const [cashData, setCashData] = useState({
    quantity: "",
    id_currency: "",
    description: "",
    mov_type: label,
    date: "",
    UID: user.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCashData({
      ...cashData,
      [name]: value,
    });
  };

  const handleCashData = (e) => {
    e.preventDefault();

    if (
      !cashData ||
      !cashData.quantity ||
      !cashData.id_currency ||
      !cashData.description ||
      !cashData.date
    ) {
      toast.error({
        text: "Please fill in all fields.",
      });

      console.log(cashData);

      return;
    }

    fetch("http://localhost:3000/cashflow/api/update_balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cashData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update balance");
        }
        return response.json();
      })
      .then((data) => {
        toast.success({
          text: "Record added successfully!",
        });
        setCashData({
          quantity: "",
          id_currency: "",
          description: "",
          mov_type: label,
          date: "",
          UID: user.id,
        });
      })
      .catch((error) => {
        toast.error({
          text: "Error",
          description: error.message,
        });
      });
  };

  const handleLabel = (label) => {
    setLabel(label);
    setCashData((prev) => ({
      ...prev,
      mov_type: label,
    }));
  };

  return (
    <>
      <section className={`bg-[#1F252F] h-screen flex`}>
        <AsideBar log={handleLogout} />

        <section className="flex flex-col gap-8 items-center w-full pt-[2rem] px-2 sm:pt-[4rem] sm:px-4 md:pt-[8rem] overflow-hidden">
          <Fade triggerOnce direction="left">
            <h2 className="text-[1.45rem] sm:text-4xl font-semibold font-lexend text-oxford-blue-200">
              Register cash {label}
            </h2>
          </Fade>
          <Fade className="w-full" triggerOnce direction="up" delay={100}>
            <article className="bg-[#28303E] rounded-xl h-[30rem] sm:w-full sm:h-[35rem] md:w-[45rem] md:h-[25rem] overflow-hidden">
              <div className="bg-[#4C617D]/20  sm:w-72 mx-auto p-4 flex justify-center gap-6 rounded-b-2xl">
                <button
                  onClick={() => handleLabel("inflow")}
                  className={`p-1 font-lexend text-[0.9rem] font-light transition-colors w-24 rounded-tl-[25px] rounded-tr-[5px] rounded-bl-[5px] rounded-br-[25px] ${
                    label === "inflow"
                      ? "bg-tree-poppy-700 hover:bg-tree-poppy-700/85"
                      : "bg-oxford-blue-700 text-white/50 hover:bg-oxford-blue-700/85 hover:text-white/65"
                  }`}
                >
                  Inflow
                </button>
                <button
                  onClick={() => handleLabel("outflow")}
                  className={`p-1 font-lexend text-[0.9rem] font-light transition-colors w-24 rounded-tl-[25px] rounded-tr-[5px] rounded-bl-[5px] rounded-br-[25px] ${
                    label === "outflow"
                      ? "bg-tree-poppy-700 hover:bg-tree-poppy-700/85"
                      : "bg-oxford-blue-700 text-white/50 hover:bg-oxford-blue-700/85 hover:text-white/65"
                  }`}
                >
                  Outflow
                </button>
              </div>
              <form
                className="flex flex-col items-center justify-center h-[80%] sm:gap-6 md:gap-10 sm:py-[1rem] sm:mt-[1rem] md:py-0 md:mt-0"
                onSubmit={handleCashData}
              >
                <Fade triggerOnce direction="up" cascade damping={0.25}>
                  <div className="flex gap-2 sm:gap-6 md:gap-16 flex-col md:flex-row">
                    <FormGroup
                      label={"Quantity"}
                      type={"text"}
                      id={"quantity"}
                      name={"quantity"}
                      placeholder={"0.0"}
                      value={cashData.quantity}
                      width="20"
                      onChange={handleInputChange}
                    />
                    <CurrencySelect
                      id={user.id}
                      value={cashData.id_currency}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex gap-2 sm:gap-6 md:gap-16 flex-col md:flex-row">
                    <FormGroup
                      label={"Description"}
                      type={"text"}
                      id={"description"}
                      name={"description"}
                      placeholder={"ex. shopping, food, etc."}
                      value={cashData.description}
                      width="20"
                      onChange={handleInputChange}
                    />
                    <FormGroup
                      label={`${label[0].toUpperCase()}${label.slice(
                        1,
                        8
                      )} date`}
                      type={"date"}
                      id={"date"}
                      name={"date"}
                      value={cashData.date}
                      width="20"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-lexend font-semibold bg-[#50759C] py-3 px-16 rounded-xl hover:bg-[#507fb1] transition-colors mt-[2rem] md:mt-0"
                  >
                    Add record
                  </button>
                </Fade>
              </form>
            </article>
          </Fade>
        </section>
      </section>
    </>
  );
}
