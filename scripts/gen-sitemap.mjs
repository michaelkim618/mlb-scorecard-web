// Writes public/sitemap.xml from the pages that exist and the blog index, so a
// new post is listed without anyone editing a file. Runs before `vite build`.
// The output is gitignored — it is a build artifact, regenerated every build.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.mlb-scorecard.com";

const pages = ["/", "/record", "/articles", "/privacy"];

let posts = [];
const indexPath = join(ROOT, "public", "blog", "index.json");
if (existsSync(indexPath)) {
  const idx = JSON.parse(readFileSync(indexPath, "utf8"));
  posts = Array.isArray(idx) ? idx : idx.posts ?? [];
}

const url = (path, lastmod) =>
  `  <url><loc>${ORIGIN}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((p) => url(p)),
  ...posts.filter((p) => p.slug).map((p) => url(`/articles/${p.slug}`, p.date)),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(ROOT, "public", "sitemap.xml"), xml);
console.log(`sitemap: ${pages.length + posts.length} urls`);
