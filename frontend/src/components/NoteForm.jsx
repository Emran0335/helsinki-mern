import React from "react";

const NoteForm = ({ addNote, newNote, setNewNote }) => {
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  return (
    <>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default NoteForm;
