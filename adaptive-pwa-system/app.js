/**
 * Adaptive PWA runtime
 * - Device context detection (pointer, hover, display-mode, safe-area, theme, motion)
 * - PWA install prompt, theme toggle, modal, context menu, form validation
 */

(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;

  /**
   * Detect device context and return a serializable object.
   */
  function detectDeviceContext() {
    const mq = window.matchMedia;
    return {
      pointer: mq('(pointer: coarse)').matches
        ? 'coarse'
        : mq('(pointer: fine)').matches
        ? 'fine'
        : 'none',
      hover: mq('(hover: hover)').matches ? 'hover' : 'none',
      anyHover: mq('(any-hover: hover)').matches ? 'hover' : 'none',
      prefersReducedMotion: mq('(prefers-reduced-motion: reduce)').matches,
      prefersColorScheme: mq('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      displayMode: getDisplayMode(),
      standalone: window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true,
      safeAreaTop: parseFloat(getComputedStyle(root).getPropertyValue('--sat')) || 0,
      safeAreaBottom: parseFloat(getComputedStyle(root).getPropertyValue('--sab')) || 0,
      screenSize: { width: window.innerWidth, height: window.innerHeight },
      pixelRatio: window.devicePixelRatio || 1,
      connection: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            saveData: navigator.connection.saveData,
          }
        : null,
    };
  }

  function getDisplayMode() {
    if (window.navigator.standalone === true) return 'standalone';
    if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone';
    if (window.matchMedia('(display-mode: fullscreen)').matches) return 'fullscreen';
    if (window.matchMedia('(display-mode: minimal-ui)').matches) return 'minimal-ui';
    return 'browser';
  }

  function renderContext() {
    const ctx = detectDeviceContext();
    const panel = document.getElementById('contextPanel');
    if (!panel) return;

    body.setAttribute('data-pointer', ctx.pointer);
    body.setAttribute('data-hover', ctx.hover);
    body.setAttribute('data-display-mode', ctx.displayMode);

    panel.innerHTML = `
      <ul class="context-list">
        <li><strong>Pointer:</strong> ${ctx.pointer}</li>
        <li><strong>Hover:</strong> ${ctx.hover}</li>
        <li><strong>Display mode:</strong> ${ctx.displayMode}</li>
        <li><strong>Color scheme:</strong> ${ctx.prefersColorScheme}</li>
        <li><strong>Reduced motion:</strong> ${ctx.prefersReducedMotion ? 'yes' : 'no'}</li>
        <li><strong>Viewport:</strong> ${ctx.screenSize.width} × ${ctx.screenSize.height}</li>
        <li><strong>Safe area bottom:</strong> ${ctx.safeAreaBottom.toFixed(1)}px</li>
        ${ctx.connection ? `<li><strong>Network:</strong> ${ctx.connection.effectiveType} ${ctx.connection.saveData ? '(save data)' : ''}</li>` : ''}
      </ul>
    `;
  }

  /* Theme toggle ----------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('adaptive-theme', theme);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let next = 'light';
    if (!current && systemDark) next = 'light';
    else if (current === 'dark') next = 'light';
    else if (current === 'light') next = 'dark';
    applyTheme(next);
  }

  const savedTheme = localStorage.getItem('adaptive-theme');
  if (savedTheme) applyTheme(savedTheme);
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  /* Modal ------------------------------------------------------------------ */
  const modal = document.getElementById('modal');
  const openModal = document.getElementById('openModal');
  const closeEls = document.querySelectorAll('[data-close]');

  function openModalDialog() {
    if (!modal) return;
    modal.hidden = false;
    modal.querySelector('input, button')?.focus();
    document.addEventListener('keydown', onModalKey);
  }

  function closeModalDialog() {
    if (!modal) return;
    modal.hidden = true;
    document.removeEventListener('keydown', onModalKey);
    openModal?.focus();
  }

  function onModalKey(e) {
    if (e.key === 'Escape') closeModalDialog();
  }

  openModal?.addEventListener('click', openModalDialog);
  closeEls.forEach((el) => el.addEventListener('click', closeModalDialog));

  /* Mobile menu ------------------------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  menuToggle?.addEventListener('click', () => {
    if (!sidebar) return;
    const open = sidebar.classList.toggle('is-open');
    sidebar.style.display = open ? 'flex' : 'none';
    sidebar.style.position = 'fixed';
    sidebar.style.inset = '0';
    sidebar.style.zIndex = '60';
  });

  /* Form validation -------------------------------------------------------- */
  const form = document.getElementById('sampleForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    let ok = true;
    if (!name.value.trim()) ok = false;
    if (!email.validity.valid) ok = false;
    if (ok) {
      alert('Form submitted (demo only)');
      form.reset();
    }
  });

  /* Context menu for cards ------------------------------------------------- */
  const contextMenu = document.getElementById('contextMenu');
  let contextTarget = null;

  function showContextMenu(e) {
    if (window.matchMedia('(pointer: coarse)').matches) return; // right-click only on fine pointers
    e.preventDefault();
    contextTarget = e.currentTarget;
    contextMenu.hidden = false;
    const x = Math.min(e.clientX, window.innerWidth - 190);
    const y = Math.min(e.clientY, window.innerHeight - 160);
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    document.addEventListener('click', hideContextMenu, { once: true });
  }

  function hideContextMenu() {
    contextMenu.hidden = true;
  }

  document.querySelectorAll('.card--metric, .list__item').forEach((el) => {
    el.addEventListener('contextmenu', showContextMenu);
  });

  contextMenu?.querySelectorAll('.context-menu__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = contextTarget?.dataset.context || 'Item';
      alert(`${btn.textContent.trim()} · ${text}`);
      hideContextMenu();
    });
  });

  /* PWA install ------------------------------------------------------------ */
  let installPrompt = null;
  const installBtn = document.getElementById('installBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    if (installBtn) installBtn.hidden = false;
  });

  installBtn?.addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installBtn.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    if (installBtn) installBtn.hidden = true;
  });

  /* Resize / orientation updates ------------------------------------------- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderContext, 150);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!root.getAttribute('data-theme')) renderContext();
  });

  window.matchMedia('(display-mode: standalone)').addEventListener('change', renderContext);

  /* Initial render --------------------------------------------------------- */
  renderContext();
})();
