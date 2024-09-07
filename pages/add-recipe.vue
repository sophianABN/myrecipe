<template>
  <div class="max-w-2xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Ajouter une nouvelle recette</h1>
    <form @submit.prevent="submitRecipe" class="space-y-4 sm:space-y-6">
      <div>
        <label for="title" class="block text-sm sm:text-base font-medium text-gray-700">Titre</label>
        <input type="text" id="title" v-model="recipe.title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
      </div>

      <div>
        <label for="description" class="block text-sm sm:text-base font-medium text-gray-700">Description</label>
        <textarea id="description" v-model="recipe.description" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base"></textarea>
      </div>

      <div>
        <label for="ingredients" class="block text-sm sm:text-base font-medium text-gray-700">Ingrédients (un par ligne)</label>
        <textarea id="ingredients" v-model="ingredientsText" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base"></textarea>
      </div>

      <div>
        <label for="instructions" class="block text-sm sm:text-base font-medium text-gray-700">Instructions (une par ligne)</label>
        <textarea id="instructions" v-model="instructionsText" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base"></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="preparationTime" class="block text-sm sm:text-base font-medium text-gray-700">Temps de préparation (minutes)</label>
          <input type="number" id="preparationTime" v-model="recipe.preparationTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
        </div>
        <div>
          <label for="cookingTime" class="block text-sm sm:text-base font-medium text-gray-700">Temps de cuisson (minutes)</label>
          <input type="number" id="cookingTime" v-model="recipe.cookingTime" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
        </div>
      </div>

      <div>
        <label for="difficulty" class="block text-sm sm:text-base font-medium text-gray-700">Difficulté</label>
        <select id="difficulty" v-model="recipe.difficulty" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
          <option value="facile">Facile</option>
          <option value="moyen">Moyen</option>
          <option value="difficile">Difficile</option>
        </select>
      </div>

      <div>
        <label for="servings" class="block text-sm sm:text-base font-medium text-gray-700">Nombre de portions</label>
        <input type="number" id="servings" v-model="recipe.servings" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
      </div>

      <div>
        <label for="category" class="block text-sm sm:text-base font-medium text-gray-700">Catégorie</label>
        <input type="text" id="category" v-model="recipe.category" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
      </div>

      <div>
        <label for="cuisine" class="block text-sm sm:text-base font-medium text-gray-700">Cuisine</label>
        <input type="text" id="cuisine" v-model="recipe.cuisine" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm sm:text-base">
      </div>

      <div>
        <label for="images" class="block text-sm sm:text-base font-medium text-gray-700">Images</label>
        <input type="file" id="images" ref="imagesInput" multiple accept="image/*" @change="handleImageUpload" class="mt-1 block w-full text-sm sm:text-base">
      </div>

      <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Ajouter la recette
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        title: '',
        description: '',
        preparationTime: null,
        cookingTime: null,
        difficulty: 'facile',
        servings: null,
        category: '',
        cuisine: '',
        images: []
      },
      ingredientsText: '',
      instructionsText: '',
    }
  },
  methods: {
    handleImageUpload(event) {
      this.recipe.images = Array.from(event.target.files);
    },
    async submitRecipe() {
      try {
        const formData = new FormData();
        Object.keys(this.recipe).forEach(key => {
          if (key === 'images') {
            this.recipe.images.forEach(image => {
              formData.append('images', image);
            });
          } else {
            formData.append(key, this.recipe[key]);
          }
        });
        formData.append('ingredients', this.ingredientsText.split('\n').filter(i => i.trim()));
        formData.append('instructions', this.instructionsText.split('\n').filter(i => i.trim()));

        const response = await this.$axios.$post('/api/recipes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Recette ajoutée:', response);
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la recette:', error);
      }
    }
  }
}
</script>