import React, { useContext, useRef, useState } from "react";
import NoteContext from "./../context/notes/NoteContext";
import Addnote from "./Addnote";
import NoteItem from "./NoteItem";
import "./Notes.css";
export default function Notes(props) {
  const { showAlert } = props;
  const context = useContext(NoteContext);
  const { notes, editNote } = context;

  const [note, setNote] = useState({
    id: -1,
    etitle: "",
    edescription: "",
    etag: ""
  });

  const ref = useRef(null);
  const refClose = useRef(null);
  const refAddNote = useRef(null);
  const scrollToAddNote = () => {
    refAddNote.current.scrollIntoView();
  };

  const updatenote = (currentnote, id) => {
    ref.current.click();
    setNote({
      id: id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Updated Note Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-3 row">
      <div className="col-md-8">
        <div className="row">
          <h2 className="text-center mb-3">Your Notes</h2>
          <div className="container">
            {notes.length === 0 && "No Notes to display"}
          </div>
          {notes.map((note, index) => {
            return (
              <div className="col-md-6" key={index}>
                <NoteItem
                  key={index}
                  showAlert={showAlert}
                  note={note}
                  index={index}
                  updatenote={updatenote}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div ref={refAddNote} className="col-md-4 mt-1">
        <Addnote showAlert={showAlert} innerRef={refAddNote} />
      </div>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    name="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="etag">
                    Tag
                  </label>
                  <input
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                disabled={
                  note.edescription.length < 5 || note.etitle.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <i
        className="fa fa-plus fa-lg addnote"
        style={{
          position: "fixed",
          bottom: "50px",
          left: "0",
          fontSize: "2.5rem",
          zIndex: "1"
        }}
        onClick={scrollToAddNote}
      ></i>
    </div>
  );
}
