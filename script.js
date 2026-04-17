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
};

/* ================================
   MOBILE NAVIGATION
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

    DOM.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !DOM.nav.contains(e.target) &&
        !DOM.menuIcon.contains(e.target)
      ) {
        this.close();
      }
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

    DOM.header.classList.toggle("sticky", scrollY > 50);

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    DOM.progressBar.style.width = `${progress}%`;
  },
};

/* ================================
   ACTIVE NAV ON SCROLL
================================ */
const NavObserver = {
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            DOM.navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`,
              );
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-80px 0px -40% 0px",
      },
    );

    DOM.sections.forEach((section) => observer.observe(section));
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
    const fragment = document.createDocumentFragment();

    for (let i = 0; i <= this.maxIndex; i++) {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      dot.setAttribute("aria-label", `Go to project ${i + 1}`);
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        this.goTo(i);
      });

      this.dots.push(dot);
      fragment.appendChild(dot);
    }

    DOM.dotsContainer.appendChild(fragment);
  },

  bindEvents() {
    DOM.arrowRight.addEventListener("click", () => this.next());
    DOM.arrowLeft.addEventListener("click", () => this.prev());

    document.addEventListener("keydown", (e) => {
      const portfolioSection = $("#portfolio");
      const rect = portfolioSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isVisible) return;

      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });
  },

  next() {
    if (this.index >= this.maxIndex) return;
    this.goTo(this.index + 1);
  },

  prev() {
    if (this.index <= 0) return;
    this.goTo(this.index - 1);
  },

  goTo(newIndex) {
    this.index = Math.max(0, Math.min(newIndex, this.maxIndex));
    this.update();
  },

  update() {
    DOM.imgSlide.style.transform = `translateX(-${this.index * 100}%)`;

    DOM.portfolioDetails.forEach((detail, i) => {
      detail.classList.toggle("active", i === this.index);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === this.index);
    });

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
   GSAP ANIMATIONS — FIXED VERSION
   
   KEY FIX: Using gsap.set() to hide elements via JS,
   then gsap.to() to reveal them. This avoids the
   CSS opacity:0 + GSAP .from() conflict entirely.
================================ */
const Animations = {
  init() {
    gsap.registerPlugin(ScrollTrigger);

    /* ── Step 1: Hide all animated elements via GSAP (not CSS) ── */

    // Hide entire sections
    gsap.set("#about", { opacity: 0, y: 30 });
    gsap.set("#education", { opacity: 0, y: 30 });
    gsap.set("#skills", { opacity: 0, y: 30 });
    gsap.set("#portfolio", { opacity: 0, y: 30 });
    gsap.set("#contact", { opacity: 0, y: 30 });

    // Hide children inside sections
    gsap.set(".about-card", { opacity: 0, y: 20 });
    gsap.set(".timeline-item", { opacity: 0, y: 20 });
    gsap.set(".skill-group", { opacity: 0, y: 20 });
    gsap.set(".skill-tag", { opacity: 0, scale: 0.85 });
    gsap.set(".portfolio-container", { opacity: 0, y: 20 });
    gsap.set(".contact-form", { opacity: 0, y: 20 });

    /* ── Step 2: Home entrance animation ── */
    const homeTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    homeTimeline
      .from(".home-detail h1", {
        y: 40,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        ".home-detail h2",
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.4",
      )
      .from(
        ".home-detail p",
        {
          y: 25,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.4",
      )
      .from(
        ".btn-sci",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3",
      )
      .from(
        ".home-img",
        {
          x: 60,
          opacity: 0,
          duration: 1,
        },
        "-=0.8",
      );

    /* ── Step 3: Section scroll animations using .to() only ── */

    // === ABOUT ===
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to("#about", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        ".about-card",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      );

    // === EDUCATION ===
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#education",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to("#education", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        ".timeline-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.3",
      );

    // === SKILLS ===
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#skills",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to("#skills", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        ".skill-group",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.3",
      )
      .to(
        ".skill-tag",
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      );

    // === PORTFOLIO ===
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#portfolio",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to("#portfolio", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        ".portfolio-container",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      );

    // === CONTACT ===
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      .to("#contact", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        ".contact-form",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      );
  },
};

/* ================================
   INITIALIZE
================================ */
document.addEventListener("DOMContentLoaded", () => {
  Nav.init();
  ScrollHandler.init();
  NavObserver.init();
  Slider.init();
  Animations.init();
});
