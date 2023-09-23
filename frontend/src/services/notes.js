import axios from "axios";

// url
const baseUrl = "http://localhost:8000/api/notes";

// get all notes
const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 100,
    content: 'This note is not saved to server',
    important: true
  }
  return request.then((response) => response.data.concat(nonExisting));
};

// create new note
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => (response.data));
};

// update a note
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
