  var http = require("http");
  var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
      //var postData = "";
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received");
      route(handle, pathname, response, request);
      //request.setEncoding("utf8");
/*
      request.addListener("data", function(postDataChunk){
        postData += postDataChunk;
        console.log("Received POST data chunk  " +  postDataChunk + ".");
      });

      request.addListener("end", function() {
        route(handle, pathname, response, postData);
      });
      //route(handle, pathname, response);
      
      response.writeHead(200, {'content-type': 'text/html'});
      //response.write('Different Hello World!');
      var content = route(handle, pathname);
      response.write(content);
      response.end();
      */
    }

  http.createServer(onRequest).listen(8888);
  /*
  http.createServer(function(request, response) {
    response.writeHead(200, {'content-type': 'text/plain'});
    response.write("Hello World!");
    response.end();
  }).listen(8888);
  */
  console.log("server has started");
}

exports.start = start;
