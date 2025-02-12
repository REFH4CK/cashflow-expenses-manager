import { LandingHeader } from "@/components/Header";
import { HomeSection } from '@/pages/HomeSection'
import { TryCashSection } from '@/pages/TryCashSection'
import { AboutUs } from '@/pages/AboutUs'
import { ContactUs } from '@/pages/ContactUs'


export function Landing() {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col items-center gap-[4rem] max-w-[1440px] mx-auto p-6 xl:px-16 scrollbar-none">
        <HomeSection />
        <TryCashSection />
        <AboutUs />
        <ContactUs />
      </main>
    </>
  );
}
