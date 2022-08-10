const modal = document.querySelector(".modal");
const modalWindow = document.querySelector(".modal-overlay");
const btnModalWindowClose = document.querySelector(".modal__btn-close");

btnModalWindowClose.addEventListener("click", closeModalWindow);

function closeModalWindow() {
  const modalForm = modal.querySelector(".modal__form");
  const bgImage = modalWindow.querySelector(".bgImage");
  const modalTextContainer = modal.querySelector(".modal__text-container");
  const productButtons = modal.querySelector(".product__buttons");
  const btnContinueShopping = modal.querySelector("#continue-shopping");

  if (modalForm !== null) {
    modalForm.remove();
  }

  if (bgImage !== null) {
    bgImage.remove();
  }

  if (modalTextContainer !== null) {
    modalTextContainer.remove();
  }

  if (productButtons !== null) {
    productButtons.remove();
  }

  if (btnContinueShopping !== null) {
    btnContinueShopping.remove();
  }

  modal.style.height = "initial";
  modalWindow.classList.remove("open-modal");
  document.body.style.position = "";
  document.body.style.overflow = "auto";
}

function openModalWindow(e) {
  e.preventDefault();
  modalWindow.classList.add("open-modal");
  // document.body.style.position = "fixed";
  // document.body.style.overflow = "hidden";
}

function createAnchor(textContent, id) {
  const anchor = document.createElement("a");
  anchor.classList.add("modal__anchor");
  anchor.setAttribute("href", "#");
  anchor.setAttribute("id", id);
  anchor.textContent = textContent;

  return anchor;
}

function createTextContainer(textContent) {
  const text = document.createElement("div");
  text.classList.add("modal__text-container");
  text.textContent = textContent;

  return text;
}

function createBtn(textContent, id) {
  const btn = document.createElement("button");
  btn.setAttribute("id", id);
  btn.textContent = textContent;

  return btn;
}

// function createColorBtn(bgc, id) {
//   const btnColor = document.createElement("button");
//   btnColor.classList.add("product__color");
//   btnColor.style.backgroundColor = bgc;
//   btnColor.style.top = id * 2 + "em";
//   btnColor.setAttribute("aria-label", `color-${bgc}`);
//   btnColor.setAttribute("id", `btnColor${bgc}${id}`);

//   return btnColor;
// }
