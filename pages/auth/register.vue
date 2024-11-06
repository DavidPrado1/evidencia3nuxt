<template>
  <div>
    <h1>Registro</h1>
    <button @click="registerWithKeycloak">Registrar nuevo usuario con Keycloak</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const config = useRuntimeConfig()

const registerWithKeycloak = () => {
  const keycloakRegisterUrl = `${config.public.KEYCLOAK_ISSUER_URL}/realms/${config.public.KEYCLOAK_REALM}/protocol/openid-connect/registrations`
  const redirectUri = encodeURIComponent("http://localhost:3000/auth/callback")
  const registerUrl = `${keycloakRegisterUrl}?client_id=${config.public.KEYCLOAK_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid`

  window.location.href = registerUrl
}
</script>
