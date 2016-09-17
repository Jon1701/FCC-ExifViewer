////////////////////////////////////////////////////////////////////////////////
// ExpressJS dependencies.
////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var multer  = require('multer');
var app = express();

var fs = require('fs');       // Filesystem.
var del = require('delete');  // Deletes files.
var path = require('path');

////////////////////////////////////////////////////////////////////////////////
// Multer.
////////////////////////////////////////////////////////////////////////////////
var multer  = require('multer');
var upload = multer({ dest: './tmp/uploads/' });  // Disk storage.

////////////////////////////////////////////////////////////////////////////////
// Common callback functions.
////////////////////////////////////////////////////////////////////////////////
function deleteFile(filePath) {
  del([filePath], (err) => {

    if (err) {
      console.log('Unable to delete file: ' + filePath);
    };

  });
}

////////////////////////////////////////////////////////////////////////////////
// Serve files from the ./dist folder.
////////////////////////////////////////////////////////////////////////////////
app.use(express.static('dist'));

////////////////////////////////////////////////////////////////////////////////
// Route to handle file uploads.
////////////////////////////////////////////////////////////////////////////////
app.post('/upload', upload.single('uploads'), function(req, res, next) {

  // Get the full path and filename of the file which was just uploaded.
  var filePath = req.file.path;

  // Data containing filesize and EXIF.
  var data = {};

  var ExifImage = require('exif').ExifImage;

  try {
    new ExifImage({ image: filePath}, (error, exifData) => {

      // Get filesize and add it to data variable.
      data['fileSize'] = fs.statSync(filePath)['size'];

      // If an error occurs, set exif property to null.
      // If no error, store exif data.
      if (error) {
        data['exif'] = null;
      } else {
        data['exif'] = exifData.exif;
      }

      // Delete uploaded file.
      deleteFile(filePath);

      // Send EXIF and file size info to client.
      res.json(data);

    });
  } catch (error) {

    // Delete uploaded file.
    deleteFile(filePath);

    // If an attempt to load EXIF data failed, send errors to error route.
    return next(error);

  };

});

////////////////////////////////////////////////////////////////////////////////
// Route to handle errors.
////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

////////////////////////////////////////////////////////////////////////////////
// Server listening for connections.
////////////////////////////////////////////////////////////////////////////////
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening for connections on PORT ' + port);
});
