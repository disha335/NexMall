const router = require('express').Router()
const payCtrl = require('../controllers/payCtrl')

router.route('/pay')
.post(payCtrl.createPayment)

module.exports = router