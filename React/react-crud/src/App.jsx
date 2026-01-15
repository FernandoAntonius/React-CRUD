import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Loader from "./components/Loader";

const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"));
const Login = React.lazy(() => import("./components/Login"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
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
              <li>
                {token ? (
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Suspense fallback={<Loader></Loader>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route
            path="/fakultas"
            element={<FakultasList></FakultasList>}></Route>
          <Route
            path="/fakultas/create"
            element={
              <ProtectedRoute>
                <FakultasCreate></FakultasCreate>
              </ProtectedRoute>
            }></Route>
          <Route
            path="/fakultas/edit/:id"
            element={
              <ProtectedRoute>
                <FakultasEdit></FakultasEdit>
              </ProtectedRoute>
            }></Route>
          <Route
            path="/prodi/create"
            element={
              <ProtectedRoute>
                <ProdiCreate></ProdiCreate>
              </ProtectedRoute>
            }></Route>
          <Route
            path="/prodi/edit/:id"
            element={
              <ProtectedRoute>
                <ProdiEdit></ProdiEdit>
              </ProtectedRoute>
            }></Route>
          <Route path="/prodi" element={<ProdiList></ProdiList>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
