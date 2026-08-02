// @ts-check
/**
 * Turn a "New blog post" GitHub issue into an .mdx file under src/content/blogs.
 *
 * Reads the issue title/body/number from env (set by the workflow), parses the
 * issue-form sections, and writes a ready-to-publish MDX file with frontmatter.
 *
 * Env in:
 *   ISSUE_TITLE  – the GitHub issue title (fallback for post title)
 *   ISSUE_BODY   – the rendered issue-form body
 *   ISSUE_NUMBER – the issue number (for logging / the commit message)
 *
 * Output (appended to $GITHUB_OUTPUT when present):
 *   slug, title, file
 */

import fs from "node:fs";
import path from "node:path";

const BLOGS_DIR = path.join(process.cwd(), "src", "content", "blogs");

/** Parse a GitHub issue-form body into { headingKey: value }. */
function parseIssueForm(body) {
  const sections = {};
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  let currentKey = null;
  let buffer = [];

  const flush = () => {
    if (currentKey) sections[currentKey] = buffer.join("\n").trim();
    buffer = [];
  };

  for (const line of lines) {
    const heading = line.match(/^###\s+(.*)$/);
    if (heading) {
      flush();
      currentKey = heading[1].trim().toLowerCase();
    } else if (currentKey) {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}

/** Find the first section whose heading contains one of the keywords. */
function pick(sections, ...keywords) {
  for (const [heading, value] of Object.entries(sections)) {
    if (keywords.some((k) => heading.includes(k))) {
      const v = (value || "").trim();
      // GitHub renders empty optional fields as "_No response_"
      if (v && v !== "_No response_") return v;
    }
  }
  return "";
}

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "");
}

function main() {
  const body = process.env.ISSUE_BODY || "";
  const issueTitle = process.env.ISSUE_TITLE || "";
  const issueNumber = process.env.ISSUE_NUMBER || "";

  const sections = parseIssueForm(body);

  const title = pick(sections, "title") || issueTitle.replace(/^\[blog\]\s*/i, "").trim();
  const description = pick(sections, "description", "summary");
  const tagsRaw = pick(sections, "tag");
  const content = pick(sections, "body", "content", "post");
  const externalRaw = pick(sections, "cross", "external");
  const draftRaw = pick(sections, "draft").toLowerCase();

  if (!title) throw new Error("Could not determine a post title from the issue.");
  if (!content) throw new Error("The post body is empty — nothing to publish.");

  const slug = slugify(title);
  if (!slug) throw new Error(`Title "${title}" produced an empty slug.`);

  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Cross-post links: one "platform: url" per line.
  const externalUrls = externalRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return null;
      const platform = line.slice(0, idx).trim().toLowerCase();
      const url = line.slice(idx + 1).trim();
      if (!platform || !/^https?:\/\//.test(url)) return null;
      return { platform, url };
    })
    .filter(Boolean);

  const draft = draftRaw.startsWith("y") || draftRaw === "true";

  // Build frontmatter (JSON.stringify gives us safe double-quoted YAML scalars).
  const fm = [];
  fm.push("---");
  fm.push(`title: ${JSON.stringify(title)}`);
  fm.push(`date: ${JSON.stringify(date)}`);
  fm.push(`description: ${JSON.stringify(description)}`);
  fm.push(`author: "Aakash Mallik"`);
  if (tags.length) {
    fm.push("tags:");
    for (const t of tags) fm.push(`  - ${JSON.stringify(t)}`);
  }
  if (draft) fm.push("draft: true");
  if (externalUrls.length) {
    fm.push("externalUrls:");
    for (const { platform, url } of externalUrls) {
      fm.push(`  - platform: ${JSON.stringify(platform)}`);
      fm.push(`    url: ${JSON.stringify(url)}`);
    }
  }
  fm.push("---");

  const fileContents = `${fm.join("\n")}\n\n${content.trim()}\n`;

  fs.mkdirSync(BLOGS_DIR, { recursive: true });
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  const isNew = !fs.existsSync(filePath);
  fs.writeFileSync(filePath, fileContents, "utf8");

  const relPath = path.relative(process.cwd(), filePath);
  console.log(
    `${isNew ? "Created" : "Updated"} ${relPath} from issue #${issueNumber}`
  );

  // Expose values to later workflow steps.
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `slug=${slug}\ntitle=${title}\nfile=${relPath}\ndraft=${draft}\n`
    );
  }
}

main();
