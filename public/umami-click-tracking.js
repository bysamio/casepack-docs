// Tracks every link and button click via Umami, without requiring
// data-umami-event annotations on every element. Page views are already
// tracked automatically by the Umami script itself.
(function () {
  function labelFor(el) {
    const text = (el.getAttribute('aria-label') || el.textContent || '')
      .trim()
      .replace(/\s+/g, ' ');
    return text.slice(0, 100) || el.tagName.toLowerCase();
  }

  document.addEventListener(
    'click',
    function (event) {
      const el = event.target.closest('a, button');
      // Elements already annotated with data-umami-event are tracked
      // natively by Umami — skip them to avoid double-counting.
      if (!el || el.hasAttribute('data-umami-event')) return;

      const umami = window.umami;
      if (!umami || typeof umami.track !== 'function') return;

      const isLink = el.tagName === 'A';
      if (isLink && !el.href) return;

      const data = { label: labelFor(el), path: window.location.pathname };
      if (isLink) {
        data.href = el.href;
        data.external = el.host !== window.location.host;
      }

      umami.track(isLink ? 'link-click' : 'button-click', data);
    },
    true
  );
})();
