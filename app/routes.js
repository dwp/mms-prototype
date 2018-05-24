const express = require('express')
const router = express.Router()
const fs = require('fs')
// Mock data
const data = require('./mock-data.json')

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line

// View all customers
router.get('/customers', function (req, res) {
  res.locals.customers = data
  res.render('customers')
})

// View customer details
router.post('/customers', function (req, res) {
  const customerToEdit = req.body.userSelect[0];
  res.redirect(`/edit-customer/${ customerToEdit }`)
})

// Amend existing customer
router.post('/edit-customer/:nino', (req, res) => {
  res.locals.customers = data;
  let customerToEdit = data.filter(customer => customer.nino === req.params.nino)
  customerToEdit[0].phone = req.body.phone;
  customerToEdit[0].address = {
    street: req.body.street,
    city: req.body.city,
    county: req.body.county
  }
  fs.writeFile('app/mock-data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  res.redirect('/customers');
})

router.get('/edit-customer/:nino', (req, res) => {
  res.locals.customers = data;
  const customerToEdit = data.filter(customer => customer.nino === req.params.nino)
  res.locals.customer = customerToEdit[0]
  res.render('edit-customer')
})

// Create a new customer
router.post('/new-customer', (req, res) => {
  const newItem = Object.assign({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    nino: req.body.nino,
    phone: req.body.phone,
    address: {
      street: req.body.street,
      city: req.body.city,
      county: req.body.county
    }
  })
  data.push(newItem)  
  fs.writeFile('app/mock-data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  res.redirect('/customers')
})

module.exports = router
