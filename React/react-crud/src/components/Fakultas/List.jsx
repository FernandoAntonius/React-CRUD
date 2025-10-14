import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function List() {
  // State fakultas untuk menyimpan data response API Fakultas
  const [fakultas, setFakultas] = useState([]);

  // Panggil API Fakultas menggunakan useEffect dan axios
  useEffect(() => {
    axios
      .get("http://project-apiif-3-b.vercel.app/api/api/fakultas")
      .then((response) => {
        console.log(response.data);
        setFakultas(response.data.result);
      });
  }, []);

  return (
    <div>
      <h2>List Fakultas</h2>
      <NavLink to="/fakultas/create" className="btn btn-primary mb-3">
        Create
      </NavLink>

      <ul>
        {fakultas.map((data) => (
          <li>{data.nama}</li>
        ))}
      </ul>
    </div>
  );
}
