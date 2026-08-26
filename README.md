# muhammadaamirgulzar.github.io

Source for [muhammadaamirgulzar.github.io](https://muhammadaamirgulzar.github.io),
personal profile, projects, and meeting booking.

Plain HTML/CSS/JS, no build step. GitHub Pages serves this repo's `main` branch as-is.

## Booking link

`content/profile.json`'s `bookingUrl` is a Google Calendar **Appointment
Schedule** link (calendar.app.google/...), tied to `amirgulzar328@gmail.com`,
free, zero-hosting, and reflects busy time across every calendar already
linked to that account. `scripts/build.js` writes it into `index.html` as
`window.__BOOKING_URL__`, and `script.js` sets the "Book a meeting" button's
href from that. To change it, edit `content/profile.json` and rerun
`node scripts/build.js`, not `index.html` directly.

(`meetaamir` is a separate, more custom-built booking tool in this same
`aamir-hub` workspace, not wired up here since it needs always-on hosting
to be reliable for a public "book a meeting" link. Kept for possible future use.)

## No CV download, no email on the page

Deliberate: a downloadable CV would expose a phone number, and a personal
email invites spam scraping. Contact routes are LinkedIn and the booking
link only. The CV itself still lives in the `MuhammadAamirGulzar/cv` repo,
just not linked from this site.
