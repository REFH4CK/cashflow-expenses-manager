export function AboutUsCard() {

  const aboutUsInfo = [
    {
      title: "Simplicity",
      content:
        "We are committed to offering a simple and user-friendly tool that allows our users to manage their finances in an intuitive and uncomplicated way.",
    },
    {
      title: "Effectiveness",
      content:
        "We aim to provide an effective solution that simplifies the management of financial resources, enabling strategic decisions for efficient financial goals.",
    },
    {
      title: "Empowerment",
      content:
        "Our goal is to empower users with tools to control their finances and achieve financial goals with confidence and ease.",
    },
  ];

  return (
    <>
      {aboutUsInfo.map((card, i) => (
        <article className="flex flex-col w-64 h-72 items-center bg-about-cards py-4 px-8 rounded-lg shadow-lg" key={i}>
          <h2 className="text-tree-poppy-600 baloo-text font-bold text-2xl">{card.title}</h2>
          <p className="text-light-gray font-lexend text-center mt-2">{card.content}</p>
        </article>
      ))}
    </>
  );
}
