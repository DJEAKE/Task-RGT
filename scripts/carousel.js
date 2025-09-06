// Добавляем обработчик события, который сработает после полной загрузки DOM.
document.addEventListener('DOMContentLoaded', () => {

  // Функция для инициализации бесконечной карусели.
  function initializeInfiniteCarousel() {
    // Находим необходимые элементы в DOM.
    const productList = document.querySelector('[data-carousel-list]');
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');

    // Если какой-либо из элементов не найден, прекращаем выполнение функции.
    if (!productList || !prevButton || !nextButton) {
      return;
    }

    // Получаем оригинальные элементы карусели.
    const originalItems = Array.from(productList.children);
    const totalOriginalItems = originalItems.length;
    // Если нет элементов, прекращаем выполнение.
    if (totalOriginalItems === 0) return;

    // Клонируем элементы для создания эффекта бесконечной прокрутки.
    const clonesToPrepend = originalItems.map(item => item.cloneNode(true));
    const clonesToAppend = originalItems.map(item => item.cloneNode(true));
    // Добавляем клоны в начало и конец списка.
    productList.prepend(...clonesToPrepend);
    productList.append(...clonesToAppend);

    let itemWidth = 0;
    let currentIndex = totalOriginalItems;

    // Функция для обновления позиции карусели.
    const updateCarouselPosition = (withTransition = true) => {
      // Отключаем анимацию для мгновенного перемещения.
      if (!withTransition) {
        productList.style.transition = 'none';
      }
      // Сдвигаем карусель.
      productList.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      // Восстанавливаем анимацию.
      if (!withTransition) {
        productList.offsetHeight; // Вызываем перерисовку.
        productList.style.transition = 'transform 0.5s ease-in-out';
      }
    };

    // Функция для расчета размеров и начальной позиции.
    const calculateDimensionsAndPosition = () => {
      const gap = parseInt(getComputedStyle(productList).gap, 10) || 0;
      itemWidth = productList.children[0].offsetWidth + gap;
      updateCarouselPosition(false);
    };

    // Функция для перехода к следующему слайду.
    const moveNext = () => {
      if (nextButton.disabled) return;
      prevButton.disabled = true;
      nextButton.disabled = true;
      currentIndex++;
      updateCarouselPosition();
    };

    // Функция для перехода к предыдущему слайду.
    const movePrev = () => {
      if (prevButton.disabled) return;
      prevButton.disabled = true;
      nextButton.disabled = true;
      currentIndex--;
      updateCarouselPosition();
    };

    // Обработчик окончания анимации перехода.
    const handleTransitionEnd = () => {
      let jumped = false;
      // Если достигли конца клонов справа, перескакиваем к началу оригинальных элементов.
      if (currentIndex >= totalOriginalItems * 2) {
        currentIndex = totalOriginalItems;
        jumped = true;
      } else if (currentIndex < totalOriginalItems) {
        // Если достигли начала клонов слева, перескакиваем к концу оригинальных элементов.
        currentIndex = currentIndex + totalOriginalItems;
        jumped = true;
      }

      // Если был совершен "прыжок", обновляем позицию без анимации.
      if (jumped) {
        updateCarouselPosition(false);
      }

      // Включаем кнопки навигации.
      prevButton.disabled = false;
      nextButton.disabled = false;
    };

    // Добавляем обработчики событий.
    nextButton.addEventListener('click', moveNext);
    prevButton.addEventListener('click', movePrev);
    productList.addEventListener('transitionend', handleTransitionEnd);
    window.addEventListener('resize', calculateDimensionsAndPosition);

    // Рассчитываем размеры и устанавливаем начальную позицию.
    calculateDimensionsAndPosition();
  }

  // Инициализируем карусель.
  initializeInfiniteCarousel();
});
