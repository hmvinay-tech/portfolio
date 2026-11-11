const canvas = document.querySelector("#terrain");
function drawTerrain() {
  const {width, height} = canvas.getBoundingClientRect();
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  const radius = Math.min(width, height) * .41;
  for (let ring = 1; ring <= 72; ring++) {
    ctx.beginPath();
    for (let step = 0; step <= 360; step++) {
      const angle = step * Math.PI / 180;
      const t = ring / 72;
      const wave = 1 + .13 * Math.sin(3 * angle + t * 3) + .11 * Math.cos(2 * angle - t) + .05 * Math.sin(5 * angle + t);
      const x = width * (.44 + .08 * t) + Math.cos(angle) * radius * wave * t * 1.16;
      const y = height * (.52 - .05 * t) + Math.sin(angle) * radius * wave * t;
      if (step === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = ring % 6 === 0 ? "#d3edaa" : "#86ac80";
    ctx.lineWidth = ring % 6 === 0 ? 1.5 : .8;
    ctx.stroke();
  }
}
new ResizeObserver(drawTerrain).observe(canvas);
