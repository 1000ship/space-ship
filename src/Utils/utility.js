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

export const makeRandomName = () => {
  const styles = ["똑똑한", "고요한", "고운", "기특한", "깜찍한", "근면한", "귀여운", "관대한" ,"깔끔한", "긍정적인", "겸손한"]
  const keywords = ["멋쟁이", "센스쟁이", "개구쟁이", "겁쟁이", "수다쟁이", "소금쟁이"]
  return `${styles[parseInt(styles.length * Math.random())]} ${keywords[parseInt(keywords.length * Math.random())]}`
}