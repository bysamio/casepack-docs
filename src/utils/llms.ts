import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Shared helpers for /llms.txt and /llms-full.txt (https://llmstxt.org):
 * plain-text views of the docs for AI assistants and crawlers that don't run
 * JavaScript or parse the Starlight layout.
 */

type DocsEntry = CollectionEntry<'docs'>;

const FALLBACK_SITE = 'https://docs.casepack.app';

// The home page and Quick Start lead; the rest follow alphabetically by title.
const LEADING_PAGES = ['index', 'getting-started'];

export async function getDocsForLlms(): Promise<DocsEntry[]> {
  const docs = await getCollection('docs');
  const rank = (entry: DocsEntry) => {
    const index = LEADING_PAGES.indexOf(entry.id);
    return index === -1 ? LEADING_PAGES.length : index;
  };
  return docs.sort((a, b) => rank(a) - rank(b) || a.data.title.localeCompare(b.data.title));
}

export function siteUrl(path: string, site: URL | undefined): string {
  return new URL(path, site ?? FALLBACK_SITE).href;
}

/** Public URL of a docs page (Starlight serves slugs with a trailing slash; `index` is the root). */
export function docUrl(entry: DocsEntry, site: URL | undefined): string {
  return siteUrl(entry.id === 'index' ? '/' : `/${entry.id}/`, site);
}

export function textResponse(body: string): Response {
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
