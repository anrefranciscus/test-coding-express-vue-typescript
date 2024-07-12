<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <div
        v-if="loginError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
        role="alert"
      >
        <span class="block sm:inline">{{ loginError }}</span>
      </div>
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
          placeholder="Enter your password"
          required
        />
        <BaseButton value="Login" />
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
import BaseButton from "@/components/BaseButton.vue";
export default defineComponent({
  name: "LoginPage",
  components: {
    BaseInputText,
    BaseButton,
  },
  setup() {
    const formData = ref<UserLoginPayload>({
      username: "",
      password: "",
    });
    const router = useRouter();
    const loginError = ref<string | null>(null);
    const login = async () => {
      try {
        const response = await AuthService.login(formData.value);
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        router.push({ name: "home" });
      } catch (error: any) {
        loginError.value = error.response.data.message;
      }
    };
    return {
      formData,
      login,
      loginError,
    };
  },
});
</script>
