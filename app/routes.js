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

router.get('/customers', function (req, res) {
  res.locals.customers = data
  res.render('customers')
})

router.post('/create-customer', (req, res) => {
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
  fs.writeFile('app/mock-data.json', JSON.stringify(data,null,2), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  res.redirect('/customers')
})

module.exports = router
