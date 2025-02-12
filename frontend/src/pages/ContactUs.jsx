import { Send } from "@/icons/Send";
import { Socials } from "@/components/Socials";
import { ChangeLanguage } from "@/components/ChangeLanguage";
import { Input } from "@/components/Input";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";


export function ContactUs() {
  const { t } = useTranslation();

  return (
    <>
      <section className="w-full overflow-hidden">
        <article className="">
          <Fade direction="up" triggerOnce>
            <form className="mx-auto w-fit flex flex-col items-center gap-4 p-8 rounded-lg bg-oxford-blue-500/10 shadow-lg">
              <h2
                className={`
              baloo text-3xl font-bold w-full text-center mb-6
              md:text-[2.50rem] md:mb-8
          `}
              >
                {t("contact")}
              </h2>
              <Input name="username" type="text" placeholder={t("name")} />
              <Input name="email" type="email" placeholder={t("email")} />
              <textarea
                className="p-2 w-[16rem] md:w-[20rem] md:text-[1.2rem] rounded-lg focus:outline focus:outline-[1px] outline-tree-poppy-600 resize-none md:p-3"
                name="message"
                id="textareaMsg"
                placeholder={t("message")}
              ></textarea>
              <button
                className={`
                flex items-center justify-center rounded-lg transition-colors p-2 gap-4 bg-oxford-blue-900 hover:bg-oxford-blue-700 w-[9rem]
                md:text-[1.2rem] font-baloo md:w-[12rem]
              `}
              >
                Submit <Send />
              </button>
            </form>
          </Fade>

          <Socials />
          <ChangeLanguage />
        </article>
        <p className="baloo text-tree-poppy-50 text-center font-semibold text-pretty w-full text-[.95rem] p-1 md:text-[1.5rem]">
          All rights reserved &copy; REFH4CK 2024
        </p>
      </section>
    </>
  );
}
