export default defineNuxtRouteMiddleware(async (to) => {

  if (process.server) return;
  
  const token = localStorage.getItem('access_token');


  const validateTokenWithKeycloak = async (token) => {
    try {
      const response = await fetch("http://localhost:8090/realms/evidencia3s/protocol/openid-connect/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const isProtectedRoute = to.path === '/protected';
  const isAuthRoute = to.path === '/auth/login' || to.path === '/auth/register';

  if (isProtectedRoute) {
    const isTokenValid = token ? await validateTokenWithKeycloak(token) : false;
    if (!isTokenValid) {
      return navigateTo('/auth/login');
    }
  }

  if (isAuthRoute && token) {
    const isTokenValid = await validateTokenWithKeycloak(token);
    if (isTokenValid) {
      return navigateTo('/protected');
    }
  }
});
