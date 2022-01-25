import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import { useState } from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const [login, setLogin] = useState(false);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />

        {login && <Home showAlert={showAlert} />}

        {!login && <Login showAlert={showAlert} setLogin={setLogin} />}
      </NoteState>
    </>
  );
}

export default App;
