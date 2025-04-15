<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Ürünler</h1>
      <button
        @click="openAddModal()"
        class="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
      >
        Yeni Ürün Ekle
      </button>
    </div>

    <ProductTable v-if="products.length > 0" :products="products" @edit="openEditModal"/>
     <p v-else class="text-gray-500 text-center mt-4">Ürün bulunamadı.</p>

    <ProductModal
      v-if="showModal"
      :product-data="selectedProduct"
      :is-edit="isEdit"
      @saved="handleSaved"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductTable from '@/components/ProductTable.vue'
import ProductModal from '@/components/ProductModal.vue'

const router = useRouter()
const products = ref([]);
const showModal = ref(false)
const selectedProduct = ref({})
const isEdit = ref(false)

onMounted(async () => {

  const token = sessionStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }
 
  fetchProducts();
  
})

const fetchProducts = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/products', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        })

        if (response.status === 401) {
        router.push('/login')
        return
        }

        const data = await response.json()
        products.value = data
    } catch (error) {
        console.error('Ürünleri çekerken hata oluştu!', error)
    }
}

const openAddModal = () => {
  selectedProduct.value = {}
  isEdit.value = false
  showModal.value = true
}

const openEditModal = (product) => {
  selectedProduct.value = product
  isEdit.value = true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

const handleSaved = async () => {
  await fetchProducts();
  showModal.value = false;
}
</script>
