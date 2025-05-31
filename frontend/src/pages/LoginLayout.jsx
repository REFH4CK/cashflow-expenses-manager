import loginBg from '@/assets/images/loginbg.png';

export function LoginLayout({ children }) {
  return (
    <>
      <main
        className="min-h-screen bg-no-repeat bg-cover w-full h-[100dvh] flex justify-center items-center flex-col"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {children}
      </main>
    </>
  );
}
