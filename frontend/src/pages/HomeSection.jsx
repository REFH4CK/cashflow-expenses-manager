import homeImage from "@/assets/images/home-img-.png";
import { useTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";

export function HomeSection() {
  const { t } = useTranslation();

  return (
    <>
      <section className="xl:flex xl:items-center w-full xl:h-[50dvh]">
        <article
          className={`
            flex flex-col justify-center items-center gap-4
            md:flex-row md:gap-16 md:pt-6 lg:gap-[5rem]
            xl:justify-between xl:w-full xl:gap-[0rem]
          `}
        >
          <div className="lg:flex lg:flex-col">
            <Fade triggerOnce>
              <h1
                className={`
              baloo text-3xl font-bold w-fit text-left
              md:text-[2.50rem]
              xl:text-[3rem] xl:mb-4
              text-tree-poppy-400/60
            `}
              >
                {t("cashflowTitle")}
              </h1>
            </Fade>

            <Fade direction="up" delay={200} triggerOnce>
              <p
                className={`
                baloo text-alternative-text font-light text-pretty w-full text-[.95rem] p-1
                md:text-[1.1rem] 
                lg:text-[1.1rem] lg:w-[36rem]
                xl:text-[1.3rem] xl:w-[47rem]
              `}
              >
                Take control of your finances intelligently and efficiently with
                Cashflow. This tool allows you to optimize the management of
                your finances, ensuring every penny is accounted for and
                directed towards your goals. <br /> <br />
                Enhance your financial management and boost your overall
                financial health by tracking your spending habits, setting
                budgets, and monitoring progress over time.
              </p>
            </Fade>
          </div>
          <Fade direction="right" delay={400} triggerOnce>
            <img
              src={homeImage}
              alt="Board with stats"
              className="size-[18rem] lg:size-[18rem] xl:size-[25rem] opacity-[0.75] drop-shadow-2xl"
            />
          </Fade>
        </article>
      </section>
    </>
  );
}
