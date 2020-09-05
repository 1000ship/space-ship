export const throttle = (func, interval) => {
  var _id = null;
  return (...args) => {
    if (_id === null)
      _id = setTimeout(() => {
        func(...args);
        _id = null;
      }, interval);
  };
};
