import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.post("/folder/create", createFolder);

app.get("/", (req, res) => {
  res.send("Hi application is working");
});

app.listen(PORT, () => {
  console.log("Server is listening to " + PORT);
});
