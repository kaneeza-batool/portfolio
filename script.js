/* ================================
   DOM CACHE
================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const DOM = {
  header: $(".header"),
  menuToggle: $("#menu-icon"),
  nav: $("#main-nav"),
  navLinks: $$(".nav-link"),
  sections: $$("section[id]"),
  progressBar: $("#progress-bar"),
  imgSlide: $("#img-slide"),
  arrowLeft: $(".arrow-left"),
  arrowRight: $(".arrow-right"),
  dotsContainer: $("#carousel-dots"),
  portfolioDetails: $$(".portfolio-detail"),
  carousel: $("#portfolio-carousel"),
  footerTop: $(".footer-top"),
  loader: $("#page-loader"),
  cursorDot: $("#cursor-dot"),
  cursorRing: $("#cursor-ring"),
  heroCanvas: $("#hero-canvas"),
  contactForm: $("#contact-form"),
  submitBtn: $("#submit-btn"),
  formStatus: $("#form-status"),
};

/* ================================
   UTILITY
================================ */
/**
 * Returns true only for touch-only devices (phones/tablets with no fine pointer).
 * Laptops with touch screens + mouse are NOT touch-only.
 */
const isTouchOnly = () =>
  ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
  !window.matchMedia("(pointer: fine)").matches;

/* ================================
   PAGE LOADER
================================ */
const Loader = {
  init() {
    if (!DOM.loader) return;
    const hide = () => {
      gsap.to(DOM.loader, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          DOM.loader.style.display = "none";
          Animations.runHomeEntrance();
        },
      });
    };
    if (document.readyState === "complete") {
      setTimeout(hide, 1100);
    } else {
      window.addEventListener("load", () => setTimeout(hide, 1100));
    }
  },
};

/* ================================
   CUSTOM CURSOR
================================ */
const Cursor = {
  mouseX: 0,
  mouseY: 0,
  ringX: 0,
  ringY: 0,
  RING_LERP: 0.1,
  lerp(a, b, t) {
    return a + (b - a) * t;
  },
  updateRing() {
    this.ringX = this.lerp(this.ringX, this.mouseX, this.RING_LERP);
    this.ringY = this.lerp(this.ringY, this.mouseY, this.RING_LERP);
    DOM.cursorRing.style.left = this.ringX + "px";
    DOM.cursorRing.style.top = this.ringY + "px";
    requestAnimationFrame(() => this.updateRing());
  },
  init() {
    if (!DOM.cursorDot || !DOM.cursorRing || isTouchOnly()) return;
    document.body.classList.add("custom-cursor");
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      DOM.cursorDot.style.left = e.clientX + "px";
      DOM.cursorDot.style.top = e.clientY + "px";
    });
    const hoverSel =
      "a, button, .skill-bar-item, .timeline-card, .skill-group, .about-card, .fact-card, input, textarea, .carousel-btn";
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
   Paused via IntersectionObserver when hero is off-screen.
