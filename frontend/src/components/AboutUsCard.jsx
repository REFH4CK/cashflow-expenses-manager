import { Fade } from "react-awesome-reveal";

export function AboutUsCard() {
  const aboutUsInfo = [
    {
      title: "Simplicity",
      content:
        "We are committed to offering a simple and user-friendly tool that allows our users to manage their finances in an intuitive and uncomplicated way.",
    },
    {
      title: "Effectiveness",
      right: true,
      content:
        "We aim to provide an effective solution that simplifies the management of financial resources, enabling strategic decisions for efficient financial goals.",
    },
    {
      title: "Empowerment",
      content:
        "We strive to empower users with tools to take control of their finances and achieve their financial goals with confidence and ease.",
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
              lg:w-[40rem] shadow-lg xl:w-[24rem] xl:h-[10rem]
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
