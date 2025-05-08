export function AppLayout({ children }) {
  return (
    <>
      <main className="w-full min-h-screen flex justify-center bg-[#1F252F] ">
        {children}
      </main>
    </>
  );
}
