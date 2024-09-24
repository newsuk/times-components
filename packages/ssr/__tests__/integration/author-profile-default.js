//import authorProfileTests from "../helpers/author-profile-helper";

// default
authorProfileTests({ stickyElements: ["nav"], skipSnapshotTest: true });
const rerun = process.env.RERUN; // Access the environment variable

console.log(`RERUN: ${rerun}`); // Log the value of RERUN

if (!!rerun) { // Check if RERUN is truthy
  throw new Error('Error'); // Throw an error if RERUN is set
}

// Continue with other tests if no error is thrown
expect(true).toBe(true); 