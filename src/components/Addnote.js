import React, { useContext, useState } from "react";
import NoteContext from "./../context/notes/NoteContext";

export default function Addnote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note Added Successfully", "success");

    setNote({
      title: "",
      description: "",
      tag: ""
    });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2>Add a Note </h2>
      <form className="mt-3">
        <div className="mb-1">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={onChange}
            name="title"
            value={note.title}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            style={{
              height: "150px"
            }}
            type="text"
            className="form-control"
            name="description"
            id="description"
            value={note.description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="tag">
            tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.description.length < 5 || note.title.length < 5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
