import { AppRouter } from "./router/AppRouter";

import { NavLink } from "react-router-dom";

const App = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-custom">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Ofrecer App
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact="true">
                  Ofrecimientos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/crud" exact="true">
                  CRUD
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AppRouter />
    </>
  );
};

export default App;
