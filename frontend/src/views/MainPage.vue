<template>
  <div
    class="main-root"
    style="min-height: 100vh; display: flex; flex-direction: column"
  >
    <div style="flex: 1; display: flex">
      <!-- Левая колонка: список товаров -->
      <ProductListPanel />
      <!-- Правая часть: витрина, баннер и заголовок -->
      <div style="flex: 1; padding: 32px">
        <div class="ecwid-container">
          <h1>My Test Ecwid Store</h1>
          <div class="banner">🔥 Лучшие свежие поступления!</div>
          <!-- Витрина Ecwid вставляется скриптом Ecwid -->
          <div id="my-ecwid-store"></div>
        </div>
      </div>
    </div>

    <!-- Нижняя мобильная панель для имитации -->
    <div
      class="ec-footer-tab-bar"
      style="position: fixed; left: 0; right: 0; bottom: 0; z-index: 9"
    >
      <div class="ec-footer-tab-bar__item">
        <span class="ec-footer-tab-bar__icon icon-account"></span>
        <span class="ec-footer-tab-bar__label">My Account</span>
      </div>
      <div class="ec-footer-tab-bar__item">
        <span class="ec-footer-tab-bar__icon icon-track"></span>
        <span class="ec-footer-tab-bar__label">Track Orders</span>
      </div>
      <div class="ec-footer-tab-bar__item ec-footer-tab-bar__item--active">
        <span class="ec-footer-tab-bar__icon icon-cart"></span>
        <span class="ec-footer-tab-bar__label">Shopping Bag</span>
        <span class="ec-footer-tab-bar__counter">3</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductListPanel from '../components/ProductListPanel.vue';
</script>

<style scoped>
.main-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.ecwid-container {
  max-width: 900px;
  margin: 0 auto;
}
.banner {
  font-size: 1.1em;
  background: #fffbe6;
  color: #b79d27;
  padding: 10px 18px;
  border-radius: 6px;
  margin-bottom: 24px;
  border: 1px solid #ffe58f;
}

/* Мобильная адаптация контейнера */
@media (max-width: 900px) {
  .ecwid-container {
    max-width: 98vw;
    padding-left: 2vw;
    padding-right: 2vw;
  }
}
@media (max-width: 700px) {
  .main-root > div[style*='display: flex'] {
    flex-direction: column !important;
    padding: 0;
    gap: 0;
  }
  .ecwid-container {
    padding: 0 2vw;
  }
}

/* Мобильный футер-бар */
.ec-footer-tab-bar {
  display: flex;
  background: #fff;
  border-top: 1px solid #eee;
  height: 62px;
  box-shadow: 0 -2px 16px #0001;
  justify-content: space-around;
  align-items: stretch;
}
.ec-footer-tab-bar__item {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  font-size: 0.92em;
  color: #828282;
  position: relative;
  cursor: pointer;
  transition: background 0.14s;
  user-select: none;
}
.ec-footer-tab-bar__item--active {
  color: #ee3a78;
  font-weight: 600;
  background: #fcf7fc;
}
.ec-footer-tab-bar__icon {
  display: block;
  width: 26px;
  height: 26px;
  margin-bottom: 3px;
  background: no-repeat center/contain;
}
/* Пример заполнителей под иконки */
.icon-account {
  background-image: url('data:image/svg+xml;utf8,<svg ... />');
}
.icon-track {
  background-image: url('data:image/svg+xml;utf8,<svg ... />');
}
.icon-cart {
  background-image: url('data:image/svg+xml;utf8,<svg ... />');
}

/* Счетчик на кнопке корзины */
.ec-footer-tab-bar__counter {
  position: absolute;
  top: 7px;
  right: 20px;
  background: #ee3a78;
  color: #fff;
  border-radius: 50%;
  min-width: 19px;
  min-height: 19px;
  font-size: 0.82em;
  text-align: center;
  line-height: 19px;
  font-weight: bold;
  padding: 0 5px;
  box-shadow: 0 2px 10px #0001;
}

@media (max-width: 700px) {
  .ec-footer-tab-bar {
    height: 60px;
    font-size: 0.97em;
  }
  .ec-footer-tab-bar__icon {
    width: 23px;
    height: 23px;
    margin-bottom: 2px;
  }
  .ec-footer-tab-bar__counter {
    top: 6px;
    right: 13px;
    font-size: 0.78em;
    min-width: 17px;
    min-height: 17px;
    line-height: 17px;
  }
}

@media (max-width: 480px) {
  .banner {
    font-size: 1em;
    padding: 7px 10px;
    border-radius: 4px;
    margin-bottom: 14px;
  }
  .ecwid-container {
    padding-left: 1vw;
    padding-right: 1vw;
  }
  .ec-footer-tab-bar {
    height: 56px;
    font-size: 0.9em;
  }
  .ec-footer-tab-bar__icon {
    width: 20px;
    height: 20px;
  }
}
</style>
