<template>
  <div class="recent-products-panel force-widget-border">
    <div class="settings-btn-block">
      <button type="button" class="ecwid-btn-settings" @click="openSettings">
        <span class="ecwid-btn-settings__icon" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            style="vertical-align: -4px"
          >
            <path
              fill="#fff"
              d="M17.7 12.7c.1-.5.3-1 .3-1.7s-.1-1.2-.3-1.7l1.9-1.5c.2-.2.2-.4.1-.7l-1.8-3.1c-.1-.2-.4-.3-.6-.2l-2.3.9a6.9 6.9 0 0 0-1.4-.8l-.4-2.4A.51.51 0 0 0 12 1h-4a.51.51 0 0 0-.5.5l-.4 2.4c-.5.2-.9.5-1.3.8l-2.3-.9c-.2-.1-.5 0-.6.2l-1.8 3.1c-.1.2-.1.5.1.7l1.9 1.5c-.1.5-.2 1-.2 1.7s.1 1.2.3 1.7l-1.9 1.5c-.2.2-.2.5-.1.7l1.8 3.1c.1.2.4.3.6.2l2.3-.9c.4.3.9.6 1.4.8l.4 2.4c.1.2.2.4.5.4h4c.2 0 .4-.2.5-.5l.4-2.4c.5-.2.9-.5 1.4-.8l2.3.9c.2.1.5 0 .6-.2l1.8-3.1a.44.44 0 0 0-.1-.7l-1.9-1.5zm-7.7 2.1a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
            />
          </svg>
        </span>
        Widget Settings Page
      </button>
    </div>
    <template v-if="enabled">
      <div class="recent-products-panel__header">
        <span class="recent-products-panel__title">
          Recently added products
        </span>
        <span class="recent-products-panel__controls">
          Show:
          <select v-model.number="limit" @change="fetchProducts">
            <option v-for="n in [3, 5, 10, 15]" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
        </span>
      </div>
      <div class="recent-products-panel__list">
        <div
          v-for="item in products"
          :key="item.id"
          class="recent-products-panel__item"
        >
          <a
            :href="productLink(item)"
            class="recent-products-panel__img-link"
            rel="noopener"
            @click.prevent="goToProduct(item)"
          >
            <img
              :src="item.imageUrl || item.thumbnailUrl"
              :alt="item.name"
              class="recent-products-panel__img"
            />
          </a>
          <div class="recent-products-panel__info">
            <a
              :href="productLink(item)"
              class="recent-products-panel__name"
              rel="noopener"
              @click.prevent="goToProduct(item)"
              >{{ item.name }}</a
            >
            <span class="recent-products-panel__price">
              {{ currency(item.price, item.currency) }}
            </span>
          </div>
          <button
            class="btn btn-success btn-large recent-products-panel__buy"
            @click="buyNow(item)"
          >
            Buy now
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="recent-products-disabled">
        <div
          style="
            text-align: center;
            color: #b24369;
            line-height: 1.6;
            margin: 24px 0 14px 0;
          "
        >
          <b>Widget is disabled by admin.<br />Enable it in Widget Settings.</b>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { showSettingsPanel } from '../mountWidgetSettingsPanel';

const enabled = ref(true);
const limit = ref(5);
const products = ref<any[]>([]);

function openSettings() {
  showSettingsPanel();
}
function readEnabled() {
  const st = localStorage.getItem('recent_widget_enabled');
  enabled.value = st === '1';
}
function widgetSettingsUpdatedHandler() {
  readEnabled();
  if (enabled.value) fetchProducts();
  else products.value = [];
}

onMounted(() => {
  readEnabled();
  if (enabled.value) fetchProducts();
  window.addEventListener(
    'widget-settings-updated',
    widgetSettingsUpdatedHandler
  );
});
onUnmounted(() => {
  window.removeEventListener(
    'widget-settings-updated',
    widgetSettingsUpdatedHandler
  );
});
watch(limit, () => {
  if (enabled.value) fetchProducts();
});

