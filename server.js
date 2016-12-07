  var http = require("http");
  var url = require("url");

function start(route) {
    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received");

      route(pathname);

      response.writeHead(200, {'content-type': 'text/html'});
      response.write('Different Hello World!');
      response.end();
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
