let express = require("./src/express");
const app = express();

app.get("/", (req, res, next) => {
  console.log(next);
  next();
});

app.get("/", (req, res) => {
  res.send("Response from second matching route");
});

app.get("/test", (req, res) => {
  res.send("Response from test route");
});

app.get("/json-test", (req, res) => {
  res.send({ hello: "world" });
});

app.post("/post", (req, res) => {
  res.write("Data from post :)");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
