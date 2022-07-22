const Note = ({ note, toggleImportace }) => {
  return (
    <li>
      {note.content}
      {"            "}
      <button onClick={toggleImportace}>
        {note.important ? "important" : "unimportant"}
      </button>
    </li>
  );
};

export default Note;
