const dependency = require('./dependency')

// question 1
module.exports.multiplyBy2 = function multiplyBy2() {
  return dependency.getRandomNumber()
    .then((number) => {
      return number * 2
    })
}

// question 2
module.exports.sumNumbers = function sumNumbers(argNumber) {
  return dependency.getRandomNumber()
    .then((randomNumber) => {
      return randomNumber + argNumber
    })
}

// question 3
module.exports.getNumberWithoutErrors = function getNumberWithoutErrors() {
  return dependency.getRandomNumber()
    .catch((error) => {
      return 0
    })
}

// question 4
module.exports.getEvenNumbers = function getEvenNumbers() {
  return dependency.getRandomNumber()
    .then((number) => {
      const isEven = number % 2 === 0

      if (isEven) {
        return number
      } else {
        throw new Error('Number not Even')
      }
    })
}

// question 5
module.exports.getUserPseudo = function getUserPseudo() {
  return dependency.getRandomNumber()
    .then((number) => {
      return dependency.getUserName()
        .then((name) => {
          return `${name}-${number}`
        })
    })
}

// question 6
module.exports.getUserPseudoFull = function getUserPseudoFull() {
  return dependency.getRandomNumber()
    .catch(() => {
      return 0
    })
    .then((number) => {
      return dependency.getUserName()
        .catch(() => {
          return 'Jérôme'
        })
        .then((name) => {
          return `${name}-${number}`
        })
    })
    .then((pseudo) => {
      const pseudoIsTooShort = pseudo.length <= 6

      if (pseudoIsTooShort) {
        throw new Error('Pseudo trop court')
      }
      
      return pseudo
    })
}
