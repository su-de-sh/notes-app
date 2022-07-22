import { useState, useEffect } from "react";
import Note from "./components/Note";

import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    noteService
      .getAll()
      .then((data) => {
        setNotes(data);
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

    noteService.create(newNote).then((data) => {
      setNotes([...notes, data]);
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

  const toggleImportace = (id) => {
    const note = notes.find((n) => n.id === id);

    let updatedNote = { ...note, important: !note.important };
    noteService.update(id, updatedNote).then((data) => {
      setNotes(notes.map((note) => (note.id !== id ? note : data)));
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={toggleShow}>{showAll ? "All" : "Important"}</button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportace={() => toggleImportace(note.id)}
          />
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
