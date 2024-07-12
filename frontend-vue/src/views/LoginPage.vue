<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="login" class="space-y-6">
        <BaseInputText
          id="username"
          label="Username"
          v-model="formData.username"
          placeholder="Enter your username"
          required
        />
        <BaseInputText
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="Enter your username"
          required
        />
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { UserLoginPayload } from "@/types";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "vue-router";
import BaseInputText from "@/components/BaseInputText.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    BaseInputText,
  },
  setup() {
    const formData = ref<UserLoginPayload>({
      username: "",
      password: "",
    });
    const router = useRouter();
    const login = async () => {
      try {
        const response = await AuthService.login(formData.value);
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        router.push({ name: "home" });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      formData,
      login,
    };
  },
});
</script>
