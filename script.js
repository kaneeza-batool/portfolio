/* ================================
   DOM CACHE
================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

const DOM = {
  header: $(".header"),
  menuIcon: $("#menu-icon"),
  menuIconI: $("#menu-icon i"),
  nav: $("#main-nav"),
  navLinks: $$(".nav-link"),
  sections: $$("section[id]"),
  progressBar: $("#progress-bar"),
  imgSlide: $("#img-slide"),
  arrowLeft: $(".arrow-left"),
  arrowRight: $(".arrow-right"),
  dotsContainer: $("#carousel-dots"),
  portfolioDetails: $$(".portfolio-detail"),
  footerTopBtn: $(".footer-top-btn"),
  loader: $("#page-loader"),
  cursorDot: $("#cursor-dot"),
  cursorRing: $("#cursor-ring"),
  heroCanvas: $("#hero-canvas"),
};

/* ================================
   UTILITY — is this a real touch device?
   Uses event support, not hover media query,
   so touch-enabled laptops still get the cursor.
================================ */
const isTouchOnly = () =>
  ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
  !window.matchMedia("(pointer: fine)").matches;

/* ================================
   PAGE LOADER
================================ */
const Loader = {
  init() {
    if (!DOM.loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => {
        gsap.to(DOM.loader, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            DOM.loader.style.display = "none";
            Animations.runHomeEntrance();
          },
        });
      }, 1100);
    });
  },
};

/* ================================
   CUSTOM CURSOR
   Fixed: uses touch capability detection
   (not viewport size) so it works on
   small desktop/laptop screens too.
================================ */
const Cursor = {
  mouseX: 0,
  mouseY: 0,
  ringX: 0,
  ringY: 0,

  lerp(a, b, t) {
    return a + (b - a) * t;
  },

  updateRing() {
    this.ringX = this.lerp(this.ringX, this.mouseX, 0.1);
    this.ringY = this.lerp(this.ringY, this.mouseY, 0.1);
    DOM.cursorRing.style.left = this.ringX + "px";
    DOM.cursorRing.style.top = this.ringY + "px";
    requestAnimationFrame(() => this.updateRing());
  },

  init() {
    if (!DOM.cursorDot || !DOM.cursorRing) return;
    if (isTouchOnly()) return; // ← real touch-only devices skip cursor

    document.body.classList.add("custom-cursor");

    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      DOM.cursorDot.style.left = e.clientX + "px";
      DOM.cursorDot.style.top = e.clientY + "px";
    });

    const hoverSel =
      "a, button, .skill-tag, .timeline-card, .skill-group, .about-card, input, textarea, .carousel-btn";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverSel)) {
        DOM.cursorDot.classList.add("cursor--hover");
        DOM.cursorRing.classList.add("cursor--hover");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSel)) {
        DOM.cursorDot.classList.remove("cursor--hover");
        DOM.cursorRing.classList.remove("cursor--hover");
      }
    });

    document.addEventListener("mouseleave", () => {
      DOM.cursorDot.style.opacity = "0";
      DOM.cursorRing.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      DOM.cursorDot.style.opacity = "1";
      DOM.cursorRing.style.opacity = "1";
    });

    this.updateRing();
  },
};

/* ================================
   HERO PARTICLES
   Canvas network — skipped on touch-only
================================ */
const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  W: 0,
  H: 0,
  COUNT: 55,
  MAX_DIST: 130,
  C: [124, 240, 61],

  resize() {
    const s = this.canvas.parentElement;
    this.W = this.canvas.width = s.offsetWidth;
    this.H = this.canvas.height = s.offsetHeight;
  },

  make() {
    return {
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      o: Math.random() * 0.35 + 0.08,
    };
  },

  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.W) p.vx *= -1;
      if (p.y < 0 || p.y > this.H) p.vy *= -1;
    });
  },

  draw() {
    const c = this.ctx;
    c.clearRect(0, 0, this.W, this.H);
    const [r, g, b] = this.C;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i],
          B = this.particles[j];
        const dx = a.x - B.x,
          dy = a.y - B.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.MAX_DIST) {
          const alpha = (1 - dist / this.MAX_DIST) * 0.12;
          c.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          c.lineWidth = 0.6;
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(B.x, B.y);
          c.stroke();
        }
      }
    }

    this.particles.forEach((p) => {
      c.fillStyle = `rgba(${r},${g},${b},${p.o})`;
      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      c.fill();
    });
  },

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  },

  init() {
    if (!DOM.heroCanvas) return;
    if (isTouchOnly()) return; // skip on phones — saves battery

    this.canvas = DOM.heroCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
    for (let i = 0; i < this.COUNT; i++) this.particles.push(this.make());
    this.loop();
  },
};

