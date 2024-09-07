<template>
  <nav class="bg-[#f6af4c] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="/myrecipe_logo.png" alt="MyRecipe Logo" class="h-8 w-auto mr-2">
          </NuxtLink>
        </div>
        <div class="flex">
          <template v-if="!$auth.loggedIn">
            <NuxtLink to="/register" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">S'inscrire</NuxtLink>
            <NuxtLink to="/login" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Se connecter</NuxtLink>
          </template>
          <div v-else class="relative">
            <button @click="toggleDropdown" class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div class="py-1">
                <NuxtLink to="/add-recipe" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ajouter une recette</NuxtLink>
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Déconnexion</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdownOutside)
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation()
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdownOutside(event) {
      if (this.isDropdownOpen && !this.$el.contains(event.target)) {
        this.isDropdownOpen = false
      }
    },
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/login')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  /* Ajoutez vos styles personnalisés ici */
}
</style>