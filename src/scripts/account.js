document.addEventListener("click", function (e) {
  if (e.target.classList.contains("submenu__btn--sign-in")) {
    openModalSignIn(e);
  }

  if (e.target.classList.contains("submenu__btn--create-account")) {
    openModalCreateAccount(e);
  }
});

function openModalCreateAccount(e) {
  openModalWindow(e);
  modalCreateAccount();
}

function openModalSignIn(e) {
  openModalWindow(e);
  modalSignIn();
}

function openModalPasswordRecovery(e) {
  openModalWindow(e);
  modalPasswordRecovery();
}

function modalCreateAccount() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector(".form") !== null) {
    return;
  }

  modalTitle.textContent = "Create an Account";
  modalText.textContent = "Fill out the fields to create an account";

  if (modalWindow.querySelector(".bgImage") !== null) {
    return;
  }
  const bgImage = document.createElement("div");
  bgImage.classList.add("bgImage");
  modal.style.height = "550px";
  bgImage.style.height = "550px";
  // bgImage.style.height = modal.offsetHeight + "px";

  modalWindow.appendChild(bgImage);

  const modalForm = createForm();
  const usernameLabel = createLabel("username");
  const usernameInput = createInput(
    "form__input",
    "username",
    "text",
    "Your name"
  );
  const emailLabel = createLabel("email");
  const emailInput = createInput("form__input", "email", "email", "Email");
  const passwordLabel = createLabel("password");
  const passwordInput = createInput(
    "form__input",
    "password",
    "password",
    "Password"
  );
  passwordInput.setAttribute("autocomplete", "true");
  const passwordEyeIcon = createPasswordEyeIcon(passwordInput);
  passwordLabel.appendChild(passwordEyeIcon);
  const confirmPasswordLabel = createLabel("confirm-password");
  const confirmPasswordInput = createInput(
    "form__input",
    "confirm-password",
    "password",
    "Confirm password"
  );
  const confirmPasswordEyeIcon = createPasswordEyeIcon(confirmPasswordInput);
  confirmPasswordLabel.appendChild(confirmPasswordEyeIcon);
  
  const formAgreement = createCheckbox();
  const btnForm = createFormBtn("Create", "btnCreateAccount");
  btnForm.addEventListener("click", accountCreateFormValidation);

  const textContainer = createTextContainer(
    "Are you already registered? Then you need to "
  );
  textContainer.style.marginTop = "1em";
  const anchorLogin = createAnchor("Login", "anchorLogin");
  document.addEventListener("click", function (e) {
    if (e.target.id === "anchorLogin") {
      closeModalWindow();
      openModalSignIn(e);
    }
  });
  textContainer.appendChild(anchorLogin);

  modalForm.append(
    usernameLabel,
    usernameInput,
    emailLabel,
    emailInput,
    passwordLabel,
    passwordInput,
    confirmPasswordLabel,
    confirmPasswordInput,
    formAgreement,
    btnForm
  );
  modal.append(modalForm, textContainer);
}

function accountCreateFormValidation() {
  const formInputUsername = document.querySelector("#username");
  const formInputEmail = document.querySelector("#email");
  const formInputPassword = document.querySelector("#password");
  const formInputConfirmPassword = document.querySelector("#confirm-password");

  const formLabelUsername = document.querySelector("label[for=username]");
  const formLabelEmail = document.querySelector("label[for=email]");
  const formLabelPassword = document.querySelector("label[for=password]");
  const formLabelConfirmPassword = document.querySelector(
    "label[for=confirm-password]"
  );

  const formCheckbox = document.querySelector("#modal-agreement-checkbox");
  const formCheckboxLabel = document.querySelector(".form__agreement-text");

  let usernameValid = validateFields(formInputUsername, formLabelUsername);
  let emailValid = validateFields(formInputEmail, formLabelEmail);
  let passwordValid = validateFields(formInputPassword, formLabelPassword);
  let confirmPasswordValid = validateFields(
    formInputConfirmPassword,
    formLabelConfirmPassword
  );

  let agreement;
  if (!formCheckbox.checked) {
    formCheckboxLabel.style.color = "red";
    agreement = false;
  } else {
    formCheckboxLabel.style.color = "initial";
    agreement = true;
  }

  if (formInputPassword.classList.contains("form__input--incorrect")) {
    const eyes = document.querySelectorAll(".password-container");

    eyes.forEach(eye => {
      eye.style.right = "3em";
    });
  }

  if (
    usernameValid &&
    emailValid &&
    passwordValid &&
    confirmPasswordValid &&
    agreement
  ) {
    return true;
  }
  return false;
}

