const express = require('express')
const app = express()
app.use(express.json())

const products = [
  {
    id:1,
    product: 'laptop',
    price: 75,
  },

  {
    id:2,
    product: 'phone',
    price: 25,
  },

  {
    id: 3,
    product: 'earpods',
    price: 15,
  },

  {
    id:4,
    product: 'charger',
    price: 5,
  },

  {
    id:5,
    product: 'mouse',
    price: 1,
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

app.post('/api/products/add', (req, res) => {
  const prod = {
    id: products.length + 1,
    product: req.body.product,
    price: req.body.price
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

app.listen(3000, () => console.log('App is listening on port 3000'))
