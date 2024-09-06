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
    const packageName = path.basename(path.dirname(packagePath)); // Extract package name
    console.log(`Running tests for ${packageName}`);

    // Set environment variables for jest-junit output name, directory, and file attribute
    process.env.JEST_JUNIT_OUTPUT_NAME = `jest-junit-${packageName}.xml`;
    process.env.JEST_JUNIT_OUTPUT_DIR = path.resolve(OUTPUT_DIR); // Save all reports in one central directory
    process.env.JEST_JUNIT_ADD_FILE_ATTRIBUTE = 'true'; // Add file attribute to the report

    // Run tests without specifying a custom jest.config.js
    try {
      execSync(`npx jest --reporters=default --reporters=jest-junit --ci --bail --coverage`, { cwd: packagePath, stdio: 'inherit' });
    } catch (error) {
      console.error(`Tests failed for ${packageName}: ${error.message}`);
    }
  });
});
