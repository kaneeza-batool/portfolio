const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right",
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left",
);
const menuIcon = document.querySelector("#menu-icon");
const navBar = document.querySelector("header nav");

// scroll sections
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

// MENU TOGGLE
menuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");

  if (navBar.classList.contains("active")) {
    menuIcon.classList.replace("bi-list", "bi-x");
  } else {
    menuIcon.classList.replace("bi-x", "bi-list");
  }
});

// CLOSE MENU WHEN CLICKING OUTSIDe
document.addEventListener("click", (e) => {
  if (!navBar.contains(e.target) && !menuIcon.contains(e.target)) {
    navBar.classList.remove("active");
    menuIcon.classList.replace("bi-x", "bi-list");
  }
});

// CLOSE MENU WHEN CLICKING LINK (MOVE OUTSIDE SCROLL)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navBar.classList.remove("active");
    menuIcon.classList.remove("bi-x");
    menuIcon.classList.add("bi-list");
  });
});

// SCROLL EVENT
// window.onscroll = () => {
//   const triggerBottom = window.innerHeight * 0.85;

//   sections.forEach((sec) => {
//     const sectionTop = sec.getBoundingClientRect().top;

//     if (sectionTop < triggerBottom) {
//       sec.classList.add("show-animate");
//     } else {
//       sec.classList.remove("show-animate");
//     }
//   });

//   // sticky header
//   let header = document.querySelector("header");
//   header.classList.toggle("sticky", window.scrollY > 100);

//   // footer animation
//   let footer = document.querySelector("footer");
//   footer.classList.toggle(
//     "show-animate",
//     window.innerHeight + window.scrollY >=
//       document.documentElement.scrollHeight,
//   );
// };

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animate");
      }
    });
  },
  { threshold: 0.2 },
);

sections.forEach((section) => {
  observer.observe(section);
});

let index = 0;
const portfolioDetails = document.querySelectorAll(".portfolio-detail");
const maxIndex = portfolioDetails.length - 1;

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");

  // imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
  imgSlide.style.transform = `translateX(-${index * 100}%)`;

  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });
  portfolioDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index >= maxIndex) return;

  index++;
  arrowLeft.classList.remove("disabled");

  if (index === maxIndex) {
    arrowRight.classList.add("disabled");
  }

  activePortfolio();
});

arrowLeft.addEventListener("click", () => {
  if (index <= 0) return;

  index--;
  arrowRight.classList.remove("disabled");

  if (index === 0) {
    arrowLeft.classList.add("disabled");
  }

  activePortfolio();
});
