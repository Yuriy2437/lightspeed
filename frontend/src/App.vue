<template>
  <div class="app-root">
    <!-- Здесь будут подставляться страницы -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// В App.vue обычно логика минимальна — основной смысл в глобальной обёртке
</script>

<style>
/* Базовое оформление всего приложения */
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  background: #f6f6fa; /* общий фон */
  color: #222; /* базовый цвет текста */
}

/* Сброс лишних отступов и унификация */
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
}

/* Глобальные ссылки */
a {
  color: #ee3a78;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

/* Мобильная адаптация шрифта */
@media (max-width: 768px) {
  .app-root {
    font-size: 16px;
  }
}
@media (max-width: 480px) {
  .app-root {
    font-size: 15px;
  }
}

/* Глобальные стили для изображений */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Унифицированные заголовки */
h1,
h2,
h3,
h4,
h5 {
  font-weight: 600;
  margin-top: 0;
}
</style>
