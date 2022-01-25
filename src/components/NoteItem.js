import React, { useContext } from "react";
import NoteContext from "./../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;

  return (
    <div
      className="card my-2"
      style={{
        padding: "20px",
        minHeight: "100px",
        minWidth: "200px"
      }}
    >
      <h5
        className="card-title"
        style={{
          marginTop: "-15px"
        }}
      >
        {note.title}
      </h5>

      <div
        style={{
          top: "5px",
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0"
        }}
      >
        <i
          className="far fa-trash-alt mx-2"
          style={{
            color: "red"
          }}
          onClick={() => {
            deleteNote(props.index);
            props.showAlert("Deleted Note Successfully", "success");
          }}
        ></i>
        <i
          className="far fa-edit mx-2"
          onClick={() => {
            updatenote(note, props.index);
          }}
        ></i>
      </div>

      <p className="card-text">{note.description}</p>
      {note.tag && note.tag.length > 1 && (
        <div
          className="badge rounded-pill"
          style={{
            bottom: "5px",
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            background: "lightgrey",
            color: "black",
            right: "5px"
          }}
        >
          {note.tag}
        </div>
      )}
    </div>
  );
}

export default NoteItem;
