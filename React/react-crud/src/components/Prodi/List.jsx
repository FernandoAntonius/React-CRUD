import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function List() {
  // State prodi untuk menyimpan data response API Prodi
  const [prodi, setProdi] = useState([]);

  // Panggil API Prodi menggunakan useEffect dan axios
  useEffect(() => {
    axios
      .get("http://project-apiif-3-b.vercel.app/api/api/prodi")
      .then((response) => {
        console.log(response.data);
        setProdi(response.data.result);
      });
  }, []);

  return (
    <div>
      <h2>List Program Studi</h2>
      <NavLink to="/prodi/create" className="btn btn-primary mb-3">
        Create
      </NavLink>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama Prodi</th>
            <th>Nama Fakultas</th>
          </tr>
        </thead>
        <tbody>
          {prodi.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>{data.fakultas.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
