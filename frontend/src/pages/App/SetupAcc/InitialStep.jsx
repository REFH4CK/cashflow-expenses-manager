import { useState } from "react";
import { useAuth } from "@/context/useAuth";
import { useNavigate } from "react-router";
import { toast } from "@pheralb/toast";

import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { FourthStep } from "./FourthStep";

import { PassButtons } from "@/components/App/PassButtons";
import { StepsCount } from "@/components/App/StepsCount";
import { ProgressBar } from "@/components/App/ProgressBar";

export function InitialStep() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [secondStepData, setSecondStepData] = useState({
    country: "",
    currency: "",
    gender: "",
    birthday: "",
  });

  const [spendLimit, setSpendLimit] = useState("");

  if (user.country != null || user.reputation != null || user.spend_limit != null) {
    return navigate("/dashboard");
  }

  const updateSecondStepData = (data) => {
    setSecondStepData(data);
  };

  const updateSpendLimit = (value) => {
    setSpendLimit(value);
  };

  const handleSubmit = () => {
    const formData = {
      ...secondStepData,
      spendLimit,
      uid: user.id,
    };

    fetch("http://localhost:3000/cashflow/api/completed-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          console.log("Success:", data);
          toast.success({
            text: data.message,
            description: "Now you can start using CashFlow💎",
          });

          // Redirige usando useNavigate
          setTimeout(() => {
            navigate("/dashboard");
          }, 2500);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const steps = {
    1: <FirstStep />,
    2: (
      <SecondStep
        formData={secondStepData}
        updateFormData={updateSecondStepData}
      />
    ),
    3: (
      <ThirdStep spendLimit={spendLimit} updateSpendLimit={updateSpendLimit} />
    ),
    4: <FourthStep onSubmit={handleSubmit} />,
  };

  const handleStep = (action) => {
    if (action === "next") {
      if (step === 4) {
        setStep(5);
      } else {
        setStep(step + 1);
      }
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      <section
        className="relative bg-no-repeat bg-cover w-full h-dvh flex flex-col items-center pt-8 px-2"
        style={{ backgroundImage: "url('/src/assets/images/loginbg.png')" }}
      >
        <ProgressBar step={step} />
        <article className="bg-[#374358] w-full h-[100dvh] flex flex-col items-center rounded-xl shadow-lg max-w-[1140px] mx-auto overflow-hidden pt-8">
          {steps[step]}
        </article>

        <PassButtons handleStep={handleStep} step={step} />

        <StepsCount step={step} />
      </section>
    </>
  );
}
