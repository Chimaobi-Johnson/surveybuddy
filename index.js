const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

const app = express();

const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./models/Recipient');
require('./models/Payment');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const billingRoutes = require('./routes/billingRoutes');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
	if(file.mimetype === 'image/png' ||
	   file.mimetype === 'image/jpg' ||
	   file.mimetype === 'image/jpeg'
	   ) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

app.use(
	multer({storage: storage, fileFilter: fileFilter}).single('image')
	);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json()) // to parse incoming json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))

// Tell passport to use cookie session
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(surveyRoutes);
app.use(billingRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.httpStatusCode).json({ message: 'An error occured, please try again' })
})

if(process.env.NODE_ENV === 'production') {
  // to make sure that express will serve up production assets like main.js files
  app.use(express.static('client/build'));

  // to make sure espress will serve index.html when it doesnt recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

mongoose.connect(keys.mongoURI).then(connect => {
  console.log('Database Connected!')
}).catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
