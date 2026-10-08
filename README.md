# akshaykumardhar.github.io

Personal portfolio of Akshay Dhar, AI Product Manager. A plain static site: HTML, CSS and vanilla JavaScript, with no build step and no dependencies beyond Google Fonts.

## What's on it

- **Home** (`index.html`): hero, impact metrics, one work case study (Catalysk), the AI product projects, earlier projects, experience, how I work, skills, education and contact.
- **Case studies** (`case-studies/`): one page per case study, each with a PDF version.
  - `catalysk.html`: work case study (employer work, so no PRD or code)
  - `upi-triage-agent.html`: personal project, with its [PRD](https://github.com/AKSHAYKUMARDHAR/UPI-Triage-Agent/blob/main/docs/PRD.md)
  - `scam-checker.html`: personal project, with its [PRD](https://github.com/AKSHAYKUMARDHAR/Is-This-A-Scam/blob/main/docs/PRD.md) and [live demo](https://is-this-a-scam.onrender.com)
  - `will-my-policy-pay.html`: personal project, with its [PRD](https://github.com/AKSHAYKUMARDHAR/Will-My-Policy-Pay/blob/main/docs/PRD.md) and [live demo](https://will-my-policy-pay.onrender.com)

## Edit content

- Home page text, numbers and links: **`assets/js/content.js`** (the page renders from it).
- Case studies: edit the HTML in `case-studies/` directly.
- CV: replace `assets/files/Akshay_Dhar_CV.pdf` (keep the file name).
- Case study PDFs: regenerate after editing a case study page. They are printed from the page itself, using the print styles at the end of `styles.css`:

```bash
python -m http.server 8000
msedge --headless --no-pdf-header-footer --print-to-pdf=assets/files/case-study-scam-checker.pdf http://localhost:8000/case-studies/scam-checker.html
```

(or open the page in a browser, Ctrl+P, "Save as PDF", margins default, headers and footers off).

## Add a project

1. Write its PRD in the project's repo (`docs/PRD.md`).
2. Copy a page in `case-studies/` and fill it in; print it to `assets/files/case-study-<name>.pdf`.
3. Add an entry to `projects` in `content.js` with `caseStudy`, `prd`, `github` and optionally `demo`.

## Preview locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Host free

**GitHub Pages (this repo):** the repo is named `AKSHAYKUMARDHAR.github.io`, so it serves at https://akshaykumardhar.github.io.
Settings > Pages > Source: "Deploy from a branch" > Branch `main`, folder `/ (root)`.

If you move to a custom domain, update the `og:image` and `og:url` URLs in `index.html`.

## Structure

```
index.html              home page skeleton, meta tags
case-studies/           one page per case study
assets/css/styles.css   design tokens (dark and light), layout, case study and print styles
assets/js/content.js    all home page content
assets/js/app.js        home page rendering: metrics, projects, timeline, skills, theme, nav
assets/js/page.js       case study pages: theme toggle
assets/img/             screenshots used in case studies
assets/files/           CV and case study PDFs
```
