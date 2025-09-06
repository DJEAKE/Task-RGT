// Добавляем обработчик события, который сработает после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {
  // Функция для инициализации контролов количества.
  function initializeQuantityControls() {
    // Находим элементы управления количеством в DOM.
    const increaseButton = document.querySelector('[data-quantity-increase]');
    const decreaseButton = document.querySelector('[data-quantity-decrease]');
    const quantityInput = document.querySelector('[data-quantity-input]');

    // Если какой-либо из элементов не найден, прекращаем выполнение функции.
    if (!increaseButton || !decreaseButton || !quantityInput) {
      return;
    }

    // Добавляем обработчик клика на кнопку увеличения количества.
    increaseButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value, 10);
      // Увеличиваем значение на 1. Если значение не число, устанавливаем 1.
      quantityInput.value = isNaN(currentValue) ? 1 : currentValue + 1;
    });

    // Добавляем обработчик клика на кнопку уменьшения количества.
    decreaseButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityInput.value, 10);
      // Уменьшаем значение на 1, но не позволяем ему быть меньше 1.
      if (!isNaN(currentValue) && currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  // Инициализируем контролы количества.
  initializeQuantityControls();
});
