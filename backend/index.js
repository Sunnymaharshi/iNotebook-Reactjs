const connectMongo = require("./db");

const express = require("express");
var cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

connectMongo();

const app = express();
app.use(cors(corsOptions)); // Use this after the variable declaration
const port = 5000;
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Server Response");
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
