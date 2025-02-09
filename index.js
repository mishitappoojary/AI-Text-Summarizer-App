const express = require('express');
const summerizeText = require('./summarize.js');
const app = express();
const port = 3000;

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

app.post('/summerize', (req, res) => {
  const text = req.body.text_to_summerize;
  summerizeText(text).then(response => {
    res.send(response);
  })
    .catch(error => {
      console.log(error.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
