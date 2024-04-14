// Problem statement: Create a promise polyfill

/**
 * @param exec - executor
 */
function PromisePolyfill(exec) {
  let onResolve, onReject;

  function resolve(value) {
    onResolve(value)
  }

  function reject(value) {
    onReject(value)
  }

  this.then = function (cb) {
    onResolve = cb;
    return this;
  };

  this.catch = function (cb) {
    onReject = cb
    return this;
  };

  exec(resolve, reject);
}

const promise = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

promise.then((res) => console.log("result is:", res)).catch((e) => console.log(e));
