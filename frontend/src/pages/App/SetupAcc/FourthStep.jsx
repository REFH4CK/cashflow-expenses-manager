import { Fade } from "react-awesome-reveal";
import complete from "@/assets/images/completeAllSteps.png";
import PropTypes from "prop-types";

export function FourthStep({ onSubmit }) {

  return (
    <>
      <Fade direction="right">
        <h2 className="text-[1.25rem] text-center font-semibold font-lexend">
          ¡Everything ready!
        </h2>
        <div className="h-full flex flex-col items-center gap-4 justify-center">
          <img src={complete} alt="PC with shield" className="w-[20rem]" />
          <h1 className="px-4 text-[1rem] font-semibold font-lexend">
            Transform your mind, transform your economy:
          </h1>
          <ul
            className="flex flex-col gap-2 text-pretty text-[1rem] px-4"
            id="explains"
          >
            <li>Start managing your expenses effectively.</li>
            <li>
              Financial control is crucial to achieve your economic goals.
            </li>
            <li>Remember that everything starts in the mind.</li>
          </ul>
        </div>
        <button
          className="py-2 px-4 bg-oxford-blue-950 my-6 rounded-md hover:bg-oxford-blue-950/75 transition-colors shadow-md"
          onClick={onSubmit}
        >
          Complete profile
        </button>
      </Fade>
    </>
  );
}

FourthStep.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
