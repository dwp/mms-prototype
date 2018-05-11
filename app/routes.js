const express = require('express')
const router = express.Router()

// Mock data
const data = require('./mock-data.json')

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/customers', function (req, res) {
  res.locals.customers = data
  res.render('customers')
})

// Add your routes here - above the module.exports line

module.exports = router
