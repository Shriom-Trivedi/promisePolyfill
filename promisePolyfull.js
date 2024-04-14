// Problem statement: Create a promise polyfill

/**
 * @param exec - executor
 */
function PromisePolyfill(exec) {
  let onResolve,
    onReject,
    isFullfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(v) {
    isFullfilled = true;
    value = v;

    if (typeof onResolve === 'function') {
      onResolve(v);
      isCalled = true;
    }
  }

  function reject(v) {
    isRejected = true;
    value = v;

    if (typeof onResolve === 'function') {
      onReject(v);
      isCalled = true;
    }
  }

  this.then = function (cb) {
    onResolve = cb;

    if (typeof onResolve === 'function') {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };

  this.catch = function (cb) {
    onReject = cb;

    if (typeof onReject === 'function') {
      onReject(value);
      isCalled = true;
    }
    return this;
  };

  try {
    exec(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const promise1 = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

const promise2 = new PromisePolyfill((resolve, reject) => {
  reject('Error Occured');
});

promise1
  .then((res) => console.log('result is:', res))
  .catch((e) => console.log('Error: ',e));

promise2
  .then((res) => console.log('result is:', res))
  .catch((e) => console.log(e));
