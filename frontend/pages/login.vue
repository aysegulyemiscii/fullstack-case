<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Giriş Yap</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="text-sm text-gray-600">Kullanıcı Adı</label>
          <input
            type="text"
            v-model="username"
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
            required
          />
        </div>

        <div>
          <label class="text-sm text-gray-600">Şifre</label>
          <input
            type="password"
            v-model="password"
            class="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition"
        >
          Giriş Yap
        </button>

         <p v-if="error" class="text-red-600 text-sm mt-3">{{ error }}</p>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Giriş başarısız')
    }

    sessionStorage.setItem('token', data.token)
    router.push('/')
    
  } catch (err) {
    error.value = err.message
  }
}
</script>