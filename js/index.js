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

const totalAmount = document.querySelector('.added-total__price');
const addedDesignsAmount = document.querySelector('.added__designs');
let designsAmount = 0;
let servicesAmount = 0;
let savedDesignsAmount = 0;

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
    let deleteBtn = document.createElement('button');

    li.innerText = `${roomDesign.category} [${roomDesign.price}]: ${roomDesign.name}`;
    li.classList.add('added-to-card');
    deleteBtn.classList.add('card__delete-btn')
    deleteBtn.textContent = '(удалить)';

    li.append(deleteBtn);
    cardList.append(li);

    savedDesignsAmount += parseInt(roomDesign.price)
  });

    designsAmount += savedDesignsAmount
    addedDesignsAmount.innerText =  designsAmount + ' тг';
    totalAmount.innerText = designsAmount + ' тг';
}

function getItemsFromLocalStorage() {
  const design = localStorage.getItem("roomDesign");
  const parsedObj = JSON.parse(design);
  return parsedObj;
}

function createCardItem(btn) {
  let li = document.createElement('li');
  let deleteBtn = document.createElement('button');
  
  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute('data-price');
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category = btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  li.innerText = `${roomDesignsItem.category} [${roomDesignsItem.price}]: ${roomDesignsItem.name}`;
  li.classList.add('added-to-card');

  deleteBtn.classList.add('card__delete-btn')
  deleteBtn.textContent = '(удалить)';
  li.append(deleteBtn);

  cardList.append(li);

  designsAmount += parseInt(roomDesignsItem.price);
  addedDesignsAmount.innerText = designsAmount + ' тг';
  totalAmount.innerText =  designsAmount + servicesAmount + ' тг';
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
const cardContent = document.querySelector('.card-container__content-items');

cardInps.forEach(cardInp => {
  cardInp.addEventListener('change', () => {
    const servicesItem = {};
    servicesItem.name = cardInp.nextElementSibling.textContent;
    servicesItem.price = cardInp.value;

    if(cardInp.checked){
      createServicesItem(servicesItem.name, servicesItem.price);
      servicesAmount += parseInt(cardInp.value);
    } else{
      removeServicesItem(servicesItem.name)
      servicesAmount -= parseInt(cardInp.value);
    }

    totalAmount.innerText = designsAmount + servicesAmount + ' тг';
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
  pPrice.textContent = price + ' тг';
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


let deleteBtns = document.querySelectorAll('.card__delete-btn');

deleteBtns.forEach(deleteBtn => {
  deleteBtn.addEventListener('click', () => {
    let roomDesigns = localStorage.getItem("roomDesign");
    const parsedObj = JSON.parse(roomDesigns);

    for(let i = 0; i < parsedObj.length; i++){
      if(parsedObj[i].name){
        console.log(parsedObj[i].name)
      }
    }

     localStorage.setItem('roomDesign',JSON.stringify(roomDesigns));
     deleteBtn.parentElement.remove();
  })
})



//************** card calculator end *****************/
