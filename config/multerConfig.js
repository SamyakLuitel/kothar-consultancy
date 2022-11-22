const multer = require("multer");
const path = require('path')

module.exports = multer({
  storage: multer.diskStorage({
    destination:(req, file, callback)=>{
      callback(null,'images')
    }, 
    filename:(req,file,callback)=>{
      console.log(file);
      callback(null, Date.now()+ path.extname(file.originalname) )
    }
  }),
  limits:{fileSize:500000}
});
