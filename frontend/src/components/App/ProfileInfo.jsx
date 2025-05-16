import PropTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";
import countries from "@/assets/data/countries.json";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

export function ProfileInfo({ id, name, country, username, reputation }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const mappedCountry = countries.find((c) => c.name === country);
  const mappedCountryCode = mappedCountry ? mappedCountry.code : "🏴";

  useEffect(() => {
    fetch(`http://localhost:3000/cashflow/api/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <PuffLoader size={128} color="#b35925"></PuffLoader>
      </div>
    );

  return (
    <>
      <article
        className={`
          flex flex-col justify-between p-4
          sm:p-6
          md:flex-row md:p-12 md:items-center`}
      >
        <div className="flex gap-4">
          <Fade triggerOnce>
            <div className="size-[6rem] sm:size-[7rem] md:size-[10rem] sm:border-2 md:border-4 border-oxford-blue-700 rounded-full p-2">
              <img
                src={`${
                  profile[0].profile_photo != ""
                    ? `http://localhost:3000/cashflow/api${profile[0].profile_photo}`
                    : "https://placehold.co/200x200"
                }`}
                alt={`Profile photo of ${username}`}
                onError={(e) => {
                  e.target.src = "https://placehold.co/200x200";
                }}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col sm:mt-0 md:mt-6">
              <h2 className="text-xl sm:text-3xl font-bold text-oxford-blue-200 font-baloo">
                {name}{" "}
                <ReactCountryFlag
                  className="text-xl sm:text-[2rem]"
                  aria-label={mappedCountry.name}
                  countryCode={mappedCountryCode}
                  svg
                />
              </h2>
              <span className="font-lexend text-sm font-light text-[#ffffff60] ml-1 -mt-1">
                @{username}
              </span>
              <div className="flex flex-col pt-4 text-oxford-blue-200 font-medium font-baloo">
                About him
                <p className="text-sm sm:text-md text-oxford-blue-400 font-medium font-lexend">
                  {profile[0].description}
                </p>
              </div>
            </div>
          </Fade>
        </div>
        <Fade triggerOnce delay={150}>
          <div className="flex flex-col items-center bg-tree-poppy-500/15 sm:p-1 sm:w-full sm:mt-8 md:mt-0 md:p-8 md:w-[18rem] rounded-lg">
            <h3 className="text-tree-poppy-100/60 font-bold sm:text-lg md:text-2xl">
              Savings reputation
            </h3>
            <p className="sm:text-[1.50rem] md:text-[1.8rem] md:mt-4 font-bold font-lexend text-tree-poppy-400/60">
              {reputation} PTS
            </p>
          </div>
        </Fade>
      </article>
    </>
  );
}

ProfileInfo.propTypes = {
  photo: PropTypes.node,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  reputation: PropTypes.number.isRequired,
  spend_limit: PropTypes.number,
};
