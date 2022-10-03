let colors = document.querySelectorAll(".settings-box .option-box .colors li");
let randomBackgrounds = document.querySelectorAll(
  ".settings-box .option-box .random-option span"
);
let showBullets = document.querySelectorAll(
  ".settings-box .option-box .bullets-option span"
);

let navBullets = document.createElement("div");
navBullets.classList.add("nav-bullets");

let settingsBox = document.querySelector(".settings-box");
let gear = document.querySelector(".settings-box .toggle .gear");

let root = document.querySelector(":root");
let lc = window.localStorage;
let myInterval;

let landingPage = document.querySelector(".landing-page");
let imgsArr = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "07.jpg",
  "09.jpg",
  "10.jpg",
];

if (lc.getItem("color_option")) {
  root.style.setProperty("--main-color", lc.getItem("color_option"));
  colors.forEach((color) => {
    if (color.dataset.color === lc.getItem("color_option")) {
      colors.forEach((color2) => {
        color2.classList.remove("active");
      });
      color.classList.add("active");
    }
  });
}

if (lc.getItem("background_option")) {
  randomBackgrounds.forEach((bool) => {
    randomBackgrounds.forEach((bool2) => {
      bool2.classList.remove("active");
    });
    if (bool.classList.contains("no")) {
      bool.classList.add("active");
      randomizeImgs(false);
    }
  });
} else {
  randomizeImgs(true);
}

if (lc.getItem("bullets_option")) {
  showBullets.forEach((bool) => {
    showBullets.forEach((bool2) => {
      bool2.classList.remove("active");
    });
    if (bool.classList.contains("no")) {
      bool.classList.add("active");
      navBullets.style.display = "none";
    }
  });
}

function randomizeImgs(toggle) {
  if (toggle) {
    clearInterval(myInterval);
    myInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage = `url("imgs/${imgsArr[random]}")`;
    }, 10000);
  } else {
    clearInterval(myInterval);
  }
}

gear.parentElement.onclick = () => {
  gear.classList.toggle("fa-spin")
    ? (settingsBox.style.left = "0")
    : (settingsBox.style.left = "-195px");
};

let stopSettingsBoxPropagation = [...settingsBox.children];
stopSettingsBoxPropagation.forEach((child) => {
  child.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

document.addEventListener("click", (e) => {
  if (e.target !== settingsBox && gear.classList.contains("fa-spin")) {
    gear.parentElement.click();
  }
});

colors.forEach((li) => {
  li.onclick = () => {
    colors.forEach((li2) => {
      li2.classList.remove("active");
    });
    li.classList.add("active");
    root.style.setProperty("--main-color", li.dataset.color);
    window.localStorage.setItem("color_option", li.dataset.color);
  };
});

randomBackgrounds.forEach((bool) => {
  bool.onclick = () => {
    randomBackgrounds.forEach((bool2) => {
      bool2.classList.remove("active");
    });
    bool.classList.add("active");
    if (bool.classList.contains("no")) {
      randomizeImgs(false);
      lc.setItem("background_option", false);
    } else {
      randomizeImgs(true);
      lc.removeItem("background_option");
    }
  };
});

showBullets.forEach((bool) => {
  bool.onclick = () => {
    showBullets.forEach((bool2) => {
      bool2.classList.remove("active");
    });
    bool.classList.add("active");
    if (bool.classList.contains("no")) {
      navBullets.style.display = "none";
      lc.setItem("bullets_option", false);
    } else {
      navBullets.style.display = "block";
      lc.removeItem("bullets_option");
    }
  };
});

let resetAll = document.querySelector(".settings-box .reset-options");
resetAll.onclick = () => {
  lc.clear();
  window.location.reload();
};

let navBullStartComment = document.createComment("Start Bullets Section");
let navBullEndComment = document.createComment("End Bullets Section");

document.body.prepend(navBullStartComment, navBullets, navBullEndComment);

let navLinks = document.querySelectorAll(".landing-page .links li a");

for (let i = 0; i < navLinks.length; i++) {
  let bullet = document.createElement("div");
  bullet.classList.add("bullet");

  let bulletLink = document.createElement("a");
  bulletLink.setAttribute("href", navLinks[i].getAttribute("href"));

  let tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.innerHTML = navLinks[i].innerHTML;

  bullet.append(bulletLink, tooltip);
  navBullets.appendChild(bullet);
}

let progress = document.querySelectorAll(
  ".skills-section .skill-box .skill-progress span"
);

let toggleMenu = document.querySelector(".landing-page header .toggle-menu");
let links = document.querySelector(".landing-page .links");

toggleMenu.onclick = () => {
  links.classList.toggle("open");
  window.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-menu"))
      links.classList.remove("open");
  });
};

