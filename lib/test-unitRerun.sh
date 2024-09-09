# // const fs = require('fs');
# // const path = require('path');
# // const { execSync } = require('child_process');

# // // Define the output directory for reports
# // const OUTPUT_DIR = path.resolve('test-results/unit');

# // // Create the output directory if it doesn't exist
# // if (!fs.existsSync(OUTPUT_DIR)) {
# //   fs.mkdirSync(OUTPUT_DIR, { recursive: true });
# // }

# // // Path to the packages directory
# // const packagesDir = path.join(process.cwd(), 'packages');

# // // Flag to track overall test result
# // let hasTestFailures = false;

# // // Read the list of package directories
# // fs.readdirSync(packagesDir).forEach(packageName => {
# //   const packagePath = path.join(packagesDir, packageName);

# //   // Check if the current item is a directory
# //   if (fs.lstatSync(packagePath).isDirectory()) {
# //     console.log(`Running tests for ${packageName}`);

# //     // Set environment variables for jest-junit output directory, name, and file attribute
# //     process.env.JEST_JUNIT_OUTPUT_DIR = OUTPUT_DIR;  // Ensure all reports go to the same directory
# //     process.env.JEST_JUNIT_OUTPUT_NAME = `jest-junit-${packageName}.xml`; // Create a unique file for each package
# //     process.env.JEST_JUNIT_ADD_FILE_ATTRIBUTE = 'true'; // Add file attribute to the report

# //     // Run tests only in the package folder
# //     try {
# //       execSync(`npx jest --reporters=default --reporters=jest-junit -ci --bail --coverage --verbose`, { cwd: packagePath, stdio: 'inherit' });
# //       // npx jest --reporters=default --reporters=jest-junit --ci --bail --coverage --testPathPattern=$(circleci tests split --split-by=filesize)
      
# //     } catch (error) {
# //       console.error(`Tests failed for ${packageName}: ${error.message}`);
# //       hasTestFailures = true;  // Set flag if any test fails
# //     }
# //   }
# // });

# // // Exit with a non-zero status code if any tests failed
# // if (hasTestFailures) {
# //   console.error("Some tests failed.");
# //   process.exit(1);  // Exit the script with an error status
# # // }

#!/bin/bash

# Function to handle errors and exit
error_exit() {
    echo "Error: $1" >&2
    exit 1
}

# Get CircleCI environment variables for parallelism
node_index=${CIRCLE_NODE_INDEX:-0}    # Current node index
total_nodes=${CIRCLE_NODE_TOTAL:-1}   # Total number of nodes

# Define the test results directory
OUTPUT_DIR="./test_results/unit"
PACKAGES_DIR="./packages"

# Create the output directory if it doesn't exist
echo "Creating directory structure at '$OUTPUT_DIR'..."
mkdir -p "$OUTPUT_DIR"

# Set environment variables for jest-junit
export JEST_JUNIT_OUTPUT_DIR="$OUTPUT_DIR"
export JEST_JUNIT_OUTPUT_NAME="jest-junit.xml"
export JEST_JUNIT_ADD_FILE_ATTRIBUTE="true"

# # Get the list of tests to run on this container using CircleCI's test splitting
# test_files=$(circleci tests split --split-by=timings)

# # Ensure there are test files to run
# if [ -z "$test_files" ]; then
#     echo "No tests to run on this container (node $node_index)."
#     exit 0
# fi

# # Run Jest tests only on the split files for this container
# echo "Running tests on node $node_index of $total_nodes for the following files:"
# echo "$test_files"

npx jest --reporters=default --reporters=jest-junit \
    --ci --verbose 

# Check if the Jest command failed
if [ $? -ne 0 ]; then
    echo "Tests failed."
    HAS_TEST_FAILURES=true
else
    HAS_TEST_FAILURES=false
fi

# # Store test results in the defined directory
# echo "Storing test results in '$OUTPUT_DIR'..."
# cp -R ./test-results/* "$OUTPUT_DIR" || error_exit "Failed to copy test results."

# Exit with a non-zero status code if any tests failed
if [ "$HAS_TEST_FAILURES" = true ]; then
    echo "Some tests failed."
    exit 1
else
    echo "All tests passed successfully."
fi

echo "Script executed successfully."
