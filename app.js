const app = require('./config/server');

app.listen(app.serverConfig.httpPort, () => {
	console.log('Http server listen on port ' + app.serverConfig.httpPort);
});

require('./stream_server')(app);
require('./routes/video')(app);

module.exports = app;
