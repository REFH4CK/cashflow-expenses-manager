import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";
import { SelectList } from "@/components/App/SelectList";

import countries from "@/assets/data/countries.json";
import currencies from "@/assets/data/countries_currency.json";
import settingsImg from "@/assets/images/settings-profile.webp";

export function SecondStep({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    updateFormData(updatedFormData); // Actualizar los datos en el componente padre
  };

  return (
    <>
      <Fade direction="right">
        <h2 className="text-md text-center font-bold font-lexend px-6">
          Lets set up your profile by filling out a few fields
        </h2>

        <article className="relative w-full flex flex-col items-center pt-8 px-1 rounded-xl gap-4 overflow-hidden">
          <p className="text-center font-lexend text-sm px-4 text-pretty relative z-10">
            This helps us to properly configure your profile and provide you
            with the best experience
          </p>
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <SelectList
                  name="country"
                  id="country"
                  data={countries}
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <SelectList
                  name="currency"
                  id="currency"
                  data={currencies}
                  value={formData.currency}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <SelectList
                  name="gender"
                  id="gender"
                  data={[
                    { name: "Male" },
                    { name: "Female" },
                    { name: "Other" },
                  ]}
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="birthday"
                  className="capitalize font-lexend text-[.85rem]"
                >
                  Birthday
                </label>
                <input
                  className="w-[14rem] bg-[#263141] text-pretty rounded-md p-2 uppercase"
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <img src={settingsImg} alt="" className="w-[12rem]" />
        </article>
      </Fade>
    </>
  );
}

SecondStep.propTypes = {
  formData: PropTypes.shape({
    country: PropTypes.string,
    currency: PropTypes.string,
    gender: PropTypes.string,
    birthday: PropTypes.string
  }),
  updateFormData: PropTypes.func.isRequired,
};
