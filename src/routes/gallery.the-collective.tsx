import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import sphinxUnderKonstruction from "@/assets/sphinx-under-konstruction.png";
import backyardBirdwatchHeist from "@/assets/loose-frames/backyard-birdwatch-heist.jpg";
import treeCanopyLookout from "@/assets/loose-frames/tree-canopy-lookout.jpg";
import branchLevelSurveillance from "@/assets/loose-frames/branch-level-surveillance.jpg";
import gingerAmbushInTheLeaves from "@/assets/loose-frames/ginger-ambush-in-the-leaves.jpg";
import peepingTomcat from "@/assets/loose-frames/peeping-tomcat.jpg";

export const Route = createFileRoute("/gallery/the-collective")({
  component: LooseFramesGallery,
  head: () => ({
    meta: [
      { title: "Loose Frames | MissKonstruction Photography" },
      {
        name: "description",
        content:
          "A catch-all gallery for the oddball frames, backyard mischief, and one-off photographs that refuse to fit anywhere else.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const items: GalleryItem[] = [
  {
    src: backyardBirdwatchHeist,
    title: "Backyard Birdwatch Heist",
  },
  {
    src: treeCanopyLookout,
    title: "Tree Canopy Lookout",
  },
  {
    src: branchLevelSurveillance,
    title: "Branch-Level Surveillance",
  },
  {
    src: gingerAmbushInTheLeaves,
    title: "Ginger Ambush in the Leaves",
  },
  {
    src: peepingTomcat,
    title: "Peeping Tomcat",
  },
];

function LooseFramesGallery() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Loose Frames</h1>
          <img
            src={sphinxUnderKonstruction}
            alt="Cartoon sphinx kitten in a yellow hard hat resting on an Under Konstruction barricade"
            width={420}
            height={420}
            loading="lazy"
            className="mx-auto h-auto w-44 md:w-52 mt-6"
          />
          <div className="inline-flex h-px w-16 bg-primary mt-4 mb-6" />
          <p className="text-muted-foreground">
            Some photographs refuse to file themselves neatly. A chrome fin glinting at
            twilight, a squirrel staging a feeder heist, a cat pretending it is not part
            of the problem, a moment of weird light on an ordinary street — the strays of
            the camera roll live here.
          </p>
        </header>
        <GalleryGrid items={items} />
      </section>
    </SiteLayout>
  );
}
