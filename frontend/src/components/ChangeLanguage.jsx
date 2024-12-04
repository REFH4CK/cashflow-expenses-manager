export function ChangeLanguage() {
  return (
    <>
      <section className="w-full flex justify-center items-center font-k2d">
        <select name="language" id="" className="border border-outline bg-transparent p-2 rounded-md text-outline">
          <option value="">Change Language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </section>
    </>
  );
}
