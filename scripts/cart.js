// Добавляем обработчик события, который сработает после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
  // Ключ для хранения общего количества товаров в корзине в localStorage.
  const CART_STORAGE_KEY = 'cartTotal';

  // Получаем текущее значение корзины из localStorage или устанавливаем 0, если там ничего нет.
  let cartTotal = parseInt(localStorage.getItem(CART_STORAGE_KEY), 10) || 0;

  // Находим все элементы, связанные с корзиной.
  const cartLinks = document.querySelectorAll('[data-cart-link]');
  const clearCartButtons = document.querySelectorAll('[data-clear-cart]');
  const mainAddToCartButton = document.querySelector('[data-add-to-cart-main]');
  const quantityInput = document.querySelector('[data-quantity-input]');
  const relatedProductsContainer = document.querySelector('[data-carousel-list]');

  // Функция для обновления отображения информации о корзине.
  function updateCartDisplay() {
    // Обновляем счетчики на всех ссылках на корзину.
    cartLinks.forEach(link => {
      let counter = link.querySelector('.cart-counter');
      if (cartTotal > 0) {
        // Если счетчика нет, создаем его.
        if (!counter) {
          counter = document.createElement('span');
          counter.className = 'cart-counter';
          link.appendChild(counter);
        }
        counter.textContent = cartTotal;
      } else {
        // Если корзина пуста, удаляем счетчик.
        if (counter) {
          link.removeChild(counter);
        }
      }
    });

    // Показываем или скрываем кнопки "Очистить корзину".
    if (cartTotal > 0) {
      clearCartButtons.forEach(button => button.classList.add('is-visible'));
    } else {
      clearCartButtons.forEach(button => button.classList.remove('is-visible'));
    }
  }

  // Функция для сохранения состояния корзины в localStorage.
  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, cartTotal);
  }

  // Функция для полной очистки корзины.
  function clearCart() {
    cartTotal = 0;
    saveCart();
    updateCartDisplay();
  }

  // Добавляем обработчик на главную кнопку "Добавить в корзину".
  if (mainAddToCartButton && quantityInput) {
    mainAddToCartButton.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value, 10);
      if (!isNaN(quantity) && quantity > 0) {
        cartTotal += quantity;
        saveCart();
        updateCartDisplay();
      }
    });
  }

  // Добавляем обработчик на контейнер с похожими товарами (делегирование событий).
  if (relatedProductsContainer) {
    relatedProductsContainer.addEventListener('click', (event) => {
      // Проверяем, был ли клик по кнопке "Добавить в корзину".
      if (event.target.hasAttribute('data-add-to-cart-related')) {
        cartTotal += 1; // Добавляем один товар.
        saveCart();
        updateCartDisplay();
      }
    });
  }

  // Добавляем обработчики на все кнопки "Очистить корзину".
  clearCartButtons.forEach(button => {
    button.addEventListener('click', clearCart);
  });

  // Инициализируем отображение корзины при загрузке страницы.
  updateCartDisplay();
});
