import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            React CRUD
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/fakultas">
                  Fakultas
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/prodi">
                  Prodi
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/fakultas"
            element={<FakultasList></FakultasList>}></Route>
          <Route
            path="/fakultas/create"
            element={<FakultasCreate></FakultasCreate>}></Route>
          <Route
            path="/fakultas/edit/:id"
            element={<FakultasEdit></FakultasEdit>}></Route>
          <Route
            path="/prodi/create"
            element={<ProdiCreate></ProdiCreate>}></Route>
          <Route path="/prodi" element={<ProdiList></ProdiList>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
