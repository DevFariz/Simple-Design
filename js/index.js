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

//************** card start *****************/

const cardBtns = document.querySelectorAll(".card__btn");

let roomDesigns = [];

window.addEventListener("load", () => {
  const elsFromLocalStorage = JSON.parse(localStorage.getItem("roomDesign"));
  if (elsFromLocalStorage !== null) {
    roomDesigns = [...elsFromLocalStorage];
  }
  console.log(elsFromLocalStorage);
});

cardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const roomDesignsItem = {};
    roomDesignsItem.price =
      btn.previousElementSibling.getAttribute("data-price");
    roomDesignsItem.name = btn.previousElementSibling.innerText;
    roomDesignsItem.category =
      btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
    roomDesigns.push(roomDesignsItem);
    const roomDesignsObj = JSON.stringify(roomDesigns);
    localStorage.setItem("roomDesign", roomDesignsObj);
    showCardItem();
    window.addEventListener("load", () => {
      roomDesigns = getDesignsFromLocalStorage();
    });
  });
});

let cardList = document.querySelector(".card-list");

function showCardItem() {
  const design = localStorage.getItem("roomDesign");
  const parsedObj = JSON.parse(design);
  let li = document.createElement("li");

  for (let index = 0; index < parsedObj.length; index++) {
    li.innerText = parsedObj[index].category + " " + parsedObj[index].price;
    cardList.append(li);
  }
}

function getDesignsFromLocalStorage() {
  const design = localStorage.getItem("roomDesign");
  const parsedObj = JSON.parse(design);
  return parsedObj;
}

// showCardItem()

//************** card end *****************/
