const express = require('express');
const paymentController = require('../controller/paymentController');

const router = express.Router();


router.post('/api/paystack', paymentController.verifyPayment);

router.get('/api/payments', paymentController.getPayments);

module.exports = router;
