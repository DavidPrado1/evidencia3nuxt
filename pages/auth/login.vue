<template>
  <div>
    <h1>Iniciar sesión</h1>
    <button @click="redirectToKeycloakLogin">Iniciar sesión con Keycloak</button>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const config = useRuntimeConfig();

const redirectToKeycloakLogin = () => {
  const redirectUri = encodeURIComponent('http://localhost:3000/auth/callback')
  const loginUrl = `${config.public.KEYCLOAK_ISSUER_URL}/realms/${config.public.KEYCLOAK_REALM}/protocol/openid-connect/auth?client_id=${config.public.KEYCLOAK_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;

  window.location.href = loginUrl;
};
</script>
