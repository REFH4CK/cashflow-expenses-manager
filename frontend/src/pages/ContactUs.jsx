import { send } from 'ionicons/icons';
import { Socials } from '@/pages/Socials';
import { ChangeLanguage } from '@/components/ChangeLanguage';


export function ContactUs() {
  return (
    <>
      <section className="h-95dvh p-40 max-w-1920 mx-auto">
        <article className='mx-auto'>
          <h2 className="text-center text-white baloo-text text-4xl font-bold">
            Contact Me
          </h2>
          <form className="flex flex-col w-96 mx-auto mt-6 gap-8">
            <input
              className="w-64 mx-auto px-3 py-2 bg-transparent border border-outline outline-none rounded-md text-outline"
              type="text"
              name="fullname"
              id=""
              placeholder="Fullname"
            />
            <input
              className="w-64 mx-auto px-3 py-2 bg-transparent border border-outline outline-none rounded-md text-outline"
              type="email"
              name="email"
              id=""
              placeholder="Email"
            />
            <textarea
              className="w-64 mx-auto px-3 py-2 bg-transparent border border-outline outline-none rounded-md h-32 resize-none text-outline"
              name="message"
              id=""
              placeholder="Message"
            ></textarea>
            <button className=" flex justify-center items-center gap-2 bg-oxford-blue-700 text-white w-40 mx-auto p-3 rounded-md">
              Submit <img src={send} className='w-5 invert' alt="Send icon" />
            </button>
          </form>

          <Socials />
          <ChangeLanguage />
        </article>
      <p className='mt-16 text-outline text-xl baloo-text font-bold text-center'>All rights reserved &copy; REFH4CK 2024</p>
      </section>
    </>
  );
}
