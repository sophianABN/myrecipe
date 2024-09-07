<template>
  <div v-if="recipe" class="bg-white shadow-md rounded-lg p-6">
    <h1 class="text-3xl font-bold mb-4">{{ recipe.title }}</h1>
    <img v-if="recipe.images && recipe.images.length" :src="recipe.images[0]" :alt="recipe.title" class="w-full h-64 object-cover rounded-lg mb-4">
    <p class="text-gray-600 mb-4">{{ recipe.description }}</p>
    
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <h2 class="text-xl font-semibold mb-2">Informations</h2>
        <p><strong>Préparation :</strong> {{ recipe.preparationTime }} min</p>
        <p><strong>Cuisson :</strong> {{ recipe.cookingTime }} min</p>
        <p><strong>Difficulté :</strong> {{ recipe.difficulty }}</p>
        <p><strong>Pour :</strong> {{ recipe.servings }} personnes</p>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Ingrédients</h2>
        <ul class="list-disc list-inside">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
        </ul>
      </div>
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-2">Instructions</h2>
      <ol class="list-decimal list-inside">
        <li v-for="(instruction, index) in recipe.instructions" :key="index" class="mb-2">{{ instruction }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      recipe: null
    }
  },
  async fetch() {
    try {
      this.recipe = await this.$axios.$get(`/api/recipes/${this.$route.params.id}`)
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette:', error)
    }
  }
}
</script>