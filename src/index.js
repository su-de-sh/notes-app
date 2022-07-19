import ReactDOM from "react-dom/client";
import App from "./App";
import Error from "./Error";
import axios from "axios";

axios
  .get("http://localhost:3001/notes1")
  .then((response) => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <App notes={response.data} />
    );
  })
  .catch((error) => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <Error msg={error.message} />
    );
  });
