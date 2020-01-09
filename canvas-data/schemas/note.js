const { Schema } = require('mongoose')

module.exports = new Schema({
  description: {
    type: String
    required: true
  },
  block: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }
})
