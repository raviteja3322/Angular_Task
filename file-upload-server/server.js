// var express = require('express');
// var multer = require('multer')
// var upload = multer({ dest: 'uploads/' })

// var app = express();

// app.get('/', function(req, res) {
//  res.send('Hello Express');
// });



// app.post('/uploadfile', function (req, res) {
//   var mailOptions = {
//     from: '"User" <raviteja.kuchipudi91@gmail.com>', // sender address
//     to: "raviteja.kuchipudi91@gmail.com", // list of receivers
//     subject: "Mail from Careers",
//     text: text,
//     html: html, // html body
//     attachments: [{
//       filename: req.file.filename,
//       path: req.file.path
//   }]
// };

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });

// })


// const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');
// const userFiles = './user_upload/';
// const fs = require('fs');
// app.set('views', './dist/browser');
// app.use(bodyParser.json());
// app.use(bodyParser.json({limit: '50mb'}));
// app.use('/files', express.static(userFiles));

// app.put('/files', (req, res) => {
//   const file = req.body;
//   const base64data = file.content.replace(/^data:.*,/, '');
//   fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.set('Location', userFiles + file.name);
//       res.status(200);
//       res.send(file);
//     }
//   });
//  });

//  app.delete('/files/**', (req, res) => {
//   const fileName = req.url.substring(7).replace(/%20/g, ' ');
//   fs.unlink(userFiles + fileName, (err) => {
//     if (err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.status(204);
//       res.send({});
//     }
//   });
//  });