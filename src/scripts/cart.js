const shoppingCart = document.querySelector("#shopping-cart");

shoppingCart.addEventListener("click", function(e) {
  openModalCart(e);
});

function openModalCart(e) {
  openModalWindow(e);
  modalCart();
}

function openModalAddedToCart(e, product) {
  openModalWindow(e);
  addToCartModal(product);
}

function modalCart() {
  // emptyCartModal();
  let countProducts = 2;

  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = `In your cart ${countProducts} items`;
}

function addToCartModal(product) {
  console.log(product);

  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector(".product__buttons") !== null) {
    return;
  }

  modalTitle.textContent = "Product added to cart";
  modalText.textContent = "Thank you for choosing our online store";

  const productButtons = document.createElement("div");
  productButtons.classList.add("product__buttons");
  productButtons.style.visibility = "visible";
  productButtons.style.padding = 0;
  const btnContinueShopping = createBtn("continue shopping", "continue-shopping");
  btnContinueShopping.classList.add("outline-btn");
  const btnCheckout = createBtn("checkout", "checkout");
  btnCheckout.classList.add("btn");
  btnCheckout.style.padding = 0;
  productButtons.append(btnContinueShopping, btnCheckout);
  
  modal.append(productButtons);
}

function emptyCartModal() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector("#continue-shopping") !== null) {
    return;
  }

  modalTitle.textContent = "Your cart is empty";
  modalText.textContent = "You have no items in your shopping cart.";

  // const productButtons = document.createElement("div");
  // productButtons.classList.add("product__buttons");
  // productButtons.style.padding = 0;
  const btnContinueShopping = createBtn("continue shopping", "continue-shopping");
  btnContinueShopping.classList.add("btn");
  // const btnCheckout = createBtn("checkout", "checkout");
  // btnCheckout.style.padding = 0;
  // productButtons.append(btnContinueShopping, btnCheckout);
  
  modal.append(btnContinueShopping);
}