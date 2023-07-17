// control settings box
const settingsBox = document.querySelector(".settings-box");
const toggleSettings = document.querySelector(".toggle-settings");
const settings = document.querySelector(".gear");
const toggleOpenSettings = function () {
  settings.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
};
toggleSettings.addEventListener("click", toggleOpenSettings);

const checkForActiveClass = function (e) {
  // remove class active from all children
  e.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  // add active class on self
  e.target.classList.add("active");
};

// check if there's local storage color
let localColor = localStorage.getItem("color-option");

if (localColor !== null) {
  document.documentElement.style.setProperty("--main-color", localColor);

  // remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");

    // add avtice class on element with data-color === local storage item
    if (el.dataset.color === localColor) {
      el.classList.add("active");
    }
  });
}

// color option
const colorsList = document.querySelectorAll("li");

colorsList.forEach((li) => {
  // switch colors
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    checkForActiveClass(e);
  });
});
// random background option
let randomBackground = true;

// check if there is local storage background
let localBackground = localStorage.getItem("background");

if (localBackground !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((span) => {
    span.classList.remove("active");

    if (span.dataset.background === localBackground) {
      span.classList.add("active");
      if (localBackground === "yes") {
        randomBackground = true;
      } else {
        randomBackground = false;
      }
    }
  });
}

// change background image dynamically

let backgroundInterval;
const randomizeBackground = function () {
  if (randomBackground) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage = `url(imgs/${imgsArray[randomNumber]})`;
    }, 1000);
  }
};

randomizeBackground();

// random backgrounds option
const randomBackgroundEl = document.querySelectorAll(
  ".random-backgrounds span"
);

randomBackgroundEl.forEach((span) => {
  // switch colors
  span.addEventListener("click", (e) => {
    // remove active class from all spans
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });

    // add active class on self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      randomBackground = true;
      randomizeBackground();
      // localStorage.setItem("background", true);
    } else if (e.target.dataset.background === "no") {
      randomBackground = false;
      clearInterval(backgroundInterval);
      // localStorage.setItem("background", false);
    }
    localStorage.setItem("background", e.target.dataset.background);
  });
});

// select landing page
const landingPage = document.querySelector(".landing-page");

let imgsArray = [
  "img-01.jpg",
  "img-02.jpg",
  "img-03.jpg",
  "img-04.jpg",
  "img-05.jpg",
  "img-06.jpg",
];

landingPage.style.backgroundImage = "url(imgs/img-01.jpg)";

// reaveal skills on scroll
const skills = document.querySelector(".skills");
const skillProgressSpans = document.querySelectorAll(".skill-progress span");
const observer = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);
    skillProgressSpans.forEach((span) => {
      if (entry.isIntersecting) {
        span.style.width = span.dataset.progress;
      } else {
        span.style.width = 0;
      }
    });
  },
  {
    root: null,
    threshold: [0.3],
  }
);

observer.observe(skills);

// create popup with the image
const ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    const overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // append overlay to the body
    document.body.appendChild(overlay);

    // create the popup box
    const popupBox = document.createElement("div");

    // add class to the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      const imgHeading = document.createElement("h3");

      // create text for heading
      const imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    const popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);

    // append the popup box to body
    document.body.appendChild(popupBox);

    // create the close span
    const closeButton = document.createElement("span");

    // create the close button text
    const closeButtonText = document.createTextNode("X");

    // append text to close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentElement.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links
const allLinks = document.querySelectorAll(".links a");
allLinks.forEach((link) => {
  link.addEventListener("click", (e) => e.preventDefault());
});

const scrollToSection = function (elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
};

scrollToSection(allBullets);
// scrollToSection(allLinks);

const bulletsSpan = document.querySelectorAll(".bullets-option span");
const bulletsContainer = document.querySelector(".nav-bullets");
const bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "none") {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
    console.log("none");
  } else {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
    console.log("block");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      // bulletsContainer.style.display = "block";
      bulletsContainer.classList.add("show");
      localStorage.setItem("bullets-option", "block");
    } else {
      // bulletsContainer.style.display = "none";
      bulletsContainer.classList.remove("show");
      localStorage.setItem("bullets-options", "none");
    }

    checkForActiveClass(e);
  });
});

// Reset Button
document.querySelector(".reset-options").addEventListener("click", (e) => {
  localStorage.clear();
  // localStorage.removeItem("bullets-option");
  // localStorage.removeItem("color-option");
  // localStorage.removeItem("background");

  // reload page
  window.location.reload();
});

// Toggle Menu
const toggleBtn = document.querySelector(".toggle-menu");
const links = document.querySelector(".links");

toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleBtn.classList.toggle("menu-active");
  links.classList.toggle("open");
});

document.body.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    if (toggleBtn.classList.contains("menu-active")) {
      toggleBtn.classList.remove("menu-active");
      links.classList.remove("open");
    }
  }
});

links.addEventListener("click", (e) => e.stopPropagation());
