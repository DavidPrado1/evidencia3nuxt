// server/api/logout.js
export default defineEventHandler(async (event) => {
    const cookies = useCookies(event); // Obtener cookies
    const accessToken = cookies.get('accessToken'); // Obtener el token de acceso
  
    if (!accessToken) {
      return sendRedirect(event, '/auth/login'); // Si no hay token, redirigir a login
    }
  
    // URL de Keycloak para hacer logout
    const keycloakLogoutUrl = `${process.env.KEYCLOAK_ISSUER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;
  
    try {
      // Llamar a Keycloak para cerrar sesión
      const response = await $fetch(keycloakLogoutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          id_token_hint: accessToken, // El token de acceso
          post_logout_redirect_uri: `${process.env.BASE_URL}/auth/login`, // URL de redirección después del logout
        }),
      });
  
      if (response.ok) {
        // Eliminar cookies relacionadas con el token de acceso
        cookies.delete('accessToken'); // Borrar el token de las cookies
        return sendRedirect(event, '/auth/login');  // Redirigir a la página de login
      } else {
        const errorDetails = await response.text();
        return sendError(event, createError({ statusCode: 500, statusMessage: `Error al cerrar sesión en Keycloak: ${errorDetails}` }));
      }
    } catch (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Error al hacer logout en Keycloak' }));
    }
  });
  