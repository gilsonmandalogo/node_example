class VideoDao {
  constructor() {
    this._dbConnection = require('../config/dbConnection');
    this._fs = require('fs');
    this._path = require('path');
  }

  saveVideo(doc, videoPath, callback) {
    this._dbConnection((err, client) => {
      client.db('showcase_video').collection('video', (err, collection) => {        
        collection.insert(doc, err => {
          if (err) {
            callback(err);
            client.close();
            return;
          };

          const path = this._path.resolve('./videos');
          const file = this._path.resolve(path + '/' + doc._id);

          if (!this._path.existsSync(path)) {
            this._path.mkdirSync(path);
          };

          this._fs.rename(videoPath, file, err => {
            client.close();
            callback(err);
          });          
        });        
      });
    });
  }

  loadVideos(page, callback) {    
    this._dbConnection((err, client) => {
      client.db('showcase_video').collection('video', (err, collection) => {        
        collection.find().skip(page * 9).limit(9).toArray((err, documents) => {
          collection.count((err, count) => {
            documents.forEach(document => {
              document.date = document._id.getTimestamp();
            });
            callback(err, documents, count);
            client.close();
          });
        });
      });
    });
  }
}

module.exports = () => new VideoDao();
