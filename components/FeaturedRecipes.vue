<template>
  <div>
    <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Recettes en vedette</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      <div v-for="recipe in recipes" :key="recipe._id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="recipe.images[0] || '/salade.jpg'" :alt="recipe.title" class="w-full h-32 sm:h-40 md:h-48 object-cover">
        <div class="p-3 sm:p-4">
          <h3 class="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{{ recipe.title }}</h3>
          <p class="text-sm sm:text-base text-gray-600 mb-2">{{ recipe.description.substring(0, 100) }}...</p>
          <div class="flex justify-between text-sm text-gray-500">
            <span>{{ recipe.preparationTime + recipe.cookingTime }} min</span>
            <span>{{ recipe.difficulty }}</span>
          </div>
          <NuxtLink :to="`/recipes/${recipe._id}`" class="mt-2 inline-block bg-[#f6af4c] text-white px-4 py-2 rounded-md hover:bg-[#e59d3a] transition-colors">
            Voir la recette
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: []
    }
  },
  async fetch() {
    try {
      this.recipes = await this.$axios.$get('/api/recipes')
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error)
    }
  }
}
</script>