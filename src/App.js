import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [note, setNote] = useState("");

  const newNote = (event) => {
    setNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      content: note,
      date: Date.now(),
      important: Math.random() > 0.5 ? true : false,
    };
    setNotes([...notes, newNote]);
    setNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
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
