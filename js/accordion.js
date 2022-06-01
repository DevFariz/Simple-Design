const accordionHeads = document.querySelectorAll(".question__head");

accordionHeads.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const accBody = accordion.nextElementSibling;
    const toggleBtn = accordion.firstElementChild;

    if (accBody.style.maxHeight) {
      accBody.style.maxHeight = null;
      toggleBtn.style.transform = "rotate(0)";
    } else {
      accBody.style.maxHeight = accBody.scrollHeight + "px";
      toggleBtn.style.transform = "rotate(45deg)";
    }

  });
});

