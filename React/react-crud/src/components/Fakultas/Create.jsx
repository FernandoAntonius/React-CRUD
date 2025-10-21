// src/components/Fakultas/Create.jsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateFakultas() {
  // Inisialisasi state untuk menyimpan nama fakultas
  const [namaFakultas, setNamaFakultas] = useState("");
  // Inisialisasi state untuk menyimpan pesan error
  const [error, setError] = useState("");
  // Inisialisasi state untuk menyimpan pesan sukses
  const [success, setSuccess] = useState("");

  // Fungsi yang aka dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit
    setError(""); // Reset pesan error sebelum diproses
    setSuccess(""); // Reset pesan sukses sebelum diproses

    // Validasi input: jika namaFakultas kosong, set pesan error
    if (namaFakultas.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Nama fakultas tidak bisa kosong",
        icon: "error",
      });
      setError("Nama Fakultas is required"); // Set pesan error jika input kosong
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    try {
      // Melakukan HTTP Post request untuk menyimpan data fakultas
      const response = await axios
        .post(
          "https://project-apiif-3-b.vercel.app/api/api/fakultas", // Endpoint tujuan API
          {
            nama: namaFakultas, // Data yang dikirim berupa objek JSON dengan properti nama
          }
        )
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Nama fakultas tidak bisa sama",
            icon: "error",
          });
          setError(error.response.data.message);
        });
      // Jika response HTTP status 201 (Created), berhasil
      if (response.status === 201) {
        // Tampilkan pesan sukses jika fakultaas berhasil dibuat
        setSuccess("Fakultas created successfully!");
        setNamaFakultas(""); // Kosongkan input form setelah sukses submit
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        setError("Failed to create fakultas");
      }
    } catch (error) {
      // setError("An error occured while creating fakultas");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Fakultas</h2>
      {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Form untuk mengisi data nama fakultas */}
      <form onSubmit={handleSubmit}>
        {/* Tangani event submit dengan handleSubmit */}
        <div className="mb-3">
          {/* Margin bottom pada div untuk jarak antar elemen */}
          <label htmlFor="namaFakultas" className="form-label">
            {" "}
            Nama Fakultas
          </label>
          {/* Input untuk nama fakultas dengan class bootstrap untuk styling */}
          <input
            type="text"
            className="form-control"
            id="namaFakultas"
            value={namaFakultas} // Nilai input disimpan di state namaFakultas
            onChange={(e) => setNamaFakultas(e.target.value)} //Update state saat input berubah
            placeholder="Enter Fakultas Name" // Placeholder teks untuk input
          />
        </div>
        {/* Tombol submit dengan class bootstrap */}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
