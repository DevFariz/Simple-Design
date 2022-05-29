//************** swiper home page start ***************** */
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//************** swiper home page end  ****************** */

//************** accordion home page start ******************* */

let accordionHeads = document.querySelectorAll(".question__head");

accordionHeads.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    let accBody = accordion.nextElementSibling;
    let toggleBtn = accordion.firstElementChild;

    if (accBody.style.maxHeight) {
      accBody.style.maxHeight = null;
      toggleBtn.style.transform = "rotate(0)";
    } else {
      accBody.style.maxHeight = accBody.scrollHeight + "px";
      toggleBtn.style.transform = "rotate(45deg)";
    }

  });
});

//************** accordion home page end ******************* */
