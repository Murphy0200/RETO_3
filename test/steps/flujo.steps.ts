import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Actor } from '../e2e-screenplay/actors/Actor';
import { OpenApp, Login, AddToCart, Checkout, SortProducts, VerifyOrder} from '../e2e-screenplay/tasks/Tasks';
import { Ensure } from '../e2e-screenplay/questions/Questions';
import { Browser, chromium, expect } from '@playwright/test';
import { Targets } from '../e2e-screenplay/targets/UIElements';
import type { Page } from 'playwright';

import { setDefaultTimeout } from '@cucumber/cucumber';
setDefaultTimeout(60 * 1000); // 60 segundos


let actor: Actor;
let browser: Browser;
let page: Page;

Before(async function () {
    const isCI = process.env.CI === 'true'; 
    browser = await chromium.launch({
        headless: isCI, 
        slowMo: isCI ? 0 : 500 
    });
    const context = await browser.newContext();
    page = await context.newPage();
});


After(async function () {
    await browser.close();
});

Given('que el usuario está en la página de inicio de sesión', async function () {
    actor = Actor.named('Usuario', page);
    await actor.attemptsTo(
        OpenApp.at('https://www.saucedemo.com/v1/index.html')
    );
});

When('inicia sesión con usuario {string} y contraseña {string}', async function (username: string, password: string) {
    await actor.attemptsTo(
        Login.withCredentials(username, password)
    );
});

When('agrega el producto {string} al carrito', async function (producto: string) {
  await AddToCart.product(actor, producto);
});

When('completa el proceso de compra con nombre {string}, apellido {string} y código postal {string}', async function (nombre: string, apellido: string, zip: string) {
  await Checkout.complete(actor, nombre, apellido, zip);
});



When('ordena los productos por {string}', async function (criterio: string) {
    await actor.attemptsTo(
        SortProducts.by(criterio)
    );
});

Then('debería ver el mensaje {string}', async function (mensaje: string) {
    const visible = await Ensure.that(page).containsText(mensaje, Targets.CHECKOUT_PAGE.CONFIRMATION_MESSAGE);
    expect(visible).toBeTruthy();
});

Then('debería ver el mensaje de error {string}', async function (mensaje: string) {
    const visible = await Ensure.that(page).containsText(mensaje, Targets.LOGIN_PAGE.ERROR_MESSAGE);
    expect(visible).toBeTruthy();
});

Then('el primer producto mostrado debería tener el precio más bajo', async function () {
    const visible = await Ensure.that(page).containsText('7.99', '.inventory_item_price'); 
    expect(visible).toBeTruthy();
});
