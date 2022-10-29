const path = require('path');

// server to send requests to the root directory to the index in our distribution directory
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
