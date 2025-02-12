import { Github } from "@/icons/Github";
import { Twitter } from "@/icons/Twitter";
import { Instagram } from "@/icons/Instagram";
import { Gmail } from "@/icons/Gmail";
import { Fade } from "react-awesome-reveal";

export function Socials() {
  const socialLinks = [
    { name: "Github", icon: <Github />, link: "" },
    { name: "Twitter", icon: <Twitter />, link: "" },
    { name: "Instagram", icon: <Instagram />, link: "" },
    { name: "Gmail", icon: <Gmail />, link: "" },
  ];

  return (
    <>
      <article className="flex justify-center gap-4 pt-20 pb-10">
        <Fade triggerOnce cascade damping={0.2}>
          {socialLinks.map((social, i) => (
            <a href={social.link} title={social.name} key={i} className="text-oxford-blue-200/50 font-baloo font-bold flex flex-col items-center gap-1">
              {social.icon} {social.name}
            </a>
          ))}
        </Fade>
      </article>
    </>
  );
}
