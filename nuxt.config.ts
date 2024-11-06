export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      KEYCLOAK_ISSUER_URL: process.env.KEYCLOAK_ISSUER_URL,
      KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
      KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
      KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
    },
  },

  compatibilityDate: "2024-11-06",
});