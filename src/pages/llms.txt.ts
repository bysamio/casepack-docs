import type { APIRoute } from 'astro';
import { docUrl, getDocsForLlms, siteUrl, textResponse } from '../utils/llms';

/** /llms.txt — every docs page with its one-line description, for AI assistants. */
export const GET: APIRoute = async ({ site }) => {
  const docs = await getDocsForLlms();

  const lines = [
    '# CasePack Docs',
    '',
    '> Product documentation for CasePack: incident reporting, evidence collection, response timelines and audit-ready evidence packs for MSPs, hosted or self-hosted.',
    '',
    `The full text of every page is at ${siteUrl('/llms-full.txt', site)}.`,
    '',
    '## Docs',
    '',
    ...docs.map((entry) => {
      const description = entry.data.description ? `: ${entry.data.description}` : '';
      return `- [${entry.data.title}](${docUrl(entry, site)})${description}`;
    }),
    '',
    '## Optional',
    '',
    '- [CasePack website](https://casepack.app/): Product overview, pricing, and solution and integration pages.',
    '- [Website index for AI tools](https://casepack.app/llms.txt)',
    '',
  ];

  return textResponse(lines.join('\n'));
};