let skills = document.querySelector(".skills-section");
window.addEventListener("scroll", () => {
  if (
    this.scrollY >=
    skills.offsetTop + skills.offsetHeight - this.innerHeight
  ) {
    progress.forEach((element) => {
      element.style.width = element.dataset.progress;
    });
  }
});

let myBody = [...document.body.children];
let bullets = document.querySelectorAll(".nav-bullets .bullet a");
let allSections = [];

myBody.forEach((child) => {
  if (child.hasAttribute("id") || child.classList.contains("container")) {
    allSections.push(child);
  }
});

window.addEventListener("scroll", () => {
  allSections.forEach((section) => {
    if (
      window.pageYOffset >= section.offsetTop - 1 ||
      window.pageYOffset >=
        section.offsetTop + section.offsetHeight - window.innerHeight
    ) {
      bullets.forEach((bul) => {
        if (
          bul.getAttribute("href") === `#${section.getAttribute("id")}` ||
          bul.getAttribute("href") === "#about"
        ) {
          bullets.forEach((bul2) => {
            bul2.classList.remove("active");
          });
          bul.classList.add("active");
        }
      });
    }
  });
});

let gallery = document.querySelector(".gallery");
let imgs = document.querySelectorAll(".gallery .imgs-box img");

imgs.forEach((img) => {
  img.addEventListener("click", () => {
    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");

    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    let h3 = document.createElement("h3");
    h3.innerHTML = img.getAttribute("alt");

    let clonedImage = img.cloneNode(true);

    let buttonClosure = document.createElement("span");
    buttonClosure.classList.add("button-closure");
    buttonClosure.innerHTML = "&#xD7;"; // (&#xD7) = (×) In HTML Entities..

    buttonClosure.onclick = () => {
      gallery.removeChild(popupOverlay);
      gallery.removeChild(popupBox);
    };

    popupOverlay.onclick = () => {
      buttonClosure.click();
    };

    popupBox.append(h3, clonedImage, buttonClosure);
    gallery.append(popupOverlay, popupBox);
  });
});

let inputs = document.querySelectorAll(
  ".contact form input:not([type='submit']), .contact form textarea"
);

inputs.forEach((element) => {
  element.onfocus = () => {
    if (element.tagName === "TEXTAREA") {
      element.style.borderLeftColor = "var(--main-color)";
    } else {
      element.style.borderRightColor = "var(--main-color)";
    }
    element.classList.add("focused");
  };
  element.onblur = () => {
    if (element.tagName === "TEXTAREA") {
      element.style.borderLeftColor = "#ccc";
    } else {
      element.style.borderRightColor = "#ccc";
    }
    element.classList.remove("focused");
  };
});

let scrollBack = document.querySelector(".scroll-back");
scrollBack.onclick = () => {
  window.scrollTo(0, 0);
};

window.addEventListener("scroll", () => {
  if (window.pageYOffset >= 0.8 * this.innerHeight)
    scrollBack.style.visibility = "visible";
  else scrollBack.style.visibility = "hidden";
});
