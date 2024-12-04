import { logoGithub, logoX, logoLinkedin, logoInstagram, mail } from "ionicons/icons"


export function Socials() {

  const socialLinks = [
    {name: 'Github', icon: logoGithub, link: ''},
    {name: 'LinkedIn', icon: logoLinkedin, link: ''},
    {name: 'Twitter', icon: logoX, link: ''},
    {name: 'Instagram', icon: logoInstagram, link: ''},
    {name: 'Gmail', icon: mail, link: ''}
  ]

  return (
    <>
      <article className="flex justify-center gap-4 items-center py-12">
        {socialLinks.map((social, i) => (
          <a href={social.link} title={social.name} key={i}>
            <img src={social.icon} className="w-12 invert opacity-30 hover:opacity-45 hover:transition-all" alt={social.name} />
          </a>
        ))}
      </article>
    </>
  )
}
