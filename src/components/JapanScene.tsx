import { useEffect, useRef } from "react";

interface Petal { x:number; y:number; vx:number; vy:number; size:number; alpha:number; phase:number; spin:number; rot:number }
interface Star  { x:number; y:number; r:number; alpha:number; twinklePhase:number }

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }

export function JapanScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    let animId: number;
    let stars: Star[] = [];
    let petals: Petal[] = [];
    let scrollRatio = 0;
    let time = 0;
    let introFrames = 0;   // 0 → 180 frames for Fuji rise
    let W = 0, H = 0;

    function init() {
      ctx = canvas!.getContext("2d");
      if (!ctx) return;

      W = canvas!.parentElement?.offsetWidth  || window.innerWidth;
      H = canvas!.parentElement?.offsetHeight || window.innerHeight;
      canvas!.width  = W;
      canvas!.height = H;

      stars = Array.from({ length: 240 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.72,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
      }));

      petals = Array.from({ length: 110 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.65 + 0.25,
        size: Math.random() * 6 + 3,
        alpha: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.07,
        rot: Math.random() * Math.PI * 2,
      }));

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

    function drawFuji(finalPeakY: number, introEased: number, par: number) {
      if (!ctx) return;
      const mx = W / 2;
      // Fuji rises from below: starts H*0.7 below final position
      const peakY = finalPeakY + (1 - introEased) * H * 0.75;
      const baseY = H + 50 + par * 35 + (1 - introEased) * H * 0.75;

      // Clip so mountain doesn't show until it rises enough
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, finalPeakY - 20, W, H * 2);
      ctx.clip();

      // Mountain body
      const fg = ctx.createLinearGradient(mx, peakY, mx, baseY);
      fg.addColorStop(0, "#0f1a2e"); fg.addColorStop(0.55, "#0d1828"); fg.addColorStop(1, "#070c18");
      ctx.beginPath();
      ctx.moveTo(mx - W * 0.6, baseY);
      ctx.lineTo(mx - W * 0.08, peakY + 60);
      ctx.quadraticCurveTo(mx, peakY, mx + W * 0.08, peakY + 60);
      ctx.lineTo(mx + W * 0.6, baseY);
      ctx.closePath();
      ctx.fillStyle = fg; ctx.fill();

      // Snow cap
      const sw = W * 0.09;
      ctx.beginPath();
      ctx.moveTo(mx - sw * 0.32, peakY + 42);
      ctx.quadraticCurveTo(mx - sw * 0.12, peakY + 8, mx, peakY);
      ctx.quadraticCurveTo(mx + sw * 0.12, peakY + 8, mx + sw * 0.32, peakY + 42);
      ctx.quadraticCurveTo(mx, peakY + 54, mx - sw * 0.32, peakY + 42);
      ctx.closePath();
      const sg = ctx.createLinearGradient(mx, peakY, mx, peakY + 54);
      sg.addColorStop(0, "#eef5ff"); sg.addColorStop(1, "#c0d4f0");
      ctx.fillStyle = sg; ctx.fill();

      // Snow skirt
      ctx.beginPath();
      ctx.moveTo(mx - sw * 0.6, peakY + 60);
      ctx.quadraticCurveTo(mx, peakY + 50, mx + sw * 0.6, peakY + 60);
      ctx.quadraticCurveTo(mx, peakY + 74, mx - sw * 0.6, peakY + 60);
      ctx.closePath();
      ctx.fillStyle = "rgba(192,212,240,0.35)"; ctx.fill();

      ctx.restore();

      // Store actual peak position for flag drawing
      return peakY;
    }

    function drawFlag(poleX: number, poleTopY: number, scrollRatio: number, time: number) {
      if (!ctx) return;
      const flagProgress = Math.min((scrollRatio - 0.02) / 0.32, 1);
      if (flagProgress <= 0) return;

      const poleH = 62;
      const poleDrawH = poleH * flagProgress;

      ctx.save();
      ctx.globalAlpha = Math.min(flagProgress * 2.5, 1);

      // Pole
      ctx.strokeStyle = "#d8d4cc";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(poleX, poleTopY);
      ctx.lineTo(poleX, poleTopY - poleDrawH);
      ctx.stroke();

      // Flag (appears when pole is 55% up)
      if (flagProgress > 0.55) {
        const flagAlpha = Math.min((flagProgress - 0.55) / 0.4, 1);
        const actualPoleTop = poleTopY - poleDrawH;
        const flagW = 36;
        const flagH = 24;
        const t = time * 3.8;

        ctx.globalAlpha = flagAlpha;

        // Draw flag with strips (Italian flag: green | white | red)
        const strips = 12;
        for (let i = 0; i < strips; i++) {
          const x0 = poleX + (i / strips) * flagW;
          const x1 = poleX + ((i + 1) / strips) * flagW;
          const ratio = i / strips;
          const w0 = Math.sin(t + ratio * 2.2) * 4 * ratio;
          const w1 = Math.sin(t + (ratio + 1 / strips) * 2.2) * 4 * (ratio + 1 / strips);

          ctx.beginPath();
          ctx.moveTo(x0, actualPoleTop + w0);
          ctx.lineTo(x1, actualPoleTop + w1);
          ctx.lineTo(x1, actualPoleTop + flagH + w1);
          ctx.lineTo(x0, actualPoleTop + flagH + w0);
          ctx.closePath();

          // Italian tricolore
          if (i < strips * 0.34) ctx.fillStyle = "#009246";
          else if (i < strips * 0.67) ctx.fillStyle = "#f4f4f4";
          else ctx.fillStyle = "#ce2b37";
          ctx.fill();
        }

        // Flag border
        const borderW0 = Math.sin(t) * 4 * 0;
        const borderW1 = Math.sin(t + 2.2) * 4;
        ctx.beginPath();
        ctx.moveTo(poleX, actualPoleTop + borderW0);
        ctx.lineTo(poleX + flagW, actualPoleTop + borderW1);
        ctx.lineTo(poleX + flagW, actualPoleTop + flagH + borderW1);
        ctx.lineTo(poleX, actualPoleTop + flagH + borderW0);
        ctx.closePath();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawGround(par: number, introEased: number) {
      if (!ctx) return;
      const gy = H * 0.84 + par * 12 + (1 - introEased) * H * 0.3;
      const gg = ctx.createLinearGradient(0, gy, 0, H);
      gg.addColorStop(0, "#0b1120"); gg.addColorStop(1, "#060b14");
      ctx.fillRect(0, gy, W, H - gy + 2);
      ctx.save(); ctx.globalAlpha = 0.45;
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

    function render() {
      if (!ctx) return;
      animId = requestAnimationFrame(render);
      time += 0.011;

      // Intro: Fuji rises over first ~160 frames
      introFrames = Math.min(introFrames + 1, 160);
      const introEased = easeOutQuart(introFrames / 160);

      const par = scrollRatio;
      ctx.clearRect(0, 0, W, H);

      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.9);
      sky.addColorStop(0,   `rgba(5,8,20,${0.9 - par * 0.3})`);
      sky.addColorStop(0.4, `rgba(10,16,36,${0.75 - par * 0.2})`);
      sky.addColorStop(1,   "rgba(14,22,48,0)");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const tw = 0.45 + 0.55 * Math.sin(time * 1.6 + s.twinklePhase);
        ctx!.globalAlpha = s.alpha * tw * (1 - par * 0.7) * introEased;
        ctx!.beginPath(); ctx!.arc(s.x, s.y - par * 50, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = "#fff8e8"; ctx!.fill();
      });
      ctx.globalAlpha = 1;

      // Moon — fades in as Fuji rises
      drawMoon(W * 0.74 + Math.sin(time * 0.12) * 5, H * 0.17 - par * 35);

      // Fuji rising
      const finalPeakY = H * 0.42 + par * 18;
      const actualPeakY = drawFuji(finalPeakY, introEased, par) ?? finalPeakY;

      drawGround(par, introEased);

      // Torii gate
      const gy = H * 0.84 + par * 12;
      drawTorii(W * 0.21, gy, 0.72, (0.88 - par * 0.5) * introEased);
      drawTorii(W * 0.21 - 60, gy, 0.44, (0.42 - par * 0.3) * introEased);

      // Flag at Fuji peak (only once Fuji is mostly risen)
      if (introEased > 0.85) {
        const poleX = W / 2 + 4;
        drawFlag(poleX, actualPeakY, scrollRatio, time);
      }

      // Sakura petals
      petals.forEach(p => {
        p.x  += p.vx + Math.sin(time + p.phase) * 0.28;
        p.y  += p.vy;
        p.rot += p.spin;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        drawPetal(p.x, p.y, p.size, p.rot, p.alpha * (1 - par * 0.6) * introEased);
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
