import { Fade } from "react-awesome-reveal";
import PropTypes from "prop-types";


export function ThirdStep({ spendLimit, updateSpendLimit }) {
  const handleSpendLimitChange = (e) => {
    const value = e.target.value;
    updateSpendLimit(value); // Actualizar el límite de gasto en el componente padre
  };

  return (
    <>
      <Fade direction="right">
        <h2 className="text-[0.95rem] text-center font-bold font-lexend px-4">
          Now we will explain a little about the monthly spending limit.
        </h2>

        <article className="w-full h-full flex flex-col items-center pt-8 px-1 rounded-xl gap-6 overflow-auto">
          <p className="text-left font-lexend text-sm px-4 text-pretty relative z-10">
            The monthly spending limit operates as follows:
          </p>
          <ul className="flex flex-col gap-2 text-pretty text-[1rem] px-4" id="explains">
            <li>
              You will only be able to make expenses less than the limit you
              have established.
            </li>

            <li>
              You will have the option to set a new limit at the end of each
              month.
            </li>

            <li>
              Its purpose is to encourage a habit that helps control major
              expenses (if they are not emergencies).
            </li>

            <li>
              It is important to note that this method will only give positive
              results if followed consistently, since its effectiveness depends
              on one&apos;s will to achieve significant improvements.
            </li>
          </ul>

          <form>
            <div className="flex flex-col gap-0">
              <label htmlFor="spend_limit">Define your spend limit</label>
              <input
                className="w-full bg-[#263141] text-pretty rounded-md p-2"
                type="text"
                placeholder="$0.0"
                name="spend_limit"
                id="spend_limit"
                value={spendLimit}
                onChange={handleSpendLimitChange}
              />
            </div>
          </form>
        </article>
      </Fade>
    </>
  );
}

ThirdStep.propTypes = {
  spendLimit: PropTypes.string.isRequired,
  updateSpendLimit: PropTypes.func.isRequired,
};