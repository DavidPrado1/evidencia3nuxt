<template>
  <div>
    <h1>Página Protegida</h1>
    <div>
      <p>¡Bienvenido, has iniciado sesión!</p>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  const idToken = localStorage.getItem('id_token'); 
  if (!idToken) {
    console.error('No se pudo encontrar el id_token.');
    return;
  }

  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');

  const keycloakLogoutUrl = 'http://localhost:8090/realms/evidencia3s/protocol/openid-connect/logout';
  const postLogoutRedirectUri = encodeURIComponent('http://localhost:3000/auth/login'); 
  window.location.href = `${keycloakLogoutUrl}?post_logout_redirect_uri=${postLogoutRedirectUri}&id_token_hint=${idToken}`;
};

</script>
