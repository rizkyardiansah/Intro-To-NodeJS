const express = require("express");
const app = express();

const fs = require("fs");

const port = 6868;

let people = JSON.parse(fs.readFileSync("./data/people.json", "utf-8"));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200);
  res.type("application/json");
  res.send({
    success: true,
    data: people,
  });
});

app.get("/people", (req, res) => {
  res.status(200);
  res.type("application/json");

  res.send({
    success: true,
    data: people,
  });
  res.end();
});

app.post("/people", (req, res) => {
  const newPersonId = people.length + 1;
  const newPerson = {
    id: newPersonId,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    avatar: req.body.avatar,
  };
  people.push(newPerson);
  refreshData();
  res.send({
    success: true,
    message: "Person Added",
    data: {
      id: newPersonId,
    },
  });
});

app.get("/people/:id", (req, res) => {
  const person = people.find((p) => p.id == req.params.id);

  if (!person) {
    res.status(404);
    res.send({
      success: false,
      message: "Person Not Found",
    });
  } else {
    res.status(200);
    res.send({
      success: true,
      data: person,
    });
  }
});

app.put("/people/:id", (req, res) => {
  const person = people.find((p) => p.id == req.params.id);

  if (!person) {
    res.status(404);
    res.type("application/json");
    res.send({
      success: false,
      message: "Person Not Found",
    });
  } else {
    person.email = req.body.email;
    person.first_name = req.body.first_name;
    person.last_name = req.body.last_name;
    person.avatar = req.body.avatar;

    res.status(200);
    res.type("application/json");
    res.send({
      success: true,
      message: "Person Edited",
    });
  }
});

app.delete("/people/:id", (req, res) => {
  const person = people.find((p) => p.id == req.params.id);

  if (!person) {
    res.status(404);
    res.send({
      success: false,
      message: "Person Not Found",
    });
  } else {
    people = people.filter((p) => p.id != req.params.id);
    refreshData;
    res.status(200);
    res.send({
      success: true,
      message: "Person Deleted",
    });
  }
});

const refreshData = () => {
  fs.writeFile(
    "./data/people.json",
    JSON.stringify(people, null, 2),
    "utf-8",
    (err) => {
      if (err) throw err;
    }
  );
};

app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`);
});
