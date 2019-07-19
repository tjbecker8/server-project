const multer = require('multer');
const path   = require('path');
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public',
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
});
//init
const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:2000000},
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('audio');
var validateFile = function(file, cb ){
  allowedFileTypes = /wav/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only wav files are allowed.")
  }
}
module.exports = upload;
