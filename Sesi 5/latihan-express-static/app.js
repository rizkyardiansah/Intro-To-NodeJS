const express = require("express");
const app = express();
const port = 7892;

app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(`Endpoint: ${req.url} sedang di akses`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.get("/home", (req, res) => {
  res.sendFile("./public/home.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./public/about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  res.sendFile("./public/contact.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`);
});
