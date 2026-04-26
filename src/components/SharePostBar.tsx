import { useState } from "react";
import { Facebook, Mail, Link2, Check } from "lucide-react";
import { toast } from "sonner";

type Props = {
  title: string;
  url: string;
  image?: string | null;
  description?: string;
  /** Optional override for the small kicker line (e.g. "✦ enjoyed this entry?"). */
  kicker?: string;
  /** Optional override for the headline (e.g. "Share it with someone you love"). */
  heading?: string;
};

// Simple Pinterest "P" mark (lucide doesn't ship one)
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 4.86 2.99 9.02 7.23 10.74-.1-.91-.19-2.31.04-3.3.21-.9 1.34-5.74 1.34-5.74s-.34-.69-.34-1.7c0-1.59.92-2.78 2.07-2.78.98 0 1.45.73 1.45 1.61 0 .98-.62 2.45-.95 3.81-.27 1.14.57 2.07 1.7 2.07 2.04 0 3.6-2.15 3.6-5.25 0-2.74-1.97-4.66-4.79-4.66-3.26 0-5.18 2.45-5.18 4.98 0 .99.38 2.05.85 2.62.09.11.11.21.08.32-.09.37-.29 1.14-.33 1.3-.05.21-.17.26-.39.16-1.46-.68-2.37-2.81-2.37-4.52 0-3.68 2.67-7.06 7.71-7.06 4.05 0 7.19 2.88 7.19 6.74 0 4.02-2.54 7.26-6.06 7.26-1.18 0-2.3-.62-2.68-1.34l-.73 2.78c-.26 1.02-.98 2.3-1.46 3.08.92.28 1.89.43 2.91.43 6.35 0 11.5-5.15 11.5-11.5C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

// Bluesky butterfly mark (lucide doesn't ship one)
function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 530" aria-hidden="true" className={className} fill="currentColor">
      <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590 -19.473 590 69.187c0 17.7-10.148 148.79-16.103 170.07-20.692 73.984-96.16 92.854-163.296 81.433 117.337 19.974 147.235 86.114 82.795 152.249C370.953 598.443 313.41 459.624 298.7 423.973c-2.696-6.531-3.957-9.583-3.957-6.987 0-2.596-1.26.456-3.957 6.987-14.71 35.65-72.253 174.47-194.69 49.038-64.44-66.135-34.541-132.275 82.795-152.249-67.136 11.421-142.604-7.449-163.296-81.433C9.74 217.978 -.41 86.886-.41 69.187c0-88.66 77.74-61.18 125.72-25.157z" transform="translate(5,5)"/>
    </svg>
  );
}

export function SharePostBar({
  title,
  url,
  image,
  description,
  kicker = "✦ enjoyed this entry?",
  heading = "Share it with someone you love",
}: Props) {
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const shareText = description ? `${title} — ${description}` : title;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
  const blueskyUrl = `https://bsky.app/intent/compose?text=${enc(`${shareText}\n\n${url}`)}`;
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(
    image ?? "",
  )}&description=${enc(shareText)}`;
  const mailUrl = `mailto:?subject=${enc(title)}&body=${enc(`${shareText}\n\n${url}`)}`;

  const openShare = (href: string) => {
    if (typeof window === "undefined") return;
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title,
          text: description ?? title,
          url,
        });
      } catch {
        // user cancelled — ignore
      }
    }
  };

  const buttons: Array<{
    label: string;
    onClick: () => void;
    icon: React.ReactNode;
  }> = [
    {
      label: "Share on Facebook",
      onClick: () => openShare(facebookUrl),
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      label: "Pin on Pinterest",
      onClick: () => openShare(pinterestUrl),
      icon: <PinterestIcon className="h-5 w-5" />,
    },
    {
      label: "Share on Bluesky",
      onClick: () => openShare(blueskyUrl),
      icon: <BlueskyIcon className="h-5 w-5" />,
    },
    {
      label: "Share via Email",
      onClick: () => {
        if (typeof window !== "undefined") window.location.href = mailUrl;
      },
      icon: <Mail className="h-5 w-5" />,
    },
    {
      label: copied ? "Link copied" : "Copy link",
      onClick: handleCopy,
      icon: copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />,
    },
  ];

  const canNativeShare =
    typeof navigator !== "undefined" && typeof (navigator as Navigator).share === "function";

  return (
    <div className="mt-16 border-t border-border/60 pt-10">
      <div className="text-center">
        <p
          className="text-primary text-2xl mb-1"
          style={{ fontFamily: "var(--font-hand)" }}
        >
          {kicker}
        </p>
        <h3
          className="text-2xl md:text-3xl text-foreground mb-6"
          style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
        >
          {heading}
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {buttons.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={b.onClick}
              aria-label={b.label}
              title={b.label}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {b.icon}
            </button>
          ))}

          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="ml-2 inline-flex h-11 items-center justify-center rounded-full border border-primary/30 bg-background px-5 text-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              More…
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
