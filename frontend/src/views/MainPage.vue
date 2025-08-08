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
          <!-- Витрина Ecwid вставляется скриптом Ecwid-->
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
</style>
