export default function createFuture() {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });

  return {
    resolve: () => {
      resolve();
      return promise;
    },
    promise: () => promise
  };
}
