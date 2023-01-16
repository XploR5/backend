const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/schema')
const port = 3000

//express app
const app = express()

app.use(express.json())

// connect to mongoDB
const dbURI =
  'mongodb+srv://test:test%40123@cluster0.qwzp9jd.mongodb.net/storeProducts?retryWrites=true&w=majority'

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('connected to Database')
    app.listen(port, () => console.log(`App is listening on port ${port}`))
  })
  .catch((err) => console.log(err))

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

  res.send('Successfully added the product. \n' + product)
})

app.get('/', (req, res) => {
  res.send('Welcome to the store.')
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

app.get('/products/:id', (req, res) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send('Please enter a valid ID.')

  Product.findById(req.params.id)
    .then((result) => {
      if (result === null)
        return res
          .status(400)
          .send('The product with the given ID was not found.')
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put('/products/:id', (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).send('Please enter a valid ID.')

  if (!req.body.product || !req.body.price || !req.params.id) {
    return res
      .status(400)
      .send('The product or price is missing.')
  }

  Product.findById(req.params.id)
    .then((result) => {
      if (result === null) {
        return res
          .status(400)
          .send('The product with the given ID was not found.')
      }
    })
    .catch((err) => {
      console.log(err)
    })

  Product.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { product: req.body.product, price: req.body.price } },
    { new: true }
  )
    .then((result) => {
      res.send('Product Updated Successfully! \n' + result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.delete('/products/:id', (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id) || req.params.id.length !== 24)
      return res.status(400).send('Please enter a valid ID.')

  if (!req.body.product || !req.body.price || !req.params.id) {
    return res
      .status(400)
      .send('The product id or product or price is missing.')
  }

  Product.findById(req.params.id)
    .then((result) => {
      if (result === null) {
        return res
          .status(400)
          .send('The product with the given ID was not found.')
      }
    })
    .catch((err) => {
      console.log(err)
    })

  Product.findByIdAndDelete(req.params.id).then((result) => {
    res.send('Product Deleted Successfully! \n' + result)
  })
})
