const express = require("express");
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: false,
  },
  {
    id: 2,
    content: "CSS is Hard",
    important: true,
  },
  {
    id: 3,
    content: "mongoose makes life easy",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  const note = req.body;
  console.log("Request Body", note);
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  res.json(note);
});
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }
  notes.concat(note);
  console.log(note);
  res.json(note);
});
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
