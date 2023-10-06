import axios from "axios";

// url
const baseUrl = "http://localhost:8000/api/notes";

// set token so that we can get data and update UI
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
// get all notes
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// create new note
const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
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
  setToken: setToken,
};
