import { useEffect } from "react";

const ORIGIN = "https://www.mlb-scorecard.com";

function setTag(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(attr, value);
}

/** Per-page <title>, description and canonical, for crawlers and link previews
 *  (the shell index.html otherwise serves one title for every route). */
export default function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setTag('meta[name="description"]',
        () => Object.assign(document.createElement("meta"), { name: "description" }),
        "content", description);
    }
    if (path != null) {
      setTag('link[rel="canonical"]',
        () => Object.assign(document.createElement("link"), { rel: "canonical" }),
        "href", ORIGIN + path);
    }
  }, [title, description, path]);
}
