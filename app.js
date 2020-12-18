const express = require('express');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app now listening for requests on port ${PORT}`);
});
