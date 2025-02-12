import { useTranslation } from "react-i18next";

export function ChangeLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <section className="flex justify-center mb-6" onChange={changeLanguage}>
        <select
          name="language"
          id=""
          className="p-2 bg-transparent border-2 border-[#656565] text-[#e7e7e7] rounded-full w-[10rem]"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </section>
    </>
  );
}
