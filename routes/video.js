class video {
  constructor(app) {
    this._app = app;
    this._videoDao = require('../models/videoDao')();

    this.listen();
  }

  listen() {
    this._app.post('/api/video', (req, res) => {
      req.assert('desc', 'Description is required').notEmpty();

      const errors = req.validationErrors();

      if (!req.files.video || errors) {
        res.status(400).end();
        return;
      }
      
      this._videoDao.saveVideo(req.body, req.files.video.path, err => {
        if (err) {
          res.status(500).end();
          return;
        };

        res.status(201).send('Successfully upload!');
      });      
    });

    this._app.get('/api/video', (req, res) => {
      let page = 0;

      if (req.query.page) {
        page = req.query.page;
      };

      this._videoDao.loadVideos(page, (err, documents, count) => {
        if (err) {
          res.status(500).end();
          return;
        };

        res.status(200).json({ documents, count, page });
      });
    });
  }
}

module.exports = app => new video(app);
