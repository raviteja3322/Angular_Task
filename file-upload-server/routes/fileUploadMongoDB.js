var db = require("../config/mongoclient");
var mongo = require("mongoose");
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var multer = require("multer");

// Multer File upload settings
const DIR = './uploads/';

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

var Schema = mongo.Schema;

var UsersSchema = new Schema(
  {
    files: { type: Array },
  },
  { collection: 'files' }
);

var model = mongo.model("File", UsersSchema);



let File = require('../models/File');

  router.post('/uploadfile', (req, res) => {
    upload(req,res, (err) => {
        model.findByIdAndUpdate(req.body.id, req.body, function (err, data) {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
    
    });
});
});








module.exports = router;
