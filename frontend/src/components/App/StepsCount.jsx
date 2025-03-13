import PropTypes from "prop-types";
import { JackInTheBox } from "react-awesome-reveal";

export function StepsCount({ step }) {
  const totalSteps = 4;
  const currentStep = Math.max(1, Math.min(step, totalSteps));

  return (
    <article className="flex h-[10dvh]">
      <div className="gap-2 flex items-center justify-center">
        <JackInTheBox triggerOnce cascade damping={0.1}>
          {[...Array(totalSteps)].map((_, index) => {
            const stepNumber = index + 1;
            return (
              <span
                key={stepNumber}
                className={`block rounded-full size-[1.3rem] ${
                  currentStep === stepNumber
                    ? "bg-tree-poppy-600"
                    : "bg-oxford-blue-600"
                }`}
              ></span>
            );
          })}
        </JackInTheBox>
      </div>
    </article>
  );
}

StepsCount.propTypes = {
  step: PropTypes.number.isRequired,
};
