const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const url = req.url;
    console.log(url);
    switch (url) {
      case "/":
        fs.readFile("./index.html", "utf-8", (err, data) => {
          if (err) return console.error(err);

          res.write(data);
          res.end();
        });
        break;

      case "/about":
        fs.readFile("./about.html", "utf-8", (err, data) => {
          if (err) return console.error(err);

          res.write(data);
          res.end();
        });
        break;

      default:
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.write(`<h2>Page <em>${url}</em> is Not Found</h2>`);
        res.end();
    }
  })
  .listen(6867, "localhost", () => {
    console.log("Running on http://localhost:6867");
  });
