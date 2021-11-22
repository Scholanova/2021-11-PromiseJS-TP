const { expect, sinon, faker } = require('./testHelper')
const dependency = require('../lib/dependency')
const tpModule = require('../lib/index')

beforeEach(() => {
  sinon.stub(dependency, 'getRandomNumber')
  sinon.stub(dependency, 'getUserName')
})

// Question 1
// Faire en sorte de renvoyer le nombre reçu en appelant getRandomNumber
// résultat récupéré au travers du promesse
// soit retourné multiplié par deux
describe('question 1 : multiplier par deux', () => {
  let number
  beforeEach(() => {
    // un nombre aléatoire entre 0 et 100
    number = Math.floor(Math.random() * 100)
    dependency.getRandomNumber.resolves(number)
  })

  it('la fonction renvoie bien le nombre multiplié récupéré par getRandomNumber par deux', () => {
    return expect(tpModule.multiplyBy2()).to.eventually.be.equal(number * 2)
  })
})

// Question 2
// Faire en sorte de renvoyer le nombre reçu en argument en l'additionnant avec
// celui récupéré par l'appel getRandomNumber
describe('question 2 : additionner deux nombres', () => {
  let number1
  let number2

  beforeEach(() => {
    // un nombre aléatoire entre 0 et 100
    number1 = Math.floor(Math.random() * 100)
    number2 = Math.floor(Math.random() * 100)
    dependency.getRandomNumber.resolves(number2)
  })

  it('la fonction renvoie bien le nombre récupéré en argument' +
    'additionné par celui récupéré en appelant getRandomNumber', () => {
    return expect(tpModule.sumNumbers(number1)).to.eventually.be.equal(number1 + number2)
  })
})

// Question 3
// Faire en sorte de renvoyer 0 en cas d'erreur
describe('question 3 : gérer les cas d’erreur', () => {
  beforeEach(() => {
    dependency.getRandomNumber.rejects(new Error('Number generation failed'))
  })

  it('la fonction renvoie 0 en cas d”erreur', () => {
    return expect(tpModule.getNumberWithoutErrors()).to.eventually.be.equal(0)
  })
})

// Question 4
// Faire en sorte de lever une erreur si le nombre est impair
// et de renvoyer le nombre s'il est pair
describe('question 4 : générer des cas d’erreur', () => {
  let oddNumber
  let evenNumber
  beforeEach(() => {
    // un nombre aléatoire entre 0 et 100
    oddNumber = Math.floor(Math.random() * 50) * 2 + 1
    evenNumber = Math.floor(Math.random() * 50) * 2
  })

  it('la fonction renvoie le nombre si pair', () => {
    dependency.getRandomNumber.resolves(evenNumber)

    return expect(tpModule.getEvenNumbers()).to.eventually.be.equal(evenNumber)
  })

  it('la fonction retourne une erreur si le nombre est impair', () => {
    dependency.getRandomNumber.resolves(oddNumber)

    return expect(tpModule.getEvenNumbers()).to.eventually.be.rejected
  })
})

// Question 5
// Faire en de récupérer un prénom plus un nombre pour générer un
// pseudo sous la forme {{prénom}}-{{nombre}}
// par exemple tom-48
describe('question 5 : gérer plusieurs appels asynchrones', () => {
  let firstname
  let number
  beforeEach(() => {
    // un prénom aléatoire
    firstname = faker.name.firstName()
    // un nombre aléatoire entre 0 et 100
    number = Math.floor(Math.random() * 100)
    dependency.getUserName.resolves(firstname)
    dependency.getRandomNumber.resolves(number)
  })

  it('la fonction retourne une pseudo généré', () => {
    const expectedPseudo = `${firstname}-${number}`

    return expect(tpModule.getUserPseudo()).to.eventually.be.equal(expectedPseudo)
  })
})

// Question 6
// Faire en de récupérer un prénom plus un nombre pour générer un
// pseudo sous la forme {{prénom}}-{{nombre}}
// par exemple mathias-48
// Attention :
// - gérer le cas d'erreur de getRandomNumber en mettant 0
//   comme nombre si il y a une erreur à la génération du nombre
// - gérer le cas d'erreur de getUserPseudo en mettant "Jérome"
//   comme pseudo si il y a une erreur à la génération de pseudo
// - lever une erreur si la longueur du pseudo est plus petite (ou égal) que 6
//   bob-0 --> trop court (length = 5) thomas-23 --> ok (length = 9)
describe('question 6 : cas complet', () => {
  let firstname
  let number

  it('la fonction retourne un pseudo généré', () => {
    // un prénom aléatoire de plus de 5 char
    firstname = `${faker.name.firstName()}...`
    // un nombre aléatoire entre 0 et 100
    number = Math.floor(Math.random() * 100)
    dependency.getUserName.resolves(firstname)
    dependency.getRandomNumber.resolves(number)

    const expectedPseudo = `${firstname}-${number}`

    return expect(tpModule.getUserPseudo()).to.eventually.be.equal(expectedPseudo)
  })

  it('la fonction utilise 0 si erreur durant la génération d’un nombre', () => {
    // un prénom aléatoire de plus de 5 char
    firstname = `${faker.name.firstName()}...`
    dependency.getUserName.resolves(firstname)
    dependency.getRandomNumber.rejects(new Error('Number generation failed'))

    const expectedPseudo = `${firstname}-0`

    return expect(tpModule.getUserPseudoFull()).to.eventually.be.equal(expectedPseudo)
  })

  it('la fonction utilise Jérôme si erreur durant la génération d’un prénom', () => {
    // un prénom aléatoire
    number = Math.floor(Math.random() * 100)
    dependency.getUserName.rejects(new Error('Firstname generation failed'))
    dependency.getRandomNumber.resolves(number)

    const expectedPseudo = `Jérôme-${number}`

    return expect(tpModule.getUserPseudoFull()).to.eventually.be.equal(expectedPseudo)
  })

  it('la fonction retourne une erreur si le pseudo est trop court', () => {
    // un prénom aléatoire de seulement 4 char
    firstname = 'John'
    number = 2
    dependency.getUserName.resolves(firstname)
    dependency.getRandomNumber.resolves(number)

    return expect(tpModule.getUserPseudoFull()).to.eventually.be.rejected
  })
})
