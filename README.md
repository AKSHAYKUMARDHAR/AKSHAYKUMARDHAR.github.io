# akshaykumardhar.github.io

Personal portfolio of Akshay Dhar, AI Product Manager. A plain static site: HTML, CSS and vanilla JavaScript, with no build step and no dependencies beyond Google Fonts.

## Edit content

All text, numbers and links live in **`assets/js/content.js`**. Change them there; the page re-renders from that file.

- CV: replace `assets/files/Akshay_Dhar_CV.pdf` (keep the file name)
- Case study PDF: `assets/files/Akshay_Dhar_AI_PM_Case_Study.pdf`
- Social preview image: `assets/og.png` (1200x630)

## Preview locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Host free

**GitHub Pages (this repo):** the repo is named `AKSHAYKUMARDHAR.github.io`, so it serves at https://akshaykumardhar.github.io.
Settings > Pages > Source: "Deploy from a branch" > Branch `main`, folder `/ (root)`.

**Vercel (alternative):** import this repo at vercel.com/new, framework preset "Other", no build command, output directory `.`.
If you use Vercel or a custom domain, update the `og:image` and `og:url` URLs in `index.html`.

## Structure

```
index.html              page skeleton, meta tags
assets/css/styles.css   design tokens (dark and light), layout, responsive rules
assets/js/content.js    all content
assets/js/app.js        rendering and interactions (pipelines, results explorer,
                        walkthrough, timeline, filters, Ctrl/Cmd+K palette, theme)
assets/files/           CV and case study PDFs
```
