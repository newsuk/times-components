#!/bin/bash
#
#  ===== Parallelism Script ======
#
#  Description: Check if arguments are passed correctly,create a test directory, add symbolic link and run the test command.
#  Date:        Septemeber 2024
#  Author:      avinash.narayan@news.co.uk
#  Team:        @tm-qa-engineers (QA team)
#

error_exit() {
    echo "Error: Yarn command failure" >&2
    exit 1
}

echo "Creating directory structure at './packages/ssr/test-results'..."
mkdir -p "./packages/ssr/test-results"
ln -s /home/circleci/project/node_modules/cypress-circleci-reporter "/home/circleci/project/packages/ssr/node_modules/cypress-circleci-reporter"
echo "Running yarn command: yarn test:e2e:ci..."
yarn test:e2e:ci || error_exit "Yarn command failed."

# # Run Cypress tests and capture the exit code
# npx cypress run --reporter cypress-circleci-reporter --spec "$1"
# cypressExitCode=$?

# # Stop the test server
# yarn stop:testserver

# # Exit with Cypress's exit code
# exit $cypressExitCode




# yarn test:e2e:ci


# # Capture the exit code of the Cypress tests (from yarn test:ci)
# cypressExitCode=$?

# # Stop the test server (ignore any exit code from this command)
# echo "Stopping the test server..."
# yarn stop:testserver || true

# # Check if Cypress tests failed
# if [ $cypressExitCode -ne 0 ]; then
#   echo "Tests failed with exit code $cypressExitCode."
# else
#   echo "Tests passed."
# fi

# # Exit with the Cypress exit code, not the server stop exit code
# exit $cypressExitCode