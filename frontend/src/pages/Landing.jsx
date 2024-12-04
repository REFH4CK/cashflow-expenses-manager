import { LandingHeader } from "@/components/Header";
import { HomeSection } from '@/pages/HomeSection'
import { TryCashSection } from '@/pages/TryCashSection'
import { AboutUs } from '@/pages/AboutUs'
import { ContactUs } from '@/pages/ContactUs'


export function Landing() {
  return (
    <>
      <LandingHeader />
      <main className="bg-landing min-h-dvh w-full mx-auto bg-custom-gradient">
        <HomeSection />
        <TryCashSection />
        <AboutUs />
        <ContactUs />
      </main>
    </>
  );
}
