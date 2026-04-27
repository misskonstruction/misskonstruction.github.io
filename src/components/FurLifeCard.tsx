import { ArrowRight } from "lucide-react";
import furlifeDogs from "@/assets/furlife-dogs.jpg";

export const FURLIFE_URL =
  "https://email.noreply.snwbl.io/c/eJw0yb1OxCAcAPCngbHh_8FxDAwmhsFHcCsUeiiFS6EafXon59_mKMUIm5HJgTEG7Y1vIB8OtgyMym6KgHRI91WTzVYrBsMQjSwuUI45UcjMFqzRqDKliPe0Bqu1RsGq9TM9688y2neoS-secxyHoRaAX6P9BoO_XFOjf3_zH6---y9MdZYzP3sY8rzhLb4LVfqylLrEf8svhXwAAAP__qL05YA";

export function FurLifeCard() {
  return (
    <section className="mt-16 border-t border-border/60 pt-10">
      <div className="text-center mb-6">
        <p
          className="text-primary text-2xl mb-1"
          style={{ fontFamily: "var(--font-hand)" }}
        >
          ✦ friends of MissKonstruction
        </p>
        <h2
          className="text-2xl md:text-3xl text-foreground"
          style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
        >
          A small recommendation, from my pack to yours
        </h2>
      </div>

      <div className="grid md:grid-cols-5 gap-6 md:gap-10 items-center max-w-4xl mx-auto rounded-lg border border-border bg-card p-4 md:p-6">
        <div className="md:col-span-3 relative aspect-[4/3] overflow-hidden rounded-md">
          <img
            src={furlifeDogs}
            alt="Kylo and Blitz — my two rescue dogs napping together"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Fur Life — Flea & Tick Care
          </p>
          <p className="text-foreground leading-relaxed mb-5">
            Kylo and Blitz are the reason I'm picky about flea & tick care.
            Fur Life is what we actually use — clean, gentle, and it just
            works. Friends of mine get <strong>15% off</strong> with my link.
          </p>
          <a
            href={FURLIFE_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Get 15% off at Fur Life
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Affiliate link — I earn a small commission if you order, at no
            extra cost to you.
          </p>
        </div>
      </div>
    </section>
  );
}
