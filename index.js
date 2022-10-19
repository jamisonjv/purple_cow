// establish express server
const app = require('express')();

// establish items endpoint
app.use('/items', require('./api/items'));

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});

