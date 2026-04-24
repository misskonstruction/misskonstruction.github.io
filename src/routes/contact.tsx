import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, Facebook, Instagram, Cloud } from "lucide-react";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — MissKonstruction Photography" },
      { name: "description", content: "Get in touch with MissKonstruction Photography." },
    ],
  }),
});

function Contact() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-16 max-w-2xl text-center">
        {/* Profile photo placeholder — swap src for your portrait when ready */}
        <div className="mx-auto mb-8 h-40 w-40 rounded-full overflow-hidden border-4 border-primary/30 bg-card">
          <img
            src={profilePlaceholder}
            alt="MissKonstruction profile placeholder"
            width={320}
            height={320}
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">Contact</h1>
        <div className="inline-flex h-px w-16 bg-primary mt-4 mb-8" />
        <p className="text-muted-foreground">
          For session bookings, prints, or just to say hello — reach out below.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@misskonstruction.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-4 w-4" /> Email me
          </a>
          <a
            href="https://www.facebook.com/camihayes72"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-md hover:border-primary hover:text-primary transition-colors"
          >
            <Facebook className="h-4 w-4" /> Facebook
          </a>
          <a
            href="https://www.instagram.com/misskonstruction"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-md hover:border-primary hover:text-primary transition-colors"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <a
            href="https://bsky.app/profile/misskonstruction.bsky.social"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-md hover:border-primary hover:text-primary transition-colors"
          >
            <Cloud className="h-4 w-4" /> Bluesky
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
