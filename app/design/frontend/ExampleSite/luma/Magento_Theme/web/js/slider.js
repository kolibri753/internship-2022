document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".slider__img");
  const sliderLine = document.querySelector(".slider__line");
  
  let count = 0;
  let width;
  const widgetContainer = sliderLine.parentNode;
  widgetContainer.classList.add("hero__slider", "slider");

  function init() {
    width = document.querySelector(".slider").offsetWidth;
    sliderLine.style.width = width * images.length + "px";
    images.forEach((element) => {
      element.style.width = width + "px";
      element.style.height = width + "auto";
    });
    rollSlider();
  }
  
  window.addEventListener("resize", init);
  init();
  
  function rollSlider() {
    sliderLine.style.transform = `translate(-${count * width}px)`;
  }
  
  function nextSlide() {
    count++;
    if (count >= images.length) {
      count = 0;
    }
    rollSlider();
  }
  
  setInterval(nextSlide, 5000);
});
