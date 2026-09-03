/**
 * Single source of truth for project identity and external links.
 * Change a value here and every page follows.
 */

export const SITE = {
  /** Public site name, shown in the header and footer. */
  name: "DarkPatterns.info",
  /** Product name for the browser extension and detector. */
  product: "SLAG",
  /** Long form used in prose the first time the product is introduced. */
  productLong: "SLAG dark pattern detector",
  /** Name shown by the browser after loading the unpacked extension. */
  manifestName: "SLAG",
  extensionVersion: "1.2",
  contactEmail: "vanshvermax@gmail.com",
  repo: "https://github.com/vanshvv/DarkPattern-Detector-SLAG",
}

/** Directory name created by `git clone` — the repo slug, not the product name. */
export const REPO_DIR = "DarkPattern-Detector-SLAG"

/** owner/name, for display in link text. */
export const REPO_SLUG = SITE.repo.replace("https://github.com/", "")

export const REPO = SITE.repo
export const REPO_ISSUES = `${SITE.repo}/issues`
export const CONTACT = `mailto:${SITE.contactEmail}`
