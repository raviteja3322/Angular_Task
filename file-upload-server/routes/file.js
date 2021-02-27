var db = require("../config/mongoclient");
var mongo = require("mongoose");
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const fs = require("fs"); 
var multer = require("multer");
const path = require('path');


console.log(multer);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});




var upload = multer({ storage: storage });
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "raviteja.kuchipudi91@gmail.com",
    pass: "Ravi@3322",
  },
  tls: {
    rejectUnauthorized: false,
  },
});



router.post("/sendFile", function (req, res) {
  upload.array("files", 12)(req, res, function (err) {
    console.log(req.files);
    if (err) {
      throw err;
    }
    var mailOptions = {
      from: '"User" <raviteja.kuchipudi91@gmail.com>', // sender address
      to: "raviteja.kuchipudi91@gmail.com", // list of receivers
      subject: "Sending Email via Node.js",
      text: "File",
      html: "HTML", // html body
      attachments: [
        {
          filename: req.file ? req.file.filename : "vaccine.txt",
          path: req.file ? req.file.path : "./uploads/vaccine.txt",
        },
        {
          filename: req.file ? req.file.filename : "RAVI TEJA KUCHIPUDI.docx",
          path: req.file ? req.file.path : "./uploads/RAVI TEJA KUCHIPUDI.docx",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
    });
  });
});


router.post("/saveFile", function (req, res) {
  upload.array("files", 12)(req, res, function (err) {
    console.log(req.files);
    if (err) {
      // An error occurred when uploading
      throw err;
    }
    res.json({
      sucess: true,
      message: "File was uploaded successfully",
    });
  });
});


const getFiles = () => {
  let filenames = fs.readdirSync('./uploads'); 
  return filenames;
}


router.get('/findAll', function (req, res) {
  res.json(getFiles());
});


router.get('/findByName', function (req, res,next) {
  let fileName = req.query.fileName;

  var options = { 
    root: './uploads' 
  }; 
  res.sendFile(fileName, options, function (err) { 
    if (err) { 
        next(err); 
    } else { 
        console.log('Sent:', fileName); 
        next(); 
    } 
  });
});


router.get('/download/:fileName',(req, res) => {
  var fileName = req.params.fileName;
  console.log(fileName)
  var fileLocation = path.join('./uploads',fileName);
  console.log(fileLocation);
  res.download(fileLocation, fileName);
});


router.delete('/delete/:fileName', (req, res) => {
  var options = './uploads/' ;
  var fileName = req.params.fileName.replace(/%20/g, ' ');
  console.log(fileName)
  fs.unlink(options  + fileName, (err) => {
    if (err) {
      console.log("File is deleted."+err);
      res.sendStatus(500);
    } else {
      res.status(204);
      res.send({});
    }
  });
 });


module.exports = router;
