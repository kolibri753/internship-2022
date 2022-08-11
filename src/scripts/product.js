const products = document.querySelectorAll(".gallery__product:not(.cart-gallery__product)");
const btnBuy = document.querySelectorAll('#buy-now');
btnBuy.forEach(element => {
  element.addEventListener("click", function(e) {
    const product = e.target.parentNode.parentNode.parentNode;
    openModalAddedToCart(e, product);
  });
});

products.forEach((element) => {
  element.addEventListener("mouseenter", onActiveProduct);
  element.addEventListener("mouseleave", outActiveProduct);
});

function onActiveProduct(e) {
  const product = e.currentTarget;
  activeProduct(product);
  product.classList.add("gallery__product--active");
}

function outActiveProduct(e) {
  const product = e.currentTarget;
  product.classList.remove("gallery__product--active");

  hideSecondaryAttr(product);
}

function activeProduct(product) {
  const productInfo = product.querySelector(".product__info");
  const checkBtnColor = productInfo.querySelectorAll(".product__color--input");
  const checkBtnsProduct = productInfo.querySelector(".product__buttons");

  if (checkBtnColor !== null && checkBtnsProduct !== null) {
    productInfo.querySelectorAll(".product__color").forEach((element) => {
      element.style.visibility = "visible";
      let btnColorIndex = element.getAttribute("class").slice(-1);
      element.style.top = btnColorIndex * 2 + "rem";
    });
    checkBtnsProduct.style.visibility = "visible";

    return;
  }

  if (checkBtnColor !== null) {
    productInfo.querySelectorAll(".product__color").forEach((element) => {
      element.style.visibility = "visible";
    });
    return;
  }

  if (checkBtnsProduct !== null) {
    checkBtnsProduct.style.visibility = "visible";

    return;
  }
}

function hideSecondaryAttr(product) {
  const productInfo = product.querySelector(".product__info");
  const btnColor = productInfo.querySelector(".product__color");
  const productButtons = productInfo.querySelector(".product__buttons");

  if (btnColor !== null) {
    productInfo.querySelectorAll(".product__color").forEach((element) => {
      element.style.visibility = "hidden";
    });
  }
  if (productButtons !== null) {
    productButtons.style.visibility = "hidden";
  }
}
