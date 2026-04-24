import { Github, Cloud } from "lucide-react";
import octopus from "@/assets/octopus-icon.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10 mt-20">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; Copyright 2026{" "}
          <strong className="text-foreground">MissKonstruction Photography</strong>. All Rights Reserved.
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
        <p className="mt-2">
          Find me on Bluesky at{" "}
          <a
            href="https://bsky.app/profile/misskonstruction.bsky.social"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            <Cloud className="h-3.5 w-3.5" />
            @misskonstruction.bsky.social
          </a>
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
