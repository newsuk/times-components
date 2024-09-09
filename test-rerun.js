const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

// Define the output directory for reports
const OUTPUT_DIR = 'test-results/web';

// Create the output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Use glob to find all package directories
glob('packages/**/__tests__', { cwd: process.cwd(), ignore: '**/node_modules/**' }, (err, packages) => {
  if (err) throw err;

  // Flag to track whether any tests have failed
  let hasTestFailures = false;

  packages.forEach(packagePath => {
    const packageName = path.basename(path.dirname(packagePath)); // Extract the actual package name
    console.log(`Running tests for ${packageName}`);

    // Path to the jest.config.js file
    const jestConfigPath = path.join(packagePath, 'jest.config.js');

    // Check if jest.config.js exists before running tests
    if (fs.existsSync(jestConfigPath)) {
      // Set environment variables for jest-junit output name
      process.env.JEST_JUNIT_OUTPUT_NAME = `jest-junit-${packageName}.xml`;
      process.env.JEST_JUNIT_ADD_FILE_ATTRIBUTE = 'true'; // Add file attribute to the report
      process.env.JEST_JUNIT_OUTPUT_DIR = OUTPUT_DIR // Save all reports in one central directory

      // Run tests with dynamic configuration
      try {
        execSync(`npx jest --config="${jestConfigPath}" --reporters=default --reporters=jest-junit --testPathPattern=$(circleci tests split --split-by=filesize) --ci --verbose`, { stdio: 'inherit' });
        // npx jest --config="${jestConfigPath}" --reporters=default --reporters=jest-junit --ci --bail --coverage --testPathPattern=$(circleci tests split --split-by=filesize)
      } catch (error) {
        console.error(`Tests failed for ${packageName}: ${error.message}`);
        hasTestFailures = true; // Mark that there was a test failure
      }
    } else {
      console.warn(`jest.config.js not found for ${packageName}, skipping tests for this package.`);
    }
  });

  // Exit with a non-zero status code if any tests failed
  if (hasTestFailures) {
    console.error('Some tests failed. Exiting with error.');
    process.exit(1); // Exit with error status code
  }
});
