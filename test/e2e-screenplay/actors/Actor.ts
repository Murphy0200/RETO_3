import { Page } from 'playwright';

export class Actor {
  constructor(public name: string, public page: Page) {}

  static named(name: string, page: Page) {
    return new Actor(name, page);
  }

  async attemptsTo(...tasks: any[]) {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }
}