function currency(amount: number, code: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
  }).format(Number(amount) || 0);
}
function productLink(product: any) {
  let slug = '';
  if (product.slug) slug = product.slug;
  else if (product.name)
    slug = encodeURIComponent(product.name.replace(/\s+/g, '-'));
  else slug = `p-${product.id}`;
  return `#!/` + slug + `/p/${product.id}`;
}
function goToProduct(product: any) {
  window.location.href = productLink(product);
}
function buyNow(product: any) {
  let ids = JSON.parse(localStorage.getItem('recent_widget_cart') || '[]');
  if (!ids.includes(product.id)) {
    ids.push(product.id);
    localStorage.setItem('recent_widget_cart', JSON.stringify(ids));
  }
  let names = JSON.parse(localStorage.getItem('recent_widget_names') || '[]');
  if (!names.includes(product.name)) {
    names.push(product.name);
    localStorage.setItem('recent_widget_names', JSON.stringify(names));
  }
  window.location.href = productLink(product);
}
async function fetchProducts() {
  try {
    const res = await fetch(`/api/products/recent?limit=${limit.value}`);
    const json = await res.json();
    products.value = json.items || [];
  } catch {
    products.value = [];
  }
}
</script>

<style>
.ecwid-btn-settings {
  display: inline-block !important;
  background: linear-gradient(90deg, #ee3a78 0%, #efb732 100%) !important;
  color: #fff !important;
  font-weight: 600 !important;
  font-size: 1.01em !important;
  border-radius: 7px !important;
  border: none !important;
  box-shadow: 0 3px 7px 0 #ee3a7836 !important;
  padding: 8px 19px 8px 13px !important;
  margin: 0 auto !important;
  cursor: pointer !important;
}
.ecwid-btn-settings__icon {
  display: inline-block !important;
  margin-right: 7px;
}
.ecwid-btn-settings:hover {
  background: linear-gradient(90deg, #efb732 0%, #ee3a78 100%) !important;
}
.settings-btn-block {
  text-align: center;
  margin-bottom: 13px;
}
.recent-products-panel.force-widget-border {
  border: 4px solid #ef4d8c !important;
  border-radius: 18px !important;
  background: #fff7fa !important;
  margin: 30px 0 16px 0 !important;
  padding: 23px !important;
  display: flex !important;
  flex-direction: column !important;
}
.recent-products-panel__header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 13px;
}
.recent-products-panel__title {
  font-weight: 700;
  color: #ee3a78;
  font-size: 1.27em;
}
.recent-products-panel__controls select {
  border-radius: 5px;
  margin-left: 6px;
  padding: 3px 9px;
  border: 1.6px solid #f98ab6;
  background: #fff4f8;
}
.recent-products-panel__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 450px;
  overflow-y: auto;
}
.recent-products-panel__item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 7px 12px 7px 2px;
  background: #fff;
  min-height: 94px;
}
.recent-products-panel__img-link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px !important;
  max-width: 80px !important;
  min-height: 80px !important;
  max-height: 80px !important;
}
.recent-products-panel__img {
  width: 80px !important;
  height: 80px !important;
  object-fit: cover !important;
  border-radius: 8.5px;
  border: 2px solid #f98ab6;
  background: #fff;
}
.recent-products-panel__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 1.11em;
}
.recent-products-panel__name {
  font-weight: 600;
  color: #222;
  text-decoration: none;
}
.recent-products-panel__price {
  font-size: 1.08em;
  color: #b99d31;
}
.recent-products-panel__buy {
  margin-left: auto;
  white-space: nowrap;
  border-radius: 6px;
  min-width: 104px;
  font-size: 1.07em;
  padding: 7px 20px;
}

/* ===== Мобильная адаптация ===== */
@media (max-width: 768px) {
  .recent-products-panel__item {
    flex-wrap: wrap;
    gap: 12px;
  }
  .recent-products-panel__img-link,
  .recent-products-panel__img {
    min-width: 64px !important;
    max-width: 64px !important;
    min-height: 64px !important;
    max-height: 64px !important;
  }
  .recent-products-panel__buy {
    font-size: 1em;
    padding: 6px 14px;
    min-width: auto;
  }
}
@media (max-width: 480px) {
  .recent-products-panel__item {
    flex-direction: column;
    align-items: flex-start;
  }
  .recent-products-panel__img-link,
  .recent-products-panel__img {
    min-width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
  }
  .recent-products-panel__buy {
    width: 100%;
    text-align: center;
  }
}
</style>
