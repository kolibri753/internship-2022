const subscribeForm = document.querySelector(".subscribe__form");
const btnSubscribe = document.querySelector("#btnSubscribe");

btnSubscribe.addEventListener("click", openSubscribeModal);

function openSubscribeModal(e) {
  e.preventDefault();
  if (!subscribeFormValidation()) {
    return;
  }

  openModalWindow(e);
  modalSubscribe();
}

function modalSubscribe() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector(".form") !== null) {
    return;
  }

  modalTitle.textContent = "Thank you";
  modalText.textContent = "You Subscribed for our newsletter!";

  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = "go Back home";
  btn.addEventListener("click", function () {
    window.location.href = "../index.html";
  });
  modal.appendChild(btn);
}

function subscribeFormValidation() {
  const formInputEmail = document.querySelector("#sub-email");
  const formLabelEmail = document.querySelector("label[for=sub-email]");

  const formCheckbox = document.querySelector("#agreement-checkbox");
  const formCheckboxLabel = document.querySelector(".form__agreement-text");

  let emailValid = validateFields(formInputEmail, formLabelEmail);

  let agreement;
  if (!formCheckbox.checked) {
    formCheckboxLabel.style.color = "red";
    agreement = false;
  } else {
    formCheckboxLabel.style.color = "initial";
    agreement = true;
  }

  if (
    emailValid &&
    agreement
  ) {
    return true;
  }
  return false;
}
