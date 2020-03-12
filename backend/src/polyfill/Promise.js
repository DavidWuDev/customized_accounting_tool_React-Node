Promise.delay = Promise.delay || function(ms) {
  return new Promise(resovle => setTimeout(() => resovle(), ms));
};
