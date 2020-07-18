const keys = require('../config/keys');
const paystack = require('paystack')(keys.paystackSecretKey);
const User = require('../models/User');
const Payment = require('../models/Payment');

exports.verifyPayment = (req, res) => {
  paystack.transaction.verify(req.body.token, (error, body) => {
     // console.log(body.data.status);
     if(body.data.status ==='success') {
      const payment = new Payment({
       paymentStatus: body.data.status,
       firstName: body.data.customer.first_name,
       lastName: body.data.customer.last_name,
       email: body.data.customer.email,
       phone: body.data.customer.phone,
       amount: body.data.amount,
       paidAt: body.data.paid_at,
       createdAt: body.data.created_at,
       currency: body.data.currency,
       ipAddress: body.data.ip_address,
       channel: body.data.channel,
       cardType: body.data.authorization.card_type,
       bank: body.data.authorization.bank,
       paymentBy: req.user._id
      })
      //
      return payment.save();

    } else {
       const error = new Error('Sorry your payment could not be verified');
       error.httpStatusCode = 500;
       throw error;
    }

  }).then(result => {
    console.log('Save successful');
    let credits;
    const amountPaid = result.amount / 100;

    if(amountPaid > 10) {
      credits = Math.round(amountPaid / 10);
    } else {
      credits = amountPaid;
    }

    User.findById(req.user._id).then(user => {
       const newCreditVal = credits + user.credits;
       user.credits = newCreditVal;
       return user.save();
    }).then(userCredits => {
      res.status(200).json({ credits: userCredits.credits });
    })
  })
  .catch(err => {
    console.log(err);
  })
}

exports.getPayments = (req, res) => {
  Payment.find({ paymentBy: req.user._id })
  .then(paymentList => {
    if(!paymentList) {
      return
    }
    res.status(200).json({ paymentList: paymentList });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
}
