const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link')

burgerBtn.addEventListener('click', () => {
    burgerMenu.classList.toggle('menu_active');
})

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.toggle('menu_active');
    })
})