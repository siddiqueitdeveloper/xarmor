# XARMOR — Multi-page site

This site was split from a single-page (anchor-based) layout into separate
HTML pages, one per main navigation item:

- `index.html`     — Home
- `about.html`     — About
- `services.html`  — Services
- `xarmor-tv.html` — XARMOR TV
- `projects.html`  — Projects
- `careers.html`   — Careers
- `training.html`  — Training
- `contact.html`   — Contact

`style.css` and `script.js` are shared across all pages. The header/nav and
footer are duplicated in every page (no build step / templating on the
live site), so if you edit the nav, social links, or footer, update it in
each HTML file.
