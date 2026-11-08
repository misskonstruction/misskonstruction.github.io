# Gladys 500-follower images: landscape feature + no watermarks

## 1. Landscape feature image (from the thank-you image)
- Make the thank-you image wider (landscape, 3:2 shape) by adding more of the same evening yard on the left and right: grass, flowers, garden lights, and a few extra floating hearts, paw prints and sparkles.
- Gladys herself stays exactly as she is.
- Keep all of the original writing as it is now: "Thank you for 500 followers!", the heart and "Gladys" signature at the bottom left, and @gladysunsupervised at the bottom right.
- Before I show it to you, I'll open it at full size and check that the words are spelled correctly and nothing is cut off.
- No Miss Konstruction signature.

## 2. Cropped milestone screenshot, without your signature
- Make the same crop again (only her round photo, the @GLADYSUNSUPERVISED tag and the "You've reached 500 followers!" words), this time without your signature, and without the extra dark space I added at the bottom for it.

## Delivery
- Both are saved as new files in your Files, ready to download for WordPress. The earlier versions stay where they are.
- Nothing on the website changes.

## Technical details
- Image 1: imagegen--edit_image on the original upload at 1920x1280, outpainting both sides, and an explicit list of everything that must not change (Gladys, all text, the handle in the bottom-right corner). If the AI changes any wording, rebuild the image with PIL: paste the untouched original into the center and use the AI-made areas only for the sides. Save as /mnt/documents/gladys-500-thank-you-landscape.jpg.
- Image 2: PIL crop at y 190 to 592 (based on the screenshot's 353-pixel width), resized to 1600 wide. Save as /mnt/documents/gladys-500-milestone_v3.jpg.
