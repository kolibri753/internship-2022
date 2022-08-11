class ShoppingCartClass {
  constructor() {
    this.products = [];
  }

  productExists(newProduct) {
    return this.products.some((product) => product.title === newProduct.title);
  }

  addProduct(newProduct) {
    this.products.push(newProduct);
  }

  deleteProduct(title) {
    this.products = this.products.filter((product) => product.title !== title);
  }

  getProduct(title) {
    return this.products.find((product) => product.title === title);
  }
}

class ProductClass {
  constructor(img, title, text, color, size, amount) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.color = color;
    this.size = size;
    this.amount = amount;
  }
}

const shoppingCart = document.querySelector("#shopping-cart");

shoppingCart.addEventListener("click", function (e) {
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
  const modalCart = document.querySelector(".cart");
  modalCart.style.display = "block";

  // emptyCartModal();
  let countProducts = 2;

  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = `In your cart ${countProducts} items`;
}

function addToCartModal(product) {
  const prImgSrc = product.querySelector(".product__img").getAttribute("src");
  const prTitle = product.querySelector(".product__title").textContent;
  const prText = "Lorem ipsum dolor sit";
  let prColor;
  product.querySelectorAll(".product__color--input").forEach((element) => {
    if (element.checked) {
      prColor = element.getAttribute("id");
    }
  });
  let prSize = "M";
  let prAmount = 2;

  const pr = new ProductClass(prImgSrc, prTitle, prText, prColor, prSize, prAmount);
  console.log(pr);

  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  modalTitle.textContent = "Product added to cart";
  modalText.textContent = "Thank you for choosing our online store";

  const productButtons = document.createElement("div");
  productButtons.classList.add("product__buttons");
  productButtons.style.visibility = "visible";
  productButtons.style.padding = 0;
  const btnContinueShopping = createBtn(
    "continue shopping",
    "continue-shopping"
  );
  btnContinueShopping.classList.add("outline-btn");
  btnContinueShopping.addEventListener("click", function () {
    window.location.href = "../index.html";
  });
  const btnCheckout = createBtn("checkout", "checkout");
  btnCheckout.classList.add("btn");
  btnCheckout.style.padding = 0;
  btnCheckout.addEventListener("click", function (e) {
    closeModalWindow();
    openModalCart(e);
  });
  productButtons.append(btnContinueShopping, btnCheckout);

  modal.append(productButtons);

  return pr;
}

function emptyCartModal() {
  const modalTitle = document.querySelector(".modal__title");
  const modalText = document.querySelector(".modal__text");

  if (modal.querySelector("#continue-shopping") !== null) {
    return;
  }

  modalTitle.textContent = "Your cart is empty";
  modalText.textContent = "You have no items in your shopping cart.";

  const btnContinueShopping = createBtn(
    "continue shopping",
    "continue-shopping"
  );
  btnContinueShopping.classList.add("btn");
  
  modal.append(btnContinueShopping);
}
