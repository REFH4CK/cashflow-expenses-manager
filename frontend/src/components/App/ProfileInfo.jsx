import PropTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";
import countries from "@/assets/data/countries.json";
import { useEffect, useState } from "react";

export function ProfileInfo({
  id,
  name,
  country,
  username,
  reputation,
  spend_limit,
  photo,
}) {
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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <article className="flex justify-between p-12 items-center">
        <div className="flex gap-4">
          <div className="size-[10rem] border-4 border-oxford-blue-700 rounded-full p-2">
            <img
              src="https://placehold.co/200"
              alt={`Profile photo of ${username}`}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col mt-6">
            <h2 className="text-3xl font-bold text-oxford-blue-200 font-baloo">
              {name}{" "}
              <ReactCountryFlag
                style={{
                  fontSize: "2rem",
                }}
                aria-label={mappedCountry.name}
                countryCode={mappedCountryCode}
                svg
              />
            </h2>
            <span className="font-lexend text-sm font-light text-[#FFFFFF60] ml-1 -mt-1">
              @{username}
            </span>
            <div className="flex flex-col pt-4 text-oxford-blue-200 font-medium font-baloo">
              About him
              <p className="text-oxford-blue-400 font-medium font-lexend">
                {profile[0].description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-tree-poppy-500/15 p-8 w-[18rem] rounded-lg">
          <h3 className="text-tree-poppy-100/60 font-bold text-2xl">
            Savings reputation
          </h3>
          <p className="text-[1.8rem] mt-4 font-bold font-lexend text-tree-poppy-400/60">
            {reputation} PTS
          </p>
        </div>
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
  spend_limit: PropTypes.number.isRequired,
};
