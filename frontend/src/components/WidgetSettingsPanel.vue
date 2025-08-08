<template>
  <transition name="fade-widget">
    <div v-if="visible" class="widget-settings-panel">
      <div class="widget-settings-overlay" @click="close"></div>
      <div class="widget-settings-main">
        <div class="widget-settings-header">
          <span>Widget Settings</span>
          <button class="widget-settings-close" @click="close">&times;</button>
        </div>
        <div class="widget-settings-scroll-content">
          <div v-if="step === 1" class="step-block">
            <div class="question">Are you owner of store?</div>
            <div class="btn-group">
              <button class="btn-ecwid-primary" @click="step = 2">Yes</button>
              <button class="btn-ecwid-default" @click="close">No</button>
            </div>
          </div>
          <div v-else-if="step === 2" class="step-block">
            <div class="question">What's your name?</div>
            <input
              type="text"
              v-model="ownerName"
              class="field__input field mb-2"
              @keyup.enter="checkName"
            />
            <div class="btn-group">
              <button class="btn-ecwid-primary" @click="checkName">
                Enter
              </button>
            </div>
          </div>
          <div v-else>
            <div class="ec-description mb-3" style="color: #676073">
              <p>
                <b>What does this app do?</b><br />
                The “Recently added products” widget displays a dynamic list of
                your freshest catalog items on cart/checkout pages. Sellers can
                turn the widget ON/OFF and export product data via CSV/XLSX.
              </p>
            </div>
            <div class="form-group mb-3">
              <label class="field__label" style="margin-bottom: 6px"
                >Enable widget for customers:</label
              >
              <div class="btn-group">
                <button
                  :class="enabled ? 'btn-ecwid-primary' : 'btn-ecwid-default'"
                  @click="enabled = true"
                >
                  Yes
                </button>
                <button
                  :class="!enabled ? 'btn-ecwid-primary' : 'btn-ecwid-default'"
                  @click="enabled = false"
                >
                  No
                </button>
              </div>
            </div>
            <!-- Catalog Export -->
            <h2 class="section-title">Catalog Export</h2>
            <div class="section-description">
              Select products to export as CSV/XLSX. Use checkboxes to pick, or
              export all at once.
            </div>
            <div v-if="loading" style="padding: 20px; text-align: center">
              Loading products...
            </div>
            <div v-else>
              <div class="catalog-export-table-scroll">
                <table class="ec-table export-products-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          :checked="allChecked"
                          @change="toggleSelectAll"
                        />
                      </th>
                      <th>Name</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Currency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="p in exportProducts" :key="p.id">
                      <td>
                        <input
                          type="checkbox"
                          :checked="selectedIds.includes(p.id)"
                          @change="toggleSelection(p.id)"
                        />
                      </td>
                      <td>{{ p.name }}</td>
                      <td>{{ p.sku }}</td>
                      <td>{{ p.price }}</td>
                      <td>{{ currencySymbol(p.currency) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="margin-top: 12px; display: flex; gap: 8px">
                <button
                  class="btn-ecwid-primary"
                  :disabled="!selectedIds.length"
                  @click="doExport('csv')"
                >
                  Export CSV
                </button>
                <button
                  class="btn-ecwid-default"
                  :disabled="!selectedIds.length"
                  @click="doExport('xlsx')"
                >
                  Export XLSX
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="widget-settings-bottom">
          <button class="btn-ecwid-save" @click="saveAndClose">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue';
import * as XLSX from 'xlsx';

const props = defineProps<{ visible: boolean; onClose?: () => void }>();
const step = ref(1);
const ownerName = ref('');
const enabled = ref(true);

const exportProducts = ref<any[]>([]);
const selectedIds = ref<number[]>([]);
const loading = ref(false);

function fetchExportProducts() {
  loading.value = true;
  fetch('/api/products/recent?limit=100')
    .then((r) => r.json())
    .then((json) => {
      exportProducts.value = Array.isArray(json.items) ? json.items : [];
      loading.value = false;
    })
    .catch(() => {
      exportProducts.value = [];
      loading.value = false;
    });
}

onMounted(() => {
  const st = localStorage.getItem('recent_widget_enabled');
  enabled.value = st === '1';
  fetchExportProducts();
});

// Показываем $ всегда (или кастомное, если потребуется)
function currencySymbol(curr?: string) {
  // Можно расширить до поддержки других валют, если надо
  return '$';
}

const allChecked = computed(
  () =>
    exportProducts.value.length > 0 &&
    selectedIds.value.length === exportProducts.value.length
);
function toggleSelectAll() {
  if (allChecked.value) selectedIds.value = [];
  else selectedIds.value = exportProducts.value.map((p) => p.id);
}
function toggleSelection(id: number) {
  const idx = selectedIds.value.indexOf(id);
  if (idx >= 0) selectedIds.value.splice(idx, 1);
  else selectedIds.value.push(id);
}

function doExport(format: 'csv' | 'xlsx') {
  const items = exportProducts.value.filter((p) =>
    selectedIds.value.includes(p.id)
  );
  if (!items.length) return;
  const headers = ['id', 'name', 'sku', 'price', 'currency'];
  const rows = [
    headers,
    ...items.map((obj) => [
      obj.id,
      obj.name,
      obj.sku,
      obj.price,
      currencySymbol(obj.currency), // ВСЕГДА $ для экспорта
    ]),
  ];
  if (format === 'csv') {
    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  } else {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    const xlsxBlob = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const a = document.createElement('a');
    const blob = new Blob([xlsxBlob], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    a.href = URL.createObjectURL(blob);
    a.download = 'export.xlsx';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}

function close() {
  if (props.onClose) props.onClose();
}
function checkName() {
  if (ownerName.value.trim() === 'Lukas') step.value = 3;
}
function saveAndClose() {
  localStorage.setItem('recent_widget_enabled', enabled.value ? '1' : '0');
  window.dispatchEvent(new CustomEvent('widget-settings-updated'));
  close();
}
</script>

<style>
.fade-widget-enter-active,
.fade-widget-leave-active {
  transition: opacity 0.18s ease;
}
.fade-widget-enter-from,
.fade-widget-leave-to {
  opacity: 0;
}

.widget-settings-panel {
  position: fixed;
  inset: 0;
  z-index: 19999;
}
.widget-settings-overlay {
  position: absolute;
  inset: 0;
  background: rgba(40, 38, 51, 0.33);
  z-index: 1;
}
.widget-settings-main {
  position: absolute;
  left: 50%;
  top: 55px;
  transform: translateX(-50%);
  width: 600px;
  max-width: 98vw;
  background: #fff7fa;
  border: 4px solid #ef4d8c;
  border-radius: 13px;
  box-shadow: 0 2px 10px 1px #fbaedc26;
  z-index: 2;
  display: flex;
  flex-direction: column;
  max-height: 87vh;
}

.widget-settings-header {
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  font-weight: 700;
  color: #ee3a78;
  padding: 18px 30px 12px 30px;
  border-bottom: 1.6px solid #f98ab6;
  background: #fff7fa;
  border-radius: 9px 9px 0 0;
}
.widget-settings-close {
  background: none;
  border: none;
  font-size: 1.5em;
  color: #ee3a78;
  cursor: pointer;
}
.widget-settings-scroll-content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 18px 30px 8px 30px;
  min-height: 100px;
  max-height: 420px;
}
.widget-settings-bottom {
  flex: 0 0 auto;
  padding: 16px 30px 16px 30px;
  border-top: 1.6px solid #f98ab6;
  border-radius: 0 0 9px 9px;
  background: #fff7fa;
  text-align: center;
}

.catalog-export-table-scroll {
  max-height: 220px;
  overflow-y: auto;
  border: 1.6px solid #f98ab6;
  border-radius: 9px;
  background: #fff;
  margin: 10px 0 0 0;
}

.step-block {
  padding: 22px 0 14px 0;
  text-align: center;
}
.question {
  font-size: 1.05em;
  margin-bottom: 12px;
  font-weight: 600;
  color: #b24369;
}
.btn-group {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.btn-ecwid-primary {
  background: linear-gradient(90deg, #ee3a78 0%, #efb732 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 7px;
  padding: 6px 18px;
  cursor: pointer;
}
.btn-ecwid-primary:hover {
  background: linear-gradient(90deg, #efb732 0%, #ee3a78 100%);
}
.btn-ecwid-default {
  background: #fff;
  border: 1.6px solid #f98ab6;
  color: #b24369;
  font-weight: 600;
  border-radius: 7px;
  padding: 6px 18px;
  cursor: pointer;
}
.btn-ecwid-save {
  background: #ee3a78;
  color: #fff;
  border-radius: 7px;
  border: none;
  padding: 8px 24px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 #ee3a7840;
}
.btn-ecwid-save:hover {
  background: #efb732;
}
.section-title {
  font-size: 1.17em;
  margin: 26px 0 9px;
  color: #ee3a78;
  font-weight: 700;
}
.section-description {
  color: #888;
  font-size: 0.98em;
  margin-bottom: 8px;
}
.ec-table.export-products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0;
  font-size: 1em;
}
.ec-table.export-products-table th,
.ec-table.export-products-table td {
  border-bottom: 1px solid #f98ab6;
  padding: 5px 7px;
  text-align: left;
  white-space: nowrap;
}
.ec-table.export-products-table th {
  background: #fff4f8;
  color: #b24369;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
