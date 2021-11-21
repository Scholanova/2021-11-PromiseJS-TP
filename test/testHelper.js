const chai = require('chai')
const sinon = require('sinon')
const faker = require('faker')
chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))

const expect = chai.expect

afterEach(() => {
  sinon.restore()
})


module.exports = {
  expect,
  sinon,
  faker,
}
