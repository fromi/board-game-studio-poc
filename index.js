const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use('/not-alone', express.static(path.join(__dirname, 'packages/not-alone-ui/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/packages/not-alone-ui/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
