//var exec = require('child_process').exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = "<html>" +
            "<head>" +
            "<meta http-equiv='Content-type' content='text/html; charset=UTF-8' />" +
            "</head>" +
            "<body>" +
            "<form action='/upload' enctype='multipart/form-data' method='post'>" +
            "<input type='file' name='upload'>" +
            "<input type='submit' value='Upload File' />" +
            "</form>" +
            "</body>" +
            "</html>";

  response.writeHead(200, {"Content-type": "text/html", "Charset": "utf-8"});
/*
  response.write("Going to call 'exec()' function! ... \n");
  response.write("<br />");
  exec("ls -lah " , function(error, stdout, stderr) {
    response.write("Standard output:");
    response.write("<br />");
    response.write(stdout);
    response.write("Standard error:");
    response.write("<br />");
    response.write(stderr);
    response.write("<br />");
    response.write("After the 'exec()' function!");
    */
    response.write(body);
    response.end();
  /*
  function sleep(milliseconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliseconds);
  }

  sleep(40000);
  return "Hello Start!";
  */
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("About to parse! ...");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    fs.rename(files.upload.path, "./tmp/test.jpg", function(error) {
      if (error) {
        fs.unlink("/tmp/test.jpg");
        fs.rename(files.upload.path, "./tmp/test.jpg");
      }
    });
    response.writeHead(200, {"Content-type": "text/html"});
    response.write("received image: <br />");
    response.write("<img src='/show' />");
    response.end();
  });

  /* response.writeHead(200, {"Content-type": "text/html"});
  response.write("you have sent: " + querystring.parse(postData).text);
  response.end();*/
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.jpg", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
