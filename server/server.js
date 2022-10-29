const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
// use the distribution folder for our main root route
app.use(express.static('../client/dist'));

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// redirect route to the index.html file in the htmlRoutes
require('./routes/htmlRoutes')(app);

//open app for incoming requests
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
