// Make a promise.all polyfill

Promise.allPolyfill = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];

    if (!promises.length) {
      resolve(results);
      return;
    }

    let pending = promises.length;

    promises.forEach((pr, idx) => {
      Promise.resolve(pr).then((res) => {
        results[idx] = res;
        pending--;

        if (pending === 0) {
          // no promises are there to resolve
          resolve(results);
        }
      }, reject);
    });
  });
};
