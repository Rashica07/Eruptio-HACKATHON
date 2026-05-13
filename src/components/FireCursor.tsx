import { useEffect, useRef } from "react";

interface Ember {
  x: number; y: number;
  vx: number; vy: number;
  size: number; life: number; maxLife: number;
  color: string;
}

const COLORS = [
  "#ff2200","#ff4400","#ff6600","#ff8800",
  "#ffaa00","#ffcc00","#ff3300","#cc1100",
];

export function FireCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const embers: Ember[] = [];
    let mx = -999, my = -999;
    let animId: number;

    function spawnBurst(x: number, y: number) {
      const count = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const speed = 0.8 + Math.random() * 2.2;
        embers.push({
          x, y,
          vx: Math.cos(angle) * speed * 0.6,
          vy: Math.sin(angle) * speed,
          size: 2.5 + Math.random() * 4,
          life: 1,
          maxLife: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function render() {
      animId = requestAnimationFrame(render);
      ctx!.clearRect(0, 0, W, H);

      // Passive idle trickle at cursor
      if (Math.random() < 0.55) spawnBurst(mx, my);

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x  += e.vx;
        e.y  += e.vy;
        e.vy -= 0.055;                 // float upward (gravity inverted)
        e.vx += (Math.random() - 0.5) * 0.1;  // slight horizontal drift
        e.size *= 0.972;
        e.life -= 0.028;

        if (e.life <= 0 || e.size < 0.4) { embers.splice(i, 1); continue; }

        const a = e.life * 0.85;
        const r = e.size;

        // Outer glow
        const g = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, r * 2.8);
        g.addColorStop(0,   e.color + Math.round(a * 180).toString(16).padStart(2, "0"));
        g.addColorStop(0.5, e.color + Math.round(a * 60).toString(16).padStart(2, "0"));
        g.addColorStop(1,   "#ff440000");
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, r * 2.8, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,200,${a * 0.9})`;
        ctx!.fill();
      }
    }

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      mx = e.clientX;
      my = e.clientY;
      // Extra burst when moving fast
      if (dist > 6) spawnBurst(mx, my);
    };

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
