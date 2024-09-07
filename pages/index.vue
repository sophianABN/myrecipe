<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-4 sm:mb-6 lg:mb-8">
      <input type="text" placeholder="Rechercher des recettes..."
        class="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>

    <Categories />
    <div class="p-6 mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Chat OpenAI</h1>
      <Chat class="w-full" />
    </div>
    <FeaturedRecipes class="mb-8 py-4 sm:mb-12 lg:mb-16" />

  </div>
</template>

<script>
import FeaturedRecipes from '~/components/FeaturedRecipes.vue'
import Categories from '~/components/Categories.vue'

export default {
  auth: false,
  components: {
    FeaturedRecipes,
    Categories
  }
}
</script>