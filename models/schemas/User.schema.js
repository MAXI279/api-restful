const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  nombre: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      // eslint-disable-next-line no-useless-escape
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      'Invalid email'
    ]
  },
  password: { type: String, required: true }
})

module.exports = UserSchema
