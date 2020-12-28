const { email } = require("./dev");

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookAppID: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
}
