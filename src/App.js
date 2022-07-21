import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((respone) => {
        setNotes(respone.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const newNote = (event) => {
    setNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const newNote = {
      // id: notes.length + 1,
      content: note,
      date: new Date().toISOString(),
      important: Math.random() > 0.5 ? true : false,
    };

    axios.post("http://localhost:3001/notes", newNote).then((respone) => {
      setNotes([...notes, respone.data]);
      setNote("");
    });
  };

  const [showAll, setShowAll] = useState(true);
  const toggleShow = () => {
    setShowAll(!showAll);
  };

  let notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important === true;
      });

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={toggleShow}>{showAll ? "All" : "Important"}</button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={note} onChange={newNote} type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default App;
