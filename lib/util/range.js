/**
 * JS version of Python range()
 * 
 * @param {Number} start 
 * @param {Number} end 
 * @param {Number} step
 * @yields {Number}
 */
function* range(start, end=null, step=1) {
  if (end == null) {
    end = start;
    start = 0;
  }

  if (step < 0) {
    for (let i = start; i > end; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }
}

module.exports = range;