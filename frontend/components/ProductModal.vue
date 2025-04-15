<template>
  <div class="fixed inset-0 bg-neutral-700 bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 class="text-xl font-semibold mb-4">
        {{ product?.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle' }}
      </h2>

      <p v-if="message" :class="messageClass" class="mb-4">
        {{ message }}
      </p>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Ürün Adı</label>
          <input
            v-model="product.name"
            type="text"
            class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-orange-400"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Fiyat (₺)</label>
          <input
            v-model.number="product.price"
            type="number"
            min="0"
            step="0.01"
            class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-orange-400"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Açıklama</label>
          <textarea
            v-model="product.description"
            rows="3"
            class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            @click="$emit('close')"
          >
            Vazgeç
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['isEdit', 'productData'])
const emit = defineEmits(['saved'])

const isEdit = props.isEdit ?? false
const productData = props.productData ?? {};
const product = ref({})
const message = ref('')
const messageClass = ref('')

watch(() => props.productData, (newVal) => {
  product.value = { ...newVal }
  message.value = ''
}, { immediate: true })

const submitForm = async () => {
  message.value = 'İşlem yapılıyor...'
  messageClass.value = 'text-gray-500'

  try {
    const url = props.isEdit
      ? `http://localhost:3001/api/products/${product.value.id}`
      : 'http://localhost:3001/api/products'

    const method = props.isEdit ? 'PUT' : 'POST'
    const payload = { name: product.value.name, price: product.value.price, description: product.value.description };
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (response.ok) {
      message.value = props.isEdit ? 'Ürün başarıyla güncellendi ✅' : 'Ürün başarıyla eklendi ✅'
      messageClass.value = 'text-green-600'
      emit('saved');
    } else {
      message.value = data.message || 'Bir hata oluştu!'
      messageClass.value = 'text-red-600'
    }
  } catch (err) {
    message.value = 'Bir hata oluştu!'
    messageClass.value = 'text-red-600'
  }
}
</script>

