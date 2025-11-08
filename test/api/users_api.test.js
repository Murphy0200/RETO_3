import fetch from "node-fetch";

/**
 * Flujo de pruebas de API - DummyJSON Users
 * 
 * Cobertura:
 * 1️⃣ Login con usuario válido → validación de accessToken
 * 2️⃣ List Users → validación de que se obtiene la lista
 * 3️⃣ Consulta de usuario logueado (/user/me) → validación de datos
 */

describe("Pruebas de flujo completo - DummyJSON Users", () => {
  const BASE_URL = "https://dummyjson.com";

  // Usuarios válidos para login
  const users = [
    { username: "alexanderj", password: "alexanderjpass" },
    { username: "michaelw", password: "michaelwpass" },
    { username: "ethanm", password: "ethanmpass" },
  ];

  // Timeout extendido por si la API responde lento
  const TEST_TIMEOUT = 20000;

  test(
    "Flujo completo para todos los usuarios",
    async () => {
      for (const user of users) {
        // 1️⃣ Login
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username, password: user.password }),
        });

        expect(loginRes.status).toBe(200); // Validar que login es exitoso
        const loginData = await loginRes.json();
        expect(loginData).toHaveProperty("accessToken");
        const token = loginData.accessToken;

        // 2️⃣ List Users
        const listRes = await fetch(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        expect(listRes.status).toBe(200); // Validar listado exitoso
        const listData = await listRes.json();
        expect(listData.users.length).toBeGreaterThan(0);

        // 3️⃣ Consulta usuario logueado
        const meRes = await fetch(`${BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        expect(meRes.status).toBe(200); // Validar que se puede consultar el usuario
        const meData = await meRes.json();
        expect(meData.username).toBe(user.username);

        // Logs opcionales para seguimiento
        console.log(`✅ Flujo completo OK para ${user.username}`);
      }
    },
    TEST_TIMEOUT
  );
});
