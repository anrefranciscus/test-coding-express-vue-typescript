<template>
  <main>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">Home</h1>
      <div
        v-if="user"
        class="max-w-sm rounded overflow-hidden shadow-lg bg-white mb-4"
      >
        <div class="px-6 py-4">
          <p class="text-xl font-semibold mb-2">Welcome, {{ user.name }}</p>
          <p class="text-gray-700 text-base">Username: {{ user.username }}</p>
        </div>
      </div>
      <p v-else class="text-xl">Please log in or register.</p>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const getUser = () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    };

    return {
      user: getUser(),
    };
  },
});
</script>
