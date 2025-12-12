(() => {
  function buildPixelSteps(minRatio) {
    const clamped = Math.max(0.05, Math.min(minRatio, 0.9));
    const mid = clamped;
    return [1, 0.8, 0.6, mid * 1.1, mid, mid * 1.1, 0.6, 0.8, 1];
  }

  function initCanvas(canvas, opts) {
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
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      const scaledW = Math.max(1, Math.floor(w * blockSize));
      const scaledH = Math.max(1, Math.floor(h * blockSize));
      ctx.drawImage(img, 0, 0, scaledW, scaledH);
      ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
    }

    function animatePixelation(fromImg, toImg) {
      const steps = buildPixelSteps(opts.minRatio);
      const total = steps.length - 1;
      let frame = 0;

      function step() {
        const blockSize = steps[frame];
        const midPoint = Math.floor(total / 2);
        const img = frame < midPoint ? fromImg : toImg;
        drawPixelated(img, blockSize);
        frame += 1;
        if (frame <= total) {
          requestAnimationFrame(step);
        }
      }

      step();
    }

    function onEnter() {
      const target = img2 || img1;
      const startAnim = () => {
        if (opts.enablePixelate) {
          animatePixelation(img1, target);
        } else {
          drawPixelated(target, 1);
        }
      };

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
      const startAnim = () => {
        if (opts.enablePixelate) {
          animatePixelation(currentImg, img1);
        } else {
          drawPixelated(img1, 1);
        }
      };

      if (img1.complete) startAnim();
      else img1.addEventListener('load', startAnim, { once: true });
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
    root.querySelectorAll('canvas.auciel-product-card__canvas').forEach((canvas) => {
      const sectionEl = canvas.closest('[data-auciel-product-grid]');
      const enablePixelate = sectionEl?.dataset.pixelate === 'true';
      const strength = parseInt(sectionEl?.dataset.pixelStrength || '20', 10);
      const minRatio = Math.max(0.05, Math.min(strength / 100, 0.9));
      initCanvas(canvas, { enablePixelate, minRatio });
    });
  }

  document.addEventListener('DOMContentLoaded', () => initAll());
  document.addEventListener('shopify:section:load', (e) => initAll(e.target));
})();

