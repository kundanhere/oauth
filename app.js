const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

// connect with db and run the server
const PORT = process.env.PORT || 3000;
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(PORT, () => {
      console.log(`app now listening for requests on port ${PORT}`);
    });
  }
);
