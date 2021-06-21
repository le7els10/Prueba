let menuList = document.querySelector(".links-container");

window.onload = async () => {
  const menuSmall = document.querySelector(".menu-sm");
  let images = await readImages();

  adjustBySize(images);

  menuSmall.addEventListener("click", () => {
    triggerMenu();
  });
};

//ajustar por tamaño
const adjustBySize = (images) => {
  let windowSize = window.innerWidth;
  if (windowSize > 750) {
    makeMasonry(3, images);
  } else if (windowSize < 750 && windowSize > 500) {
    menuList.classList.add("d-none");
    makeMasonry(2, images);
  } else {
    makeMasonry(1, images);
  }

  window.addEventListener(
    "resize",
    (event) => {
      let {
        target: { innerWidth },
      } = event;

      if (innerWidth > 750) {
        menuList.classList.remove("d-none");
        makeMasonry(3, images);
      } else if (innerWidth < 750 && innerWidth > 500) {
        menuList.classList.add("d-none");
        makeMasonry(2, images);
      } else {
        makeMasonry(1, images);
      }
    },
    true
  );
};

//leer images del json
const readImages = async () => {
  let res = await fetch("./assets/data/images.json");
  res = await res.json();
  return res;
};

//Ajustar masonry layout
const makeMasonry = (columns, images) => {
  let element = document.querySelector("#grid-images");
  element.classList.remove(`columns-1`, `columns-2`, `columns-3`);
  element.innerHTML = "";
  element.classList.add(`columns-${columns}`);

  let colElements = [];

  for (let i = 1; i <= columns; i++) {
    let column = document.createElement("div");
    column.classList.add("masonry", `col-${i}`);
    element.appendChild(column);
    colElements.push(column);
  }

  let iterations = Math.ceil(images.length / columns);
  for (let m = 0; m < iterations; m++) {
    for (let n = 0; n < columns; n++) {
      if (images[m * columns + n]) {
        let imageItem = document.createElement("div");
        imageItem.classList.add("item");
        let currentImage = document.createElement("img");
        currentImage.setAttribute("src", images[m * columns + n].name);
        imageItem.appendChild(currentImage);
        colElements[n].appendChild(imageItem);
      }
    }
  }
};

//comportamiento de menu
const triggerMenu = () => {
  let hidden = false;
  if (window.getComputedStyle(menuList).display === "none") {
    hidden = true;
  }

  hidden
    ? menuList.classList.remove("d-none")
    : menuList.classList.add("d-none");
};
