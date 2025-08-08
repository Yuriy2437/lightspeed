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
  const resp = await fetch('/api/products/recent?limit=100'); // или отдельный endpoint для всех
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
  // Ожидаем csv-ответ
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
        <td>
          <input
            type="checkbox"
            :value="p.id"
            @change="toggleSelection(p.id)"
            :checked="selected.includes(p.id)"
          />
        </td>
        <td>{{ p.name }}</td>
        <td>{{ p.price }}</td>
        <td>{{ p.currency || '$' }}</td>
      </tr>
    </tbody>
  </table>
  <button @click="exportSelected" :disabled="selected.length === 0">
    Export Selected
  </button>
</template>

<style scoped>
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
</style>
