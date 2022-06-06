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

//************** open and close card start *****************/

const body = document.querySelector("body");
const openBtn = document.querySelector(".card-btn");
const card = document.querySelector(".card");
const closeBtn = document.querySelector(".close-card__btn");

function isCardActive(card) {
  if (card.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

openBtn.addEventListener("click", () => {
  card.style.transform = "translateX(0)";
  card.classList.add("active");
  isCardActive(card);
});

closeBtn.addEventListener("click", () => {
  card.style.transform = "translateX(100%)";
  card.classList.remove("active");
  isCardActive(card);
});

//************** open and close card end *****************/

//************** card start *****************/

const totalAmount = document.querySelector(".added-total__price");
const addedDesignsAmount = document.querySelector(".added__designs");
let designsAmount = 0;
let servicesAmount = 0;
let savedDesignsAmount = 0;

const cardBtns = document.querySelectorAll(".card__btn");
let roomDesigns = [];
const cardList = document.querySelector(".card-list");

function addItemToLocalStorage(btn) {
  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute("data-price");
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category =
    btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  roomDesigns.push(roomDesignsItem);
  const roomDesignsObj = JSON.stringify(roomDesigns);
  localStorage.setItem("roomDesign", roomDesignsObj);
  console.log(roomDesigns);
}

function getItemsFromLocalStorageAfterLoad() {
  const elsFromLocalStorage = JSON.parse(localStorage.getItem("roomDesign"));
  if (elsFromLocalStorage !== null) {
    roomDesigns = [...elsFromLocalStorage];
  }
  roomDesigns.forEach((roomDesign) => {
    let li = document.createElement("li");
    let deleteBtn = document.createElement("button");

    li.innerText = `${roomDesign.category} [${roomDesign.price}]: ${roomDesign.name}`;
    li.classList.add("added-to-card");
    deleteBtn.classList.add("card__delete-btn");
    deleteBtn.textContent = "(удалить)";

    li.append(deleteBtn);
    cardList.append(li);

    savedDesignsAmount += parseInt(roomDesign.price);
  });

  designsAmount += savedDesignsAmount;
  addedDesignsAmount.innerText = designsAmount + " тг";
  totalAmount.innerText = designsAmount + " тг";
}

function getItemsFromLocalStorage() {
  const design = localStorage.getItem("roomDesign");
  const parsedObj = JSON.parse(design);
  return parsedObj;
}

function createCardItem(btn) {
  let li = document.createElement("li");
  let deleteBtn = document.createElement("button");

  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute("data-price");
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category =
    btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  li.innerText = `${roomDesignsItem.category} [${roomDesignsItem.price}]: ${roomDesignsItem.name}`;
  li.classList.add("added-to-card");

  deleteBtn.classList.add("card__delete-btn");
  deleteBtn.textContent = "(удалить)";
  li.append(deleteBtn);

  cardList.append(li);

  designsAmount += parseInt(roomDesignsItem.price);
  addedDesignsAmount.innerText = designsAmount + " тг";
  totalAmount.innerText = designsAmount + servicesAmount + " тг";
}

cardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addItemToLocalStorage(btn);
    createCardItem(btn);
  });
});

window.addEventListener("load", getItemsFromLocalStorageAfterLoad());

//************** card end *****************/

//************** card calculator start *****************/

const cardInps = document.getElementsByName("card-inp");
const cardContent = document.querySelector(".card-container__content-items");

cardInps.forEach((cardInp) => {
  cardInp.addEventListener("change", () => {
    const servicesItem = {};
    servicesItem.name = cardInp.nextElementSibling.textContent;
    servicesItem.price = cardInp.value;

    if (cardInp.checked) {
      createServicesItem(servicesItem.name, servicesItem.price);
      servicesAmount += parseInt(cardInp.value);
    } else {
      removeServicesItem(servicesItem.name);
      servicesAmount -= parseInt(cardInp.value);
    }

    totalAmount.innerText = designsAmount + servicesAmount + " тг";
  });
});

function createServicesItem(name, price) {
  const div = document.createElement("div");
  div.classList.add("added-item");
  const pName = document.createElement("p");
  pName.classList.add("added-item__name");
  const pPrice = document.createElement("p");
  pPrice.classList.add("added-item__price");
  pName.textContent = name;
  pPrice.textContent = price + " тг";
  div.append(pName);
  div.append(pPrice);
  cardContent.append(div);
}

function removeServicesItem(name) {
  const names = document.querySelectorAll(".added-item__name");
  names.forEach((n) => {
    if (n.textContent === name) {
      n.parentElement.remove();
    }
  });
}

let count = 0;

function removeElementFromCard(e) {
  let roomDesignsJSON = localStorage.getItem("roomDesign");
  const parsedObj = JSON.parse(roomDesignsJSON);
  let designHTML = e.target.parentElement.textContent;
  let designName = designHTML.slice(
    designHTML.indexOf(": ") + 2,
    designHTML.indexOf("(")
  );
  let designPrice = designHTML.slice(
    designHTML.indexOf("[") + 1,
    designHTML.indexOf("]")
  );
  for (let i = 0; i < parsedObj.length; i++) {
    if (parsedObj[i].name == designName) {
      parsedObj.splice(i, 1);
      roomDesigns.splice(i, 1);
      localStorage.setItem("roomDesign", JSON.stringify(parsedObj));
      break;
    }
  }
  designsAmount -= designPrice;
  savedDesignsAmount -= designPrice;
  addedDesignsAmount.innerText = designsAmount + " тг";
  totalAmount.innerText = designsAmount + servicesAmount + " тг";
  e.target.parentElement.remove();
}

//************** card calculator end *****************/

let isTrue = true;

if (isTrue) {
  let deleteBtns = document.querySelectorAll(".card__delete-btn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      removeElementFromCard(e);
    });
  });
  isTrue = false;
}

cardList.addEventListener("DOMNodeInserted", () => {
  let deleteBtns = document.querySelectorAll(".card__delete-btn");

  deleteBtns[deleteBtns.length - 1].addEventListener("click", (e) => {
    removeElementFromCard(e);
  });
});
