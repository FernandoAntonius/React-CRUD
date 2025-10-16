import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  // State prodi untuk menyimpan data response API Prodi
  const [prodi, setProdi] = useState([]);

  // Panggil API Prodi menggunakan useEffect dan axios
  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/prodi")
      .then((response) => {
        console.log(response.data);
        setProdi(response.data.result);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
          .then((response) => {
            setProdi(prodi.filter((f) => f.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire(
              "Error",
              "There was an issue deleting the data.",
              "error"
            );
          });
      }
    });
  };

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
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          {prodi.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
              <td>{data.fakultas.nama}</td>
              <td>
                <button
                  onClick={() => handleDelete(data.id, data.nama)}
                  className="btn btn-danger btn-sm">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
