import octopus from "@/assets/octopus-icon.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10 mt-20">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; Copyright 2026{" "}
          <strong className="text-foreground">MissKonstruction Photography</strong>. All Rights Reserved.
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
