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
      // Inter is self-hosted from @fontsource/inter instead of Google Fonts, so
      // no visitor's IP address goes to Google (German courts have ruled the
      // CDN unlawful without consent). Same weights as before: 400–700.
      // Source: https://starlight.astro.build/guides/customization/#set-up-a-fontsource-font
      customCss: [
        '@fontsource/inter/400.css',
        '@fontsource/inter/500.css',
        '@fontsource/inter/600.css',
        '@fontsource/inter/700.css',
        './src/styles/custom.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/bysamio/casepack-docs' },
      ],
      editLink: {
        baseUrl: 'https://github.com/bysamio/casepack-docs/edit/main/',
      },
      head: [
        // Umami analytics — page views are tracked automatically by this script.
        // The site is built once and deployed to both staging and prod, so the
        // website id is baked in for both. data-domains scopes tracking to the
        // prod hostname; the tracker ignores events from staging.docs.casepack.app.
        {
          tag: 'script',
          attrs: {
            src: 'https://analytics.bysam.io/umami',
            'data-website-id': '9c356a28-59d3-4d99-a173-be3a52a782c0',
            'data-domains': 'docs.casepack.app',
            defer: true,
          },
        },
        // Delegated click tracking for every link/button — see public/umami-click-tracking.js.
        {
          tag: 'script',
          attrs: {
            src: '/umami-click-tracking.js',
            defer: true,
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
            { label: 'Notifications & Reminders', slug: 'notifications' },
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
