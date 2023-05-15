# OrangeHRM Automation Tests - Playwright TypeScript

This project contains automated tests for OrangeHRM using Playwright, TypeScript, and Page Object Model (POM) design pattern.

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```
Orangehrm_Playwright/
├── pages/              # Page Object Model classes
│   ├── LoginPage.ts
│   └── AdminPage.ts
├── tests/              # Test files
│   └── orangehrm.spec.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Test Cases

The project includes the following test cases:

1. **Login Test** - Tests user login functionality with valid credentials
2. **Add User Test** - Tests adding a new user in the Admin module
3. **Delete User Test** - Tests deleting a user from the Admin module
4. **Complete User Management Flow** - End-to-end test covering add, search, and delete user operations

## 🏃 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### View test report:
```bash
npm run report
```

## 🎯 Features

- ✅ Page Object Model (POM) design pattern
- ✅ TypeScript for type safety
- ✅ Playwright for reliable browser automation
- ✅ Comprehensive test coverage for OrangeHRM
- ✅ Screenshots and videos on test failures

## 📝 Notes

- The tests use the OrangeHRM demo site: `https://opensource-demo.orangehrmlive.com`
- Default credentials: Username: `Admin`, Password: `admin123`
- Employee names in the add user test may need to be adjusted based on available employees in the system
- Tests include proper waits and error handling

## 🔧 Configuration

Edit `playwright.config.ts` to modify:
- Test timeout
- Browser configuration
- Retry settings
- Reporter options
- Base URL

## 📦 Dependencies

- **@playwright/test** 1.40.0
- **TypeScript** 5.3.3

## 📄 License

ISC

## 👤 Author

Junior QA Engineer

