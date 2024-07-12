<template>
    <button
      type="submit"
      class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {{ value }}
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'BaseButton',
    props: {
      value: {
        type: String,
        required: true
      }
    }
  });
  </script>
  