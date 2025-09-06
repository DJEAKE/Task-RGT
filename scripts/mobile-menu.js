// Добавляем обработчик события, который сработает после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
  // Находим кнопку бургера и мобильное меню в DOM.
  const burgerButton = document.querySelector('[data-burger-button]');
  const nav = document.querySelector('[data-mobile-menu]');

  // Если оба элемента найдены, добавляем обработчик клика.
  if (burgerButton && nav) {
    burgerButton.addEventListener('click', () => {
      // Переключаем класс 'is-active' на мобильном меню, чтобы показать или скрыть его.
      nav.classList.toggle('is-active');

      // Переключаем класс 'is-active' на кнопке бургера для изменения ее вида (например, крестик).
      burgerButton.classList.toggle('is-active');
    });
  }
});
