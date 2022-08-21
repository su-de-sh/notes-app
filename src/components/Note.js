const Note = ({ note, toggleImportance }) => {
  return (
    <li className="note">
      {note.content}

      <button onClick={toggleImportance}>
        {note.important ? "important" : "unimportant"}
      </button>
    </li>
  );
};

export default Note;
