import { Actor } from '../actors/Actor';

export class Ensure {
    static that(page: any) {
        return {
            containsText: async (text: string, selector: string) => {
                const content = await page.textContent(selector);
                return content?.includes(text) || false;
            }
        };
    }
}
