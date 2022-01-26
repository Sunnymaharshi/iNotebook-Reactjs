import React from "react";

export default function Alert(props) {
  return (
    props.alert != null && (
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          display: "inline-block",
          zIndex: "9999",
          marginRight: "10px"
        }}
        className={`alert alert-${props.alert.type} alert-dismissible fade show p-2 slide-top`}
        role="alert"
      >
        <h5>{props.alert.msg}</h5>
      </div>
    )
  );
}
