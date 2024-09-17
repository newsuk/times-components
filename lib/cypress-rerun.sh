#!/bin/bash
#
#  ===== Parallelism Script ======
#
#  Description: Check if arguments are passed correctly,create a test directory, add symbolic link and run the test command.
#  Date:        Septemeber 2024
#  Author:      avinash.narayan@news.co.uk
#  Team:        @tm-discovery-qa (Discovery)
#



echo "Creating directory structure at './packages/ssr/__tests__/test-results'..."
mkdir -p "./packages/ssr/__tests__/test-results"
echo "Running yarn command: 'yarn test:e2e'..."
yarn test:e2e:ci || error_exit "Yarn command failed."
echo "Script executed successfully."