// Problem statement: Create a promise polyfill

/**
 * @param exec - executor
 */
function PromisePolyfill(exec) {}

const promise = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

promise.then((res) => console.log(res)).catch((e) => console.log(e));
