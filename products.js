const express = require('express')
const mongoose = require('mongoose')

//express app
const app = express()

app.use(express.json())

// connect to mongoDB
const dbURI =
  'mongodb+srv://test:test%40123@cluster0.qwzp9jd.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to Data-Base')
    app.listen(3000, () => console.log('App is listening on port 3000'))
  })
  .catch((err) => console.log(err))

const products = [
  {
    id: 1,
    product: 'laptop',
    price: 75,
  },

  {
    id: 2,
    product: 'phone',
    price: 25,
  },

  {
    id: 3,
    product: 'earpods',
    price: 15,
  },

  {
    id: 4,
    product: 'charger',
    price: 5,
  },

  {
    id: 5,
    product: 'mouse',
    price: 1,
  },

  {
    id: 6,
    product: 'car',
    price: 555,
  },
]

app.get('/products', (req, res) => {
  res.send(products)
})

app.get('/products/:product', (req, res) => {
  const product = products.find((p) => p.product === req.params.product)
  if (!product)
    res.status(404).send('The product with the given name was not found.')
  else res.send(product)
})

app.post('/products/add', (req, res) => {
  const prod = {
    id: products.length + 1,
    product: req.body.product,
    price: req.body.price,
  }
  products.push(prod)
  res.send(prod)
})

app.put('/products/edit/:product', (req, res) => {
  const product = products.find((p) => p.product === req.params.product)
  if (!product)
    return res
      .status(404)
      .send('The product with the given name was not found.')

  product.product = req.body.product
  product.price = req.body.price

  res.send(product)
})

app.delete('/products/delete/:product', (req, res) => {
  const product = products.find((p) => p.product === req.params.product)
  if (!product)
    return res
      .status(404)
      .send('The product with the given name was not found.')

  const index = products.indexOf(product)
  products.splice(index, 1)

  res.send(product)
})
