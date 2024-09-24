#!/bin/bash
#
#  ===== Parallelism Script ======
#
#  Description: Check if arguments are passed correctly,create a test directory, add symbolic link and run the test command.
#  Date:        Septemeber 2024
#  Author:      avinash.narayan@news.co.uk
#  Team:        @tm-discovery-qa (Discovery)
#



echo "Creating directory structure at './packages/ssr/test-results'..."
mkdir -p "./packages/ssr/test-results"
ln -s /home/circleci/project/node_modules/cypress-circleci-reporter "/home/circleci/project/packages/ssr/node_modules/cypress-circleci-reporter"
echo "Running yarn command: 'yarn test:e2e'..."
yarn test:e2e:ci