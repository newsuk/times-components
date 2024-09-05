const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Define the output directory for reports
const OUTPUT_DIR = 'test-results/junit';

// Create the output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Use glob to find all package directories
glob('packages/**/__tests__', { cwd: process.cwd(), ignore: '**/node_modules/**' }, (err, packages) => {
  if (err) throw err;

  packages.forEach(packagePath => {
    const packageName = path.dirname(packagePath);
    console.log(`Running tests for ${packageName}`);

    // Set environment variable for jest-junit output name
    process.env.JEST_JUNIT_OUTPUT_NAME = `jest-junit-${packageName}.xml`;

    // Run tests with dynamic configuration
    execSync(`npx jest --config="${path.join(packagePath, 'jest.config.js')}" --reporters=default --reporters=jest-junit --ci --bail --coverage`, { stdio: 'inherit' });
  });
});
