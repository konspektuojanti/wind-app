# wind app: Road Weather Station Dashboard

**Live demo:** https://konspektuojanti.github.io/wind-app/

## What it does

Originally meant only to sonify wind data from eismoinfo.lt.It now also displays all the The Smiltynė-Nida road station's variables in a grid. It fetches live observations for the Smiltynė-Nida station from the public Via Lietuva API. The sound is a sine tone: wind direction sets the pitch (each compass direction is a note), and wind speed sets the volume. A switch starts and stops the tone.

## Built with

- HTML and CSS (grid layout)
- Vanilla JavaScript: `fetch`, promises, DOM manipulation
- Web Audio API
- Data: [eismoinfo.lt weather conditions service](https://eismoinfo.lt/weather-conditions-service)
- Hosted on GitHub Pages

## What I learned
- Replacing a synchronous `XMLHttpRequest`, which freezes the page, with asynchronous `fetch`.
- Reading console errors to locate bugs (for example, a mismatched element id).
- I tried to add a second data source, LHMT (api.meteo.lt), to compare stations. The browser blocked it with a CORS error, because that server doesn't send the header that allows other websites to read its data.
- Using a checkbox's change event to build an on/off switch, and keeping the running oscillator in a variable outside the function so a second flip can stop it.
- Using GitHub Pages (used to use netlify.app)
- "Code that depends on fetched data has to run inside .then, because fetch doesn't wait.
- Using Math.min and Math.max to keep the volume between a floor (0.1) and a ceiling (1).

## Known limitations and next steps
- There is no .catch, so if the request fails completely (offline, for example) the page shows no message.
- The station is fixed in the code, with no dropdown.
- Thirteen near-identical lines fill the grid, where a loop would be shorter.
- The LHMT comparison is blocked by CORS and needs a proxy.
