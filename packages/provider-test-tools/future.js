export function createFuture() {
  let resolve;
  const promise = new Promise(done => {
    resolve = done;
  });

  return {
    resolve: () => {
      setTimeout(resolve);
      return promise;
    },
    promise: () => promise
  };
}
