import { useState, useRef, useEffect } from "react";
import NoteList from "./components/NoteList/NoteList";
import NoteItem from "./components/NoteItem/NoteItem";
import styles from "./App.module.css";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const inputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных пользователя");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAddNote = (event) => {
    event.preventDefault();
    const newNote = inputRef.current.value.trim();
    if (newNote) {
      setNotes([...notes, newNote]);
      inputRef.current.value = "";
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Заметки</h1>

      {loading ? (
        <p>Загрузка данных пользователя...</p>
      ) : error ? (
        <p>Ошибка: {error}</p>
      ) : userData ? (
        <p>Привет, {userData.name}!</p>
      ) : null}

      <form onSubmit={handleAddNote}>
        <input ref={inputRef} type="text" placeholder="Введите заметку" />
        <button type="submit">Добавить</button>
      </form>

      <NoteList title="Мои Заметки">
        {notes.length === 0 ? (
          <p>Нотаток немає</p>
        ) : (
          notes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              onDelete={() => handleDeleteNote(index)}
            />
          ))
        )}
      </NoteList>
    </div>
  );
};

export default App;
