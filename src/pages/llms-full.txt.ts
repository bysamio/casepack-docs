import type { APIRoute } from 'astro';
import { docUrl, getDocsForLlms, textResponse } from '../utils/llms';

/** /llms-full.txt — the Markdown source of every docs page in one file, for AI assistants. */
export const GET: APIRoute = async ({ site }) => {
  const docs = await getDocsForLlms();

  const sections = docs.map((entry) =>
    [
      `# ${entry.data.title}`,
      '',
      `Source: ${docUrl(entry, site)}`,
      ...(entry.data.description ? ['', `> ${entry.data.description}`] : []),
      '',
      (entry.body ?? '').trim(),
    ].join('\n'),
  );

  return textResponse(`${sections.join('\n\n---\n\n')}\n`);
};
