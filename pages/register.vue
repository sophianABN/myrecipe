<template>
    <div>
      <h1 class="text-2xl font-bold text-center my-4">Inscription</h1>
      <Register />
    </div>
  </template>
  
  <script>
  import Register from '~/components/Register.vue'
  
  export default {
    auth: false,
    components: {
      Register
    }
  }
  </script>