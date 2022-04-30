module.exports = {
  roundRating: (num) => {
    const entero = parseInt(num, 10)
    const decimal = num - entero
    if (decimal === 0) {
      return num
    }
    if (decimal < 0.25) {
      return Math.floor(num)
    }
    if (decimal < 0.75) {
      return entero + 0.5
    }
    return Math.ceil(num)
  },
}
