// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`${baseURL}/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            // Other headers if needed
          },
        })
        .then((res) => setToDos(res.data))
        .catch((err) => console.log(err));
    }
  }, [updateUI, loggedIn]);

  const saveToDo = () => {
    if (input.trim() === "") {
      return;
    }
    axios
      .post(
        `${baseURL}/save`,
        { toDo: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            // Other headers if needed
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            loggedIn ? (
              <main>
                <div className="container">
                  <h1 className="title">ToDo App</h1>

                  <div className="input_holder">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      type="text"
                      placeholder="Add a ToDo..."
                    />
                    <button onClick={saveToDo}>Add</button>
                  </div>

                  <div className="list">
                    {toDos.map((el) => (
                      <ToDo
                        key={el._id}
                        text={el.toDo}
                        id={el._id}
                        setUpdateUI={setUpdateUI}
                        setShowPopup={setShowPopup}
                        setPopupContent={setPopupContent}
                      />
                    ))}
                  </div>
                </div>
                {showPopup && (
                  <Popup
                    setShowPopup={setShowPopup}
                    popupContent={popupContent}
                    setUpdateUI={setUpdateUI}
                  />
                )}
              </main>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