/* ================================
   TEXT SCRAMBLE
================================ */
const Scramble = {
  chars:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  _el: null,
  _original: "",

  run(el, final, duration = 1300) {
    const len = final.length;
    const totalFrames = Math.round(duration / 16);
    let frame = 0;
    const tick = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        if (final[i] === " ") out += " ";
        else if (i < revealed) out += final[i];
        else out += this.chars[Math.floor(Math.random() * this.chars.length)];
      }
      el.textContent = out;
      if (frame >= totalFrames) {
        clearInterval(tick);
        el.textContent = final;
      }
    }, 16);
  },

  init() {
    const el = $(".scramble-text");
    if (!el) return;
    this._el = el;
    this._original = el.dataset.original || el.textContent.trim();
  },

  trigger() {
    if (this._el) this.run(this._el, this._original, 1300);
  },
};

/* ================================
   CARD TILT — 3D rotation on mouse
================================ */
const Tilt = {
  MAX_DEG: 7,

  apply(card) {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      card.style.transform = `perspective(900px) rotateX(${-dy * this.MAX_DEG}deg) rotateY(${dx * this.MAX_DEG}deg) scale3d(1.02,1.02,1.02)`;
      card.style.boxShadow = `${-dx * 12}px ${dy * 8}px 28px rgba(0,0,0,0.28), 0 0 18px rgba(124,240,61,0.06)`;
      card.style.transition = "box-shadow 0.1s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition =
        "transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s ease";
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  },

  init() {
    if (isTouchOnly()) return;
    $$(".tilt-card").forEach((c) => this.apply(c));
  },
};

/* ================================
   MAGNETIC ELEMENTS
================================ */
const Magnetic = {
  apply(el, strength = 0.28) {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = "transform 0.1s ease";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "";
    });
  },

  init() {
    if (isTouchOnly()) return;
    $$(".magnetic-icon").forEach((el) => this.apply(el, 0.28));
    $$(".magnetic-btn").forEach((el) => this.apply(el, 0.12));
  },
};

/* ================================
   SKILL COUNT-UP
================================ */
const Counter = {
  easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  },

  countUp(el, target, duration = 1400) {
    const start = performance.now();
    el.textContent = "0%";
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * this.easeOut(p)) + "%";
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  init() {
    const pcts = $$(".skill-pct");
    if (!pcts.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            this.countUp(el, parseInt(el.dataset.target || el.textContent));
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );
    pcts.forEach((el) => obs.observe(el));
  },
};

/* ================================
   MOBILE NAV
================================ */
const Nav = {
  isOpen: false,
  open() {
    this.isOpen = true;
    DOM.nav.classList.add("active");
    DOM.menuIconI.classList.replace("bi-list", "bi-x");
    DOM.menuIcon.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  },
  close() {
    this.isOpen = false;
    DOM.nav.classList.remove("active");
    DOM.menuIconI.classList.replace("bi-x", "bi-list");
    DOM.menuIcon.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  },
  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  init() {
    DOM.menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });
    DOM.navLinks.forEach((l) =>
      l.addEventListener("click", () => this.close()),
    );
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !DOM.nav.contains(e.target) &&
        !DOM.menuIcon.contains(e.target)
      )
        this.close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) this.close();
    });
  },
};

/* ================================
   SCROLL HANDLING
================================ */
const ScrollHandler = {
  ticking: false,
  init() {
    window.addEventListener("scroll", () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.onScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  },
  onScroll() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    DOM.header.classList.toggle("sticky", scrollY > 50);
    DOM.progressBar.style.width = `${docH > 0 ? (scrollY / docH) * 100 : 0}%`;
  },
};

/* ================================
   ACTIVE NAV OBSERVER
================================ */
const NavObserver = {
  init() {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id");
            DOM.navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === `#${id}`),
            );
          }
        }),
      { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" },
    );
    DOM.sections.forEach((s) => obs.observe(s));
  },
};

