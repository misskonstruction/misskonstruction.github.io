/**
 * Prayer Studies registry.
 *
 * To add a new prayer study:
 *   1. Add an entry below with a unique `slug`.
 *   2. (Optional) Drop a hero image into `src/assets/prayer-{slug}.jpg`
 *      and import it. If omitted, the shared candlelight hero is used.
 *   3. Create a route file `src/routes/prayers.{slug}.tsx` that renders
 *      <PrayerPage prayer={getPrayer("{slug}")!} />.
 *
 * The Faith & Scripture category page automatically lists every prayer
 * whose `categorySlug` matches.
 */

import candlelightHero from "@/assets/prayer-candlelight-hero.jpg";
import channingHero from "@/assets/prayer-channing-hero.jpg";
import maisieHero from "@/assets/prayer-maisie-hero.jpg";

export type PrayerScripture = {
  /** e.g. "Philippians 4:6–7" */
  reference: string;
  /** The verse text. */
  text: string;
  /** Optional translation tag, e.g. "ESV", "NIV". */
  translation?: string;
};

export type Prayer = {
  /** URL slug — also the route filename. */
  slug: string;
  /** Which blog category this prayer lives under. */
  categorySlug: string;
  /**
   * Layout variant. "study" (default) is a full prayer/teaching with body
   * paragraphs and a closing reflection. "quote" renders a single passage
   * large and centered — for short devotional quotes.
   */
  format?: "study" | "quote";
  /** Short kicker above the title in handwriting font. */
  kicker: string;
  /** Title — `**bold**` segments render in primary italic. */
  title: string;
  /** Author of the prayer / study (e.g. "Ruth D. Calk"). */
  author: string;
  /** Optional short attribution line, e.g. "shared by my mother". */
  attribution?: string;
  /** Italic intro / dedication line under the hero. */
  intro: string;
  /** Hero image import. Defaults to the shared candlelight hero. */
  heroImage?: string;
  heroAlt?: string;
  /** Optional featured scripture shown as a callout above the prayer body. */
  scripture?: PrayerScripture;
  /**
   * The body of the prayer / study. An array of paragraphs, rendered with
   * generous spacing. Use blank strings sparingly to add visual breathing room.
   * For "quote" format, this holds the quote paragraphs (rendered large).
   */
  body: string[];
  /** Closing reflection / meditation section. Optional for "quote" format. */
  reflection?: {
    /** Small heading, e.g. "to sit with". */
    kicker: string;
    /** Heading, e.g. "A Reflection". */
    heading: string;
    /** One or more paragraphs of reflection. */
    paragraphs: string[];
  };
  /** SEO meta description. */
  description: string;
};

