(() => {
  const button = document.querySelector('.bloom-toggle');
  const words = document.querySelector('.bloom-words');
  const links = document.querySelector('.intro .links');
  if (!button || !words) return;
  function toggle(open) {
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
      button.focus();
    }
  });
})();
