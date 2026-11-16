# Gladys share image for Slack

Make one image you can download and post in Slack. Nothing on the website changes.

## What it will look like
- **Photo:** the original photo of Gladys on her black blanket with the pink spiked collar, uncropped and unedited.
- **Pink QR code:** the same pink QR made earlier (scans to her Instagram), placed in the bottom-right corner on a soft white rounded card so it stands out against the floor.
- **Instagram name:** "@gladysunsupervised" with a small Instagram logo, in pink, right under the QR code.
- No Miss Konstruction signature, since this is a share graphic, not one of your gallery photos.

## Checks before handing it over
- Scan the QR in the finished image to confirm it still opens her Instagram.
- Look at it at full size and at phone size to make sure the name is readable and nothing covers Gladys's face.

## Technical details
- Source: uploaded 20261024_181255.jpg and src/assets/gladys-instagram-qr.png.
- Composite with PIL, resize to ~1600px on the long side, save as /mnt/documents/gladys-slack-share.jpg; verify with zbar.
