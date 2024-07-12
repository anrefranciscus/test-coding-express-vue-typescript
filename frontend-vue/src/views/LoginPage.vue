<template>
  <form @submit.prevent="login" class="flex flex-col">
    <input
      type="text"
      v-model="formData.username"
      placeholder="Username"
      required
    />
    <input
      type="password"
      v-model="formData.password"
      placeholder="Password"
      required
    />
    <button type="submit">Login</button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import type { UserLoginPayload } from "@/types";
import { AuthService } from "@/services/AuthService";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
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
