import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#txtUsername');
    this.passwordField = page.locator('#txtPassword');
    this.loginButton = page.locator('#btnLogin');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async isLoginPageVisible(): Promise<boolean> {
    return await this.usernameField.isVisible();
  }
}

