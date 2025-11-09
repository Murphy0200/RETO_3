const fetch = require("node-fetch");
const { describe, test, expect } = require("@jest/globals");




describe("Pruebas de flujo completo - DummyJSON Users", () => {
  const BASE_URL = "https://dummyjson.com";

  // Usuarios válidos para login
  const users = [
    { username: "alexanderj", password: "alexanderjpass" },
    { username: "michaelw", password: "michaelwpass" },
    { username: "ethanm", password: "ethanmpass" },
  ];

  const TEST_TIMEOUT = 20000;

  test(
    "Flujo completo para todos los usuarios",
    async () => {
      for (const user of users) {
        // 1️1 Login
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.username, password: user.password }),
        });

        expect(loginRes.status).toBe(200); 
        const loginData = await loginRes.json();
        expect(loginData).toHaveProperty("accessToken");
        const token = loginData.accessToken;

        // 2 Lista de usuarios
        const listRes = await fetch(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        expect(listRes.status).toBe(200);
        const listData = await listRes.json();
        expect(listData.users.length).toBeGreaterThan(0);

        // 3 Consulta del usuario autenticado
        const meRes = await fetch(`${BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        expect(meRes.status).toBe(200); 
        const meData = await meRes.json();
        expect(meData.username).toBe(user.username);

  
        console.log(`Flujo completo OK para ${user.username}`);
      }
    },
    TEST_TIMEOUT
  );
});
