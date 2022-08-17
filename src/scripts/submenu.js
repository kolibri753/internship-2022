const contact = document.querySelector("#list__btn--account");

contact.addEventListener("click", createSubMenu);

function createSubMenu() {
  const submenu = document.querySelector(".submenu");

  document.addEventListener("click", function (e) {
    if (e.target.parentNode !== document.querySelector(".submenu") && e.target !== contact) {
      submenu.replaceChildren();
      submenu.style.visibility = "hidden";
      return;
    }
  });

  if (submenu.hasChildNodes()) {
    submenu.replaceChildren();
    submenu.style.visibility = "hidden";
    return;
  }

  submenu.style.visibility = "visible";
  const btnSignIn = document.createElement("button");
  btnSignIn.classList.add("submenu__btn", "submenu__btn--sign-in");
  btnSignIn.textContent = "Sign in";
  submenu.appendChild(btnSignIn);

  const btnCreateAccount = document.createElement("button");
  btnCreateAccount.classList.add(
    "submenu__btn",
    "submenu__btn--create-account"
  );
  btnCreateAccount.textContent = "Create an account";
  submenu.appendChild(btnCreateAccount);
}
