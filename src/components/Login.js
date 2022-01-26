import React, { useContext, useState, useEffect } from "react";
import NoteContext from "./../context/notes/NoteContext";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const context = useContext(NoteContext);
  const { setNotes, notes } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.setLogin(true);
      const lnotes = localStorage.getItem("notes");
      setNotes(JSON.parse(lnotes));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("token", "dummy-token");
    props.showAlert("Logged in Successfully", "success");
    props.setLogin(true);
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  return (
    <div className="container mt-2 col-md-6 ">
      <h2 className="text-center">Login to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <div>
            <small className="form-text">Use dummy email and password</small>
          </div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
            minLength={5}
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
