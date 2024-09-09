const { execSync } = require('child_process');

// Get CircleCI environment variables
const nodeIndex = parseInt(process.env.CIRCLE_NODE_INDEX, 10);
const totalNodes = parseInt(process.env.CIRCLE_NODE_TOTAL, 10);

// Get the list of all test files
const allTests = execSync('npx jest --listTests').toString().trim().split('\n');

// Determine the number of tests per shard
const testsPerShard = Math.ceil(allTests.length / totalNodes);

// Get the tests for this shard
const shardTests = allTests.slice(nodeIndex * testsPerShard, (nodeIndex + 1) * testsPerShard);

// Run the shard tests
execSync(`npx jest ${shardTests.join(' ')} --reporters=default --reporters=jest-junit --ci --verbose`, { stdio: 'inherit' });
