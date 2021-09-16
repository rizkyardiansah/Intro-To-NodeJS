const express = require("express");
const app = express();
const fs = require("fs");
const port = 6565;
const data = JSON.parse(fs.readFileSync("./data-kelas.json", "utf-8"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  const { instruktur, peserta } = data;

  if (!req.query.search) {
    hasilSearch = peserta;
  } else {
    const { search } = req.query;
    hasilSearch = peserta.filter((p) => {
      return (
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.kode.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  res.render("index", {
    instruktur,
    peserta: hasilSearch,
  });
});

app.get("/:id", (req, res) => {
  const { instruktur, peserta } = data;
  const { id: paramId } = req.params;
  const hasilSearch = peserta.filter((p) => {
    return p.id == paramId;
  });
  res.render("index", {
    instruktur,
    peserta: hasilSearch,
  });
});

app.post("/", (req, res) => {
  const { nama, kode } = req.body;
  const pesertaBaru = {
    id: data.peserta.length,
    nama,
    kode,
  };
  data.peserta.push(pesertaBaru);

  fs.writeFile("./data-kelas.json", JSON.stringify(data), (err) => {
    if (err) throw err;
  });

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
