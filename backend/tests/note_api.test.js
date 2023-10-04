const mongoose = require("mongoose");
const supertest = require("supertest");

const Note = require("../model/note");

const app = require("../app");
const { beforeEach } = require("node:test");

const api = supertest(app);

// state
const initialState = [
  {
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    date: new Date(),
    important: true,
  },
];

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialState[0]);
  await noteObject.save();
  noteObject = new Note(initialState[1]);
  await noteObject.save();
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(initialState.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);

  expect(contents).toContain("Browser can execute only JavaScript");
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };
  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");
  const contents = response.body.map((r) => r.content);
  expect(response.body).toHaveLength(initialState.length + 1);
  expect(contents).toContain("async/await simplifies making async calls");
});
afterAll(async () => {
  await mongoose.connection.close();
});
