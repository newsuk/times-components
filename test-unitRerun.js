const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the output directory for reports
const OUTPUT_DIR = path.resolve('test-results/unit');

// Create the output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Path to the packages directory
const packagesDir = path.join(process.cwd(), 'packages');

// Flag to track overall test result
let hasTestFailures = false;

// Read the list of package directories
fs.readdirSync(packagesDir).forEach(packageName => {
  const packagePath = path.join(packagesDir, packageName);

  // Check if the current item is a directory
  if (fs.lstatSync(packagePath).isDirectory()) {
    console.log(`Running tests for ${packageName}`);

    // Set environment variables for jest-junit output directory, name, and file attribute
    process.env.JEST_JUNIT_OUTPUT_DIR = OUTPUT_DIR;  // Ensure all reports go to the same directory
    process.env.JEST_JUNIT_OUTPUT_NAME = `jest-junit-${packageName}.xml`; // Create a unique file for each package
    process.env.JEST_JUNIT_ADD_FILE_ATTRIBUTE = 'true'; // Add file attribute to the report

    // Run tests only in the package folder
    try {
      execSync(`npx jest --reporters=default --reporters=jest-junit --ci --bail --coverage --testPathPattern=$(circleci tests split --split-by=timings)`, { cwd: packagePath, stdio: 'inherit' });
      //circleci tests run --command="npx jest --reporters=default --reporters=jest-junit --ci --bail --coverage --split-by=timings"
    } catch (error) {
      console.error(`Tests failed for ${packageName}: ${error.message}`);
      hasTestFailures = true;  // Set flag if any test fails
    }
  }
});

// Exit with a non-zero status code if any tests failed
if (hasTestFailures) {
  console.error("Some tests failed.");
  process.exit(1);  // Exit the script with an error status
}
