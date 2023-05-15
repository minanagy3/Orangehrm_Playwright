import { Page, Locator } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly adminTab: Locator;
  readonly addUserButton: Locator;
  readonly userCountText: Locator;
  readonly usernameField: Locator;
  readonly saveButton: Locator;
  readonly searchButton: Locator;
  readonly deleteButton: Locator;
  readonly employeeNameField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly userRoleDropdown: Locator;
  readonly statusDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminTab = page.locator('#menu_admin_viewAdminModule');
    this.addUserButton = page.locator('#btnAdd');
    this.userCountText = page.locator('#recordsFound');
    this.usernameField = page.locator('#systemUser_userName');
    this.saveButton = page.locator('#btnSave');
    this.searchButton = page.locator('#searchBtn');
    this.deleteButton = page.locator('#btnDelete');
    this.employeeNameField = page.locator('#systemUser_employeeName_empName');
    this.passwordField = page.locator('#systemUser_password');
    this.confirmPasswordField = page.locator('#systemUser_confirmPassword');
    this.userRoleDropdown = page.locator('#systemUser_userType');
    this.statusDropdown = page.locator('#systemUser_status');
  }

  async navigateToAdminTab() {
    await this.adminTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isAdminTabVisible(): Promise<boolean> {
    return await this.adminTab.isVisible();
  }

  async getRecordCount(): Promise<number> {
    const text = await this.userCountText.textContent();
    if (text) {
      // Extract number from text like "No Records Found" or "1 Record Found"
      const match = text.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    }
    return 0;
  }

  async addUser(username: string, role: string, status: string, password: string, employeeName?: string) {
    await this.addUserButton.click();
    await this.page.waitForLoadState('networkidle');
    
    if (employeeName) {
      await this.employeeNameField.fill(employeeName);
      // Wait for autocomplete and select first option
      await this.page.waitForTimeout(1000);
      await this.page.keyboard.press('ArrowDown');
      await this.page.keyboard.press('Enter');
    }
    
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    
    if (role) {
      await this.userRoleDropdown.selectOption({ label: role });
    }
    
    if (status) {
      await this.statusDropdown.selectOption({ label: status });
    }
    
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchUser(username: string) {
    await this.usernameField.fill(username);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async deleteUser() {
    // First, select the checkbox for the user
    const checkbox = this.page.locator('input[type="checkbox"][name="chkSelectRow[]"]').first();
    await checkbox.check();
    
    await this.deleteButton.click();
    
    // Confirm deletion in dialog
    const confirmButton = this.page.locator('#dialogDeleteBtn');
    await confirmButton.click();
    
    await this.page.waitForLoadState('networkidle');
  }

  async selectUserCheckbox(username: string) {
    // Find the row with the username and select its checkbox
    const row = this.page.locator(`tr:has-text("${username}")`);
    const checkbox = row.locator('input[type="checkbox"]');
    await checkbox.check();
  }
}

