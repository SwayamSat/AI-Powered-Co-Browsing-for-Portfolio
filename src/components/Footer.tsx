import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Swayam Satpathy. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: "https://github.com/SwayamSat" },
          { icon: Linkedin, href: "https://linkedin.com/in/swayamsatpathy" },
          { icon: Mail, href: "mailto:swayam.satpathy24@gmail.com" },
        ].map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
