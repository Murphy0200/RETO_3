import { Page } from "@playwright/test";
import { Actor } from '../actors/Actor';
import { Targets } from '../targets/UIElements';

export class OpenApp {
    static at(url: string) {
        return {
            performAs: async (actor: Actor) => {
                await actor.page.goto(url);
            }
        };
    }
}


export class Login {
    static withCredentials(username: string, password: string) {
        return {
            performAs: async (actor: Actor) => {
                await actor.page.fill(Targets.LOGIN_PAGE.USERNAME, username);
                await actor.page.fill(Targets.LOGIN_PAGE.PASSWORD, password);
                await actor.page.click(Targets.LOGIN_PAGE.LOGIN_BUTTON);
            }
        };
    }
}



export class AddToCart {
  static async product(actor: Actor, productName: string) {
    const { page } = actor;
    // Usamos el id exacto grabado
    await page.locator(`[data-test="add-to-cart-sauce-labs-backpack"]`).click();
    await page.locator('[data-test="shopping-cart-link"]').click();
  }
}

export class Checkout {
  static async complete(actor: Actor, firstName: string, lastName: string, postalCode: string) {
    const { page } = actor;

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill(firstName);
    await page.locator('[data-test="lastName"]').fill(lastName);
    await page.locator('[data-test="postalCode"]').fill(postalCode);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

  }
}

export class SortProducts {
    static by(criterio: string) {
        return {
            performAs: async (actor: Actor) => {
                await actor.page.selectOption('.product_sort_container', { label: criterio });
            }
        };
    }
}


export class VerifyOrder {
  static async successMessage(page: Page, expectedMessage: string) {
    const messageLocator = page.locator('.complete-header');
    const messageText = await messageLocator.textContent();

    if (messageText?.trim() !== expectedMessage) {
      throw new Error(
        `❌ El mensaje mostrado fue "${messageText}", pero se esperaba "${expectedMessage}".`
      );
    }

    console.log(`✅ Se verificó correctamente el mensaje: "${expectedMessage}"`);
  }
}
