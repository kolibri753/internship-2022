const contact = document.querySelectorAll(".contact__number, .contact__btn");

contact.forEach((element) => {
  element.addEventListener("click", openContactModal);
});

document.addEventListener("click", function (e) {
  if (e.target.id === "btnContactUs") {
    modalThank();
  }
});

function openContactModal(e) {
  openModalWindow(e);
  modalContact();
}

function modalContact() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector(".form") !== null) {
    return;
  }

  modalTitle.textContent = "Contact us";
  modalText.textContent =
    "Order a free consultation and we will reply you in 24 hours";

  const modalForm = createForm();
  const btnForm = createFormBtn("Contact us", "btnContactUs");
  const usernameLabel = createLabel("username");
  const usernameInput = createInput(
    "form__input",
    "username",
    "text",
    "Your name"
  );
  const phoneLabel = createLabel("phone");
  const phoneInput = createInput(
    "form__input",
    "phone",
    "number",
    "Phone number"
  );
  const formAgreement = createCheckbox();

  modalForm.append(
    usernameLabel,
    usernameInput,
    phoneLabel,
    phoneInput,
    formAgreement,
    btnForm
  );
  modal.appendChild(modalForm);
}

function modalThank() {
  if (!contactFormValidation()) {
    return;
  }
  
  const modalForm = modal.childNodes[3];
  if (modal.querySelector(".modal__form") !== null) {
    modalForm.style.display = "none";
    console.log("Form none");
  }

  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");
  const btn = document.createElement("button");
  btn.classList.add("btn"); 

  modal.style.textAlign = "center";
  modalTitle.innerHTML =
    '<span style="display: block;">Thank you</span>for your application';
  modalText.textContent = "We will reply you in 24 hours";
  btn.textContent = "go Back home";
  btn.addEventListener("click", function () {
    window.location.href="../index.html";
  });
  modal.appendChild(btn);
}

function contactFormValidation() {
  const formInputUsername = document.querySelector("#username");
  const formInputPhone = document.querySelector("#phone");
  const formLabelUsername = document.querySelector("label[for=username]");
  const formLabelPhone = document.querySelector("label[for=phone]");
  const formCheckbox = document.querySelector("#modal-agreement-checkbox");
  const formCheckboxLabel = document.querySelector(".form__agreement-text");

  let usernameValid = validateFields(formInputUsername, formLabelUsername);
  let pnoneValid = validateFields(formInputPhone, formLabelPhone);
  let agreement;

  if (!formCheckbox.checked) {
    formCheckboxLabel.style.color = "red";
    agreement = false;
  } else {
    formCheckboxLabel.style.color = "initial";
    agreement = true;
  }

  if (usernameValid && pnoneValid && agreement) {
    return true;
  }
  return false;
}