export const prayers: Prayer[] = [
  {
    slug: "prayer-ii-ruth-d-calk",
    categorySlug: "faith-scripture",
    kicker: "a study on prayer",
    title: "Prayer **II**",
    author: "Ruth D. Calk",
    attribution: "February 2002 · sent to me by my mother",
    intro:
      "The second in a series on prayer — on praying without ceasing, on the peace and rest that prayer produces, and on the quiet, steady work God does through it.",
    scripture: {
      reference: "Philippians 4:6–7",
      text: "Be anxious for nothing, but in everything, by prayer and supplication with thanksgiving, let your requests be made known to God, and the peace of God, which surpasses all understanding will guard your hearts and minds through Christ Jesus.",
    },
    body: [
      "Last month we started a series on prayer because of the importance of having a relationship with God. It is only through reading His word and talking to Him in prayer that we can have this relationship. We have talked about simple, believing prayer, knowing that He hears us and wants to help us; about humble prayer coming from a sincere heart; that we have authority through prayer, and that the habit of prayer should become a part of us.",
      "In 1 Thessalonians, we are told to “pray without ceasing.” For years I thought, how could you possibly do that? Now, I have a better understanding of what Paul was saying. He meant that prayer should be like breathing, something we do continually, but usually unconsciously. Our physical bodies require breathing to stay alive. Likewise, our spiritual bodies are designed to be nurtured and sustained by continual prayer. The problem is that, because of religious thinking, we have the mistaken idea that if we don’t keep up a certain schedule of prayer, we are missing the mark. The important lesson about prayer is not the posture or the time or place, but learning to pray in faith — at all times — unceasingly. It is the Holy Spirit who will lead you into prayer without ceasing.",
      "**Prayer produces peace.** Philippians 4:6–7 says, “Be anxious for nothing, but in everything, by prayer and supplication with thanksgiving, let your requests be made known to God, and the peace of God, which surpasses all understanding will guard your hearts and minds through Christ Jesus.” In this passage, it does not say, pray and worry. It says pray and DON’T worry. Why are we to pray and not worry? Because prayer is the way we cast our care upon the Lord. When the devil tries to give us care, we are supposed to turn and give that care to God. That is what prayer is: our acknowledgment to the Lord that we cannot carry our burden of care — so we lay it all on Him. If we pray about something and then keep on worrying about it, we are mixing a positive with a negative. The two cancel each other out, so that we end up right back where we started — at zero! Prayer is a positive force. Worry is a negative force. You cancel out the positive power of prayer by giving in to the negative power of worry. As long as we are worrying, we are not trusting God and are unable to enter into His rest. Make a decision now to cast ALL your care on the Lord and begin to watch Him take care of you.",
      "**Prayer produces rest.** In the gospel according to Matthew we hear Jesus say, “Come to me all you who are heavy laden, and I will give you rest.” If we are not at rest, we are not believing, because the fruit of believing is rest. God wants us not only to enter into His rest in our body, He also wants us to enter into His rest in our soul. To me, finding rest, relief, ease, refreshment, recreation, and blessed quiet for my soul means finding freedom from mental activity. It means not having to live in the torment of reasoning — always trying to come up with an answer I don’t have. I don’t have to worry — instead, I can remain in a place of quiet peace and rest through prayer.",
      "**Prayer produces patience and hope.** It is easy to say, “Don’t worry.” But to actually DO that requires experience with God. It takes years of experience to fully overcome the habit of worry, anxiety, and fear, and to develop the habit of peace, rest, and hope. When you and I are in the midst of battle against our spiritual enemy, every round we go through produces valuable experience and strength. Each time we endure an attack, we become stronger. If we hang in there and refuse to give up, sooner or later, we will be more than the devil can handle. When that happens, we will have reached spiritual maturity.",
      "**Corporate prayer.** Whenever believers are united in corporate prayer (praying together as a group), there is great power present. Jesus said, “For when two or three are gathered in My name, there I am in the midst of them.” Throughout the book of Acts, we read that the people of God came together with one accord. It was their united faith, their corporate agreement, and the presence of Jesus by means of the Holy Spirit that made their prayers so effective. They saw God move in mighty ways. When you come together to prayer, expect God to show His power.",
      "**God changes people through prayer.** People who are hurting don’t need someone with a spirit of pride trying to fix them. They need acceptance, love, and prayer. In Exodus, Moses interceded for the children of Israel, when God would have destroyed them for being a stiff-necked people. We need to do the praying, and let God do the working. Jesus told the disciples at Gethsemane to watch and pray. We need to pray for one another — not judge and criticize each other. If you know that someone you care about is doing wrong, don’t gossip about it. Remember, we are not the potter — God is — and we certainly don’t know how to fix the broken vessels that we are. Pray, pray, pray! It is the only way to get things accomplished in God’s economy. If we do things His way, we always get good results.",
    ],
    reflection: {
      kicker: "to sit with",
      heading: "A Reflection",
      paragraphs: [
        "Ruth returns again and again to one quiet idea: prayer is meant to be as ordinary as breath. Not a performance, not a posture, not a schedule to keep — just the steady inhale and exhale of a soul that knows where to turn.",
        "If there is a worry sitting heavy on you today, try the small experiment she offers. Hand it over. Notice the impulse to take it back, and hand it over again. The peace she promises isn’t the absence of trouble; it’s the presence of Someone willing to carry it with you.",
      ],
    },
    description:
      "Prayer II by Ruth D. Calk (February 2002) — a meditation on praying without ceasing, and the peace, rest, patience, and hope that prayer produces.",
  },
  {
    slug: "the-plain-simple-way-channing",
    categorySlug: "faith-scripture",
    format: "quote",
    kicker: "a passage to keep",
    title: "The Plain, **Simple Way**",
    author: "William E. Channing",
    attribution: "shared with me by my mother",
    intro:
      "A quiet rebuke to the anxious mind — and an invitation to live, hour by hour, in the small obediences of trust.",
    heroImage: channingHero,
    heroAlt: "An open hand releasing a small white feather into warm morning light by a sunlit window",
    body: [
      "Why is it that we are so busy with the future? It is not our province; and is there not a criminal interference with Him to whom it belongs, in our feverish, anxious attempts to dispose of it, and in filling it up with shadows of good and evil shaped by our own wild imaginations?",
      "To do God’s will as fast as it is made known to us, to inquire hourly — I had almost said each moment — what He requires of us, and to leave ourselves, our friends, and every interest at His control, with a cheerful trust that the path which He marks out leads to our perfection and to Himself, — this is at once our duty and happiness; and why will we not walk in the plain, simple way?",
    ],
    description:
      "A devotional passage by William E. Channing on releasing the future and walking in the plain, simple way of trust.",
  },
  {
    slug: "in-celebration-maisie-renee",
    categorySlug: "faith-scripture",
    kicker: "a prayer for my grandchild",
    title: "In **Celebration**",
    author: "for Maisie Renee",
    attribution: "a grandmother's prayer",
    intro:
      "A small thanksgiving for the gift of a granddaughter — for the joy she carries into a family, and for the quiet promise to be present for every step she takes.",
    heroImage: maisieHero,
    heroAlt: "A newborn baby resting peacefully against her mother, tiny fingers curled in tender stillness",
    scripture: {
      reference: "Mother Teresa",
      text: "Joy is very infectious; therefore, be always full of joy.",
    },
    body: [
      "Lord, thank you for my beautiful grandchild Maisie Renee.",
      "She fills our family with joy.",
      "",
      "As I learn my place in her life,",
      "help me to cherish each moment.",
      "Her mere presence is a gift.",
      "",
      "As she makes her way in this life,",
      "may she feel my support.",
      "If she stumbles, may she know that I am here for her.",
      "",
      "I am grateful.",
      "Words cannot express the joy she brings.",
      "",
      "Lord, thank you.",
    ],
    reflection: {
      kicker: "to sit with",
      heading: "A Grandmother's Vow",
      paragraphs: [
        "There is a particular kind of love that arrives with a grandchild — quieter than a parent's, but no less fierce. It is the love of someone who has lived enough to know how fast the years go, and who promises, in the secret of her heart, to pay attention.",
        "This is the work of a grandmother: to notice, to delight, to be a soft place to land. To say, again and again, by presence more than by words — I am here. I am grateful. You are a joy.",
      ],
    },
    description:
      "In Celebration — a grandmother's prayer of thanksgiving for Maisie Renee, on the joy a grandchild brings and the quiet promise to be ever-present.",
  },
];

export function getPrayer(slug: string): Prayer | undefined {
  return prayers.find((p) => p.slug === slug);
}

export function getPrayersByCategory(categorySlug: string): Prayer[] {
  return prayers.filter((p) => p.categorySlug === categorySlug);
}

/** The shared candlelight hero, available for category pages and previews. */
export const prayerSharedHero = candlelightHero;
