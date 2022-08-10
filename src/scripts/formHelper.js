function createForm() {
  const modalForm = document.createElement("form");
  modalForm.classList.add("modal__form", "form");
  modalForm.setAttribute("action", "#");
  modalForm.setAttribute("method", "get");

  return modalForm;
}

function createInput(className, id, type, placeholder) {
  const formInput = document.createElement("input");
  formInput.classList.add(className);
  formInput.setAttribute("id", id);
  formInput.setAttribute("type", type);
  formInput.setAttribute("placeholder", placeholder);

  return formInput;
}

function createLabel(inputId) {
  const formLabel = document.createElement("label");
  formLabel.classList.add("form__label", `form__label--${inputId}`);
  formLabel.setAttribute("for", inputId);

  return formLabel;
}

function createCheckbox() {
  const formAgreement = document.createElement("div");
  formAgreement.classList.add("form__agreement");

  const formCheckbox = createInput(
    "form__checkbox",
    "modal-agreement-checkbox",
    "checkbox",
    ""
  );

  const formAgreementText = document.createElement("label");
  formAgreementText.setAttribute("for", "modal-agreement-checkbox");
  formAgreementText.classList.add("form__agreement-text");
  formAgreementText.textContent =
    "I consent to the processing of personal data and agree to the ";

  const linkPrivacyPolicy = document.createElement("a");
  linkPrivacyPolicy.textContent = "Privacy policy";
  linkPrivacyPolicy.setAttribute("href", "#");

  formAgreementText.appendChild(linkPrivacyPolicy);
  formAgreement.append(formCheckbox, formAgreementText);

  return formAgreement;
}

function createFormBtn(textContent, id) {
  const btnForm = document.createElement("button");
  btnForm.classList.add("form__btn", "btn");
  btnForm.setAttribute("id", id);
  btnForm.setAttribute("type", "submit");
  btnForm.textContent = textContent;

  return btnForm;
}

function createPasswordEyeIcon(input) {
  const passwordIconContainer = document.createElement("span");
  passwordIconContainer.classList.add("password-container");
  passwordIconContainer.addEventListener("click", function () {
    passwordIcon.classList.toggle("zmdi-eye");
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
  });
  const passwordIcon = document.createElement("i");
  passwordIcon.classList.add("zmdi", "zmdi-eye-off");
  passwordIconContainer.appendChild(passwordIcon);

  return passwordIconContainer;
}

function validateFields(formInput, formLabel) {
  if (formInput.value.length == 0) {
    formInput.classList.add("form__input--incorrect");
    formLabel.classList.add("form__label--incorrect");
    return false;
  } else {
    formInput.classList.remove("form__input--incorrect");
    formLabel.classList.remove("form__label--incorrect");
    return true;
  }
}
