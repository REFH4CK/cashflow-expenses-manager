import PropTypes from "prop-types";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { toast } from "@pheralb/toast";

import { FormGroup } from "./FormGroup";

export function ProfileConfig({ photo, id, name, country, username }) {
  const [formData, setFormData] = useState({
    description: "",
    id: id,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(photo || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Descripción a enviar:', formData.description);
    setIsSubmitting(true);

    const dataToSend = new FormData();
    if (image) dataToSend.append("image", image);
    dataToSend.append("description", formData.description);
    dataToSend.append("UID", id.toString());

    try {
      const response = await fetch(
        "http://localhost:3000/cashflow/api/update_profile",
        {
          method: "POST",
          body: dataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la solicitud");
      }

      const result = await response.json();
      console.log("Succesfully: Profile updated!: ", result);
      toast.success({
        text: "Profile updated!",
        description: "Your profile has been updated successfully.",
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      toast.error({
        text: "No data provided",
        description: "Upload a profile photo or write a description",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <header className="flex p-6">
        <h3 className="text-xl font-medium font-lexend text-oxford-blue-200">
          Profile settings
        </h3>
      </header>
      <section className="h-fit relative">
        <form
          className="flex flex-col items-center justify-center sm:gap-2 md:gap-6 pb-6 overflow-hidden h-full"
          onSubmit={handleSubmit}
        >
          <Fade triggerOnce direction="up" damping={0.25} cascade>
            <div className="flex sm:flex-col sm:gap-2 md:flex-row md:gap-28">
              <FormGroup
                type={"text"}
                label={"Your fullname"}
                name="name"
                value={name}
                onChange={() => {}}
                width="20"
                readOnly
              />
              <FormGroup
                type={"text"}
                label={"Your username"}
                name="username"
                value={`@${username}`}
                onChange={() => {}}
                width="20"
                readOnly
              />
            </div>
            <div className="flex sm:flex-col sm:gap-2 md:flex-row md:gap-28">
              <FormGroup
                type={"file"}
                label={
                  formData.image
                    ? formData.image.name
                    : "Upload your profile picture"
                }
                accept="image/*"
                id="imageInput"
                name="image"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  id="preview_pi"
                  className="sm:size-16 sm:-left-20 sm:-top-4 md:size-28 md:-left-32 md:-top-4 rounded-full object-cover absolute "
                />
              )}
              <FormGroup
                type={"text"}
                label={"Your country"}
                name="country"
                value={country}
                onChange={() => {}}
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-white/50">
                Edit your description
              </label>
              <textarea
                name="description"
                className="text-white/65 resize-none sm:w-[20rem] md:w-[25rem] p-4 bg-oxford-blue-700 rounded-xl"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="bg-[#50759C] p-3 px-16 rounded-xl font-lexend text-sm cursor-pointer shadow-md shadow-[#00000070] disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </Fade>
        </form>
      </section>
    </>
  );
}

ProfileConfig.propTypes = {
  photo: PropTypes.string,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
