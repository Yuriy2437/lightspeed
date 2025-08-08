import { createApp } from 'vue';
import RecentProductsWidget from './components/RecentProductsWidget.vue';
import { injectRecentProductsBelowCheckout } from './utils/ecwid-inject';

injectRecentProductsBelowCheckout(() => {
  const el = document.getElementById('recent-products-panel-widget');
  if (el && el.childNodes.length === 0) {
    createApp(RecentProductsWidget).mount(el);
  }
});
