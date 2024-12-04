import { AboutUsCard } from '@/components/AboutUsCard'

export function AboutUs() {
  return (
    <>
      <section className="h-65dvh px-40 bg-none">
        <h2 className='text-5xl text-center font-lexend text-tree-poppy-100'>About Us</h2>
        <article className="flex w-full justify-center gap-24 items-center pt-16">
          <AboutUsCard />
        </article>
      </section>
    </>
  );
}
