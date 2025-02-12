import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";


export function AboutUsCard() {
  const { t } = useTranslation();

  const aboutUsInfo = [
    {
      title: t("simplicity"),
      content: t("simplDesc"),
    },
    {
      title: t("effectiveness"),
      right: true,
      content: t("effectivDesc"),
    },
    {
      title: t("empowerment"),
      content: t("empowerDesc"),
    },
  ];

  return (
    <>
      <Fade cascade damping={0.5} triggerOnce>
        {aboutUsInfo.map((card, i) => (
          <article
            key={i}
            className={`${card.right ? "flex flex-col items-end" : ""}`}
          >
            <h2
              className={`
              baloo text-[1.15rem] text-tree-poppy-500/95 font-bold w-full 
              md:text-[1.5rem] ${card.right ? "md:text-right" : ""} xl:text-left
            `}
            >
              {card.title}
            </h2>
            <p
              className={`
              baloo text-tree-poppy-50 font-light text-pretty w-full text-[.95rem] p-3
              md:text-[1.25rem] md:p-4 md:w-[30rem] bg-oxford-blue-500/10 rounded-lg
              lg:w-[40rem] shadow-lg xl:w-[24rem] xl:h-[11rem]
            `}
            >
              {card.content}
            </p>
          </article>
        ))}
      </Fade>
    </>
  );
}
