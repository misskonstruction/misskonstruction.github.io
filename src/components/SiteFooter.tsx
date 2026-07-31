import { Github, Mail, Facebook, Youtube, Instagram, Cloud } from "lucide-react";
import octopus from "@/assets/octopus-icon.png";

const socialLinks = [
  { href: "mailto:hello@misskonstruction.com", label: "Email", Icon: Mail },
  { href: "https://www.facebook.com/misskonstruction/", label: "Facebook", Icon: Facebook },
  { href: "https://www.youtube.com/@misskonstruction", label: "YouTube", Icon: Youtube },
  { href: "https://www.instagram.com/misskonstruction", label: "Instagram", Icon: Instagram },
  { href: "https://bsky.app/profile/misskonstruction.bsky.social", label: "Bluesky", Icon: Cloud },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10 mt-20">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; Copyright 2026{" "}
          <strong className="text-foreground">MissKonstruction Photography</strong>. All Rights Reserved.
        </p>
        <nav aria-label="Social links" className="mt-4 flex items-center justify-center gap-4 flex-nowrap">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              title={label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </nav>
        <p className="mt-3">
          Recommended:{" "}
          <a
            href="https://getfurlife.com/collections/furlife?snowball=CAMILLE87886&utm_source=snowball&utm_medium=default-program&utm_campaign=CAMILLE87886"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            Fur Life flea &amp; tick (15% off)
          </a>
        </p>
        <p className="mt-3">
          To view my work on GitHub, visit{" "}
          <a
            href="https://github.com/misskonstruction"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            <Github className="h-3.5 w-3.5" />
            github.com/misskonstruction
          </a>
        </p>
        <p className="mt-3 text-xs">
          Tools:{" "}
          <a
            href="/scratchpad.html"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            ScratchPad
          </a>{" "}
          — a simple browser notepad
        </p>
        <img
          src={octopus}
          alt="MissKonstruction octopus mascot"
          width={64}
          height={64}
          loading="lazy"
          className="mx-auto mt-4 h-16 w-16 opacity-90"
        />
      </div>
    </footer>
  );
}
