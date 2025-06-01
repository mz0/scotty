const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Optional, for handling cross-origin requests

const app = express();
const port = 3000; // Or any port you prefer

app.use(bodyParser.json());
app.use(cors()); // Enable CORS if your frontend is on a different origin

app.post('/process-charome-data', (req, res) => {
  const { selectedText, tags, route, pageUrl } = req.body;
  console.log('Received data:', { selectedText, tags, route, pageUrl });

  // Here you would process the data (e.g., save to a database)

  res.json({ message: 'Data received successfully!' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
