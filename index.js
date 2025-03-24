const express = require("express");
const cors = require("cors");
const { fileURLToPath } = require("url");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const fileRouter = require("./src/routers/fileRouter");
const folderRouter = require("./src/routers/folderRouter");

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdir(uploadDir);
}
app.use(express.urlencoded({ extended: true }));

app.use("/folders", folderRouter);
app.use("/files", fileRouter);

app.get("/", (req, res) => {
  res.send("Hi application is working");
});

app.listen(PORT, () => {
  console.log("Server is listening to " + PORT);
});
