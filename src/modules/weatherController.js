// Focus Plant Pro - Atmospheric Weather Effects Engine (Rain, Fire, Zen, Forest, Waves)
// Procedural particle system & Canvas dynamic atmospheric effects

  // -------------------------------------------------------------
  // ATMOSPHERIC WEATHER EFFECTS ENGINE (Rain, Fire, Zen, Forest, Waves)
  // -------------------------------------------------------------
window.weatherEffects = {
    canvas: null,
    ctx: null,
    container: null,
    backdrop: null,
    type: "none",
    animId: null,
    particles: [],
    ripples: [],
    width: 0,
    height: 0,
    isRunning: false,

    init(canvas, backdrop, container) {
      this.canvas = canvas;
      this.ctx = canvas ? canvas.getContext("2d") : null;
      this.backdrop = backdrop;
      this.container = container;
      if (!this.canvas || !this.ctx) return;
      this.resize();
      window.addEventListener("resize", () => this.resize());
    },

    resize() {
      if (!this.canvas || !this.container) return;
      const rect = this.container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = Math.floor(rect.width * dpr);
      this.canvas.height = Math.floor(rect.height * dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    },

    setWeather(type) {
      this.type = type || "none";
      if (!this.container || !this.backdrop) return;

      const themes = ["rain", "fire", "zen", "forest", "waves"];
      themes.forEach(t => {
        this.container.classList.remove(`weather-theme-${t}`);
        this.backdrop.classList.remove(`theme-${t}`);
      });
      this.backdrop.classList.remove("active");

      if (themes.includes(this.type)) {
        this.container.classList.add(`weather-theme-${this.type}`);
        this.backdrop.classList.add(`theme-${this.type}`, "active");
        this.initParticles();
        this.start();
      } else {
        this.stop();
        if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
      }
    },

    initParticles() {
      this.resize();
      this.particles = [];
      this.ripples = [];
      const w = this.width || 360;
      const h = this.height || 360;

      if (this.type === "rain") {
        for (let i = 0; i < 42; i++) {
          this.particles.push({
            x: Math.random() * (w + 40) - 20,
            y: Math.random() * h,
            length: 12 + Math.random() * 16,
            speed: 7 + Math.random() * 5,
            slant: -1 - Math.random() * 0.8,
            alpha: 0.25 + Math.random() * 0.45,
            width: 1.1 + Math.random() * 0.7
          });
        }
      } else if (this.type === "fire") {
        for (let i = 0; i < 36; i++) {
          this.particles.push(this.createSpark(w, h, true));
        }
      } else if (this.type === "zen") {
        for (let i = 0; i < 42; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: 0.8 + Math.random() * 1.8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.04,
            isCross: Math.random() < 0.2,
            color: Math.random() < 0.3 ? "#cba6f7" : Math.random() < 0.5 ? "#93c5fd" : "#ffffff"
          });
        }
        for (let i = 0; i < 15; i++) {
          this.particles.push({
            isDust: true,
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.4) * 0.35,
            vy: -0.15 - Math.random() * 0.25,
            radius: 1.2 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2,
            color: Math.random() < 0.5 ? "rgba(203, 166, 247, 0.45)" : "rgba(148, 226, 213, 0.45)"
          });
        }
      } else if (this.type === "forest") {
        for (let i = 0; i < 18; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vy: 0.9 + Math.random() * 1.3,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
            swayAmp: 1.2 + Math.random() * 1.5,
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.04,
            size: 4 + Math.random() * 5,
            color: Math.random() < 0.6 ? "#34d399" : Math.random() < 0.8 ? "#a7f3d0" : "#fde047"
          });
        }
      } else if (this.type === "waves") {
        for (let i = 0; i < 22; i++) {
          this.particles.push({
            x: Math.random() * w,
            y: h + Math.random() * 30,
            radius: 1.8 + Math.random() * 4,
            vy: -0.6 - Math.random() * 1.1,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.03 + Math.random() * 0.03,
            alpha: 0.25 + Math.random() * 0.35
          });
        }
      }
    },

    createSpark(w, h, randomY = false) {
      return {
        x: w * 0.5 + (Math.random() - 0.5) * 160,
        y: randomY ? h - Math.random() * h * 0.8 : h + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.7,
        vy: -1.2 - Math.random() * 2.2,
        radius: 1.2 + Math.random() * 2.2,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.04 + Math.random() * 0.05,
        life: randomY ? Math.floor(Math.random() * 80) : 0,
        maxLife: 70 + Math.random() * 80
      };
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      const loop = () => {
        if (!this.isRunning) return;
        this.render();
        this.animId = requestAnimationFrame(loop);
      };
      this.animId = requestAnimationFrame(loop);
    },

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    },

    pause() {
      this.stop();
    },

    resume() {
      if (["rain", "fire", "zen", "forest", "waves"].includes(this.type)) {
        this.start();
      }
    },

    render() {
      if (!this.ctx) return;
      const w = this.width;
      const h = this.height;
      if (w === 0 || h === 0) {
        this.resize();
        return;
      }

      this.ctx.clearRect(0, 0, w, h);

      if (this.type === "rain") {
        this.renderRain(w, h);
      } else if (this.type === "fire") {
        this.renderFire(w, h);
      } else if (this.type === "zen") {
        this.renderZen(w, h);
      } else if (this.type === "forest") {
        this.renderForest(w, h);
      } else if (this.type === "waves") {
        this.renderWaves(w, h);
      }
    },

    renderRain(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        p.x += p.slant;
        p.y += p.speed;

        if (p.y > h - 10) {
          if (Math.random() < 0.6) {
            this.ripples.push({
              x: p.x,
              y: h - 6 - Math.random() * 8,
              rx: 1.5,
              ry: 0.6,
              maxRx: 7 + Math.random() * 5,
              alpha: 0.45
            });
          }
          p.y = -p.length - Math.random() * 15;
          p.x = Math.random() * (w + 40) - 20;
        }

        const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.slant * 2, p.y + p.length);
        grad.addColorStop(0, "rgba(186, 230, 253, 0)");
        grad.addColorStop(1, `rgba(186, 230, 253, ${p.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = p.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.slant * 2, p.y + p.length);
        ctx.stroke();
      });

      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const r = this.ripples[i];
        r.rx += 0.45;
        r.ry += 0.18;
        r.alpha -= 0.022;

        if (r.alpha <= 0 || r.rx >= r.maxRx) {
          this.ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(186, 230, 253, ${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    },

    renderFire(w, h) {
      const ctx = this.ctx;

      this.particles.forEach((p, idx) => {
        p.x += p.vx + Math.sin(p.wobblePhase) * 0.55;
        p.y += p.vy;
        p.wobblePhase += p.wobbleSpeed;
        p.life++;

        if (p.life >= p.maxLife || p.y < -10) {
          this.particles[idx] = this.createSpark(w, h, false);
          return;
        }

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, (1 - progress) * 0.85);

        let color;
        if (progress < 0.3) {
          color = `rgba(254, 240, 138, ${alpha})`;
        } else if (progress < 0.7) {
          color = `rgba(249, 115, 22, ${alpha})`;
        } else {
          color = `rgba(239, 68, 68, ${alpha})`;
        }

        ctx.fillStyle = color;
        ctx.shadowColor = "#f97316";
        ctx.shadowBlur = p.radius * 3.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.radius * (1 - progress * 0.4)), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
    },

    renderZen(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        if (p.isDust) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += 0.02;
          if (p.y < -10) p.y = h + 10;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;

          const alpha = 0.2 + 0.25 * Math.sin(p.phase);
          ctx.fillStyle = p.color.replace("0.45", alpha.toFixed(2));
          ctx.shadowColor = "#cba6f7";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.phase += p.speed;
          const alpha = 0.2 + 0.65 * (0.5 + 0.5 * Math.sin(p.phase));

          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
          ctx.globalAlpha = alpha;

          if (p.isCross && alpha > 0.6) {
            const flare = p.size * 2.8;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x - flare, p.y);
            ctx.lineTo(p.x + flare, p.y);
            ctx.moveTo(p.x, p.y - flare);
            ctx.lineTo(p.x, p.y + flare);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      ctx.shadowBlur = 0;
    },

    renderForest(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * p.swayAmp;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y > h + 15) {
          p.y = -15;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.globalAlpha = 1;
    },

    renderWaves(w, h) {
      const ctx = this.ctx;

      this.particles.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.5;
        p.y += p.vy;

        if (p.y < -15) {
          p.y = h + 15;
          p.x = Math.random() * w;
        }

        ctx.strokeStyle = `rgba(148, 226, 213, ${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.35, p.y - p.radius * 0.35, Math.max(0.6, p.radius * 0.25), 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };


var weatherEffects = window.weatherEffects;
