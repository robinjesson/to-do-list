import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import DoneList from "./done-list/DoneList";
import ToDoList from "./to-do-list/ToDoList";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand">Notes</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Rappels
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/done">
                    Notes
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Route exact path="/" component={ToDoList} />
      <Route path="/done" component={DoneList} />
    </BrowserRouter>
  );
};

export default App;
