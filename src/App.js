import { LoginForm } from "./components/LoginForm";
import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import noteService from "./services/notes";
import loginService from "./services/login";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();
  useEffect(() => {
    const user = window.localStorage.getItem("loggedNoteappUser");
    if (user) {
      setUser(JSON.parse(user));
    }

    noteService
      .getAll()
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // const newNote = (event) => {
  //   setNote(event.target.value);
  // };

  const addNote = (noteObject) => {
    // event.preventDefault();
    // const newNote = {
    //   // id: notes.length + 1,
    //   content: note,
    //   date: new Date().toISOString(),
    //   important: Math.random() > 0.5 ? true : false,
    // };
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject, user.token)
      .then((data) => {
        setNotes([...notes, data]);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
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
    noteService
      .update(id, updatedNote)
      .then((data) => {
        setNotes(notes.map((note) => (note.id !== id ? note : data)));
      })
      .catch(() => {
        setMessage("This note is deleted!!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );
  return (
    <div>
      <h1>Notes</h1>
      <Notification msg={message} />
      {user === null && loginForm()}
      {user !== null && (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}
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

      <Footer />
    </div>
  );
};

export default App;
