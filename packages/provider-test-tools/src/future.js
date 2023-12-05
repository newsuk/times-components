export default function createFuture() {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });

  return {
    promise: () => promise,
    resolve: () => {
      resolve();
      return promise;
    }
  };
}
