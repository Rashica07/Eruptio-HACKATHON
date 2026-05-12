import { useEffect, useRef } from "react";

interface Petal   { x:number; y:number; vx:number; vy:number; size:number; alpha:number; phase:number; spin:number; rot:number }
interface Star    { x:number; y:number; r:number; alpha:number; twinklePhase:number }
interface Lantern { x:number; y:number; baseY:number; phase:number; size:number }

export function JapanScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let animId: number;
    let stars: Star[] = [];
    let petals: Petal[] = [];
    let lanterns: Lantern[] = [];
    let scrollRatio = 0, time = 0;
    let W = 0, H = 0;

    function init() {
      ctx = canvas!.getContext("2d");
      if (!ctx) return;

      W = canvas!.parentElement?.offsetWidth  || window.innerWidth;
      H = canvas!.parentElement?.offsetHeight || window.innerHeight;
      canvas!.width  = W;
      canvas!.height = H;

      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W, y: Math.random() * H * 0.72,
        r: Math.random() * 1.3 + 0.2, alpha: Math.random() * 0.7 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
      }));

      petals = Array.from({ length: 110 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5, vy: Math.random() * 0.65 + 0.25,
        size: Math.random() * 6 + 3, alpha: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.07,
        rot: Math.random() * Math.PI * 2,
      }));

      lanterns = [
        { x: W * 0.13, baseY: H * 0.36, y: 0, phase: 0,   size: 11 },
        { x: W * 0.84, baseY: H * 0.28, y: 0, phase: 1.3, size: 8  },
        { x: W * 0.54, baseY: H * 0.20, y: 0, phase: 2.6, size: 7  },
        { x: W * 0.31, baseY: H * 0.44, y: 0, phase: 3.9, size: 9  },
        { x: W * 0.68, baseY: H * 0.48, y: 0, phase: 1.8, size: 6  },
      ];

      render();
    }

    function drawPetal(x: number, y: number, sz: number, rot: number, a: number) {
      if (!ctx) return;
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a;
      ctx.beginPath(); ctx.ellipse(0, 0, sz, sz * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb7c5"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(sz * 0.5, 0, sz * 0.55, sz * 0.3, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ff8fab"; ctx.fill();
      ctx.restore();
    }

    function drawMoon(cx: number, cy: number) {
      if (!ctx) return;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      g.addColorStop(0, "rgba(255,245,200,0.18)"); g.addColorStop(0.5, "rgba(245,200,100,0.07)"); g.addColorStop(1, "rgba(245,161,24,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 100, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      const m = ctx.createRadialGradient(cx - 10, cy - 10, 2, cx, cy, 44);
      m.addColorStop(0, "#fff9e6"); m.addColorStop(1, "#f5c84a");
      ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fillStyle = m; ctx.fill();
    }

    function drawFuji(par: number) {
      if (!ctx) return;
      const mx = W / 2, baseY = H + 50 + par * 35, peakY = H * 0.42 + par * 18;
      const fg = ctx.createLinearGradient(mx, peakY, mx, baseY);
      fg.addColorStop(0, "#0f1a2e"); fg.addColorStop(0.5, "#0d1828"); fg.addColorStop(1, "#070c18");
      ctx.beginPath(); ctx.moveTo(mx - W * 0.58, baseY); ctx.lineTo(mx, peakY); ctx.lineTo(mx + W * 0.58, baseY);
      ctx.closePath(); ctx.fillStyle = fg; ctx.fill();
      const sw = W * 0.09;
      ctx.beginPath();
      ctx.moveTo(mx - sw * 0.28, peakY + 38); ctx.quadraticCurveTo(mx - sw * 0.1, peakY + 6, mx, peakY);
      ctx.quadraticCurveTo(mx + sw * 0.1, peakY + 6, mx + sw * 0.28, peakY + 38);
      ctx.quadraticCurveTo(mx, peakY + 48, mx - sw * 0.28, peakY + 38); ctx.closePath();
      const sg = ctx.createLinearGradient(mx, peakY, mx, peakY + 48);
      sg.addColorStop(0, "#eef5ff"); sg.addColorStop(1, "#c0d4f0");
      ctx.fillStyle = sg; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(mx - sw * 0.55, peakY + 54); ctx.quadraticCurveTo(mx, peakY + 46, mx + sw * 0.55, peakY + 54);
      ctx.quadraticCurveTo(mx, peakY + 66, mx - sw * 0.55, peakY + 54);
      ctx.closePath(); ctx.fillStyle = "rgba(192,212,240,0.4)"; ctx.fill();
    }

    function drawGround(par: number) {
      if (!ctx) return;
      const gy = H * 0.84 + par * 12;
      const gg = ctx.createLinearGradient(0, gy, 0, H);
      gg.addColorStop(0, "#0b1120"); gg.addColorStop(1, "#060b14");
      ctx.fillRect(0, gy, W, H - gy + 2);
      ctx.save(); ctx.globalAlpha = 0.5;
      const lg = ctx.createLinearGradient(0, gy, 0, gy + 55);
      lg.addColorStop(0, "#14243e"); lg.addColorStop(1, "#0a1828");
      ctx.beginPath(); ctx.ellipse(W / 2, gy + 26, W * 0.36, 26, 0, 0, Math.PI * 2);
      ctx.fillStyle = lg; ctx.fill();
      ctx.restore();
    }

    function drawTorii(x: number, gy: number, sc: number, a: number) {
      if (!ctx) return;
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = "#8b1a1a";
      const pw = 7 * sc, ph = 88 * sc, bw = 125 * sc, bh = 10 * sc, gap = 52 * sc;
      ctx.fillRect(x - gap / 2 - pw / 2, gy - ph, pw, ph);
      ctx.fillRect(x + gap / 2 - pw / 2, gy - ph, pw, ph);
      ctx.fillRect(x - bw / 2, gy - ph + 17 * sc, bw, bh);
      ctx.fillRect(x - bw * 0.58, gy - ph + 5 * sc, bw * 1.16, bh * 0.75);
      ctx.restore();
    }

    function drawLantern(l: Lantern, t: number) {
      if (!ctx) return;
      const y = l.baseY + Math.sin(t * 0.75 + l.phase) * 5;
      const g = ctx.createRadialGradient(l.x, y, 0, l.x, y, l.size * 3.5);
      g.addColorStop(0, "rgba(245,161,24,0.28)"); g.addColorStop(1, "rgba(245,120,10,0)");
      ctx.beginPath(); ctx.arc(l.x, y, l.size * 3.5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.save(); ctx.globalAlpha = 0.95;
      ctx.beginPath(); ctx.ellipse(l.x, y, l.size * 0.52, l.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#f5a118"; ctx.fill();
      ctx.strokeStyle = "#e0850a"; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();
    }

    function render() {
      if (!ctx) return;
      animId = requestAnimationFrame(render);
      time += 0.011;
      const par = scrollRatio;
      ctx.clearRect(0, 0, W, H);

      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.9);
      sky.addColorStop(0,   `rgba(5,8,20,${0.9 - par * 0.3})`);
      sky.addColorStop(0.4, `rgba(10,16,36,${0.75 - par * 0.2})`);
      sky.addColorStop(1,   "rgba(14,22,48,0)");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const tw = 0.45 + 0.55 * Math.sin(time * 1.6 + s.twinklePhase);
        ctx!.globalAlpha = s.alpha * tw * (1 - par * 0.7);
        ctx!.beginPath(); ctx!.arc(s.x, s.y - par * 50, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = "#fff8e8"; ctx!.fill();
      });
      ctx.globalAlpha = 1;

      drawMoon(W * 0.74 + Math.sin(time * 0.12) * 5, H * 0.17 - par * 35);
      drawFuji(par);
      drawGround(par);

      const gy = H * 0.84 + par * 12;
      drawTorii(W * 0.21, gy, 0.72, 0.88 - par * 0.5);
      drawTorii(W * 0.21 - 60, gy, 0.44, 0.42 - par * 0.3);
      lanterns.forEach(l => drawLantern(l, time));

      petals.forEach(p => {
        p.x   += p.vx + Math.sin(time + p.phase) * 0.28;
        p.y   += p.vy;
        p.rot += p.spin;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        drawPetal(p.x, p.y, p.size, p.rot, p.alpha * (1 - par * 0.6));
      });
      ctx.globalAlpha = 1;
    }

    const onScroll = () => { scrollRatio = Math.min(window.scrollY / (window.innerHeight * 0.9), 1); };
    const onResize = () => {
      W = canvas!.parentElement?.offsetWidth  || window.innerWidth;
      H = canvas!.parentElement?.offsetHeight || window.innerHeight;
      canvas!.width = W; canvas!.height = H;
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    // Wait one frame so parent has laid out
    requestAnimationFrame(() => init());

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
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
