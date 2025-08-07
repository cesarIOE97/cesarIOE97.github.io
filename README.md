# Personal CV Website

This repository contains a minimal, responsive CV/portfolio website template built with HTML, TailwindCSS, and vanilla JavaScript. Content is stored in `data.json` so you can update your information without touching the HTML.

## Features

- Clean landing page with name, title, and summary
- Sections for About, CV/Experience, Projects/Publications, Skills, and Contact
- Responsive layout with TailwindCSS
- Optional light/dark mode with preference saved to `localStorage`
- Easy content updates via `data.json`

## Customization

1. **Update personal data**
   - Edit `data.json` and replace the example text with your own information.
2. **Change styling**
   - TailwindCSS is loaded via CDN in `index.html`. You can adjust classes directly in the HTML if desired.
3. **Add more sections**
   - Extend `data.json` and adjust `script.js` if you need additional content areas.

## Local Preview

To view the site locally, serve the files with a simple HTTP server (required for `fetch`):

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Deployment

For a user or organization page named `<username>.github.io`, pushing to the default branch will automatically publish the site via GitHub Pages.

1. Commit your changes.
2. Push to GitHub:

```bash
git push origin main
```

The site will be available at `https://<username>.github.io/` after the push.

## License

Distributed under the MIT License. See `LICENSE` for more information.
