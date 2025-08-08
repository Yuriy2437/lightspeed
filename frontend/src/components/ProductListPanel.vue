<template>
  <aside class="ecwid-container product-sidebar">
    <!-- Toolbar -->
    <div class="toolbar mb-2">
      <button type="button" class="btn btn-primary btn-medium">
        <span class="svg-icon">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M9.9968 8.0396h6.0302c.5374 0 .973.4356.973.973s-.4356.973-.973.973H9.9968V16c0 .5523-.4477 1-1 1h-.023c-.5523 0-1-.4477-1-1V9.9884H1.9744C1.4363 9.9884 1 9.5521 1 9.014s.4363-.9744.9744-.9744h5.9994V2c0-.5523.4477-1 1-1h.0244c.5523 0 1 .4477 1 1v6.0396h-.0014z"
            />
          </svg>
        </span>
        <span class="gwt-InlineLabel">Add New Product</span>
      </button>
      <button type="button" class="btn btn-default btn-medium ml-1">
        Import Products
      </button>
    </div>

    <!-- Поиск -->
    <div class="filtered-list__header mb-1">
      <div class="filter-panel__search">
        <div class="fieldset fieldset--icon fieldset--with-label">
          <div>
            <div class="fieldset__field-wrapper">
              <div class="field field--medium">
                <span class="fieldset__svg-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#9C9C9C"
                    viewBox="0 0 16 16"
                    width="18"
                  >
                    <path
                      d="M5.8 3.1c1-.9 2.1-1.5 3.6-1.5 1.4 0 2.6.5 3.6 1.5.9 1 1.5 2.1 1.5 3.6 0 1.4-.5 2.6-1.5 3.6-1 .9-2.1 1.5-3.6 1.5-1.3 0-2.6-.5-3.5-1.5-1-1-1.5-2.1-1.5-3.6-.1-1.4.3-2.5 1.4-3.6M.8 16c.2 0 .4-.1.6-.2l3.8-3.7.3.2c1 .7 2.3 1.2 3.8 1.2.9 0 1.8-.2 2.6-.5.8-.4 1.5-.8 2.2-1.5.6-.6 1.1-1.3 1.5-2.1.3-.9.4-1.7.4-2.6 0-.9-.2-1.8-.5-2.6-.4-.8-.8-1.5-1.5-2.2-.6-.6-1.3-1.1-2.1-1.5C11 .2 10.2 0 9.3 0c-.9 0-1.8.2-2.6.5-.8.4-1.5.8-2.2 1.5-.6.6-1.1 1.3-1.4 2.1-.4.9-.5 1.7-.5 2.5 0 1.4.4 2.6 1.2 3.8l.2.3-3.7 3.7c-.2.2-.3.4-.3.7 0 .2.1.4.2.6.3.3.5.3.6.3"
                    />
                  </svg>
                </span>
                <label class="field__label">Product name, SKU</label>
                <input
                  type="text"
                  class="field__input"
                  v-model="search"
                  placeholder="Product name, SKU"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Фильтры -->
    <div class="filtered-list__body mb-2">
      <div class="vertical-filters__names-list">
        <div>
          <div class="vertical-filters__filter-list-item visited">
            <div class="vertical-filters__filter-name">All products</div>
            <div class="vertical-filters__filter-count">126</div>
          </div>
          <div class="vertical-filters__filter-list-item">
            <div class="vertical-filters__filter-name">
              Displayed on storefront
            </div>
            <div class="vertical-filters__filter-count">27</div>
          </div>
          <div class="vertical-filters__filter-list-item">
            <div class="vertical-filters__filter-name">Out of stock</div>
            <div class="vertical-filters__filter-count">8</div>
          </div>
          <div class="vertical-filters__filter-list-item">
            <div class="vertical-filters__filter-name">Disabled</div>
            <div class="vertical-filters__filter-count">99</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Компактный список товаров -->
    <div class="filtered-list__items long-list">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="list-element list-element--compact list-element--has-hover"
        style="align-items: flex-start"
      >
        <div class="list-element__image" style="margin-top: 4px">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            style="width: 48px; height: 48px; object-fit: cover"
          />
        </div>
        <div class="list-element__content">
          <div class="list-element__info">
            <div class="list-element__header">
              <div class="list-element__main-info">
                <div class="list-element__title">
                  <a
                    :href="productLink(product)"
                    target="_blank"
                    style="text-decoration: none"
                  >
                    {{ product.name }}
                  </a>
                </div>
                <div class="list-element__description">
                  <span class="muted">{{ product.sku }}</span>
                </div>
              </div>
              <div class="list-element__price">
                {{ currency(product.price, product.currency) }}
              </div>
            </div>
            <div class="list-element__data-row">
              {{ product.shortDescription }}
            </div>
          </div>
          <div class="list-element__actions" style="margin-top: 6px">
            <button
              class="btn btn-success btn-small"
              @click="addToCart(product.id)"
            >
              Купить сейчас
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const products = ref([
  {
    id: 1,
    name: 'SAMPLE. Black Dress',
    imageUrl:
      'https://dpbfm6h358sh7.cloudfront.net/default-store/black_dress_160px.jpg',
    sku: '0001',
    price: 44.95,
    currency: 'USD',
    shortDescription:
      'Perfect for wearing with your favorite flat sandals or trendy sneakers.',
  },
  {
    id: 2,
    name: 'SAMPLE. Black Tank',
    imageUrl:
      'https://dpbfm6h358sh7.cloudfront.net/default-store/black_tank_160px.jpg',
    sku: '0002',
    price: 19.95,
    currency: 'USD',
    shortDescription: 'Perfect for a day in the sun.',
  },
  {
    id: 3,
    name: 'SAMPLE. Jade Tank',
    imageUrl:
      'https://dpbfm6h358sh7.cloudfront.net/default-store/jade_tank_160px.jpg',
    sku: '0003',
    price: 18.95,
    currency: 'USD',
    shortDescription:
      'This lightweight crinkle gauze tank features an allover floral print.',
  },
]);
const search = ref('');

const filteredProducts = computed(() => {
  if (!search.value.trim()) return products.value;
  return products.value.filter(
    (p) =>
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.value.toLowerCase())
  );
});

function addToCart(productId: number) {
  if (
    window.Ecwid &&
    window.Ecwid.Cart &&
    typeof window.Ecwid.Cart.addProduct === 'function'
  ) {
    window.Ecwid.Cart.addProduct(productId);
  } else {
    alert('Ecwid JS API недоступен. (Тестовая кнопка)');
  }
}

function currency(amount: number, code: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
  }).format(amount);
}

function productLink(product: any) {
  // Для демо: ссылка на страницу товара в вашем storefront или роутере
  return `/product/${product.id}`;
}
</script>

<style scoped>
.product-sidebar {
  background: #fff;
  border-right: 1px solid #eee;
  min-height: 100vh;
  max-width: 340px;
  min-width: 300px;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
}
.list-element--compact {
  border-bottom: 1px solid #f2f2f2;
  padding: 12px 0;
  display: flex;
}
.list-element__image {
  margin-right: 14px;
}
.list-element__content {
  flex: 1;
  min-width: 0;
}
.list-element__title a {
  font-weight: 500;
  color: #222;
}
.btn-small {
  padding: 2px 10px;
  font-size: 14px;
  min-height: 30px;
}
.mb-1 {
  margin-bottom: 8px;
}
.mb-2 {
  margin-bottom: 16px;
}
.ml-1 {
  margin-left: 8px;
}
</style>
