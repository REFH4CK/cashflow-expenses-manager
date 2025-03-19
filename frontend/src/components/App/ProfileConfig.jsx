import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import { FormGroup } from "./FormGroup";

export function ProfileConfig({ photo, id, name, country, username }) {
  return (
    <>
      <header className="flex p-6">
        <h3 className="text-xl font-medium font-lexend text-oxford-blue-200">
          Profile settings
        </h3>
      </header>
      <section>
        <form className="flex flex-col items-center justify-center gap-6">
          <div className="flex gap-28">
            <FormGroup type={'text'} label={"Your fullname"} value={name}></FormGroup>
            <FormGroup type={'text'} label={"Your username"} value={`@${username}`} />
          </div>
          <div className="flex gap-28">
            <FormGroup type={'text'} label={'default-img.png'} value={photo} />
            <FormGroup type={'text'} label={"Your country"} value={country} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-white/50">Edit your description</label>
            <textarea name="description" className="text-white/65 resize-none w-[25rem] p-4 bg-oxford-blue-700 rounded-xl" id="description"></textarea>
          </div>
          <button className="bg-[#50759C] p-3 px-16 rounded-xl font-lexend text-sm cursor-pointer shadow-md shadow-[#00000070]">Save changes</button>
        </form>
      </section>
    </>
  );
}

ProfileConfig.propTypes = {
  photo: PropTypes.node,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
