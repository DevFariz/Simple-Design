const cardBtns = document.querySelectorAll(".card__btn");
let roomDesigns = [];

function getItemsFromLocalStorageAfterLoad() {
  const elsFromLocalStorage = JSON.parse(localStorage.getItem("roomDesign"));
  if (elsFromLocalStorage !== null) {
    roomDesigns = [...elsFromLocalStorage];
  }
}

window.addEventListener("load", getItemsFromLocalStorageAfterLoad());

function addItemToLocalStorage(btn) {
  const roomDesignsItem = {};
  roomDesignsItem.price = btn.previousElementSibling.getAttribute("data-price");
  roomDesignsItem.name = btn.previousElementSibling.innerText;
  roomDesignsItem.category =
    btn.parentElement.parentElement.parentElement.previousElementSibling.innerText;
  roomDesigns.push(roomDesignsItem);
  const roomDesignsObj = JSON.stringify(roomDesigns);
  localStorage.setItem("roomDesign", roomDesignsObj);
}

cardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addItemToLocalStorage(btn);
  });
});
