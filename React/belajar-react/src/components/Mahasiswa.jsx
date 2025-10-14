export default function Mahasiswa({ nama, skill }) {
  return (
    <div>
      Nama : {nama} <br />
      Skill : {skill ? skill : "Project Manager"}
    </div>
  );
}
