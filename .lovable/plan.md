Add a "Treat" mobile game link to the footer

What to build
- Add a new footer line/link for the mobile game Treat, using the provided OneLink referral URL and a paw print emoji.
- Keep the styling consistent with the existing footer (muted text, hover:text-primary, underline-offset-4 hover:underline).
- Place it near the other footer links (Fur Life, GitHub, Light A Candle for Blitz) so it feels natural.

iOS vs Android
- The supplied https://treatva.onelink.me/zvYN/6ecal2bm is an AppsFlyer OneLink — it auto-detects the device and routes iOS users to the App Store, Android users to Google Play, and desktop users to a fallback page. A single link is the correct approach; no separate iOS/Android buttons needed.
- The link should open in a new tab with rel="noopener noreferrer sponsored" (since it is a referral/affiliate link).

Files to change
- src/components/SiteFooter.tsx — add the Treat line below the existing recommendation/GitHub area.

Verification
- Local preview shows the new footer line with paw emoji and opens the OneLink URL correctly.
- No build errors introduced.
