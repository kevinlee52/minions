var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ci', function(req, res, next) {
  res.render('logs/log_download', {...req.query});
});

router.get('/ci/download', function(req, res, next) {
  let {date, model} = req.query;
  let file_path = "/export/home/cafetest/save_ci_logs/";
  let file_name = `${date}-${model}.zip`;
  if (fs.existsSync(`${file_path}${file_name}`)) {
    res.setHeader("Content-type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment;filename=${file_name}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);


    let fileStream = fs.createReadStream(`${file_path}${file_name}`);
    fileStream.on("data", function (data) {
      res.write(data, "binary");
    });
    fileStream.on("end", function () {
      console.log("FileStream end successfully...");
      res.end("Download suc");
    });
  } else {
    res.send('Log file does not exist.');
  }
  // fs.readFile(`${file_path}${file_name}`, (err, data) => {
  //   if (!err && data) {
  //     res.setHeader("Content-type", "application/octet-stream");
  //     res.setHeader("Content-Disposition", `attachment;filename=${file_name}`);
  //     let fileStream = fs.createReadStream(`${file_path}${file_name}`);
  //     fileStream.on("data", function (data) {
  //       res.write(data, "binary");
  //     });
  //     fileStream.on("end", function () {
  //       console.log("Log File exists, stream ended successfully...");
  //       res.end("Download suc");
  //     });
  //   } else {
  //     res.send("Log file does not exist.");
  //   }
  // });
});

module.exports = router;
