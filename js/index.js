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

//************** open and close card start *****************/

const body = document.querySelector('body');
const openBtn = document.querySelector('.card-btn');
const card = document.querySelector('.card');
const closeBtn = document.querySelector('.close-card__btn');

function isCardActive(card){
  if(card.classList.contains('active')){
    body.style.overflow = "hidden";
  } else{
    body.style.overflow = "auto";
  }
}

openBtn.addEventListener('click', () => {
  card.style.transform = "translateX(0)";
  card.classList.add('active');
  isCardActive(card);
});

closeBtn.addEventListener('click', () => {
  card.style.transform = "translateX(100%)";
  card.classList.remove('active');
  isCardActive(card);
});

//************** open and close card end *****************/

//************** card start *****************/

const cardBtns = document.querySelectorAll('.card__btn');
let roomDesigns = [];
const cardList = document.querySelector('.card-list');

function addItemToLocalStorage(btn) {
  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute('data-price');
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category = btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  roomDesigns.push(roomDesignsItem);
  const roomDesignsObj = JSON.stringify(roomDesigns);
  localStorage.setItem("roomDesign", roomDesignsObj);
}

function getItemsFromLocalStorageAfterLoad(){
  const elsFromLocalStorage = JSON.parse(localStorage.getItem("roomDesign"));
  if(elsFromLocalStorage !== null){
    roomDesigns = [...elsFromLocalStorage];
  }
  roomDesigns.forEach(roomDesign => {
    let li = document.createElement('li');
    li.innerText = `${roomDesign.category} [${roomDesign.price}]: ${roomDesign.name}`;
    li.classList.add('added-to-card')
    cardList.append(li)
  })
}

function getItemsFromLocalStorage() {
  const design = localStorage.getItem("roomDesign");
  const parsedObj = JSON.parse(design);
  return parsedObj;
}

function createCardItem(btn) {
  let li = document.createElement('li');
  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute('data-price');
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category = btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  li.innerText = `${roomDesignsItem.category} [${roomDesignsItem.price}]: ${roomDesignsItem.name}`;
  li.classList.add('added-to-card')
  cardList.append(li)
}

cardBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    addItemToLocalStorage(btn);
    createCardItem(btn);
  })
});

window.addEventListener('load', getItemsFromLocalStorageAfterLoad());

//************** card end *****************/


//************** card calculator start *****************/

const cardInps = document.getElementsByName('card-inp');
let servicesTotal = 0;
const cardContent = document.querySelector('.card-container__content-items');

cardInps.forEach(cardInp => {
  cardInp.addEventListener('change', () => {
    const servicesItem = {};
    servicesItem.name = cardInp.nextElementSibling.textContent;
    servicesItem.price = cardInp.value;

    if(cardInp.checked){
      createServicesItem(servicesItem.name, servicesItem.price);
      servicesTotal += parseInt(cardInp.value);
    } else{
      removeServicesItem(servicesItem.name)
      servicesTotal -= parseInt(cardInp.value);
    }
  })
})

function createServicesItem(name, price) {
  const div = document.createElement('div');
  div.classList.add('added-item');
  const pName = document.createElement('p');
  pName.classList.add('added-item__name');
  const pPrice = document.createElement('p');
  pPrice.classList.add('added-item__price');
  pName.textContent = name;
  pPrice.textContent = price;
  div.append(pName);
  div.append(pPrice);
  cardContent.append(div);
}

function removeServicesItem(name){
  const names = document.querySelectorAll('.added-item__name');
  names.forEach(n => {
    if(n.textContent === name){
      n.parentElement.remove()
    }
  })
}

//************** card calculator end *****************/
