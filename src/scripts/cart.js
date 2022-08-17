class ShoppingCartClass {
  constructor() {
    this.products = [];
  }

  productExists(newProduct) {
    return this.products.some((product) => product.color === newProduct.color);
  }

  addProduct(newProduct) {
    this.products.push(newProduct);
  }

  deleteProduct(productColor) {
    this.products = this.products.filter(
      (product) => product.color !== productColor
    );
  }

  getProduct(title) {
    return this.products.find((product) => product.title === title);
  }
}

class ProductClass {
  constructor(img, title, text, color, size, amount, price) {
    this.img = img;
    this.title = title;
    this.text = text;
    this.color = color;
    this.size = size;
    this.amount = amount;
    this.price = price;
  }
}

const shoppingCartArray = new ShoppingCartClass();
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
  const modalTitle = document.querySelector(".modal__title");
  const cartPrice = document.querySelector(".cart__price-value");
  let countProducts = shoppingCartArray.products.length;

  if (countProducts === 0) {
    emptyCartModal();
    return;
  }

  modalCart.style.display = "block";
  modalTitle.textContent = `In your cart ${countProducts} items`;

  let totalPrice = 0;
  totalPrice = Object.values(shoppingCartArray.products).reduce(
    (t, { price, amount }) =>
      t + parseInt(amount) * parseInt(price.match(/[0-9]+$/)),
    0
  );
  cartPrice.innerHTML = "€" + totalPrice;

  resetShoppingCart();
  addProductsToCanvas();
}

function addProductsToCanvas() {
  for (let product of shoppingCartArray.products) {
    createCardProduct(product);
  }
}

function deleteProductFromCanvas(pr) {
  shoppingCartArray.deleteProduct(pr.color);
  resetShoppingCart();
  addProductsToCanvas();
  const modalTitle = document.querySelector(".modal__title");
  let countProducts = shoppingCartArray.products.length;
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
  let prAmount = 1;
  const prPrice = product.querySelector(".product__price").innerHTML;

  const pr = new ProductClass(
    prImgSrc,
    prTitle,
    prText,
    prColor,
    prSize,
    prAmount,
    prPrice
  );

  if (!shoppingCartArray.productExists(pr)) {
    shoppingCartArray.addProduct(pr);
  }

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
    // window.location.href = "../index.html";
    closeModalWindow();
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

function createCardProduct(pr) {
  const cart = document.querySelector(".cart");
  const product = document.createElement("div");
  product.classList.add("cart-product");
  const productInfo = document.createElement("div");
  productInfo.classList.add("cart-product__info");

  const productImg = document.createElement("img");
  productImg.classList.add("cart-product__img");
  productImg.setAttribute("src", pr.img);
  productImg.setAttribute("alt", "img");

  const productTitle = document.createElement("a");
  productTitle.classList.add("cart-product__title");
  productTitle.setAttribute("href", "#");
  productTitle.textContent = pr.title;

  const productText = document.createElement("p");
  productText.classList.add("cart-product__text");
  productText.setAttribute("href", "#");
  productText.textContent = pr.text;

  const productColor = document.createElement("div");
  productColor.classList.add("cart-product__color", "cart-product__param");
  productColor.textContent = "Color:";

  const productColorLabel = document.querySelector(`[for="${pr.color}"]`);
  const productColorLabelNew = productColorLabel.cloneNode(true);
  productColorLabelNew.style.visibility = "visible";
  productColorLabelNew.style.top = "-0.2em";
  productColorLabelNew.classList.add(
    "cart-product--focus",
    "cart-product__color-value"
  );
  productColor.append(productColorLabelNew);

  const productSize = document.createElement("div");
  productSize.classList.add("cart-product__size", "cart-product__param");
  productSize.textContent = "Size:";

  const productSizeValue = document.createElement("span");
  productSizeValue.classList.add(
    "cart-product__size-value",
    "cart-product--focus"
  );
  productSizeValue.textContent = pr.size;
  productSize.append(productSizeValue);

  const productAmount = document.createElement("div");
  productAmount.classList.add("cart-product__amount", "cart-product--focus");

  const productAmountValue = document.createElement("span");
  productAmountValue.classList.add("cart-product__amount-value");
  productAmountValue.textContent = pr.amount;

  const productAmountDecrease = document.createElement("button");
  productAmountDecrease.classList.add("cart-product__amount-change");
  productAmountDecrease.addEventListener("click", function () {
    productAmountValue.innerHTML = --pr.amount;

    const cartPrice = document.querySelector(".cart__price-value");
    let totalPrice = parseInt(cartPrice.innerHTML.match(/[0-9]+$/));
    totalPrice -= parseInt(pr.price.match(/[0-9]+$/));
    cartPrice.innerHTML = "€" + totalPrice;

    if (pr.amount <= 0) {
      deleteProductFromCanvas(pr);
    }
  });

  const productAmountDecreaseIcon = document.createElement("i");
  productAmountDecreaseIcon.classList.add("zmdi", "zmdi-minus");
  productAmountDecrease.appendChild(productAmountDecreaseIcon);

  const productAmountIncrease = document.createElement("button");
  productAmountIncrease.classList.add("cart-product__amount-change");
  productAmountIncrease.addEventListener("click", function () {
    productAmountValue.innerHTML = ++pr.amount;

    const cartPrice = document.querySelector(".cart__price-value");
    let totalPrice = parseInt(cartPrice.innerHTML.match(/[0-9]+$/));
    totalPrice += parseInt(pr.price.match(/[0-9]+$/));
    cartPrice.innerHTML = "€" + totalPrice;
  });

  const productAmountIncreaseIcon = document.createElement("i");
  productAmountIncreaseIcon.classList.add("zmdi", "zmdi-plus");
  productAmountIncrease.appendChild(productAmountIncreaseIcon);

  productAmount.append(
    productAmountDecrease,
    productAmountValue,
    productAmountIncrease
  );

  const productPrice = document.createElement("span");
  productPrice.classList.add("cart-product__price");
  productPrice.innerHTML = pr.price;
  const hasNewPrice = productPrice.querySelector("span");
  if (hasNewPrice !== null) {
    productPrice.classList.add("new-price");
  }

  const productDelete = document.createElement("button");
  productDelete.classList.add("cart__round-btn", "cart-product__delete-btn");
  productDelete.setAttribute("id", "delete-product");
  productDelete.addEventListener("click", function () {
    deleteProductFromCanvas(pr);
    const cartPrice = document.querySelector(".cart__price-value");
    let totalPrice = cartPrice.textContent.match(/[0-9]+$/);
    totalPrice -= pr.price.match(/[0-9]+$/) * pr.amount;
    cartPrice.innerHTML =  "€" + totalPrice;
  });

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("zmdi", "zmdi-delete");

  productDelete.appendChild(deleteIcon);

  productInfo.append(
    productImg,
    productTitle,
    productText,
    productColor,
    productSize
  );

  product.append(productInfo, productAmount, productPrice, productDelete);

  cart.prepend(product);
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
  btnContinueShopping.addEventListener("click", function () {
    // window.location.href = "../index.html";
    closeModalWindow();
  });

  modal.append(btnContinueShopping);
}

function resetShoppingCart() {
  const modalCart = document.querySelector(".cart");
  const productCards = modalCart.querySelectorAll(".cart-product");
  productCards.forEach((element) => {
    element.remove();
  });
}
