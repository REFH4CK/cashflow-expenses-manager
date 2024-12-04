import homeImage from "@/assets/home-img-.png";

export function HomeSection() {
  return (
    <>
      <section className="h-60dvh px-40 max-w-1920 mx-auto">
        <article className="flex w-full justify-between items-center">
          <div className="pr-64 pl-32">
            <h1 className="text-white baloo-text font-bold text-7xl my-5">What is Cashflow?</h1>
            <p className="baloo-text text-alternative-text text-2xl pr-16">
              Record your expenses and income easily for detailed tracking. 
              Plan your financial future clearly and achieve your financial goals.
              Control your money intelligently and effectively with Cashflow.
              Optimize the management of your finances and enhance your
              financial well-being.
            </p>
          </div>
          <img src={homeImage} alt="Board with stats" />
        </article>
      </section>
    </>
  );
}
