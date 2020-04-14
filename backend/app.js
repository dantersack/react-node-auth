const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("hello there");
});

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  const token = jwt.sign({ email: email, password: password }, "top-secret", {
    expiresIn: "1h",
  });

  res.status(200).json({ token: token });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
