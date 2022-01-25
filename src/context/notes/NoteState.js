import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      title: "title 1",
      description: "description 1",
      tag: "tag 1"
    },
    {
      title: "title 2",
      description: "description 2",
      tag: "tag 2"
    },
    {
      title: "title 3",
      description: "description 3",
      tag: "tag 3"
    },
    {
      title: "title 4",
      description: "description 4",
      tag: "tag 4"
    },
    {
      title: "title 5",
      description: "description 5",
      tag: "tag 5"
    },
    {
      title: "title 6",
      description: "description 6",
      tag: "tag 6"
    }
  ];
  const [notes, setNotes] = useState(initialNotes);

  // fetch all notes
  const fetchAllNotes = () => {
    setNotes(initialNotes);
  };

  // add note
  const addNote = (title, description, tag) => {
    const newNotes = notes;
    newNotes.unshift({ title, description, tag });
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  // delete note
  const deleteNote = (id) => {
    const newNotes = notes;
    newNotes.splice(id, 1);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };
  // edit note
  const editNote = (i, title, description, tag) => {
    let newNotes = notes;

    newNotes[i].title = title;
    newNotes[i].description = description;
    newNotes[i].tag = tag;

    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        fetchAllNotes,
        setNotes
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
