(() => {
  const pixelSteps = [1, 0.8, 0.6, 0.4, 0.25, 0.15, 0.12, 0.15, 0.25, 0.4, 0.6, 0.8, 1];

  function initCanvas(canvas) {
    const container = canvas.closest('[data-auciel-card-image]');
    if (!container) return;

    const src = canvas.dataset.src;
    const hoverSrc = canvas.dataset.hoverSrc;
    if (!src) return;

    const img1 = new Image();
    img1.crossOrigin = 'anonymous';
    img1.src = src;

    const img2 = hoverSrc ? new Image() : null;
    if (img2) {
      img2.crossOrigin = 'anonymous';
      img2.src = hoverSrc;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrame = null;
    let currentImg = img1;

    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (currentImg.complete) drawPixelated(currentImg, 1);
    }

    function drawPixelated(img, blockSize) {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      const scaledW = Math.max(1, Math.floor(w * blockSize));
      const scaledH = Math.max(1, Math.floor(h * blockSize));
      ctx.drawImage(img, 0, 0, scaledW, scaledH);
      ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
    }

    function animatePixelation(fromImg, toImg, duration = 500) {
      const start = performance.now();
      const midPoint = Math.floor(pixelSteps.length / 2);

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const idx = Math.min(Math.floor(progress * (pixelSteps.length - 1)), pixelSteps.length - 1);
        const blockSize = pixelSteps[idx];
        const img = idx < midPoint ? fromImg : toImg;
        drawPixelated(img, blockSize);
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      }

      animationFrame = requestAnimationFrame(step);
    }

    function onEnter() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      const target = img2 || img1;
      const startAnim = () => animatePixelation(img1, target);
      if (img1.complete && target.complete) startAnim();
      else {
        const wait = [];
        if (!img1.complete) wait.push(new Promise(r => img1.addEventListener('load', r, { once: true })));
        if (!target.complete) wait.push(new Promise(r => target.addEventListener('load', r, { once: true })));
        Promise.all(wait).then(startAnim);
      }
      currentImg = target;
    }

    function onLeave() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      const source = img2 && currentImg === img2 ? img2 : img1;
      const startAnim = () => animatePixelation(source, img1);
      if (source.complete && img1.complete) startAnim();
      else {
        const wait = [];
        if (!source.complete) wait.push(new Promise(r => source.addEventListener('load', r, { once: true })));
        if (!img1.complete) wait.push(new Promise(r => img1.addEventListener('load', r, { once: true })));
        Promise.all(wait).then(startAnim);
      }
      currentImg = img1;
    }

    canvas.addEventListener('mouseenter', onEnter);
    canvas.addEventListener('mouseleave', onLeave);

    img1.addEventListener('load', () => {
      resizeCanvas();
      drawPixelated(img1, 1);
    }, { once: true });

    window.addEventListener('resize', resizeCanvas);
  }

  function initAll(root = document) {
    root.querySelectorAll('canvas.auciel-product-card__canvas').forEach(initCanvas);
  }

  document.addEventListener('DOMContentLoaded', () => initAll());
  document.addEventListener('shopify:section:load', (e) => initAll(e.target));
})();

