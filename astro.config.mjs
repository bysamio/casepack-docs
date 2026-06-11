import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.casepack.app',
  integrations: [
    starlight({
      title: 'CasePack Docs',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/bysamio/casepack-docs' },
      ],
      editLink: {
        baseUrl: 'https://github.com/bysamio/casepack-docs/edit/main/',
      },
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          },
        },
      ],
      sidebar: [
        { label: 'Quick Start', slug: 'getting-started' },
        {
          label: 'Core Features',
          items: [
            { label: 'Dashboard', slug: 'dashboard' },
            { label: 'Incidents', slug: 'incidents' },
            { label: 'Evidence', slug: 'evidence' },
            { label: 'NIS2 Milestones', slug: 'milestones' },
            { label: 'Incident Reports', slug: 'incident-reports' },
            { label: 'Incident Timeline', slug: 'incident-timeline' },
            { label: 'Evidence Pack Export', slug: 'evidence-pack-export' },
          ],
        },
        {
          label: 'Integrations',
          items: [
            { label: 'Webhooks', slug: 'webhooks' },
          ],
        },
        {
          label: 'Administration',
          items: [
            { label: 'Audit Log', slug: 'audit-log' },
            { label: 'Users & Roles', slug: 'users-roles' },
            { label: 'Tenant Management', slug: 'admin-tenants' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Keyboard Shortcuts', slug: 'keyboard-shortcuts' },
            { label: 'Self-Hosting', slug: 'self-hosting' },
            { label: 'Licensing & Access', slug: 'licensing-access' },
            { label: 'Pricing Plans', slug: 'pricing-plans' },
          ],
        },
      ],
    }),
  ],
});
