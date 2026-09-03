# SLAG — Dark Pattern Detector

A browser extension that flags **dark patterns** — deceptive interface design that
pushes people into decisions they would not otherwise make — plus a companion
website that explains each pattern and how to defend against it.

Detection runs on a locally hosted model. Nothing you browse is sent to a third party.

```
extension/   Manifest V3 browser extension (Chrome, Edge, Firefox)
api/         Flask service that classifies page text using the trained models
training/    Datasets and scripts used to build the classifiers
website/     Next.js site: pattern taxonomy, interactive demos, reporting form
```

---

## Quick start

### 1. Run the classification API

The extension sends page text to a small Flask service on your own machine.

```bash
cd api
pip install -r requirements.txt
python app.py
```

It listens on `http://127.0.0.1:5000`. Leave it running.

### 2. Load the extension

**Chrome / Edge**

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `extension/` folder
4. It appears in your extensions list as **SLAG**

**Firefox**

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `extension/manifest.json`

Temporary add-ons are removed when Firefox restarts.

> The API must be running before the extension can classify anything. If pages
> are never flagged, check that `python app.py` is still up.

### 3. Run the website (optional)

```bash
cd website
npm install
npm run dev
```

Open <http://localhost:3000>.

---

## How it works

Two scikit-learn classifiers, both bag-of-words over TF-IDF vectors:

| Stage | Model | Question it answers |
| --- | --- | --- |
| Presence | `presence_classifier.joblib` | Is this text segment a dark pattern? |
| Category | `category_classifier.joblib` | If so, which kind? |

The content script tokenises visible page text, POSTs the segments to the API,
and highlights whatever comes back flagged. Training data lives in `training/`
as CSV — `dark_patterns.csv` (positive examples) and `normie.csv` (negative).

---

## The website

Built with Next.js 15, Tailwind CSS and shadcn/ui. It covers:

- **Types** — 13 patterns across 4 categories, each with the wording you will
  actually encounter and a concrete test for catching it
- **Examples** — four interactive demos you can click through, plus documented
  enforcement cases
- **How to avoid** — practical habits, warning signs, and your legal footing
- **Report** — a form for submitting patterns found in the wild

The pattern taxonomy is defined once in `website/lib/patterns.js` and shared
across all pages. Project name, contact and repository links live in
`website/lib/site.js`.

```bash
cd website
npm run build   # production build
npm run lint    # lint
```

---

## Contributing

The most useful contribution is **labelled data**. If you hit a pattern the
detector misses, add the text to `training/dark_patterns.csv` with its category
and retrain:

```bash
cd training
python determine_presence.py
python determine_category.py
```

Bug reports and pull requests are welcome via
[GitHub Issues](https://github.com/vanshvv/DarkPattern-Detector-SLAG/issues).

---

## Acknowledgements

The pattern taxonomy builds on Harry Brignull's work at
[deceptive.design](https://www.deceptive.design/), and on
[*Dark Patterns at Scale*](https://arxiv.org/abs/1907.07032) (Mathur et al., 2019).

## License

MIT