================================ */
const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  W: 0,
  H: 0,
  COUNT: 50,
  MAX_DIST: 125,
  C: [96, 158, 63], // matches --accent-rgb
  active: true,
  resize() {
    const s = this.canvas.parentElement;
    this.W = this.canvas.width = s.offsetWidth;
    this.H = this.canvas.height = s.offsetHeight;
  },
  make() {
    return {
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.6 + 0.4,
      o: Math.random() * 0.3 + 0.08,
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
          c.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / this.MAX_DIST) * 0.1})`;
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
    if (this.active) {
      this.update();
      this.draw();
    }
    requestAnimationFrame(() => this.loop());
  },
  init() {
    if (!DOM.heroCanvas || isTouchOnly()) return;
    this.canvas = DOM.heroCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
    for (let i = 0; i < this.COUNT; i++) this.particles.push(this.make());

    const heroSection = $("#home");
    if (heroSection) {
      const obs = new IntersectionObserver(
        (entries) => {
          this.active = entries[0].isIntersecting;
        },
        { threshold: 0 },
      );
      obs.observe(heroSection);
    }

    this.loop();
  },
};

/* ================================
   TEXT SCRAMBLE
================================ */
const Scramble = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  _el: null,
  _original: "",
  run(el, final, duration = 1200) {
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
    if (this._el) this.run(this._el, this._original, 1200);
  },
};

/* ================================
   CARD TILT
   will-change applied only on hover, not permanently.
================================ */
const Tilt = {
  MAX_DEG: 6,
  apply(card) {
    card.addEventListener("mouseenter", () => {
      card.style.willChange = "transform";
    });
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      card.style.transform = `perspective(900px) rotateX(${-dy * this.MAX_DEG}deg) rotateY(${dx * this.MAX_DEG}deg) scale3d(1.02,1.02,1.02)`;
      card.style.boxShadow = `${-dx * 10}px ${dy * 6}px 26px rgba(0,0,0,0.28)`;
      card.style.transition = "box-shadow 0.1s";
    });
    card.addEventListener("mouseleave", () => {
      card.style.willChange = "auto";
      card.style.transition =
        "transform .5s cubic-bezier(0.16,1,0.3,1), box-shadow .5s ease";
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
      el.style.transform = `translate(${dx}px,${dy}px)`;
      el.style.transition = "transform .1s ease";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform .5s cubic-bezier(0.16,1,0.3,1)";
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
   SKILL COUNT-UP + PROGRESS BARS
================================ */
const Skills = {
  easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  },
  animate(pctEl, fillEl, target, duration = 1400) {
    const start = performance.now();
    pctEl.textContent = "0%";
    fillEl.style.width = "0%";
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const v = Math.round(target * this.easeOut(p));
      pctEl.textContent = v + "%";
      fillEl.style.width = v + "%";
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
  init() {
    const items = $$(".skill-bar-item");
    if (!items.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          const pctEl = item.querySelector(".skill-pct");
          const fillEl = item.querySelector(".skill-fill");
          if (!pctEl || !fillEl) return;
          const target = parseInt(pctEl.dataset.target || pctEl.textContent);
          this.animate(pctEl, fillEl, target);
          obs.unobserve(item);
        });
      },
      { threshold: 0.5 },
    );
    items.forEach((el) => obs.observe(el));
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
    DOM.menuToggle.classList.add("open");
    DOM.menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  },
  close() {
    this.isOpen = false;
    DOM.nav.classList.remove("active");
    DOM.menuToggle.classList.remove("open");
    DOM.menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  },
  toggle() {
    this.isOpen ? this.close() : this.open();
  },
  init() {
    DOM.menuToggle.addEventListener("click", (e) => {
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
        !DOM.menuToggle.contains(e.target)
      )
        this.close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) this.close();
    });
  },
};

/* ================================
   SCROLL HANDLER
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
    if (!DOM.imgSlide || !DOM.arrowLeft || !DOM.arrowRight) return;
    this.createDots();
    this.bindEvents();
    this.bindSwipe();
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
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

      // Skip when focus is inside any text input or textarea
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA")
      )
        return;

      // Only fire when portfolio section is visible
      const section = $("#portfolio");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      e.preventDefault();
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });
  },
  bindSwipe() {
    if (!DOM.carousel) return;
    let touchStartX = 0;
    DOM.carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true },
    );
    DOM.carousel.addEventListener(
      "touchend",
      (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
      },
      { passive: true },
    );
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
   CONTACT FORM
   FIX: Float label overlap was caused by the label not moving when the
   user typed. Root causes:
   1. No placeholder=" " on inputs in HTML — added in index.html.
   2. CSS now uses :not(:placeholder-shown) which is native & reliable.
   3. JS .has-value class is kept as a fallback for autofill edge cases.

   Submits to Netlify (action="/").
   On local dev (localhost), shows a helpful message instead of silently failing.
================================ */
const ContactForm = {
  isNetlify() {
    const host = window.location.hostname;
    return host !== "localhost" && host !== "127.0.0.1" && host !== "";
  },

  /**
   * Sync .has-value class with field content.
   * This covers autofill scenarios that :placeholder-shown may miss.
   */
  syncHasValue(el) {
    el.classList.toggle("has-value", el.value.trim() !== "");
  },

  initFloatLabels() {
    if (!DOM.contactForm) return;
    DOM.contactForm.querySelectorAll("input, textarea").forEach((el) => {
      // Run on all relevant events
      ["input", "change", "blur"].forEach((evt) =>
        el.addEventListener(evt, () => this.syncHasValue(el)),
      );
      // Set initial state (e.g. browser restores values after back-navigation)
      this.syncHasValue(el);
    });
  },

  clearErrors() {
    if (!DOM.contactForm) return;
    DOM.contactForm.querySelectorAll(".error").forEach((el) => {
      el.classList.remove("error");
    });
  },

  validate() {
    const required = ["name", "email", "subject", "message"];
    let valid = true;

    required.forEach((name) => {
      const el = DOM.contactForm.elements[name];
      if (el && el.required && !el.value.trim()) {
        el.classList.add("error");
        el.addEventListener("input", () => el.classList.remove("error"), {
          once: true,
        });
        valid = false;
      }
    });

    const emailEl = DOM.contactForm.elements["email"];
    if (
      emailEl &&
      emailEl.value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)
    ) {
      emailEl.classList.add("error");
      valid = false;
    }

    return valid;
  },

  setStatus(msg, type) {
    if (!DOM.formStatus) return;
    DOM.formStatus.textContent = msg;
    DOM.formStatus.className = "form-status" + (type ? " " + type : "");
  },

  init() {
    if (!DOM.contactForm) return;
    this.initFloatLabels();

    DOM.contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      this.clearErrors();

      if (!this.validate()) {
        this.setStatus(
          "Please fill in all required fields correctly.",
          "error",
        );
        return;
      }

      // On local dev, skip fetch and show an informational message
      if (!this.isNetlify()) {
        this.setStatus(
          "Form is wired up for Netlify — it'll work on the deployed site. You can also email me directly!",
          "success",
        );
        return;
      }

      DOM.submitBtn.classList.add("loading");
      DOM.submitBtn.disabled = true;
      this.setStatus("", "");

      try {
        const data = new FormData(DOM.contactForm);
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });
        if (res.ok) {
          this.setStatus("Message sent! I'll get back to you soon.", "success");
          DOM.contactForm.reset();
          // Drop all labels back down after reset
          DOM.contactForm.querySelectorAll("input, textarea").forEach((el) => {
            el.classList.remove("has-value");
          });
        } else {
          this.setStatus("Something went wrong. Please try again.", "error");
        }
      } catch {
        this.setStatus(
          "Network error. Please check your connection and try again.",
          "error",
        );
      } finally {
        DOM.submitBtn.classList.remove("loading");
        DOM.submitBtn.disabled = false;
      }
    });
  },
};

/* ================================
   FOOTER BACK-TO-TOP
================================ */
const BackToTop = {
  init() {
    if (!DOM.footerTop) return;
    DOM.footerTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  },
};

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
      .from(".greeting-chip", { y: 20, opacity: 0, duration: 0.5 })
      .from(".home-detail h1", { y: 55, opacity: 0, duration: 0.9 }, "-=0.3")
      .from(".typed-wrapper", { y: 30, opacity: 0, duration: 0.75 }, "-=0.5")
      .from(".home-bio", { y: 25, opacity: 0, duration: 0.7 }, "-=0.45")
      .from(".hero-stats", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".btn-sci", { y: 20, opacity: 0, duration: 0.55 }, "-=0.4")
      .from(
        ".home-img",
        { x: 65, opacity: 0, duration: 1.1, ease: "power4.out" },
        "-=1.0",
      );
  },
  initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    $$(".reveal-heading").forEach((h) => {
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
    });

    const sections = [
      "#about",
      "#education",
      "#skills",
      "#portfolio",
      "#contact",
    ];
    gsap.set(sections, { opacity: 0, y: 28 });

    const cards = [
      ".about-card",
      ".fact-card",
      ".timeline-item",
      ".skill-group",
      ".portfolio-container",
      ".contact-wrapper",
    ];
    gsap.set(cards, { opacity: 0, y: 18 });
    gsap.set(".skill-bar-item", { opacity: 0, x: -12 });

    /**
     * Helper: create a scroll-triggered timeline that reveals a section
     * then staggers its child elements.
     */
    const buildScrollTl = (trigger, children, extra = {}) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
        .to(trigger, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(
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
    };

    buildScrollTl("#about", [".about-card", ".fact-card"], { stagger: 0.08 });
    buildScrollTl("#education", ".timeline-item", { stagger: 0.1 });

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
        ".skill-bar-item",
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power2.out" },
        "-=0.2",
      );

    buildScrollTl("#portfolio", ".portfolio-container");
    buildScrollTl("#contact", ".contact-wrapper");
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
  Skills.init();
  Nav.init();
  ScrollHandler.init();
  NavObserver.init();
  Slider.init();
  BackToTop.init();
  ContactForm.init();
  Animations.init();
});
