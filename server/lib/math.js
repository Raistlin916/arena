export default {
  getRandomInt: (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min,

  getRandom: (min, max) =>
    Math.random() * (max - min + 1) + min
}
