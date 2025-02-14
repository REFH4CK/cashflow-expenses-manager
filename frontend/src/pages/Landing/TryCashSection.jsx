import tryImage from "@/assets/images/stats-img.png";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";


export function TryCashSection() {
  const { t } = useTranslation();

  return (
    <>
      <section className="xl:flex xl:items-center w-full xl:h-[50dvh]">
        <article
          className={`
            flex flex-col items-center justify-center gap-4
            md:flex-row-reverse md:gap-4 md:pt-4 
            lg:gap-[2rem] lg:px-2
            xl:justify-between xl:w-full xl:gap-[0rem]
          `}
        >
          <div className="lg:flex lg:flex-col">
            <Fade triggerOnce>
              <h1
                className={`
                baloo text-3xl font-bold w-full text-left 
                text-tree-poppy-300/75
                md:text-[2.50rem] 
                lg:w-[75%] 
                xl:text-[3rem] xl:mb-4 xl:w-full
              `}
              >
                {t("tryTitle")}
              </h1>
            </Fade>
            <Fade direction="up" triggerOnce delay={200}>
              <p
                className={`
                baloo text-alternative-text font-light text-pretty w-full text-[.95rem] p-1 
                md:text-[1.1rem] 
                lg:text-[1.1rem] lg:w-[36rem]
                xl:text-[1.3rem] xl:w-[47rem]
              `}
              >
                {t("tryDesc")}
                <br /> <br />
                {t("tryDesc2")}
              </p>
            </Fade>
            <Fade direction="up" delay={400} triggerOnce>
              <div className="flex justify-center items-center gap-4 mt-4 rounded-full w-full lg:w-[100%]">
                <Link
                  to={"/login"}
                  className="bg-oxford-blue-800 text-tree-poppy-500 font-k2d font-bold w-[80%] text-center py-2 rounded-full hover:bg-oxford-blue-900 transition-colors shadow-lg shadow-[#00000050] md:p-3 md:w-full lg:w-[60%] lg:p-3"
                >
                  {t("getStarted")}
                </Link>
              </div>
            </Fade>
          </div>
          <Fade direction="left" triggerOnce delay={400}>
            <img
              src={tryImage}
              className="w-[20rem] h-auto lg:w-[22rem] xl:w-[27rem]"
            />
          </Fade>
        </article>
      </section>
    </>
  );
}
