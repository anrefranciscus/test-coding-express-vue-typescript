<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <div
        v-if="loginError"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
        role="alert"
      >
        <span class="block sm:inline">{{ loginError }}</span>
      </div>
      <form @submit.prevent="registerUser" class="space-y-6">
        <BaseInputText
          id="name"
          label="Name"
          v-model="formData.name"
          placeholder="Enter your name"
          required
        />
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
        <p class="text-sm text-center mt-4">
          have an account?
          <router-link to="/login" class="text-indigo-600 hover:underline"
            >login here</router-link
          >.
        </p>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { UserRegisterPayload } from "@/types";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "vue-router";
import BaseInputText from "@/components/BaseInputText.vue";
import BaseButton from "@/components/BaseButton.vue";
export default defineComponent({
  name: "RegisterPage",
  components: {
    BaseInputText,
    BaseButton,
  },
  setup() {
    const formData = ref<UserRegisterPayload>({
      name: "",
      username: "",
      password: "",
    });
    const router = useRouter();
    const loginError = ref<string | null>(null);
    const registerUser = async () => {
      try {
        await AuthService.register(formData.value);
        router.push("/login");
      } catch (error: any) {
        loginError.value = error.response.data.message;
      }
    };
    return {
      formData,
      registerUser,
      loginError,
    };
  },
});
</script>
