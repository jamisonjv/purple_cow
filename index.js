// establish express server
const express = require('express');
const app = express();
require('dotenv').config();

// need the below so can parse body of requests
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

// establish items endpoint
app.use('/items', require('./api/items'));

// start server
const port = process.env.PORT || 3000; // will default to port configured in environment
app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});

