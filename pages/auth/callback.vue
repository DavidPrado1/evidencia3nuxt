<template>
  <div>
    <h1>Autenticando...</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="loading">Cargando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const error = ref(null);
const loading = ref(true);


onMounted(async () => {
  console.log('Current URL:', window.location.href);
  const { error: keycloakError, code, id_token_hint} = route.query;
  if (keycloakError) {
    error.value = `Error: ${keycloakError}`;
    loading.value = false;
    return;
  }

  if (code) {
    try {
      const tokenResponse = await fetch('http://localhost:8090/realms/evidencia3s/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: 'nuxt-client',
          client_secret: config.public.KEYCLOAK_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/auth/callback',
          code: code,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        localStorage.setItem('access_token', tokenData.access_token);
        localStorage.setItem('id_token', tokenData.id_token);

        router.push('/protected');
      } else {
        error.value = 'Error al obtener el token.';
      }
    } catch (err) {
      error.value = `Error: ${err.message}`;
    }
  } else {
    error.value = 'No se recibió el código de autorización.';
  }

  loading.value = false;
});
</script>
