const app = require('./config/server');

const port = 80;

app.listen(port, () => {
	console.log('Http server listen on port ' + port);
});

require('./stream_server');
require('./routes/video')(app);

module.exports = app;
