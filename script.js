const header = document.getElementById("header");


// Header

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      if(window.scrollY > 10){
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      ticking = false;
    });
    ticking = true;
  }
});
// Intro
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").classList.add("hide");
    document.getElementById("mainContent").classList.add("show");
  }, 3500);
});
// Responsive design
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click",()=>{
   hamburger.classList.toggle("active");
   mobileMenu.classList.toggle("active");

   if(mobileMenu.classList.contains("active")){
     document.body.style.overflow="hidden";
   }else{
     document.body.style.overflow="auto";
   }
 });

// Mobile submenu toggles
const menuLinks = document.querySelectorAll('.mobile-menu-link');

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const toggleId = link.getAttribute('data-toggle');
    const submenu = document.getElementById(toggleId);
    const isActive = submenu.classList.contains('active');
    if (isActive) {
      // animate out items first
      anime({
        targets: submenu.querySelectorAll('a'),
        opacity: 0,
        translateY: -10,
        delay: anime.stagger(50),
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
          // then animate submenu out
          anime({
            targets: submenu,
            opacity: 0,
            maxHeight: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
              submenu.classList.remove('active');
            }
          });
        }
      });
    } else {
      submenu.classList.add('active');
      // animate submenu in
      anime({
        targets: submenu,
        opacity: [0, 1],
        maxHeight: ['0px', '200px'],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          // then animate items in
          anime({
            targets: submenu.querySelectorAll('a'),
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(100),
            duration: 500,
            easing: 'easeOutQuad'
          });
        }
      });
    }
  });
});


const jp1 = "少しやさしく、";
const en1 = "A little softer,";

const jp2 = "少し美しく";
const en2 = "A little more";

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

function splitText(target, text) {
  target.innerHTML = "";
  [...text].forEach(char => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.classList.add("char");
    target.appendChild(span);
  });
}

function animateLine(target, text) {
  splitText(target, text);

  anime({
    targets: target.querySelectorAll(".char"),
    opacity: [0,1],
    filter: ['blur(6px)','blur(0px)'],
    translateY: [20,0],
    delay: anime.stagger(60),
    duration: 1200,
    easing: "easeOutQuad"
  });
}

function morphLine(target, newText) {
  anime({
    targets: target.querySelectorAll(".char"),
    opacity: [1,0],
    filter: ['blur(0px)','blur(6px)'],
    translateY: [0,-20],
    delay: anime.stagger(50),
    duration: 1200,
    easing: "easeInQuad",
    complete: () => animateLine(target, newText)
  });
}

function startLoop() {

  // Japanese in
  animateLine(line1, jp1);
  animateLine(line2, jp2);

  // Morph to English
  setTimeout(() => {
    morphLine(line1, en1);
    morphLine(line2, en2);
  }, 3500);

  // Morph back to Japanese
  setTimeout(() => {
    morphLine(line1, jp1);
    morphLine(line2, jp2);
  }, 7500);
}

// First run
startLoop();

// Loop forever
setInterval(startLoop, 13000);

//Scrolling
// const lenis = new Lenis({
//   duration: 1.4,
//   easing: (t) => 1 - Math.pow(1 - t, 3),
//   smooth: true
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

// Lazy Load
function initLazyImages() {
  const images = document.querySelectorAll(".lazy-img");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  },{
    rootMargin: "100px"
  });

  images.forEach(img => observer.observe(img));
}

initLazyImages();

// Scroll to top
document.querySelectorAll('.scroll-top').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});

