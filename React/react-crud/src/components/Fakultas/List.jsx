import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  // State fakultas untuk menyimpan data response API Fakultas
  const [fakultas, setFakultas] = useState([]);

  // Panggil API Fakultas menggunakan useEffect dan axios
  useEffect(() => {
    axios
      .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
      .then((response) => {
        console.log(response.data);
        setFakultas(response.data.result);
      });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Periksa kembali",
      text: `Apakah kamu yakin ingin menghapus data! Fakultas: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmedButtonColor: "#3085d6",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Ya, hapus saja!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil axios delete
        axios
          .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
          .then((response) => {
            // Hapus fakultas dari state setelah sukses dihapus dari server
            setFakultas(fakultas.filter((f) => f.id !== id));
            // Tampilkan notifkasi sukses
            Swal.fire("Deleted!", "Your data has been delete", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error); // Menangani error
            Swal.fire("Error", "There was an issue deleting the data", "error");
          });
      }
    });
  };

  return (
    <div>
      <h2>List Fakultas</h2>
      <NavLink to="/fakultas/create" className="btn btn-primary mb-3">
        Create
      </NavLink>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama Fakultas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {fakultas.map((data) => (
            <tr key={data.id}>
              <td>{data.nama}</td>
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
