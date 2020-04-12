const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res, next) => {
  res.send("hello there");
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
