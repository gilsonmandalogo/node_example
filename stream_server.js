const fs = require('fs');
const http = require('http');
const path = require('path');

const port = 81;

http.createServer((req, res) => {
  const file = path.resolve('./videos' + req.url);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        return;
      };

      res.end(err);
    };

    if (!req.headers.range) {
      res.statusCode = 416;
      return;
    };

    const positions = req.headers.range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : stats.size - 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + stats.size,
      "Accept-Ranges": "bytes",
      "Content-Length": (end - start) + 1,
      "Content-Type": "video/mp4",
    });

    const stream = fs.createReadStream(file, { start, end })
      .on("open", () => {
        stream.pipe(res);
      }).on("error", err => {
        res.end(err);
      });
  });
}).listen(port);

console.log('Video stream server listen on port ' + port);
