/** @module ccclodash */
/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, n) {
  const clist = []
  for (let i=0; i<array.length; i+=n) {
    clist.push(array.slice(i, i+n))
  }
  return clist
}

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
function compact(array) {
  const clist = []
  for (let o of array) {
    if (o) clist.push(o)
  }
  return clist
}

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 * @author: ccc
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @example
 * 
 * _.concat([1], 2, [3], [[4]]); 
 * // => [1, 2, [3], [[4]]
 */
function concat() {
  const clist = arguments[0].slice(0)
  for (let i=1; i<arguments.length; i++) {
    clist.push(arguments[i])
  }
  return clist
}

module.exports = {
  chunk,
  concat,
  compact,
}
