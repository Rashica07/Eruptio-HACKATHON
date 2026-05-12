import { useEffect, useRef } from "react";

interface Petal {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  phase: number; spin: number; rot: number;
}

interface Star {
  x: number; y: number;
  r: number; alpha: number; twinklePhase: number;
}

interface Lantern {
  x: number; y: number; baseY: number;
  phase: number; size: number;
}

export function JapanScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    // ── Stars ──────────────────────────────────────────────────────────
    const stars: Star[] = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.65,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // ── Sakura petals ──────────────────────────────────────────────────
    const petals: Petal[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 0.8 + 0.3,
      size: Math.random() * 5 + 3,
      alpha: Math.random() * 0.7 + 0.2,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.08,
      rot: Math.random() * Math.PI * 2,
    }));

    // ── Lanterns ───────────────────────────────────────────────────────
    const lanterns: Lantern[] = [
      { x: W * 0.12, baseY: H * 0.38, y: H * 0.38, phase: 0,    size: 10 },
      { x: W * 0.82, baseY: H * 0.30, y: H * 0.30, phase: 1.2,  size: 8  },
      { x: W * 0.55, baseY: H * 0.22, y: H * 0.22, phase: 2.5,  size: 6  },
      { x: W * 0.30, baseY: H * 0.45, y: H * 0.45, phase: 3.8,  size: 9  },
      { x: W * 0.70, baseY: H * 0.50, y: H * 0.50, phase: 1.7,  size: 7  },
    ];

    let scrollRatio = 0;
    let time = 0;
    let animId: number;

    const handleScroll = () => {
      scrollRatio = Math.min(window.scrollY / (window.innerHeight * 0.85), 1);
    };

    const handleResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // ── Draw helpers ───────────────────────────────────────────────────
    function drawPetal(x: number, y: number, size: number, rot: number, alpha: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb7c5";
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(size * 0.5, 0, size * 0.6, size * 0.35, Math.PI * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ff9eb5";
      ctx.fill();
      ctx.restore();
    }

    function drawMoon(cx: number, cy: number) {
      // Outer glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      grd.addColorStop(0,   "rgba(255,245,200,0.22)");
      grd.addColorStop(0.6, "rgba(255,220,120,0.08)");
      grd.addColorStop(1,   "rgba(255,200,80,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Moon body
      const moon = ctx.createRadialGradient(cx - 8, cy - 8, 2, cx, cy, 42);
      moon.addColorStop(0, "#fff8e7");
      moon.addColorStop(1, "#ffe8b0");
      ctx.beginPath();
      ctx.arc(cx, cy, 42, 0, Math.PI * 2);
      ctx.fillStyle = moon;
      ctx.fill();
    }

    function drawFuji(parallax: number) {
      const midX = W / 2;
      const baseY = H + 40 + parallax * 30;
      const peakY = H * 0.45 + parallax * 15;

      // Mountain body gradient
      const fujiGrd = ctx.createLinearGradient(midX, peakY, midX, baseY);
      fujiGrd.addColorStop(0,   "#1e2d42");
      fujiGrd.addColorStop(0.4, "#1a2640");
      fujiGrd.addColorStop(1,   "#0e1620");

      ctx.beginPath();
      ctx.moveTo(midX - W * 0.55, baseY);
      ctx.lineTo(midX - W * 0.02, peakY + 12);
      ctx.lineTo(midX + W * 0.02, peakY + 12);
      ctx.lineTo(midX + W * 0.55, baseY);
      ctx.closePath();
      ctx.fillStyle = fujiGrd;
      ctx.fill();

      // Snow cap
      const snowY = peakY;
      const snowW = W * 0.085;
      ctx.beginPath();
      ctx.moveTo(midX - snowW * 0.3, snowY + 35);
      ctx.quadraticCurveTo(midX - snowW * 0.12, snowY + 8, midX, snowY);
      ctx.quadraticCurveTo(midX + snowW * 0.12, snowY + 8, midX + snowW * 0.3, snowY + 35);
      ctx.quadraticCurveTo(midX, snowY + 42, midX - snowW * 0.3, snowY + 35);
      ctx.closePath();
      const snowGrd = ctx.createLinearGradient(midX, snowY, midX, snowY + 42);
      snowGrd.addColorStop(0, "#eef4ff");
      snowGrd.addColorStop(1, "#c8dbef");
      ctx.fillStyle = snowGrd;
      ctx.fill();

      // Lower snow layer
      ctx.beginPath();
      ctx.moveTo(midX - snowW * 0.6, snowY + 52);
      ctx.quadraticCurveTo(midX, snowY + 44, midX + snowW * 0.6, snowY + 52);
      ctx.quadraticCurveTo(midX, snowY + 62, midX - snowW * 0.6, snowY + 52);
      ctx.closePath();
      ctx.fillStyle = "rgba(200,219,239,0.55)";
      ctx.fill();
    }

    function drawGround(parallax: number) {
      const groundY = H * 0.82 + parallax * 10;

      // Ground fill
      const grd = ctx.createLinearGradient(0, groundY, 0, H);
      grd.addColorStop(0, "#0e1620");
      grd.addColorStop(1, "#080d14");
      ctx.fillRect(0, groundY, W, H - groundY);

      // Lake shimmer
      ctx.save();
      ctx.globalAlpha = 0.55;
      const lakeGrd = ctx.createLinearGradient(0, groundY, 0, groundY + 60);
      lakeGrd.addColorStop(0, "#1a2d45");
      lakeGrd.addColorStop(1, "#0e1a2e");
      ctx.beginPath();
      ctx.ellipse(W / 2, groundY + 28, W * 0.38, 28, 0, 0, Math.PI * 2);
      ctx.fillStyle = lakeGrd;
      ctx.fill();
      ctx.restore();
    }

    function drawTorii(x: number, groundY: number, scale: number, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#8b2020";

      const pw = 7 * scale, ph = 90 * scale;
      const bw = 130 * scale, bh = 10 * scale;
      const gap = 55 * scale;

      // Pillars
      ctx.fillRect(x - gap / 2 - pw / 2, groundY - ph, pw, ph);
      ctx.fillRect(x + gap / 2 - pw / 2, groundY - ph, pw, ph);
      // Main beam
      ctx.fillRect(x - bw / 2, groundY - ph + 18 * scale, bw, bh);
      // Top beam (wider, slight overhang)
      ctx.fillRect(x - bw * 0.6, groundY - ph + 6 * scale, bw * 1.2, bh * 0.8);
      ctx.restore();
    }

    function drawLantern(l: Lantern, t: number) {
      const y = l.baseY + Math.sin(t * 0.7 + l.phase) * 5;
      ctx.save();
      ctx.globalAlpha = 0.92;

      // Glow
      const grd = ctx.createRadialGradient(l.x, y, 0, l.x, y, l.size * 3);
      grd.addColorStop(0,   "rgba(255,200,60,0.35)");
      grd.addColorStop(1,   "rgba(255,150,30,0)");
      ctx.beginPath();
      ctx.arc(l.x, y, l.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Lantern body
      ctx.beginPath();
      ctx.ellipse(l.x, y, l.size * 0.55, l.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffcc44";
      ctx.fill();
      ctx.strokeStyle = "#e6a020";
      ctx.lineWidth = 1;
      ctx.stroke();

      // String
      ctx.beginPath();
      ctx.moveTo(l.x, y - l.size);
      ctx.lineTo(l.x, y - l.size - 18);
      ctx.strokeStyle = "rgba(255,200,100,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }

    // ── Main render loop ───────────────────────────────────────────────
    function render() {
      animId = requestAnimationFrame(render);
      time += 0.012;
      const par = scrollRatio; // 0..1 parallax

      ctx.clearRect(0, 0, W, H);

      // Night sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.85);
      sky.addColorStop(0,   `rgba(8,12,28,${0.82 - par * 0.25})`);
      sky.addColorStop(0.5, `rgba(14,22,42,${0.70 - par * 0.2})`);
      sky.addColorStop(1,   "rgba(20,30,55,0)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const tw = 0.5 + 0.5 * Math.sin(time * 1.5 + s.twinklePhase);
        ctx.globalAlpha = s.alpha * tw * (1 - par * 0.6);
        ctx.beginPath();
        ctx.arc(s.x, s.y - par * 40, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff8e0";
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Moon
      const moonX = W * 0.72 + Math.sin(time * 0.1) * 4;
      const moonY = H * 0.18 - par * 30;
      drawMoon(moonX, moonY);

      // Mount Fuji
      drawFuji(par);

      // Ground & lake
      drawGround(par);

      // Torii gates
      const groundY = H * 0.82 + par * 10;
      drawTorii(W * 0.22, groundY, 0.7, 0.85 - par * 0.4);
      drawTorii(W * 0.22 - 55, groundY, 0.42, 0.45 - par * 0.3);

      // Lanterns
      lanterns.forEach(l => drawLantern(l, time));

      // Sakura petals
      petals.forEach(p => {
        p.x  += p.vx + Math.sin(time + p.phase) * 0.3;
        p.y  += p.vy;
        p.rot += p.spin;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        drawPetal(p.x, p.y, p.size, p.rot, p.alpha * (1 - par * 0.5));
      });

      ctx.globalAlpha = 1;
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
