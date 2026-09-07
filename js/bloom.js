(() => {
  const button = document.querySelector('.bloom-toggle');
  const words = document.querySelector('.bloom-words');
  const intro = document.querySelector('.intro');
  const links = document.querySelector('.intro .links');
  if (!button || !words || !intro) return;
  let frame;
  function positionScene() {
    const rect = button.getBoundingClientRect();
    const introRect = intro.getBoundingClientRect();
    const transform = getComputedStyle(intro).transform;
    const currentY = transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m42;
    const viewport = window.visualViewport;
    const height = viewport ? viewport.height : window.innerHeight;
    const top = viewport ? viewport.offsetTop : 0;
    const gap = Math.max(92, Math.min(height * .14, 135));
    // Center the logo; on very short screens reserve enough room for the copy.
    const center = Math.min(height / 2, height - words.offsetHeight - gap - 24);
    intro.style.setProperty('--bloom-center-shift', (top + Math.max(100, center) - (rect.top + rect.height / 2 - currentY)) + 'px');
    intro.style.setProperty('--bloom-copy-top', (rect.top + rect.height / 2 - introRect.top + gap) + 'px');
  }
  function schedulePosition() {
    if (!document.body.classList.contains('bloom-open')) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(positionScene);
  }
  function toggle(open) {
    if (open) positionScene();
    document.body.classList.toggle('bloom-open', open);
    button.setAttribute('aria-pressed', String(open));
    button.setAttribute('aria-label', open ? '收起紫罗兰动画' : '展开紫罗兰动画');
    words.setAttribute('aria-hidden', String(!open));
    if (links) links.inert = open;
  }
  button.addEventListener('click', () => toggle(!document.body.classList.contains('bloom-open')));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('bloom-open')) {
      toggle(false);
      button.focus({preventScroll:true});
    }
  });
  window.addEventListener('resize', schedulePosition);
  window.addEventListener('scroll', schedulePosition, {passive:true});
  window.visualViewport?.addEventListener('resize', schedulePosition);
})();
