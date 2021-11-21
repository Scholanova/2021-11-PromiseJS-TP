const dependency = require('./dependency')

// question 1
module.exports.multiplyBy2 = function multiplyBy2() {
  return dependency.getRandomNumber()
}

// question 2
module.exports.sumNumbers = function sumNumbers(number) {
  // use dependency.getRandomNumber()
}

// question 3
module.exports.getNumberWithoutErrors = function getNumberWithoutErrors() {
  // use dependency.getRandomNumber()
}

// question 4
module.exports.getEvenNumbers = function getEvenNumbers() {
  // use dependency.getRandomNumber()
}

// question 5
module.exports.getUserPseudo = function getUserPseudo() {
  // use dependency.getRandomNumber() and dependency.getUserName()
}

// question 6
module.exports.getUserPseudoFull = function getUserPseudoFull() {
  // use dependency.getRandomNumber() and dependency.getUserName()
}
