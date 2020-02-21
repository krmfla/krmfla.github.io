var swiper = new Swiper('.swiper-container', {
    cssMode: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination'
    },
    mousewheel: true,
    keyboard: true,
});

function display_swiper(id) {
  var el = document.getElementById(id);
  el.classList.remove('back');
}

function close_swiper(id) {
  var el = document.getElementById(id);
  el.classList.add('back');
}