import { LandingHeader } from "@/components/Header";
import { HomeSection } from "@/pages/HomeSection";
import { TryCashSection } from "@/pages/TryCashSection";
import { AboutUs } from "@/pages/AboutUs";
import { ContactUs } from "@/pages/ContactUs";

export function Landing() {
  return (
    <>
      <LandingHeader />
      <div
        className="absolute right-0 top-0 w-[60rem] h-[25rem]"
        style={{
          backgroundImage: "url('/src/assets/images/headerBlob.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="absolute left-0 top-[37rem] w-[45rem] h-[55rem]"
        style={{
          backgroundImage: "url('/src/assets/images/trySection-blob.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></div>
      <main className="flex flex-col items-center gap-[4rem] max-w-[1440px] mx-auto p-6 xl:px-16 scrollbar-none">
        <HomeSection />
        <TryCashSection />
        <AboutUs />
        <ContactUs />
      </main>
    </>
  );
}
