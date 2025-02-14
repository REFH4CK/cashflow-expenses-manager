import { AboutUsCard } from "@/components/AboutUsCard";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";


export function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <section className="xl:flex xl:items-center xl:flex-col w-full xl:h-[45dvh]">
        <Fade triggerOnce>
          <h2
            className={`
            baloo text-3xl text-tree-poppy-100 font-bold w-full text-left
            md:text-[2.50rem] pt-6
          `}
          >
            {t("aboutUs")}
          </h2>
        </Fade>

        <article className="pt-8 md:pt-12 flex flex-col gap-4 xl:flex-row xl:justify-center xl:items-center xl:gap-8">
          <AboutUsCard />
        </article>
      </section>
    </>
  );
}
