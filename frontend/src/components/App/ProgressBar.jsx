import PropTypes from "prop-types";

export function ProgressBar({ step }) {

  step++;
  const processedStep = (step - 1) * 25;

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-1 bg-[#DDD]/95 flex">
        <span
          className="block bg-tree-poppy-600 h-full transition-all"
          style={{ width: `${processedStep}%` }}
        ></span>
      </div>
    </>
  );
}

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
};
