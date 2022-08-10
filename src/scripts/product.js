const products = document.querySelectorAll(".gallery__product");
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
  // console.log("mouseover -- onActiveProduct");

  const product = e.currentTarget;
  activeProduct(product);
  product.classList.add("gallery__product--active");
}

function outActiveProduct(e) {
  // console.log("mouseout -- outActiveProduct");

  const product = e.currentTarget;
  product.classList.remove("gallery__product--active");

  // unactiveProduct(product);
  hideSecondaryAttr(product);
}

function activeProduct(product) {
  // console.log("activeProduct(product)");

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
  // const btnColorBlack = createColorBtn("#232323", 0);
  // const btnColorGrey = createColorBtn("#AAAAB5", 1);
  // const btnColorTurquoise = createColorBtn("#69D8D1", 2);
  // const btnColorOrange = createColorBtn("#ED8F72", 3);

  // productInfo.prepend(
  //   btnColorBlack,
  //   btnColorGrey,
  //   btnColorTurquoise,
  //   btnColorOrange
  // );

  // const productButtons = document.createElement("div");
  // productButtons.classList.add("product__buttons");
  // const btnBuy = createBtn("buy now", "buy-now");
  // btnBuy.classList.add("product__btn", "btn");
  // btnBuy.addEventListener("click", function (e) {
  //   openModalAddedToCart(e);
  // });
  // const btnFavotite = createBtn("", "favorite");
  // btnFavotite.classList.add("product__favorite");
  // productButtons.append(btnBuy, btnFavotite);
  // productInfo.append(productButtons);

  // return product;
}

// function unactiveProduct(product) {
//   console.log("unactiveProduct(product)");

//   const productInfo = product.querySelector(".product__info");
//   const btnColors = productInfo.querySelectorAll(".product__color");
//   const productButtons = productInfo.querySelector(".product__buttons");

//   if (btnColors !== null) {
//     btnColors.forEach((element) => {
//       element.remove();
//       // element.style.display = "none";
//     });
//   }
//   if (productButtons !== null) {
//     productButtons.remove();
//     // productButtons.style.display = "none";
//   }
// }

function hideSecondaryAttr(product) {
  // console.log("hideSecondaryAttr(product)");

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
