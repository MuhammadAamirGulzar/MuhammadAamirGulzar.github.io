# muhammadaamirgulzar.github.io

Source for [muhammadaamirgulzar.github.io](https://muhammadaamirgulzar.github.io) —
personal profile, projects, and meeting booking.

Plain HTML/CSS/JS, no build step. GitHub Pages serves this repo's `main` branch as-is.

## Updating the booking link

`script.js` sets the "Book a meeting" button's URL from one constant, `BOOKING_URL`.
Point it at the live booking backend's `/book` URL once that's deployed.

## CV

`assets/Aamir_Gulzar_CV.pdf` is compiled from the LaTeX source in the
`MuhammadAamirGulzar/Aamir_Gulzar_AI_Engineer_CV` repo. Recompile and copy it here
whenever the CV changes.
