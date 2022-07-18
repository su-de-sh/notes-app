import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNote] = useState(props.notes);

  const addNote = (event) => {
    console.dir(event.target.newnote.value);
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      content: event.target.newnote.value,
      date: Date.now(),
      important: true,
    };
    setNote([...notes, newNote]);
    event.target.newnote.value = "";
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
        <input name="newnote" type="text" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default App;
