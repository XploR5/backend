const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, { timestamps: true })

const Product = mongoose.model('CRUD', productSchema)

module.exports = Product
