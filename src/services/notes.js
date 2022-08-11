import axios from "axios";
const baseUrl = "/api/notes";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token} ` },
  };
  return axios
    .post(baseUrl, newObject, config)
    .then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const noteService = {
  getAll,
  create,
  update,
};
export default noteService;
