const { model } = require('mongoose')
const { note } = require('./schemas')

module.exports = {
  Note: model('Note', note)
}
