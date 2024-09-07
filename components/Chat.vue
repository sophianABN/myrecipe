<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="chat flex flex-col h-[250px]">
      <div class="messages flex-grow overflow-y-auto mb-4 border border-gray-300 rounded-lg p-4" style="max-height: 400px;">
        <div v-for="(message, index) in messages" :key="index" :class="[
          'mb-4 p-3 rounded-lg',
          message.role === 'user' ? 'bg-blue-100 text-right' : 
          message.role === 'assistant' ? 'bg-gray-100' : 
          'bg-red-100 text-red-700'
        ]">
          {{ message.content }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex">
        <input v-model="inputMessage" type="text" placeholder="Tapez votre message..." class="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      inputMessage: '',
    };
  },
  methods: {
    async sendMessage() {
      if (!this.inputMessage.trim()) return;

      this.messages.push({ role: 'user', content: this.inputMessage });
      this.inputMessage = '';

      try {
        const response = await this.$axios.$post('/api/chat', { messages: this.messages.filter(message => message.role !== 'error') });
        this.messages.push({ role: 'assistant', content: response.reply });
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        this.messages.push({ role: 'error', content: 'Une erreur est survenue. Veuillez réessayer.' });
      }
    },
  },
};
</script>