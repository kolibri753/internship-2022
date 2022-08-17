const modal = document.querySelector(".modal");
const modalWindow = document.querySelector(".modal-overlay");
const btnModalWindowClose = document.querySelector(".modal__btn-close");

btnModalWindowClose.addEventListener("click", closeModalWindow);

function closeModalWindow() {
  window.removeEventListener("keydown", checkEscPress);

  const modalForm = modal.querySelector(".modal__form");
  const bgImage = modalWindow.querySelector(".bgImage");
  const modalTextContainer = modal.querySelector(".modal__text-container");
  const productButtons = modal.querySelector(".product__buttons");
  const btnContinueShopping = modal.querySelector("#continue-shopping");
  const btnCheckout = modal.querySelector("#checkout");

  const shoppingCart = modal.querySelector(".cart");

  shoppingCart.style.display = "none";

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

  if (btnCheckout !== null) {
    btnCheckout.remove();
  }

  modal.style.height = "initial";
  modalWindow.classList.remove("open-modal");
  document.body.style.overflow = "auto";
}

function openModalWindow(e) {
  e.preventDefault();
  modalWindow.classList.add("open-modal");
  document.body.style.overflow = "hidden";

  window.addEventListener('keydown', checkEscPress);
}

function checkEscPress(e) {
  let keyCode = e.keyCode;
  if (keyCode === 27) {
    closeModalWindow();
  };
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
