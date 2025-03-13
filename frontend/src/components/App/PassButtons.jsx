import { ChevronL } from "@/icons/ChevronL.jsx";
import { ChevronR } from "@/icons/ChevronR.jsx";
import PropTypes from "prop-types";

export function PassButtons({ handleStep, step }) {
  return (
    <>
      <span
        className={`absolute top-[40%] left-0 shadow-sm flex justify-center items-center rounded-full bg-[#4f5c70] size-[1.5rem] cursor-pointer ${
          step === 1 ? "opacity-0" : ""
        }`}
        onClick={() => handleStep("prev")}
      >
        <ChevronL fill={'#DE7101'} w={'8'} h={'24'} />
      </span>
      <span
        className={`absolute top-[40%] right-0 shadow-sm flex justify-center items-center rounded-full bg-[#4f5c70] size-[1.5rem] cursor-pointer ${
          step === 4 ? "hidden" : ""
        }`}
        onClick={() => handleStep("next")}
      >
        <ChevronR fill={'#DE7101'} w={'8'} h={'24'} />
      </span>
    </>
  );
}

PassButtons.propTypes = {
  handleStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};
