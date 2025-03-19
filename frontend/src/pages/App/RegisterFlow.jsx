import { AsideBar } from "@/components/App/AsideBar";
import { FormGroup } from "@/components/App/FormGroup";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/useAuth";
import { toast } from "@pheralb/toast";

export function RegisterFlow() {
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

  const [label, setLabel] = useState("inflow");
  const [cashData, setCashData] = useState({
    quantity: "",
    currency: "",
    description: "",
    label: "",
    date: "",
  });

  // Maneja cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCashData({
      ...cashData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleCashData = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", cashData);
  };

  const handleLabel = (label) => {
    setLabel(label);
    setCashData({label: label})
  };

  return (
    <>
      <section className={`bg-[#1F252F] h-screen flex`}>
        <AsideBar log={handleLogout} />

        <section className="flex flex-col gap-8 items-center w-full pt-[8rem]">
          <h2 className="text-4xl font-semibold font-lexend text-oxford-blue-200">
            Register cash {label}
          </h2>
          <article className="bg-[#28303E] rounded-xl w-[45rem] h-[25rem]">
            <div className="bg-[#4C617D]/20 w-72 mx-auto p-4 flex justify-center gap-6 rounded-b-2xl">
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
              className="flex flex-col items-center justify-center h-[80%] gap-10"
              onSubmit={handleCashData}
            >
              <div className="flex gap-16">
                <FormGroup
                  label={"Quantity"}
                  type={"text"}
                  id={"quantity"}
                  name={"quantity"}
                  placeholder={'0.0'}
                  value={cashData.quantity}
                  onChange={handleInputChange}
                />
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-white/50 font-lexend text-[0.90rem] font-light"
                  >
                    Currency
                  </label>
                  <select
                    name="currency"
                    id="currency"
                    className="bg-oxford-blue-700 w-[14rem] h-[2.5rem] text-white/65 rounded-lg p-2 px-3"
                    value={cashData.currency}
                    onChange={handleInputChange}
                  >
                    <option value="">Select currency</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-16">
                <FormGroup
                  label={"Description"}
                  type={"text"}
                  id={"description"}
                  name={"description"}
                  placeholder={"ex. shopping, food, etc."}
                  value={cashData.description}
                  onChange={handleInputChange}
                />
                <FormGroup
                  label={`${label[0].toUpperCase()}${label.slice(1, 8)} date`}
                  type={"date"}
                  id={"date"}
                  name={"date"}
                  value={cashData.date}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="font-lexend font-semibold bg-[#50759C] py-3 px-16 rounded-xl hover:bg-[#507fb1] transition-colors"
              >
                Add record
              </button>
            </form>
          </article>
        </section>
      </section>
    </>
  );
}
