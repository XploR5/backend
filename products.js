const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/schema')
const port = 3000

//express app
const app = express()

app.use(express.json())

// connect to mongoDB
const dbURI =
  'mongodb+srv://test:test%40123@cluster0.qwzp9jd.mongodb.net/firstDB?retryWrites=true&w=majority'

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to Data-Base')
    app.listen(port, () => console.log(`App is listening on port ${port}}`))
  })
  .catch((err) => console.log(err))

// const products = [
//   {
//     id: 1,
//     product: 'laptop',
//     price: 75,
//   },

//   {
//     id: 2,
//     product: 'phone',
//     price: 25,
//   },

//   {
//     id: 3,
//     product: 'earpods',
//     price: 15,
//   },

//   {
//     id: 4,
//     product: 'charger',
//     price: 5,
//   },

//   {
//     id: 5,
//     product: 'mouse',
//     price: 1,
//   },

//   {
//     id: 6,
//     product: 'car',
//     price: 555,
//   },
// ]

app.get('/add-product', (req, res) => {
  const product = new Product({
    product: 'super_fast_car',
    price: 99999,
  })
  product
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/products/', (req, res) => {
  if (!req.body.product || !req.body.price) {
    return res.status(400).send('The product or price is missing.')
  }

  const product = new Product({
    product: req.body.product,
    price: req.body.price,
  })
  product
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })

  res.send(product)
})

app.get('/', (req, res) => {
  res.send('Welcome to CRUDE products')
})

app.get('/products', (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/products/:product', (req, res) => {
  const product = products.find((p) => p.product === req.params.product)
  if (!product)
    res.status(404).send('The product with the given name was not found.')
  else res.send(product)
})

app.put('/products/:product', (req, res) => {
  const product = products.find((p) => p.product === req.params.product)
  if (!product)
    return res
      .status(404)
      .send('The product with the given name was not found.')

  product.product = req.body.product
  product.price = req.body.price

  res.send(product)
})

app.delete('/products/:product', (req, res) => {
  const product = products.find((p) => p.product === req.params.product)
  if (!product)
    return res
      .status(404)
      .send('The product with the given name was not found.')

  const index = products.indexOf(product)
  products.splice(index, 1)

  res.send(product)
})
