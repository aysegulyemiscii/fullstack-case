<template>
  <table class="min-w-full bg-white rounded-xl shadow">
    <thead>
      <tr class="bg-gray-200 text-gray-700 text-left text-sm">
        <th class="px-6 py-3">#</th>
        <th class="px-6 py-3">Ürün Adı</th>
        <th class="px-6 py-3">Fiyat</th>
        <th class="px-6 py-3">Açıklama</th>
        <th class="px-6 py-3">İşlem</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        class="border-t hover:bg-gray-50"
      >
        <td class="px-6 py-3">{{ product.id }}</td>
        <td class="px-6 py-3">{{ product.name }}</td>
        <td class="px-6 py-3">{{ product.price }} ₺</td>
        <td class="px-6 py-3 text-gray-600">
          {{ product.description || '-' }}
        </td>
        <td class="px-6 py-3">
          <button
            @click="$emit('edit', product)"
            class="text-orange-600 hover:underline text-sm"
          >
            Düzenle
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['products'])
defineEmits(['edit'])
</script>
