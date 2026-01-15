/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter dan navigasi
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams(); // Mengambil parameter "id" dari URL menggunakan useParams
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi setelah proses selesai
  const [nama, setNama] = useState(""); // Menginisialisasi state 'nama' untuk menyimpan nama prodi
  const [error, setError] = useState(null); // Menginisialisasi state 'error' untuk menyimpan pesan error jika ada

  // Mengambil data prodi berdasarkan id ketika komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`) // Mengirimkan request GET untuk mendapatkan data prodi berdasarkan ID
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

    // Validasi input: jika namaProdi kosong, set pesan error
    if (nama.trim() == "") {
      setError("Nama Prodi is required"); // Set pesan error jika input kosong
      Swal.fire({
        title: "Error!",
        text: "Prodi name cannot be empty",
        icon: "error",
      });
      return; // Stop eksekusi fungsi jika input tidak valid
    }

    // if (nama.trim() == nama) {
    //   setError("Nama Prodi cannot be the same"); // Set pesan error jika input sama
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Prodi name cannot be the same",
    //     icon: "error",
    //   });
    //   return; // Stop eksekusi fungsi jika input tidak valid
    // }

    try {
      // Melakukan HTTP Post request untuk menyimpan data prodi
      const response = await axios.patch(
        `https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, // Endpoint tujuan API
        {
          nama,
        }
      );
      // Jika response HTTP status 200, berhasil
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Prodi updated successfully",
          icon: "success",
        });
        navigate("/prodi"); // Navigasi ke halaman prodi
      } else {
        // Jika tidak berhasil, tampilkan pesan error
        Swal.fire({
          title: "Error!",
          text: "Prodi cannot be updated",
          icon: "error",
        });
        setError("Failed to edit prodi");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Prodi cannot be updated",
        icon: "error",
      });
      setError("An error occured while editing prodi");
    }
  };

  return (
    <div>
      <h2>Edit Prodi</h2> {/* Menampilkan judul halaman */}
      {error && <p className="text-danger">{error}</p>}
      {/* Menampilkan pesan error jika ada */}
      <form onSubmit={handleSubmit}>
        {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
          {/* Label untuk input nama */}
          <label htmlFor="nama" className="form-label">
            Nama Prodi
          </label>
          <input
            type="text"
            id="nama"
            className="form-control"
            value={nama} // Nilai input disimpan di state nama
            onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
            placeholder="Enter Prodi Nama" // Placeholder teks untuk input
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
