import { Github } from "lucide-react";
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
          Recommended:{" "}
          <a
            href="https://email.noreply.snwbl.io/c/eJw0yb1OxCAcAPCngbHh_8FxDAwmhsFHcCsUeiiFS6EafXon59_mKMUIm5HJgTEG7Y1vIB8OtgyMym6KgHRI91WTzVYrBsMQjSwuUI45UcjMFqzRqDKliPe0Bqu1RsGq9TM9688y2neoS-secxyHoRaAX6P9BoO_XFOjf3_zH6---y9MdZYzP3sY8rzhLb4LVfqylLrEf8svhXwAAAP__qL05YA"
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