/* ================================
   PORTFOLIO SLIDER
================================ */
const Slider = {
  index: 0,
  maxIndex: DOM.portfolioDetails.length - 1,
  dots: [],

  init() {
    this.createDots();
    this.bindEvents();
    this.update();
  },

  createDots() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i <= this.maxIndex; i++) {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      dot.setAttribute("aria-label", `Go to project ${i + 1}`);
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goTo(i));
      this.dots.push(dot);
      frag.appendChild(dot);
    }
    DOM.dotsContainer.appendChild(frag);
  },

  bindEvents() {
    DOM.arrowRight.addEventListener("click", () => this.next());
    DOM.arrowLeft.addEventListener("click", () => this.prev());
    document.addEventListener("keydown", (e) => {
      const rect = $("#portfolio").getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });
  },

  next() {
    if (this.index < this.maxIndex) this.goTo(this.index + 1);
  },
  prev() {
    if (this.index > 0) this.goTo(this.index - 1);
  },
  goTo(i) {
    this.index = Math.max(0, Math.min(i, this.maxIndex));
    this.update();
  },

  update() {
    DOM.imgSlide.style.transform = `translateX(-${this.index * 100}%)`;
    DOM.portfolioDetails.forEach((d, i) =>
      d.classList.toggle("active", i === this.index),
    );
    this.dots.forEach((d, i) => d.classList.toggle("active", i === this.index));
    DOM.arrowLeft.classList.toggle("disabled", this.index === 0);
    DOM.arrowRight.classList.toggle("disabled", this.index === this.maxIndex);
  },
};

/* ================================
   SCROLL TO TOP
================================ */
DOM.footerTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ================================
   GSAP ANIMATIONS
================================ */
const Animations = {
  homeRan: false,

  runHomeEntrance() {
    if (this.homeRan) return;
    this.homeRan = true;
    Scramble.trigger();
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from(".home-greeting", { y: 20, opacity: 0, duration: 0.6 })
      .from(".home-detail h1", { y: 50, opacity: 0, duration: 0.9 }, "-=0.3")
      .from(".home-detail h2", { y: 35, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".home-detail p", { y: 28, opacity: 0, duration: 0.75 }, "-=0.45")
      .from(".hero-stats", { y: 20, opacity: 0, duration: 0.65 }, "-=0.4")
      .from(".btn-sci", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(
        ".home-img",
        { x: 70, opacity: 0, duration: 1.1, ease: "power4.out" },
        "-=1.0",
      );
  },

  animateHeading(h) {
    gsap.set(h, { clipPath: "inset(0 100% 0 0)" });
    ScrollTrigger.create({
      trigger: h,
      start: "top 88%",
      onEnter: () =>
        gsap.to(h, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power3.out",
        }),
    });
  },

  initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    $$(".reveal-heading").forEach((h) => this.animateHeading(h));

    // Set initial hidden states
    gsap.set(["#about", "#education", "#skills", "#portfolio", "#contact"], {
      opacity: 0,
      y: 30,
    });
    gsap.set(
      [
        ".about-card",
        ".timeline-item",
        ".skill-group",
        ".portfolio-container",
        ".contact-form",
      ],
      { opacity: 0, y: 20 },
    );
    gsap.set(".skill-tag", { opacity: 0, scale: 0.85 });

    const tl = (trigger, children, extra = {}) => {
      const t = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      t.to(trigger, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      if (children) {
        t.to(
          children,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: extra.stagger || 0,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
      return t;
    };

    tl("#about", ".about-card");
    tl("#education", ".timeline-item", { stagger: 0.1 });

    // Skills with tag pop-in
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#skills",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to("#skills", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(
        ".skill-group",
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.18, ease: "power2.out" },
        "-=0.3",
      )
      .to(
        ".skill-tag",
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "back.out(1.6)",
        },
        "-=0.2",
      );

    tl("#portfolio", ".portfolio-container");
    tl("#contact", ".contact-form");
  },

  init() {
    this.initScrollAnimations();
  },
};

/* ================================
   INITIALIZE
================================ */
document.addEventListener("DOMContentLoaded", () => {
  Loader.init();
  Cursor.init();
  Particles.init();
  Scramble.init();
  Tilt.init();
  Magnetic.init();
  Counter.init();
  Nav.init();
  ScrollHandler.init();
  NavObserver.init();
  Slider.init();
  Animations.init();

  // Fallback if load already fired
  if (document.readyState === "complete") {
    setTimeout(() => Animations.runHomeEntrance(), 200);
  }
});
