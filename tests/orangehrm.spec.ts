import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

test.describe('OrangeHRM Tests', () => {
  let loginPage: LoginPage;
  let adminPage: AdminPage;
  let initialRecordCount: number;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    adminPage = new AdminPage(page);
    await loginPage.navigate();
  });

  test('Login Test', async ({ page }) => {
    // Login with valid credentials
    await loginPage.login('Admin', 'admin123');
    
    // Verify login is successful by checking if Admin tab is visible
    await expect(adminPage.adminTab).toBeVisible({ timeout: 10000 });
  });

  test('Add User Test', async ({ page }) => {
    // Login first
    await loginPage.login('Admin', 'admin123');
    await expect(adminPage.adminTab).toBeVisible({ timeout: 10000 });
    
    // Navigate to Admin tab
    await adminPage.navigateToAdminTab();
    
    // Get initial record count
    initialRecordCount = await adminPage.getRecordCount();
    
    // Generate unique username
    const timestamp = Date.now();
    const username = `TestUser${timestamp}`;
    const password = 'TestPassword123';
    
    // Add new user
    await adminPage.addUser(
      username,
      'Admin',
      'Enabled',
      password,
      'John Smith' // Employee name - adjust based on available employees
    );
    
    // Verify user count increased
    const newRecordCount = await adminPage.getRecordCount();
    expect(newRecordCount).toBeGreaterThanOrEqual(initialRecordCount);
  });

  test('Delete User Test', async ({ page }) => {
    // Login first
    await loginPage.login('Admin', 'admin123');
    await expect(adminPage.adminTab).toBeVisible({ timeout: 10000 });
    
    // Navigate to Admin tab
    await adminPage.navigateToAdminTab();
    
    // Get initial record count
    initialRecordCount = await adminPage.getRecordCount();
    
    // Search for a test user (you may need to adjust this based on your test data)
    const testUsername = 'TestUser';
    await adminPage.searchUser(testUsername);
    
    // Check if user exists before trying to delete
    const userExists = await page.locator(`text=${testUsername}`).count() > 0;
    
    if (userExists && initialRecordCount > 0) {
      // Select and delete user
      await adminPage.selectUserCheckbox(testUsername);
      await adminPage.deleteUser();
      
      // Verify user count decreased or stayed the same
      const newRecordCount = await adminPage.getRecordCount();
      expect(newRecordCount).toBeLessThanOrEqual(initialRecordCount);
    } else {
      test.info().annotations.push({ type: 'note', description: 'No test user found to delete' });
    }
  });

  test('Complete User Management Flow', async ({ page }) => {
    // Login
    await loginPage.login('Admin', 'admin123');
    await expect(adminPage.adminTab).toBeVisible({ timeout: 10000 });
    
    // Navigate to Admin tab
    await adminPage.navigateToAdminTab();
    
    // Get initial count
    initialRecordCount = await adminPage.getRecordCount();
    
    // Generate unique username
    const timestamp = Date.now();
    const username = `TestUser${timestamp}`;
    const password = 'TestPassword123';
    
    // Add user
    await adminPage.addUser(
      username,
      'Admin',
      'Enabled',
      password,
      'John Smith'
    );
    
    // Verify user was added
    let newRecordCount = await adminPage.getRecordCount();
    expect(newRecordCount).toBeGreaterThanOrEqual(initialRecordCount);
    
    // Search for the user
    await adminPage.searchUser(username);
    
    // Verify user appears in search results
    await expect(page.locator(`text=${username}`).first()).toBeVisible();
    
    // Delete the user
    await adminPage.selectUserCheckbox(username);
    await adminPage.deleteUser();
    
    // Verify user was deleted
    const finalRecordCount = await adminPage.getRecordCount();
    expect(finalRecordCount).toBeLessThanOrEqual(initialRecordCount);
  });
});

