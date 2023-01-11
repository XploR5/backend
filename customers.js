const express = require('express')
const app = express()

app.use(express.json())

const customers = [
  { name: 'John', age: 27 },
  { name: 'James', age: 32 },
  { name: 'Rohan', age: 21 },
  { name: 'Hrutu', age: 21 },
  { name: 'Copilot', age: 69 },
  { name: 'Simba', age: 05 },
]

app.get('/customer', (req, res) => {
  res.send(customers)
})

app.get('/customer/:name', (req, res) => {
  const customer = customers.find((c) => c.name === req.params.name)
  if (!customer)
    res.status(404).send('The customer with the given name was not found.')
  else res.send(customer)
})

// app.listen(3000, () => console.log('App is listening on port 3000'))
