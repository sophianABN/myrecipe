<template>
  <div>
    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold my-4 sm:my-6 md:my-8">Catégories</h2>
    <div class="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
      <button 
        v-for="category in categories" 
        :key="category" 
        class="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base bg-[#8FC2CC] text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: ['Entrées', 'Plats principaux', 'Desserts', 'Boissons', 'Salades']
    }
  }
}
</script>