function modalSignIn() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector(".form") !== null) {
    return;
  }

  modalTitle.textContent = "Log in";
  modalText.textContent = "Fill out the fields to log in";

  if (modalWindow.querySelector(".bgImage") !== null) {
    return;
  }
  const bgImage = document.createElement("div");
  bgImage.classList.add("bgImage");
  bgImage.style.backgroundImage = "url(../img/backgrounds/log-in-bg.jpg)";
  modal.style.height = "550px";
  bgImage.style.height = "550px";

  modalWindow.appendChild(bgImage);

  const modalForm = createForm();
  const emailLabel = createLabel("email");
  const emailInput = createInput("form__input", "email", "email", "Email");
  const passwordLabel = createLabel("password");
  const passwordInput = createInput(
    "form__input",
    "password",
    "password",
    "Password"
  );

  const passwordEyeIcon = createPasswordEyeIcon(passwordInput);
  passwordLabel.appendChild(passwordEyeIcon);
  const formAgreement = createCheckbox();
  const btnForm = createFormBtn("Create", "btnCreateAccount");
  btnForm.addEventListener("click", signInFormValidation);

  const anchorForgotPassword = createAnchor(
    "I've forgot my password",
    "anchorForgotPassword"
  );
  anchorForgotPassword.style.display = "block";
  document.addEventListener("click", function (e) {
    if (e.target.id === "anchorForgotPassword") {
      closeModalWindow();
      openModalPasswordRecovery(e);
    }
  });
  const textContainer = createTextContainer(
    "Are you already registered? Then you need to "
  );
  textContainer.prepend(anchorForgotPassword);
  const anchorCreateAcc = createAnchor("Create an Account", "anchorCreateAcc");
  anchorCreateAcc.addEventListener("click", function (e) {
    closeModalWindow();
      openModalCreateAccount(e);
  });
  textContainer.appendChild(anchorCreateAcc);

  modalForm.append(
    emailLabel,
    emailInput,
    passwordLabel,
    passwordInput,
    formAgreement,
    btnForm
  );

  modal.append(modalForm, textContainer);
}

function signInFormValidation() {
  const formInputEmail = document.querySelector("#email");
  const formInputPassword = document.querySelector("#password");

  const formLabelEmail = document.querySelector("label[for=email]");
  const formLabelPassword = document.querySelector("label[for=password]");

  const formCheckbox = document.querySelector("#modal-agreement-checkbox");
  const formCheckboxLabel = document.querySelector(".form__agreement-text");

  let emailValid = validateFields(formInputEmail, formLabelEmail);
  let passwordValid = validateFields(formInputPassword, formLabelPassword);

  let agreement;
  if (!formCheckbox.checked) {
    formCheckboxLabel.style.color = "red";
    agreement = false;
  } else {
    formCheckboxLabel.style.color = "initial";
    agreement = true;
  }

  if (formInputPassword.classList.contains("form__input--incorrect")) {
    const eyes = document.querySelectorAll(".password-container");

    eyes.forEach(eye => {
      eye.style.right = "3em";
    });
  }

  if (emailValid && passwordValid && agreement) {
    return true;
  }
  return false;
}

function modalPasswordRecovery() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector(".form") !== null) {
    return;
  }

  modalTitle.textContent = "Password Recovery";
  modalText.textContent = "Enter your e-mail and we will send you a password";

  const modalForm = createForm();
  const emailLabel = createLabel("email");
  const emailInput = createInput("form__input", "email", "email", "Email");
  const btnForm = createFormBtn("Create", "btnCreateAccount");
  btnForm.style.marginTop = "1em";
  btnForm.addEventListener("click", accountCreateFormValidation);

  const textContainer = createTextContainer("");
  textContainer.style.marginTop = "1em";
  const anchorRememberedPassword = createAnchor(
    "I remembered my password",
    "anchorRememberedPassword"
  );
  document.addEventListener("click", function (e) {
    if (e.target.id === "anchorRememberedPassword") {
      closeModalWindow();
      openModalSignIn(e);
    }
  });
  textContainer.appendChild(anchorRememberedPassword);

  modalForm.append(emailLabel, emailInput, btnForm);
  modal.append(modalForm, textContainer);
}
