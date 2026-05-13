import { useEffect, useRef } from "react";

interface Petal { x:number; y:number; vx:number; vy:number; size:number; alpha:number; phase:number; spin:number; rot:number }
interface Star  { x:number; y:number; r:number; alpha:number; twinklePhase:number }

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }

export function JapanScene() {
  const bgRef   = useRef<HTMLCanvasElement>(null);
  const flagRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const bgCanvas   = bgRef.current;
    const flagCanvas = flagRef.current;
    if (!bgCanvas || !flagCanvas) return;

    let bgCtx:   CanvasRenderingContext2D | null = null;
    let flagCtx: CanvasRenderingContext2D | null = null;
    let animId: number;
    let stars: Star[] = [];
    let petals: Petal[] = [];
    let scrollRatio = 0;
    let time = 0;
    let introFrames = 0;
    let W = 0, H = 0;

    function resize() {
      W = bgCanvas!.parentElement?.offsetWidth  || window.innerWidth;
      H = bgCanvas!.parentElement?.offsetHeight || window.innerHeight;
      bgCanvas!.width   = flagCanvas!.width   = W;
      bgCanvas!.height  = flagCanvas!.height  = H;
    }

    function init() {
      bgCtx   = bgCanvas!.getContext("2d");
      flagCtx = flagCanvas!.getContext("2d");
      if (!bgCtx || !flagCtx) return;

      resize();

      stars = Array.from({ length: 240 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.65,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
      }));

      petals = Array.from({ length: 110 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5, vy: Math.random() * 0.65 + 0.25,
        size: Math.random() * 6 + 3, alpha: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.07,
        rot: Math.random() * Math.PI * 2,
      }));

      render();
    }

    function drawPetal(ctx: CanvasRenderingContext2D, x: number, y: number, sz: number, rot: number, a: number) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = a;
      ctx.beginPath(); ctx.ellipse(0, 0, sz, sz * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffb7c5"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(sz * 0.5, 0, sz * 0.55, sz * 0.3, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#ff8fab"; ctx.fill();
      ctx.restore();
    }

    function drawMoon(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      g.addColorStop(0, "rgba(255,245,200,0.18)"); g.addColorStop(0.5, "rgba(245,200,100,0.07)"); g.addColorStop(1, "rgba(245,161,24,0)");
      ctx.beginPath(); ctx.arc(cx, cy, 100, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      const m = ctx.createRadialGradient(cx - 10, cy - 10, 2, cx, cy, 44);
      m.addColorStop(0, "#fff9e6"); m.addColorStop(1, "#f5c84a");
      ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fillStyle = m; ctx.fill();
    }

    // Returns actual drawn peak Y
    function drawFuji(ctx: CanvasRenderingContext2D, introEased: number, par: number): number {
      const mx = W / 2;
      // Peak sits at 65% of screen height (bottom third) — user-requested lower position
      const finalPeakY = H * 0.65 + par * 18;
      const peakY = finalPeakY + (1 - introEased) * H * 0.45;
      const baseY = H + 60 + par * 35 + (1 - introEased) * H * 0.45;

      ctx.save();
      // Only show mountain from its final peak down
      ctx.beginPath(); ctx.rect(0, finalPeakY - 30, W, H * 2); ctx.clip();

      // Mountain body — wide gentle slopes like real Fuji
      const fg = ctx.createLinearGradient(mx, peakY, mx, baseY);
      fg.addColorStop(0, "#0f1a2e"); fg.addColorStop(0.55, "#0d1828"); fg.addColorStop(1, "#070c18");
      ctx.beginPath();
      ctx.moveTo(mx - W * 0.65, baseY);
      ctx.lineTo(mx - W * 0.07, peakY + 55);
      ctx.quadraticCurveTo(mx, peakY, mx + W * 0.07, peakY + 55);
      ctx.lineTo(mx + W * 0.65, baseY);
      ctx.closePath();
      ctx.fillStyle = fg; ctx.fill();

      // Snow cap
      const sw = W * 0.08;
      ctx.beginPath();
      ctx.moveTo(mx - sw * 0.30, peakY + 38);
      ctx.quadraticCurveTo(mx - sw * 0.10, peakY + 7, mx, peakY);
      ctx.quadraticCurveTo(mx + sw * 0.10, peakY + 7, mx + sw * 0.30, peakY + 38);
      ctx.quadraticCurveTo(mx, peakY + 50, mx - sw * 0.30, peakY + 38);
      ctx.closePath();
      const sg = ctx.createLinearGradient(mx, peakY, mx, peakY + 50);
      sg.addColorStop(0, "#eef5ff"); sg.addColorStop(1, "#c0d4f0");
      ctx.fillStyle = sg; ctx.fill();

      // Snow skirt
      ctx.beginPath();
      ctx.moveTo(mx - sw * 0.55, peakY + 55);
      ctx.quadraticCurveTo(mx, peakY + 47, mx + sw * 0.55, peakY + 55);
      ctx.quadraticCurveTo(mx, peakY + 68, mx - sw * 0.55, peakY + 55);
      ctx.closePath(); ctx.fillStyle = "rgba(192,212,240,0.32)"; ctx.fill();

      ctx.restore();
      return peakY;
    }

    function drawGround(ctx: CanvasRenderingContext2D, introEased: number, par: number) {
      const gy = H * 0.90 + par * 10 + (1 - introEased) * H * 0.2;
      const gg = ctx.createLinearGradient(0, gy, 0, H);
      gg.addColorStop(0, "#0b1120"); gg.addColorStop(1, "#060b14");
      ctx.fillRect(0, gy, W, H - gy + 2);
    }

    function drawTorii(ctx: CanvasRenderingContext2D, x: number, gy: number, sc: number, a: number) {
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = "#8b1a1a";
      const pw = 7 * sc, ph = 88 * sc, bw = 125 * sc, bh = 10 * sc, gap = 52 * sc;
      ctx.fillRect(x - gap / 2 - pw / 2, gy - ph, pw, ph);
      ctx.fillRect(x + gap / 2 - pw / 2, gy - ph, pw, ph);
      ctx.fillRect(x - bw / 2, gy - ph + 17 * sc, bw, bh);
      ctx.fillRect(x - bw * 0.58, gy - ph + 5 * sc, bw * 1.16, bh * 0.75);
      ctx.restore();
    }

    // ─── FLAG drawn on separate top-layer canvas ─────────────────────────────
    function drawFlag(ctx: CanvasRenderingContext2D, peakX: number, peakY: number, scrollRatio: number, time: number) {
      ctx.clearRect(0, 0, W, H);
      // Starts at 6% scroll, fully extended at 75% scroll
      const fp = Math.min(Math.max((scrollRatio - 0.06) / 0.69, 0), 1);
      if (fp <= 0) return;

      // Pole base: just above the snow tip
      const poleBase = peakY - 8;
      const poleH    = H * 0.22;          // tall — 22% of screen height
      const poleDrawH = poleH * fp;

      ctx.save();

      // Gold glowing pole
      ctx.shadowColor = "rgba(245,161,24,0.7)";
      ctx.shadowBlur  = 14;
      ctx.strokeStyle = "#f5c84a";
      ctx.lineWidth   = 4;
      ctx.lineCap     = "round";
      ctx.globalAlpha = Math.min(fp * 4, 1);
      ctx.beginPath();
      ctx.moveTo(peakX, poleBase);
      ctx.lineTo(peakX, poleBase - poleDrawH);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Flag unfurls after pole is 40% up
      if (fp > 0.40) {
        const fAlpha  = Math.min((fp - 0.40) / 0.50, 1);
        const poleTop = poleBase - poleDrawH;
        const flagW   = H * 0.16;         // 16% of screen height wide
        const flagH   = H * 0.105;        // 10.5% tall — clearly visible
        const t       = time * 3.0;
        const strips  = 18;

        ctx.globalAlpha = fAlpha;

        for (let i = 0; i < strips; i++) {
          const ratio = i / strips;
          const r1    = (i + 1) / strips;
          const amp   = 9 * ratio;                          // wave grows from pole outward
          const w0    = Math.sin(t + ratio * 2.6) * amp;
          const w1    = Math.sin(t + r1 * 2.6) * amp;
          const x0    = peakX + ratio * flagW;
          const x1    = peakX + r1    * flagW;

          ctx.beginPath();
          ctx.moveTo(x0, poleTop + w0);
          ctx.lineTo(x1, poleTop + w1);
          ctx.lineTo(x1, poleTop + flagH + w1);
          ctx.lineTo(x0, poleTop + flagH + w0);
          ctx.closePath();

          if      (i < strips * 0.333) ctx.fillStyle = "#009246"; // 🇮🇹 green
          else if (i < strips * 0.667) ctx.fillStyle = "#f0f0f0"; // white
          else                         ctx.fillStyle = "#ce2b37"; // red
          ctx.fill();
        }

        // Outline
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth   = 1;
        const edgeW = Math.sin(t) * 9;
        ctx.beginPath();
        ctx.moveTo(peakX, poleTop);
        ctx.lineTo(peakX + flagW, poleTop + edgeW);
        ctx.lineTo(peakX + flagW, poleTop + flagH + edgeW);
        ctx.lineTo(peakX, poleTop + flagH);
        ctx.closePath();
        ctx.stroke();
      }

      ctx.restore();
    }

    function render() {
      if (!bgCtx || !flagCtx) return;
      animId = requestAnimationFrame(render);
      time += 0.011;
      introFrames = Math.min(introFrames + 1, 300);
      const introEased = easeOutQuart(introFrames / 300);
      const par = scrollRatio;

      // ── Background canvas ──
      bgCtx.clearRect(0, 0, W, H);

      const sky = bgCtx.createLinearGradient(0, 0, 0, H * 0.9);
      sky.addColorStop(0,   `rgba(5,8,20,${0.9 - par * 0.3})`);
      sky.addColorStop(0.4, `rgba(10,16,36,${0.75 - par * 0.2})`);
      sky.addColorStop(1,   "rgba(14,22,48,0)");
      bgCtx.fillStyle = sky; bgCtx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const tw = 0.45 + 0.55 * Math.sin(time * 1.6 + s.twinklePhase);
        bgCtx!.globalAlpha = s.alpha * tw * (1 - par * 0.7) * introEased;
        bgCtx!.beginPath(); bgCtx!.arc(s.x, s.y - par * 50, s.r, 0, Math.PI * 2);
        bgCtx!.fillStyle = "#fff8e8"; bgCtx!.fill();
      });
      bgCtx.globalAlpha = 1;

      drawMoon(bgCtx, W * 0.74 + Math.sin(time * 0.12) * 5, H * 0.14 - par * 35);

      const actualPeakY = drawFuji(bgCtx, introEased, par);
      drawGround(bgCtx, introEased, par);

      const gy = H * 0.90 + par * 10;
      drawTorii(bgCtx, W * 0.21, gy, 0.72, (0.88 - par * 0.5) * introEased);
      drawTorii(bgCtx, W * 0.21 - 60, gy, 0.44, (0.42 - par * 0.3) * introEased);

      petals.forEach(p => {
        p.x += p.vx + Math.sin(time + p.phase) * 0.28;
        p.y += p.vy; p.rot += p.spin;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        drawPetal(bgCtx!, p.x, p.y, p.size, p.rot, p.alpha * (1 - par * 0.6) * introEased);
      });
      bgCtx.globalAlpha = 1;

      // ── Flag canvas (z-20 — above hero text) ──
      if (introEased > 0.7) {
        drawFlag(flagCtx, W / 2 + 5, actualPeakY, scrollRatio, time);
      } else {
        flagCtx.clearRect(0, 0, W, H);
      }
    }

    const onScroll = () => { scrollRatio = Math.min(window.scrollY / (window.innerHeight * 0.9), 1); };
    const onResize = () => { resize(); };

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
    <>
      {/* Background layer — behind text */}
      <canvas ref={bgRef}   className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
      {/* Flag layer — ABOVE text (z-10) so it's always visible */}
      <canvas ref={flagRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }} />
    </>
  );
}
