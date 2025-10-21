/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nama, setNama] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama fakultas
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data fakultas berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`) // Mengirimkan request GET untuk mendapatkan data fakultas berdasarkan ID
      .then((response) => {
        console.log(response);
        setNama(response.data.result.nama); // Jika sukses, isi state 'nama' dengan data dari response
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menampilkan pesan error di console jika request gagal
        setError("Data tidak ditemukan"); // Mengubah state error jika data tidak ditemukan
      });
  }, [id]); // useEffect akan dijalankan ulang setiap kali 'id' berubah

  // Menghandle perubahan input saat pengguna mengetik di form
  const handleChange = (e) => {
    setNama(e.target.value); // Mengubah state 'nama' sesuai dengan nilai input yang diisi pengguna
  };

  // Fungsi yang aka dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman setelah form disubmit

    // Validasi input: jika namaFakultas kosong, set pesan error
    if (nama.trim() == "") {
      setError("Nama Fakultas is required"); // Set pesan error jika input kosong
      Swal.fire({
        title: "Error!",
        text: "Fakultas name cannot be empty",
        icon: "error",
      });
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    // if (nama.trim() == nama) {
    //   setError("Nama Fakultas cannot be the same"); // Set pesan error jika input sama
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Fakultas name cannot be the same",
    //     icon: "error",
    //   });
    //   return; // Stop eksekusi fungsi jika input tidak valid
    // }

    try {
      // Melakukan HTTP Post request untuk menyimpan data fakultas
      const response = await axios.patch(
        `https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`, // Endpoint tujuan API
        {
          nama,
        }
      );
      // Jika response HTTP status 200, berhasil
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Fakultas updated successfully",
          icon: "success",
        });
        navigate("/fakultas"); // Navigasi ke halaman fakultas
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        Swal.fire({
          title: "Error!",
          text: "Fakultas cannot be updated",
          icon: "error",
        });
        setError("Failed to edit fakultas");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Fakultas cannot be updated",
        icon: "error",
      });
      setError("An error occured while editing fakultas");
    }
  };

  return (
    <div>
      <h2>Edit Fakultas</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {/* Form untuk mengedit nama fakultas */}
        <div className="mb-3">
          {/* Label untuk input nama */}
          <label htmlFor="nama" className="form-label">
            Nama Fakultas
          </label>
          <input
            type="text"
            id="nama"
            className="form-control"
            value={nama} // Nilai input disimpan di state nama
            onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
            placeholder="Enter Fakultas Nama" // Placeholder teks untuk input
          />
        </div>
        {/* Tombol untuk submit form */}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
