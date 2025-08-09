<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
}

const products = ref<ProductItem[]>([]);
const selected = ref<string[]>([]);

async function fetchProducts() {
  const resp = await fetch('/api/products/recent?limit=100');
  const data = await resp.json();
  products.value = Array.isArray(data.items) ? data.items : [];
}

function toggleSelection(id: string) {
  const idx = selected.value.indexOf(id);
  if (idx >= 0) selected.value.splice(idx, 1);
  else selected.value.push(id);
}

async function exportSelected() {
  if (selected.value.length === 0) return;
  const resp = await fetch('/api/products/export', {
    method: 'POST',
    body: JSON.stringify({ productIds: selected.value }),
    headers: { 'Content-Type': 'application/json' },
  });
  const csv = await resp.text();
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

onMounted(fetchProducts);
</script>

<template>
  <div class="export-widget">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td data-label="">
              <input
                type="checkbox"
                :value="p.id"
                @change="toggleSelection(p.id)"
                :checked="selected.includes(p.id)"
              />
            </td>
            <td data-label="Name">{{ p.name }}</td>
            <td data-label="Price">{{ p.price }}</td>
            <td data-label="Currency">{{ p.currency || '$' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="exportSelected" :disabled="selected.length === 0">
      Export Selected
    </button>
  </div>
</template>

<style scoped>
.export-widget {
  width: 100%;
  max-width: 640px;
}
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 13px;
}
th,
td {
  border-bottom: 1px solid #eee;
  padding: 6px 10px;
  text-align: left;
}
button {
  background: #ee3a78;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
}
button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ===== Мобильная адаптация ===== */
@media (max-width: 600px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    width: 100%;
  }
  thead {
    display: none;
  }
  tr {
    margin-bottom: 10px;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 6px;
    background: #fff;
  }
  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    padding: 6px 4px;
  }
  td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #666;
    padding-right: 10px;
    flex-shrink: 0;
  }
  td[data-label='']::before {
    content: '';
  }
  button {
    width: 100%;
    padding: 10px 0;
    font-size: 1em;
    border-radius: 6px;
  }
}
</style>
