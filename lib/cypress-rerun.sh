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

####################################


# # Function to handle errors
# error_exit() {
#     echo "Error: $1" >&2
#     yarn stop:testserver 
#     exit 1
# }

# # Check if a spec is passed
# if [ -z "$1" ]; then
#     error_exit "No spec file provided."
# fi

# echo "Running Cypress tests for spec file: $1"

# npx cypress run --reporter cypress-circleci-reporter --spec "$1"
# cypressExitCode=$?

# # Stop the test server
# yarn stop:testserver

# # Check if Cypress encountered an error
# if [ $cypressExitCode -ne 0 ]; then
#     error_exit "Cypress tests failed for spec file: $1"
# fi

# # Exit with Cypress's exit code
# exit $cypressExitCode
